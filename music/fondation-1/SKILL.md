---
name: foundation-1-prompting
description: Formulate highly structured, comma-separated prompts for the Foundation-1 text-to-sample music generation model. Use when the user wants to generate music samples, create prompts for Foundation-1, describe a sound in natural language, or translate a musical idea into Foundation-1 tags. Triggers on phrases like "make me a [genre/mood] track", "generate a [instrument] loop", "I want a [adjective] [instrument] sound", or any request involving music generation with Foundation-1.
---

# Foundation-1 Prompting

Foundation-1 is a structured text-to-sample music model trained to treat instruments, timbre, effects, and phrasing as separate composable layers. Writing effective prompts requires utilizing this structured hierarchy instead of natural language prose.

## Quick Start

A basic structured prompt starts with the instrument, defines the tone, adds the effect layer, and describes the musical movement:

`Synth Lead, Warm, Wide, Bright, Clean, Melody, 8 Bars, 140 BPM, E minor`

> Note: When using specialized clients (like ComfyUI-Foundation-1), timing, bars, and key controls are configured via UI dropdowns, while the text field only contains the tags.

## Natural Language to Prompt

When the user describes a sound in natural language, follow this translation workflow:

### Step 1: Identify the Instrument

Parse the user's description for the instrument (explicit or implied):
- "piano" → `Keys, Grand Piano`
- "808 bass" → `Bass, 808 Bass`
- "synth pad" → `Synth, Synth Pad`
- "acoustic guitar" → `Guitar, Acoustic Guitar`
- "cello" → `Bowed Strings, Cello`

### Step 2: Map Adjectives to Timbre Tags

Translate descriptive words into Foundation-1 timbre vocabulary:

| User says | Map to |
|-----------|--------|
| warm, cozy, mellow | `Warm`, `Mellow`, `Rich` |
| bright, crisp, clear | `Bright`, `Crisp`, `Clean` |
| dark, moody, deep | `Dark`, `Deep`, `Mellow` |
| airy, spacious, ethereal | `Airy`, `Wide`, `Spacey` |
| gritty, dirty, raw | `Gritty`, `Dirty`, `Harsh` |
| soft, smooth, silky | `Soft`, `Silky`, `Smooth` |
| punchy, tight, focused | `Punchy`, `Sharp`, `Intimate` |
| dusty, vintage, lo-fi | `Dusty`, `Lo-Fi`, `Dark` |

### Step 3: Detect FX Requirements

Look for audio processing cues in the user's description:
- "with reverb" → `Medium Reverb` (or `High Reverb` if "lots of")
- "with delay" → `Medium Delay` (or `Ping Pong Delay` for stereo)
- "dry, no effects" → `Dry`
- "distorted, overdriven" → `High Distortion` or `Overdrive`
- "phaser, swirling" → `Phaser` or `High Phaser`
- "chorus, thick" → `Chorus`
- "bitcrushed, lo-fi" → `Bitcrush`

### Step 4: Capture Musical Behavior

Identify how the sound should move:
- "melody, leads" → `Melody`
- "arpeggiated, rolling" → `Arpeggio`
- "chords, chord progression" → `Chord Progression`
- "riff, repeating" → `Riff`, `Repeating`
- "groove, bouncy" → `Groove`
- "staccato, short" → `Staccato`
- "legato, flowing" → `Legato`, `Sustained`

### Step 5: Add Timing & Key (when specified or implied)

- BPM: Suggest based on genre (lo-fi ~90-100, house ~120-128, drum & bass ~170-175)
- Bars: Default to `8 Bars`, use `4 Bars` for short loops
- Key: Suggest a Western key if the user mentions one (e.g., "in C minor")

### Example Translations

**Input:** "A warm, dreamy piano loop with lots of reverb in a minor key"
**Output:** `Keys, Grand Piano, Warm, Airy, Soft, Rich, High Reverb, Legato, Chord Progression, 8 Bars, 110 BPM, C# minor`

**Input:** "Gritty acid bassline with distortion, fast and punchy"
**Output:** `Bass, Acid, FM Bass, Gritty, Harsh, High Distortion, Punchy, Bassline, Fast Speed, Repeating, 4 Bars, 140 BPM, C minor`

**Input:** "Lo-fi hip hop beat with dusty piano and vinyl crackle"
**Output:** `Keys, Upright Piano, Dusty, Lo-Fi, Dark, Warm, Medium Reverb, Low Delay, Chord Progression, 8 Bars, 95 BPM, Ab major`

**Input:** "Bright synth pad with phaser, wide and atmospheric"
**Output:** `Synth, Synth Pad, Bright, Wide, Airy, Spacey, High Phaser, Medium Reverb, Slow Speed, Legato, Chord Progression, 8 Bars, 115 BPM, Eb major`

## Workflows

### 1. Constructing a Layered Prompt

To build a prompt that aligns perfectly with Foundation-1's conditioning, follow this hierarchical construction sequence:

`[Instrument Family] -> [Sub-Family] -> [Timbre] -> [FX Treatment] -> [Notation & Phrasing] -> [Timing & Key]`

- **Step 1:** Define the Instrument — Specify a major instrument family followed by its specific type (e.g., `Keys, Grand Piano` or `Bass, FM Bass`)
- **Step 2:** Apply Timbre Descriptors — Shape the spectral and tonal balance (e.g., `Warm, Bright, Dark, Thin, Thick`)
- **Step 3:** Add FX Processing — Guide the spatialization and processing (e.g., `Medium Reverb, Dry, High Distortion, Phaser`)
- **Step 4:** Dictate Notation & Movement — Instruct the model on how the phrase behaves (e.g., `Melody, Arpeggio, Chord Progression`)
- **Step 5:** Apply Timing & Keys — Align with project tempo (100–150 BPM recommended), length (4 or 8 Bars), and Western scale keys (24 options)

### 2. Creating Variation with Audio-to-Audio

When creating musical variations of an existing audio loop:

- Set `init_noise_level` between 0.1–0.3 to maintain high fidelity to the original melody while subtly shifting timbre.
- Set `init_noise_level` between 0.5–0.75 for standard musical variations (changes melody slightly while retaining structural boundaries).
- Set `init_noise_level` between 0.9–1.0 for maximum creative freedom, letting the model drift significantly from the input.

## Output Format

Always return the prompt in this format:

```
# [Brief description of what was generated]
[Instrument], [Sub-Family], [Timbre Tags], [FX Tags], [Notation], [Bars] Bars, [BPM] BPM, [Key]
```

If the user asks for multiple variations, provide each on a separate line with a brief label.

## Detailed References

For the exhaustive list of supported tag vocabularies, see [REFERENCE.md](./REFERENCE.md).

For pre-assembled, production-ready prompt combinations, see [EXAMPLES.md](./EXAMPLES.md).
