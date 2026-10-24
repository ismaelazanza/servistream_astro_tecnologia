export const streamingThemes = {
  radioStreaming: '9 21 34',
  tvStreaming: '9 21 34',
  resellerRadio: '9 21 34',
  srtServer: '9 21 34',
  vdoPanel: '9 21 34',
  radioCentovacast: '9 21 34',
} as const;

export const streamingThemeStyle = (accent: string) =>
  `--service-accent: ${accent}; --streaming-accent: var(--service-accent); --streaming-title: color-mix(in srgb, rgb(var(--service-accent)) 58%, white); --streaming-line: rgb(var(--service-accent) / .18);`;
