import Dilution from "./Dilution";
import FindConcentration from "./FindConcentration";
import FindMass from "./FindMass";
import FindVolume from "./FindVolume";

export default function App() {
  return (
    <div className="h-screen flex flex-col gap-4">
      <header className="border-b-2 font-bold text-4xl py-2 px-5">
        MoleCal
      </header>
      <main className="flex flex-wrap gap-10 justify-center">
        <FindMass />
        <FindVolume />
        <FindConcentration />
        <Dilution />
      </main>
    </div>
  );
}
