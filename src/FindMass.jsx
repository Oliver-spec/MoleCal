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
      <label htmlFor="concentration">Concentration</label>
      <input
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
        <option value="microliter">Microliter</option>
        <option value="milliliter">Milliliter</option>
        <option value="liter">Liter</option>
      </select>
      <button type="button" onClick={() => handleFindMass()}>
        Find Mass
      </button>
      <div>
        {mass.value}
        {mass.unit}
      </div>
    </>
  );
}
