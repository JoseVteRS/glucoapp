import { Form } from "@/components/Form";
import { ControlDataItem } from "@/components/ControlDataItem";

export default function ControlPage() {
  return (
    <div className="mx-auto">
      {/* <h1 className="font-semibold text-center">Resultados</h1> */}
      <ControlDataItem />
      <Form />
    </div>
  );
}
