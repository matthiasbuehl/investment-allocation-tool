import { AllocationDistribution } from "./allocation";

export default function AllocationOutput({
  distribution,
}: {
  distribution: AllocationDistribution;
}) {
  // sort by amount descending
  const sortedDistributions: { name: string; amount: number }[] = [];
  for (const [key, value] of Object.entries(distribution)) {
    sortedDistributions.push({ name: key, amount: value });
  }

  sortedDistributions.sort((a, b) => b.amount - a.amount);

  return (
    <div className="output-container">
      <h2>Results</h2>
      <div className="output-inner-container">
        {sortedDistributions.map((sd) => (
          <div>
            {sd.name} - ${sd.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
