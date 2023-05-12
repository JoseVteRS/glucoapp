'use client'
import { Control } from "@/interfaces/control.interface";
import { formatDate, groupDataByDate, isGlucoseIdeal, toControl } from "@/utils";
import { Fragment } from "react";
import data from "../../../data/data.json";


interface MomentTranslation {
  [moment: string]: string;
}

const momentTranslation: MomentTranslation = {
  FASTING: "En ayunas",
  ONE_HOUR_AFTER_BREAKFAST: "1h post desayuno",
  ONE_HOUR_BEFORE_LUNCH: "1h pre comida",
  ONE_HOUR_AFTER_LUNCH: "1h post comida",
  ONE_HOUR_BEFORE_DINNER: "1h pre cena",
  ONE_HOUR_AFTER_DINNER: "1h post cena",
};



const ControlPage = async () => {

  const controls: Control[] = toControl(data);
  const groupedData = groupDataByDate(controls);

  return (
    <div className="pt-4 px-2 mx-auto mb-10">
      <h1 className="font-semibold text-center" >Resultados</h1>

      <table className="border-collapse w-full print:w-11/12 print:mx-auto print:my-6 print:text-sm">
        <thead>
          <tr>
            <th className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-bold  print:p-1">
              Valor <span className="text-xs">mg/dl</span>
            </th>
            <th className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-bold  print:p-1">
              Momento
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((group) => (
            <Fragment key={group.date.toString()}>
              <tr>
                <td
                  className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-semibold text-sm print:text-xl print:p-1 text-center"
                  colSpan={3}
                >
                  {formatDate(group.date.toString())}
                </td>
              </tr>
              {group.values.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`p-2 border text-center text-sm font-semibold print:p-1 ${isGlucoseIdeal(item) ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {item.value}
                  </td>
                  <td className="p-2 border text-left text-sm print:p-1">
                    {momentTranslation[item.moment]}
                  </td>
                </tr>
              ))}
              </Fragment>
          ))}
          <tr>
            <td>
              <input type="text" placeholder="Valor" className="focus:outline-none bg-fuchsia-50 text-center w-full p-2 border text-sm font-semibold"  />
            </td>
            <td>
              <select name="moment" id="moment" className="focus:outline-none bg-fuchsia-50 text-left w-full p-2 border text-sm">
                <option value="FASTING">En ayunas</option>
                <option value="ONE_HOUR_AFTER_BREAKFAST">1h post desayuno</option>
                <option value="ONE_HOUR_BEFORE_LUNCH">1h pre comida</option>
                <option value="ONE_HOUR_AFTER_LUNCH">1h post comida</option>
                <option value="ONE_HOUR_BEFORE_DINNER">1h pre cena</option>
                <option value="ONE_HOUR_AFTER_DINNER">1h post cena</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
        <button onClick={()=> console.log("asfd")} className="bg-fuchsia-500 text-white font-semibold p-2 rounded-md w-full">Agregar</button>
    </div>
  );
};

export default ControlPage;
