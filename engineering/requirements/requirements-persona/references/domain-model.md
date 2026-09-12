# {{PROJECT_NAME}} — Home Energy Management Domain Model

> This workshop reference supplies a common, technology-neutral vocabulary for a home
> energy-management dashboard. It is a starting point, not a claim that devices or live data
> already exist. Teams may extend it after explicitly defining the new term and its rules.

## Household (Aggregate Root)

A **Household** is the boundary for dashboard data and permissions. A user must only see data for
households to which they have access.

| Field | Type | Notes |
|---|---|---|
| `Id` | string | System identifier |
| `Name` | string | User-facing household name |
| `Timezone` | IANA timezone string | Required for time-series interpretation |
| `Currency` | ISO 4217 string | Required when costs are shown |
| `Members` | list of `HouseholdMember` | Authorized users and their roles |

- **`HouseholdRole`**: `Owner`, `Member`, `Viewer`

## EnergyDevice

An **EnergyDevice** is a physical or virtual source, consumer, storage unit, or meter associated
with one `Household`.

| Field | Type | Notes |
|---|---|---|
| `Id` | string | System identifier |
| `HouseholdId` | string | Required ownership boundary |
| `Name` | string | User-assigned display name |
| `Type` | `EnergyDeviceType` | Canonical device category |
| `ConnectionStatus` | `ConnectionStatus` | Last known integration state |
| `LastUpdatedAt` | datetime | Timestamp of the latest device data |
| `RatedPowerKw` | decimal? | Optional nominal power |

- **`EnergyDeviceType`**: `PhotovoltaicSystem`, `HomeBattery`, `SmartMeter`, `EvCharger`,
  `HeatPump`, `ControllableLoad`, `GridConnection`
- **`ConnectionStatus`**: `Connected`, `Disconnected`, `Degraded`, `Unknown`

## EnergyMeasurement

An **EnergyMeasurement** is an immutable, time-bounded reading. Never label a value as “live”
without providing its timestamp.

| Field | Type | Notes |
|---|---|---|
| `HouseholdId` | string | Required isolation boundary |
| `DeviceId` | string? | Omit only for household/grid aggregate values |
| `Metric` | `EnergyMetric` | What the value represents |
| `Value` | decimal | Non-negative unless a metric explicitly represents net flow |
| `Unit` | `EnergyUnit` | Must match the metric and presentation |
| `IntervalStart` / `IntervalEnd` | datetime | Inclusive/exclusive time interval in UTC |
| `Quality` | `DataQuality` | Trustworthiness of the reading |

- **`EnergyMetric`**: `PowerGeneration`, `PowerConsumption`, `GridImport`, `GridExport`,
  `BatteryChargePower`, `BatteryDischargePower`, `StateOfCharge`, `EnergyGenerated`,
  `EnergyConsumed`, `EnergyImported`, `EnergyExported`
- **`EnergyUnit`**: `W`, `kW`, `Wh`, `kWh`, `Percent`, `Euro`
- **`DataQuality`**: `Measured`, `Estimated`, `Delayed`, `Unavailable`

## EnergyFlowSummary

An **EnergyFlowSummary** is the current dashboard view for one household and one observation time.
It may be calculated from measurements.

| Field | Type | Notes |
|---|---|---|
| `ObservedAt` | datetime | Required timestamp |
| `SolarGenerationKw` | decimal? | PV output at observation time |
| `HomeConsumptionKw` | decimal? | Current household demand |
| `GridImportKw` / `GridExportKw` | decimal? | Current exchange with the grid |
| `BatteryStateOfChargePercent` | decimal? | 0–100 when a battery exists |
| `DataQuality` | `DataQuality` | Quality of the summary |

## Tariff and Cost

| Entity | Required fields | Notes |
|---|---|---|
| `Tariff` | `HouseholdId`, `ImportPricePerKwh`, `ExportPricePerKwh`, `Currency`, `ValidFrom` | Prices may be absent or time-dependent; make the assumption explicit. |
| `CostSummary` | time range, grid-import cost, export credit, currency, `CalculatedAt` | A calculated estimate, not an invoice. |

## Recommendation

A **Recommendation** gives an understandable, non-binding opportunity. It must not silently
control a device.

| Field | Type | Notes |
|---|---|---|
| `Id` | string | System identifier |
| `HouseholdId` | string | Required isolation boundary |
| `Type` | `RecommendationType` | Category |
| `Status` | `RecommendationStatus` | Lifecycle |
| `Explanation` | string | User-facing rationale |
| `CreatedAt` / `ValidUntil` | datetime | Time bounds |
| `ExpectedBenefit` | decimal? | Label unit and assumptions |

- **`RecommendationType`**: `ShiftConsumption`, `ChargeBattery`, `ChargeEv`, `ReduceGridImport`,
  `ReviewDeviceConnection`
- **`RecommendationStatus`**: `Active`, `Dismissed`, `Expired`, `Applied`

## Business Rules for Testable Requirements

1. **Household isolation:** a request may return data only for an authorized `HouseholdId`.
2. **Time clarity:** every chart, total, forecast, and current value identifies its time range or
   `ObservedAt`; use the household timezone for presentation.
3. **Data transparency:** values with `Estimated`, `Delayed`, or `Unavailable` quality must be
   visibly distinguished from measured values. Never replace unavailable data with zero.
4. **Energy units:** power (`kW`) and energy (`kWh`) are not interchangeable. Percentages are
   displayed only with their denominator or clear label.
5. **Battery bounds:** when present, `StateOfCharge` is from 0 through 100 inclusive.
6. **Cost transparency:** a cost estimate identifies currency, tariff assumption, calculation time,
   and selected time range.
7. **Recommendation safety:** a recommendation explains its expected benefit and is advisory by
   default; accepting or dismissing one does not control a physical device.
