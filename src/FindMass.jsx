import { useState } from "react";

export default function FindMass() {
  const [inputData, setInputData] = useState({
    formulaWeight: "",
    concentration: "",
    volume: "",
  });
  const [units, setUnits] = useState({
    concentrationUnit: "molar",
    volumeUnit: "milliliter",
  });
  const [mass, setMass] = useState({
    value: "",
    unit: "",
  });

  function handleFindMass() {
    const { formulaWeight, volume, concentration } = inputData;
    const { concentrationUnit, volumeUnit } = units;

    const mass =
      formulaWeight *
      volume *
      concentration *
      (concentrationUnit === "millimolar" ? 0.001 : 1) *
      (volumeUnit === "microliter" ? 0.000001 : 1) *
      (volumeUnit === "milliliter" ? 0.001 : 1);

    if (mass === 0 || Number.isNaN(mass)) {
      setMass({ value: "", unit: "" });
    } else if (mass < 0.001) {
      setMass({ value: (mass * 1000000).toPrecision(3), unit: " Micrograms" });
    } else if (mass < 1) {
      setMass({ value: (mass * 1000).toPrecision(3), unit: " Milligrams" });
    } else {
      setMass({ value: mass.toPrecision(3), unit: " Grams" });
    }
  }

  return (
    <main className="flex flex-col border-2 border-black rounded-3xl p-7 w-1/3">
      <label htmlFor="formulaWeight">Formula Weight</label>
      <input
        className="border-2 border-black rounded-lg p-1"
        id="formulaWeight"
        type="text"
        value={inputData.formulaWeight}
        onChange={(event) => {
          if (/^\d*\.?\d*$/.test(event.target.value)) {
            setInputData({
              ...inputData,
              formulaWeight: event.target.value,
            });
          }
        }}
      />
      <div className="flex flex-col mt-5">
        <label htmlFor="concentration">Concentration</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
            id="concentration"
            type="text"
            value={inputData.concentration}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setInputData({
                  ...inputData,
                  concentration: event.target.value,
                });
              }
            }}
          />
          <select
            value={units.concentrationUnit}
            onChange={(event) =>
              setUnits({ ...units, concentrationUnit: event.target.value })
            }
          >
            <option value="millimolar">Millimolar</option>
            <option value="molar">Molar</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="volume">Volume</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
            id="volume"
            type="text"
            value={inputData.volume}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setInputData({
                  ...inputData,
                  volume: event.target.value,
                });
              }
            }}
          />
          <select
            value={units.volumeUnit}
            onChange={(event) =>
              setUnits({ ...units, volumeUnit: event.target.value })
            }
          >
            <option value="microliter">Microliter</option>
            <option value="milliliter">Milliliter</option>
            <option value="liter">Liter</option>
          </select>
        </div>
      </div>
      <div className="flex mt-8 gap-3">
        <button
          className="bg-gray-400 text-white rounded-lg p-1 w-1/2 hover:bg-gray-600"
          type="button"
          onClick={() => handleFindMass()}
        >
          Find Mass
        </button>
        <div className="flex-1 text-center font-bold border-2 rounded-lg border-black">
          {mass.value}
          {mass.unit}
        </div>
      </div>
    </main>
  );
}
