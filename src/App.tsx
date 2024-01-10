import React from "react";
import AllocationInput from "./AllocationInput";
import AllocationOutput from "./AllocationOutput";
import { AllocationDistribution } from "./allocation";
import "./App.css";

function App() {
  const [distribution, setDistribution] =
    React.useState<AllocationDistribution>({});

  return (
    <div className="container">
      <AllocationInput setDistribution={setDistribution} />
      <AllocationOutput distribution={distribution} />
    </div>
  );
}

export default App;
