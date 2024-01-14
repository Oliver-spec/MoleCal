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

    if (concentration === 0) {
      setConcentration({ value: "", unit: "" });
    } else if (concentration < 0.001) {
      setConcentration({
        value: (concentration * 1000000).toPrecision(3),
        unit: " Nanomolar",
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
    <>
      <label htmlFor="formulaWeight">Formula Weight</label>
      <input
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
      <label htmlFor="mass">Mass</label>
      <input
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
        <option value="gram">Gram</option>
        <option value="milligram">Milligram</option>
      </select>
      <label htmlFor="volume">Volume</label>
      <input
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
        <option value="milliliter">Milliliter</option>
        <option value="liter">Liter</option>
        <option value="microliter">Microliter</option>
      </select>
      <button type="button" onClick={() => handleFindConcentration()}>
        Find Concentration
      </button>
      <div>
        {concentration.value}
        {concentration.unit}
      </div>
    </>
  );
}
