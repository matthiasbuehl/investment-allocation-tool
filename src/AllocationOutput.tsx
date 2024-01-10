import { ReactElement } from "react";
import { AllocationDistribution } from "./allocation";

export default function AllocationOutput({
  distribution,
}: {
  distribution: AllocationDistribution;
}) {
  const rows: ReactElement[] = [];
  for (const [key, value] of Object.entries(distribution)) {
    rows.push(<div>{`${key} - ${value}`}</div>);
  }

  return (
    <div className="output-container">
      <h2>Results</h2>
      <div className="output-inner-container">{rows}</div>
    </div>
  );
}
