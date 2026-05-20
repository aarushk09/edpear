# Changelog

## Unreleased

### Breaking

Removed 33 duplicate auto-generated "next-gen" components that shared four copy-paste templates (metric comparison bars, master-detail list, variant pills, reorderable list). Only distinct data-driven shells remain:

- `LearningVelocityChart` (`learning-velocity-chart`) — metric template
- `MistakeNotebook` (`mistake-notebook`) — selection template
- `BilingualTextToggle` (`bilingual-text-toggle`) — preview template
- `SentenceConstructor` (`sentence-constructor`) — builder template

Removed exports include (non-exhaustive): `ConfidenceCalibrator`, `BurnoutRiskIndicator`, `ParentProgressDigest`, `MoodCheckIn`, `KudosBoard`, `CollaborativeNotepad`, `CurriculumDragBuilder`, `WellnessNudge`, `PortfolioBuilder`, and others previously listed in `tools/next-gen-specs.json`.

Use the four retained components with your own data props, or build a new component with a unique layout before adding it to the public API.
