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
    } else if (Number(stockConc) < Number(targetConc)) {
      setVolumeNeeded({
        value: "",
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
    <main className="flex flex-col border-black rounded-3xl w-full lg:w-1/2">
      <div className="flex flex-col">
        <label htmlFor="stockConc">Stock Concentration</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
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
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="targetConc">Target Concentration</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
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
              setUnits({
                ...units,
                targetConcentrationUnit: event.target.value,
              })
            }
          >
            <option value="millimolar">Millimolar</option>
            <option value="molar">Molar</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="targetVolume">Final Volume</label>
        <div className="flex gap-5">
          <input
            className="border-2 border-black rounded-lg p-1 flex-1"
            id="targetVolume"
            type="text"
            value={inputData.targetVolume}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setInputData({
                  ...inputData,
                  targetVolume: event.target.value,
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
          onClick={() => handleFindVolume()}
        >
          Find Stock Volume
        </button>
        <div className="flex-1 text-center font-bold border-2 rounded-lg border-black flex flex-col justify-center">
          <div>
            {volumeNeeded.value}
            {volumeNeeded.unit}
          </div>
        </div>
      </div>
    </main>
  );
}
