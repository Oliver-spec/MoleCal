import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen flex flex-col gap-4">
      <header className="border-b-2 py-2 px-5 flex gap-20">
        <div className="font-bold text-4xl flex flex-col justify-center">
          <div>MoleCal</div>
        </div>
        <div className="flex gap-7 text-xl font-bold">
          <div className="flex flex-col justify-center">
            <Link to="/findMass">
              <div className="border-black hover:border-b-2">Find Mass</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/findConcentration">
              <div className="border-black hover:border-b-2">
                Find Concentration
              </div>
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/findVolume">
              <div className="border-black hover:border-b-2">Find Volume</div>
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/dilution">
              <div className="border-black hover:border-b-2">Dilution</div>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex p-10 justify-center">
        <Outlet />
      </main>
    </div>
  );
}
