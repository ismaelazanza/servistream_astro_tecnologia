import dimensions from './image-dimensions.json';
export function imageSize(src: string): { width?: number; height?: number } {
  return dimensions[src as keyof typeof dimensions] ?? {};
}
