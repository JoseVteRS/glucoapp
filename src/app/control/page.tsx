import { prisma } from "@/lib/prisma";
import { createControl } from "@/services/Control/getControls";
import {
  formatDate,
  groupDataByDate,
  isGlucoseIdeal,
  toControl,
} from "@/utils";
import { getServerSession } from "next-auth";
import { Fragment } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { data } from "autoprefixer";
import { useForm } from "react-hook-form";
import { Form } from "@/components/Form";

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

export default async function ControlPage() {
  // "8600ae32-add8-4a44-ba0a-a42d98e2389d"

  const session = await getServerSession(authOptions);

  const controls = await prisma.control.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  // const controlsMapped = toControl(controls);
  const grouopedByDate = groupDataByDate(controls);



  return (
    <div className="pt-4 px-2 mx-auto mb-10">
      <h1 className="font-semibold text-center">Resultados</h1>

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
          {grouopedByDate.map((group) => (
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
                    className={`p-2 border text-center text-sm font-semibold print:p-1 ${
                      isGlucoseIdeal(item) ? "text-green-500" : "text-red-500"
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
        </tbody>
      </table>

      <Form />
    </div>
  );
}
