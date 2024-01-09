export const squared = (n: number) => n * n;

export interface Allocation {
  allocation_amount: number;
  investor_amounts: InvestorAmount[];
}

interface InvestorAmount {
  name: string;
  requested_amount: number;
  average_amount: number;
}

export interface AllocationDistribution {
  [investor_name: string]: number;
}

export function calculateAllocationDistribution(
  allocation: Allocation
): AllocationDistribution {
  return {};
}
