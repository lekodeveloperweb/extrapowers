# Foundation-1 Master Tag Reference

Foundation-1 achieves high prompt adherence by training on strict tag categories. Avoid raw prose sentences like "a beautiful piano with lots of reverb" and instead use comma-separated keywords.

1. Instrument Hierarchy

- Major Families
- Synth
- Keys
- Bass
- Bowed Strings
- Mallet
- Wind
- Guitar
- Brass
- Vocal
- Plucked Strings

## Popular Sub-Families & Roles

- Synth: Synth Lead, Synth Pad, Pluck, Wavetable, Acid, Chords, Arp
- Keys: Grand Piano, Upright Piano, Electric Piano, Rhodes, Wurlitzer, Organ, Clavinet
- Bass: Sub Bass, FM Bass, Wobble Bass, Synth Bass, Electric Bass, 808 Bass
- Bowed Strings: Violin, Viola, Cello, Double Bass, String Section
- Guitars: Acoustic Guitar, Electric Guitar, Clean Guitar, Muted Guitar, Overdriven Guitar

2. Timbre Descriptors

- Use these terms to shape the sonic character, brightness, width, and weight of your instruments.
- Tonal/Spectral Balance: Warm, Bright, Dark, Rich, Mellow, Harsh, Thin, Thick
- Texture & Intimacy: Clean, Dirty, Gritty, Dusty, Lo-Fi, Airy, Breathy, Silky, Smooth
- Space & Width: Wide, Intimate, Deep, Stereo, Mono, Spacey
- Transient Response: Sharp, Soft, Punchy, Plucky, Sustained

3. FX Layer

Adding explicit FX tags directs the spatial and processing depth of the loop.

- Production Context: Use Dry for raw, un-effected audio (ideal for post-processing), or Wet for processed sounds.
- Reverbs: Low Reverb, Medium Reverb, High Reverb, Plate Reverb, Spring Reverb
- Delays: Low Delay, Medium Delay, High Delay, Ping Pong Delay, Stereo Delay, Cross Delay, Mono Delay
- Modulation: Chorus, Phaser, Flanger, Tremolo, Low Phaser, High Phaser
- Saturation/Drive: Low Distortion, Medium Distortion, High Distortion, Overdrive, Fuzz, Bitcrush, High Bitcrush

4. Musical Notation & Movement

Guide the rhythmic density, phrase behavior, and note layout using these performance descriptors.

- Behavior: Melody, Arpeggio, Chord Progression, Riff, Groove, Bassline, Top-line
- Phrase Structure: Repeating, Sustained, Staccato, Legato, Glissando, Pitch Bend
- Rhythmic Layout: Rhythmic Density, Off Beat, On Beat, Fast Speed, Medium Speed, Slow Speed

5. Scales, Keys & Tuning

Foundation-1 natively locks to 24 standard major and minor western keys.

## Supported Keys

| Key Class | Supported Prompt Terms |
| Major Keys | C major, C# major (or Db major), D major, Eb major, E major, F major, F# major (or Gb major), G major, Ab major, A major, Bb major, B major |
| Minor Keys | C minor, C# minor, D minor, D# minor (or Eb minor), E minor, F minor, F# minor, G minor, G# minor, A minor, Bb minor, B minor |

6. BPM & Bar Structure

The model excels at tempo-locked loops within standard electronic music ranges.

- BPM: 100 BPM to 150 BPM are highly optimized.
- Loop Length: 4 Bars, 8 Bars are the ideal training targets.