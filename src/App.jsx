import Dilution from "./Dilution";
import FindConcentration from "./FindConcentration";
import FindMass from "./FindMass";
import FindVolume from "./FindVolume";

export default function App() {
  return (
    <>
      <FindMass />
      <FindVolume />
      <FindConcentration />
      <Dilution />
    </>
  );
}
