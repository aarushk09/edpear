export type DiffViewerMode = "side-by-side" | "inline";

export type DiffViewerProps = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  mode?: DiffViewerMode;
  className?: string;
};
