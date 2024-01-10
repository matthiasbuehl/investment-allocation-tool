import React from "react";
import AllocationInput from "./AllocationInput";
import AllocationOutput from "./AllocationOutput";
import { AllocationDistribution } from "./allocation";
import "./App.css";

function App() {
  const [distribution, setDistribution] =
    React.useState<AllocationDistribution>({});
  console.log(distribution);

  return (
    <div className="container">
      <AllocationInput setDistribution={setDistribution} />
      <AllocationOutput />
    </div>
  );
}

export default App;
