"use client";
import { formatDate, groupDataByDate, isGlucoseIdeal } from "@/utils";
import { Fragment } from "react";
import { useQuery } from "react-query";

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

export const ControlDataItem = () => {
  const { data, isError, isLoading } = useQuery(
    ["controls"],
    async () => {
      const response = await fetch("/api/control", { method: "GET" });
      const data = await response.json();
      
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isError) return <div>Error...</div>;
  if (isLoading)
    return (
      <div>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );

  const grouopedByDate = groupDataByDate(data.controlData);

  return (
    <Fragment>
      <table className="border-collapse w-full print:w-11/12 print:mx-auto print:my-6 print:text-sm">
        <thead>
          <tr>
            <th className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-bold  print:p-1">
              Valor <span className="text-xs">mg/dl</span>
            </th>
            <th className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-bold text-left  print:p-1">
              Detalles
            </th>
            <th className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-bold text-left  print:p-1">
              Momento
            </th>
          </tr>
        </thead>
        <tbody>
          {grouopedByDate.map((group: any) => (
            <Fragment key={group.date.toString()}>
              <tr>
                <td
                  className="p-2 bg-fuchsia-100 border text-fuchsia-600 font-semibold text-sm print:text-xl print:p-1 text-center"
                  colSpan={3}
                >
                  {formatDate(group.date.toString())}
                </td>
              </tr>
              {group.values.map((item: any) => (
                <tr key={item.id}>
                  <td
                    className={`w-4/12 p-2 border text-center text-sm font-semibold print:p-1 ${
                      isGlucoseIdeal(item) ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.value}
                  </td>
                  <td className="w-4/12 text-sm p-2 border">
                    {item.details ? item.details : "-"}
                  </td>
                  <td className="w-4/12 p-2 border text-left text-sm print:p-1">
                    {momentTranslation[item.moment]}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
