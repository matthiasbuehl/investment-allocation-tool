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
  /*
Available allocation: $100
Investor A requested to invest $150
Investor B requested to invest $50

Investor A has a historical average investment size of $100
Investor B has a historical average investment size of $25

After proration:
Investor A will invest $100 * (100 / (100 + 25)) = $80
Investor B will invest $100 * (25 / (100 + 25)) = $20
*/

  // sort investors by requested_amount asc
  allocation.investor_amounts.sort(
    (a, b) => a.requested_amount - b.requested_amount
  );

  console.log("allocation:", allocation);

  // sum up the average investment amounts of all investors
  let average_amount_sum = allocation.investor_amounts.reduce(
    (acc, curr) => acc + curr.average_amount,
    0
  );

  console.log("averageAmountSum", average_amount_sum);

  for (const investor_amount of allocation.investor_amounts) {
    const max_amount = getMaxInvestorAmount(
      allocation.allocation_amount,
      investor_amount,
      average_amount_sum
    );

    console.log("max_amount", max_amount);
  }
}

function getMaxInvestorAmount(
  allocation_amount: number,
  investor_amount: InvestorAmount,
  average_amount_sum: number
): number {
  return (
    1.0 *
    allocation_amount *
    (investor_amount.average_amount / average_amount_sum)
  );
}
