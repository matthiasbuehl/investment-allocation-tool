export const squared = (n: number) => n * n;

export interface Allocation {
  allocation_amount: number;
  investor_amounts: InvestorAmount[];
}

export interface InvestorAmount {
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
    EXAMPLE
    Available allocation: $100
    Investor A requested to invest $150
    Investor B requested to invest $50

    Investor A has a historical average investment size of $100
    Investor B has a historical average investment size of $25

    After proration:
    Investor A will invest $100 * (100 / (100 + 25)) = $80
    Investor B will invest $100 * (25 / (100 + 25)) = $20
  */

  /*
    Sort investors by requested_amount and average_amount in order to process
    the investors who are investing less than their max allowed amount first.
  */
  allocation.investor_amounts.sort(
    (a, b) =>
      // first sort order
      a.requested_amount - b.requested_amount ||
      // secondary sort order
      b.average_amount - a.average_amount
  );

  const distribution: AllocationDistribution = {};

  // sum up the average investment amounts of all investors
  let average_amount_sum = allocation.investor_amounts.reduce(
    (acc, curr) => acc + curr.average_amount,
    0
  );

  for (const investor_amount of allocation.investor_amounts) {
    const max_amount = getMaxInvestorAmount(
      allocation.allocation_amount,
      investor_amount,
      average_amount_sum
    );

    if (max_amount > investor_amount.requested_amount) {
      average_amount_sum -= investor_amount.average_amount;
      allocation.allocation_amount -= investor_amount.requested_amount;
      distribution[investor_amount.name] = investor_amount.requested_amount;
    } else {
      distribution[investor_amount.name] = max_amount;
    }
  }

  return distribution;
}

function getMaxInvestorAmount(
  allocation_amount: number,
  investor_amount: InvestorAmount,
  average_amount_sum: number
): number {
  return (
    allocation_amount * (investor_amount.average_amount / average_amount_sum)
  );
}
