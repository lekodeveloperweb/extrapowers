# {{PROJECT_NAME}} — Functional Scope

> The shared workshop product is a **home energy-management dashboard**. Each team names its
> product at the start of Step 1 and replaces `{{PROJECT_NAME}}` in artifacts with that name.
> The scope below is a menu for discovery, not a requirement to build every capability.

## User Roles

| Role | Responsibility / permissions |
|---|---|
| **HouseholdOwner** | Connects devices, configures tariff assumptions, and manages household access. |
| **HouseholdMember** | Uses the dashboard and recommendations for an authorized household. |
| **HouseholdViewer** | Has read-only dashboard access when invited by the owner. |
| **SupportOperator** *(optional)* | Investigates integration issues using minimized, authorized diagnostic data. |

## Core Domains

### 1. Home Energy Visibility

**Entities:** `Household`, `EnergyDevice`, `EnergyMeasurement`, `EnergyFlowSummary`

**Functions**
- Show current solar generation, household consumption, grid import/export, and battery state.
- Show connected devices and their last update or connection status.
- Present historical energy consumption and generation for a selected time range.
- Clearly handle loading, delayed, estimated, empty, and unavailable data.

**Key events:** `DeviceConnected`, `MeasurementReceived`, `DataQualityChanged`

### 2. Costs and Self-Consumption

**Entities:** `Tariff`, `CostSummary`, `EnergyMeasurement`

**Functions**
- Show estimated grid-import cost and export credit for a stated time range.
- Explain tariff assumptions and calculation time.
- Show self-consumption or grid-independence metrics only when their formula and data basis are
  stated in the requirement.

**Key events:** `TariffUpdated`, `CostSummaryCalculated`

### 3. Energy Opportunities

**Entities:** `Recommendation`, `EnergyDevice`, `EnergyFlowSummary`

**Functions**
- Show non-binding opportunities to shift flexible consumption or review device connectivity.
- Explain the expected benefit, affected device, assumptions, and expiry.
- Allow a household user to dismiss or acknowledge a recommendation.

**Key events:** `RecommendationCreated`, `RecommendationDismissed`, `RecommendationExpired`

## Support Domains

### 4. Device Integration
- Connect, disconnect, and display the health of a device data source.
- Preserve last-known values with timestamp and quality; do not imply an unavailable integration is
  delivering current data.

### 5. Household Access and Privacy
- Manage household membership and role-based visibility.
- Enforce household isolation for dashboard, device, tariff, and recommendation data.
- Record security-sensitive access or configuration changes where appropriate.

### 6. Notifications *(optional)*
- Notify a household user about a disconnected integration, material data delay, or a new
  recommendation.
- Notification channels and consent are explicit requirements, never defaults.

## MVP Guidance

A thin, demonstrable dashboard MVP normally includes:

1. one household and a selected subset of devices;
2. current energy-flow cards with an observable timestamp;
3. one historical chart with a selectable range;
4. delayed/unavailable-data states; and
5. one transparent cost or recommendation scenario.

Direct device control, dynamic tariff optimization, external utility integration, and automated
switching are out of scope until the team creates an explicit, safety-reviewed requirement.

## Requirement Notes

- Use terms from `domain-model.md`; mark a team-specific alias explicitly.
- Every energy or cost requirement names the household, time range, unit, and data-quality state.
- A dashboard prototype must include at least one non-happy path relevant to its story (for
  example delayed data or a disconnected device).
- A recommendation is advisory by default; device control requires separate authorization,
  safety, and failure-handling requirements.
