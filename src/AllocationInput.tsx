import {
  Allocation,
  InvestorAmount,
  calculateAllocationDistribution,
} from "./allocation";

export default function AllocationInput() {
  function handleForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData.get("allocation_amount"));

    const investor_amounts: InvestorAmount[] = [];
    for (let i = 1; i <= 3; i++) {
      const investor_amount = extractInvestorAmount(formData, i);
      if (validateInvestorAmount(investor_amount)) {
        investor_amounts.push(investor_amount);
      }
    }

    const allocation: Allocation = {
      allocation_amount: Number(formData.get("allocation_amount")) ?? 0,
      investor_amounts: investor_amounts,
    };
    console.log(allocation);

    const distributions = calculateAllocationDistribution(allocation);
    console.log("distributions", distributions);
  }

  function extractInvestorAmount(
    formData: FormData,
    postfix: number
  ): InvestorAmount {
    const investorAmount: InvestorAmount = {
      name: formData.get(`name_${postfix}`)?.toString() ?? "",
      requested_amount:
        Number(formData.get(`requested_amount_${postfix}`)) ?? 0,
      average_amount: Number(formData.get(`average_amount_${postfix}`)) ?? 0,
    };

    return investorAmount;
  }

  function validateInvestorAmount(investor_amount: InvestorAmount): boolean {
    return (
      investor_amount.name.length > 0 &&
      investor_amount.average_amount > 0 &&
      investor_amount.requested_amount > 0
    );
  }

  return (
    <div className="input-container">
      <h2>Inputs</h2>
      <form onSubmit={handleForm}>
        <section>
          <h3>Total Available Allocation</h3>
          <input name="allocation_amount" placeholder="$ Allocation" />
        </section>
        <section>
          <h3>Investor Breakdown</h3>
          <AllocationInputRow postfix="1" />
          <AllocationInputRow postfix="2" />
          <AllocationInputRow postfix="3" />
        </section>
        <button>Prorate</button>
      </form>
    </div>
  );
}

function AllocationInputRow({ postfix }: { postfix: string }) {
  return (
    <div className="row">
      <input name={`name_${postfix}`} placeholder="✎ Name" />
      <input
        name={`requested_amount_${postfix}`}
        placeholder="$ Requested Amount"
      />
      <input
        name={`average_amount_${postfix}`}
        placeholder="$ Average Amount"
      />
    </div>
  );
}
