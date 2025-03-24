import { useWatch } from "react-hook-form";

export default function Values() {
  const values = useWatch();



  return (
    JSON.stringify(values, null, 2)
  );
}
