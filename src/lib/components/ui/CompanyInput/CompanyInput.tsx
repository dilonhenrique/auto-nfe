import { emissorServices } from "@/server/services/emissor";
import { MASKS } from "@/utils/masks/masks";
import { isValidCNPJ } from "@/utils/validators/cnpj";
import { Icon, Input, InputProps } from "@abstrato/hero-ui";
import { debounce, startCase } from "lodash";
import { useEffect, useState } from "react";

export default function CompanyInput(props: InputProps) {
  const [company, setCompany] = useState<string>();

  async function search(q: string) {
    if (!isValidCNPJ(q)) {
      setCompany(undefined);
      return null;
    }

    const response = await emissorServices.searchCompany({
      cnpj: q,
      date: new Date(),
    });

    setCompany(response.data?.nomerazaosocial);

    return response.data;
  }

  useEffect(() => {
    if (typeof props.defaultValue === "string") {
      search(props.defaultValue);
    }
  }, []);

  const onInputChange = debounce(search, 500);

  return (
    <div className="flex flex-col gap-1">
      <Input
        inputMode="decimal"
        mask={MASKS.cnpj}
        {...props}
        onInput={(ev) => {
          onInputChange(ev.currentTarget.value);
        }}
      />
      {company && (
        <p className="text-foreground-500 flex gap-2 items-center ms-1">
          <Icon icon="check-circle" size="sm" color="success" />
          {startCase(company?.toLowerCase())}
        </p>
      )}
    </div>
  );
}
