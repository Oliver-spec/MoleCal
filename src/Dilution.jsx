import { useState, useSyncExternalStore } from "react";

export default function Dilution() {
  const [inputData, setInputData] = useState({
    stockConc: "",
    targetConc: "",
    targetVolume: "",
  });
  const [volumeNeeded, setVolumeNeeded] = useState({
    value: "",
    unit: "",
  });
  const [units, setUnits] = useState({
    stockConcentrationUnit: "molar",
    targetConcentrationUnit: "molar",
    volumeUnit: "milliliter",
  });

  function handleFindVolume() {
    let { stockConc, targetConc, targetVolume } = inputData;
    const { stockConcentrationUnit, targetConcentrationUnit, volumeUnit } =
      units;

    if (stockConcentrationUnit === "millimolar") {
      stockConc /= 1000;
    }

    if (targetConcentrationUnit === "millimolar") {
      targetConc /= 1000;
    }

    if (volumeUnit === "milliliter") {
      targetVolume /= 1000;
    } else if (volumeUnit === "microliter") {
      targetVolume /= 1000000;
    }

    const volumeNeeded = (targetConc * targetVolume) / stockConc;

    if (volumeNeeded === 0 || Number.isNaN(volumeNeeded)) {
      setVolumeNeeded({
        value: "",
        unit: "",
      });
    } else if (stockConc < targetConc) {
      setVolumeNeeded({
        value:
          "Target concentration must be lower than or equal to the stock concentration",
        unit: "",
      });
    } else if (volumeNeeded < 0.001) {
      setVolumeNeeded({
        value: (volumeNeeded * 1000000).toPrecision(3),
        unit: " Microliter",
      });
    } else if (volumeNeeded < 1) {
      setVolumeNeeded({
        value: (volumeNeeded * 1000).toPrecision(3),
        unit: " Milliliter",
      });
    } else {
      setVolumeNeeded({
        value: volumeNeeded.toPrecision(3),
        unit: " Liter",
      });
    }
  }

  return (
    <>
      <label htmlFor="stockConc">Stock Concentration</label>
      <input
        id="stockConc"
        type="text"
        value={inputData.stockConc}
        onChange={(event) => {
          if (/^\d*\.?\d*$/.test(event.target.value)) {
            setInputData({ ...inputData, stockConc: event.target.value });
          }
        }}
      />
      <select
        value={units.stockConcentrationUnit}
        onChange={(event) =>
          setUnits({ ...units, stockConcentrationUnit: event.target.value })
        }
      >
        <option value="millimolar">Millimolar</option>
        <option value="molar">Molar</option>
      </select>
      <label htmlFor="targetConc">Target Concentration</label>
      <input
        id="targetConc"
        type="text"
        value={inputData.targetConc}
        onChange={(event) => {
          if (/^\d*\.?\d*$/.test(event.target.value)) {
            setInputData({ ...inputData, targetConc: event.target.value });
          }
        }}
      />
      <select
        value={units.targetConcentrationUnit}
        onChange={(event) =>
          setUnits({ ...units, targetConcentrationUnit: event.target.value })
        }
      >
        <option value="millimolar">Millimolar</option>
        <option value="molar">Molar</option>
      </select>
      <label htmlFor="targetVolume">Final Volume</label>
      <input
        id="targetVolume"
        type="text"
        value={inputData.targetVolume}
        onChange={(event) => {
          if (/^\d*\.?\d*$/.test(event.target.value)) {
            setInputData({ ...inputData, targetVolume: event.target.value });
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
      <button type="button" onClick={() => handleFindVolume()}>
        Find Stock Volume
      </button>
      <div>
        {volumeNeeded.value}
        {volumeNeeded.unit}
      </div>
    </>
  );
}
