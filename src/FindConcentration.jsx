import { useState } from "react";

export default function FindConcentration() {
  const [inputData, setInputData] = useState({
    formulaWeight: "",
    mass: "",
    volume: "",
  });
  const [units, setUnits] = useState({
    massUnit: "milligram",
    volumeUnit: "milliliter",
  });
  const [concentration, setConcentration] = useState({
    value: "",
    unit: "",
  });

  function handleFindConcentration() {
    let { formulaWeight, volume, mass } = inputData;
    const { massUnit, volumeUnit } = units;

    if (massUnit === "milligram") {
      mass *= 0.001;
    }

    if (volumeUnit === "microliter") {
      volume *= 0.000001;
    } else if (volumeUnit === "milliliter") {
      volume *= 0.001;
    }

    const concentration = mass / formulaWeight / volume;

    if (concentration === 0 || Number.isNaN(concentration)) {
      setConcentration({ value: "", unit: "" });
    } else if (concentration < 0.001) {
      setConcentration({
        value: (concentration * 1000000).toPrecision(3),
        unit: " Micromolar",
      });
    } else if (concentration < 1) {
      setConcentration({
        value: (concentration * 1000).toPrecision(3),
        unit: " Millimolar",
      });
    } else {
      setConcentration({ value: concentration.toPrecision(3), unit: " Molar" });
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
          onClick={() => handleFindConcentration()}
        >
          Find Concentration
        </button>
        <div className="flex-1 text-center font-bold border-2 rounded-lg border-black">
          {concentration.value}
          {concentration.unit}
        </div>
      </div>
    </main>
  );
}
