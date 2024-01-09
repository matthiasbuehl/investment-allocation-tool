import { assert, describe, expect, it } from "vitest";
import {
  Allocation,
  AllocationDistribution,
  calculateAllocationDistribution,
} from "../src/allocation.ts";

describe("calculateAllocationDistribution", () => {
  it("works for complex 1", () => {
    const alloc = {
      allocation_amount: 100,
      investor_amounts: [
        {
          name: "Investor A",
          requested_amount: 100,
          average_amount: 95,
        },
        {
          name: "Investor B",
          requested_amount: 2,
          average_amount: 1,
        },
        {
          name: "Investor C",
          requested_amount: 1,
          average_amount: 4,
        },
      ],
    };

    const expected: AllocationDistribution = {
      "Investor A": 97.96875,
      "Investor B": 1.03125,
      "Investor C": 1,
    };

    const dist = calculateAllocationDistribution(alloc);

    expect(dist).toEqual(expected);
  });
});
