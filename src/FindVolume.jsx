import { useState } from "react";

export default function FindVolume() {
  const [inputData, setInputData] = useState({
    formulaWeight: "",
    mass: "",
    concentration: "",
  });
  const [units, setUnits] = useState({
    massUnit: "gram",
    concUnit: "molar",
  });
  const [volume, setVolume] = useState({
    value: "",
    unit: "",
  });

  function handleFindVolume() {
    let { formulaWeight, concentration, mass } = inputData;
    const { massUnit, concUnit } = units;

    if (massUnit === "milligram") {
      mass *= 0.001;
    }

    if (concUnit === "millimolar") {
      concentration *= 0.001;
    }

    const volume = mass / concentration / formulaWeight;

    if (volume === 0 || Number.isNaN(volume)) {
      setVolume({ value: "", unit: "" });
    } else if (volume < 0.001) {
      setVolume({
        value: (volume * 1000000).toPrecision(3),
        unit: " Microliter",
      });
    } else if (volume < 1) {
      setVolume({
        value: (volume * 1000).toPrecision(3),
        unit: " Milliliter",
      });
    } else {
      setVolume({ value: volume.toPrecision(3), unit: " Liter" });
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
        <label htmlFor="mass">Mass</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
            id="mass"
            type="text"
            value={inputData.mass}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setInputData({
                  ...inputData,
                  mass: event.target.value,
                });
              }
            }}
          />
          <select
            value={units.massUnit}
            onChange={(event) =>
              setUnits({ ...units, massUnit: event.target.value })
            }
          >
            <option value="milligram">Milligram</option>
            <option value="gram">Gram</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="conc">Concentration</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
            id="conc"
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
            value={units.concUnit}
            onChange={(event) =>
              setUnits({ ...units, concUnit: event.target.value })
            }
          >
            <option value="millimolar">Millimolar</option>
            <option value="molar">Molar</option>
          </select>
        </div>
      </div>
      <div className="flex mt-8 gap-3">
        <button
          className="bg-gray-400 text-white rounded-lg p-1 w-1/2 hover:bg-gray-600"
          type="button"
          onClick={() => handleFindVolume()}
        >
          Find Volume
        </button>
        <div className="flex-1 text-center font-bold border-2 rounded-lg border-black">
          {volume.value}
          {volume.unit}
        </div>
      </div>
    </main>
  );
}
