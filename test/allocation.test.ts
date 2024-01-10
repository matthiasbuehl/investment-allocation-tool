import { assert, describe, expect, it } from "vitest";
import {
  Allocation,
  AllocationDistribution,
  calculateAllocationDistribution,
} from "../src/allocation.ts";

describe("calculateAllocationDistribution", () => {
  it("works for simple 1", () => {
    const alloc = {
      allocation_amount: 100,
      investor_amounts: [
        {
          name: "Investor A",
          requested_amount: 100,
          average_amount: 100,
        },
        {
          name: "Investor B",
          requested_amount: 25,
          average_amount: 25,
        },
      ],
    };

    const expected: AllocationDistribution = {
      "Investor A": 80,
      "Investor B": 20,
    };
    const dist = calculateAllocationDistribution(alloc);

    expect(dist).toEqual(expected);
  });

  it("works for simple 2", () => {
    const alloc = {
      allocation_amount: 200,
      investor_amounts: [
        {
          name: "Investor A",
          requested_amount: 100,
          average_amount: 100,
        },
        {
          name: "Investor B",
          requested_amount: 25,
          average_amount: 25,
        },
      ],
    };

    const expected: AllocationDistribution = {
      "Investor A": 100,
      "Investor B": 25,
    };
    const dist = calculateAllocationDistribution(alloc);

    expect(dist).toEqual(expected);
  });

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

  it("works for complex 2", () => {
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
          requested_amount: 1,
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
      "Investor A": 98,
      "Investor B": 1,
      "Investor C": 1,
    };

    const dist = calculateAllocationDistribution(alloc);

    expect(dist).toEqual(expected);
  });
});
