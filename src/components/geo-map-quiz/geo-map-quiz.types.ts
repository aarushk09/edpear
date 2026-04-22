export interface GeoMapRegion {
  id: string;
  name: string;
  d: string; // SVG path data
}

export interface GeoMapQuizProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  regions: GeoMapRegion[];
  targetRegionId?: string; // The region the user needs to click
  onRegionClick?: (regionId: string, isCorrect: boolean) => void;
  title?: string;
  instruction?: string;
  viewBox?: string; // e.g. "0 0 1000 500"
}
