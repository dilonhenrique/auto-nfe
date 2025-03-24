"use client";

import { emissorServices } from "@/server/services/emissor";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  useFormContext,
} from "@abstrato/hero-ui";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

type Item = {
  id: string;
  text: string;
};

type Props = Omit<AutocompleteProps<Item>, "children">;

export default function AutocompleteCity({
  defaultSelectedKey,
  ...props
}: Props) {
  const { setValue } = useFormContext();
  const [items, setItems] = useState<Item[]>([]);

  async function search(q: string) {
    if (q.length < 3) return;

    const response = await emissorServices.searchCity(q);
    if (response.success) setItems(response.data.results);

    return response.data?.results;
  }

  useEffect(() => {
    if (props.name && typeof defaultSelectedKey === "string") {
      search(defaultSelectedKey).then((res) => {
        setValue(props.name!, res?.[0].id);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = debounce(search, 500);

  return (
    <Autocomplete
      {...props}
      items={items}
      onInput={(ev) => {
        onInputChange(ev.currentTarget.value);
      }}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.text}</AutocompleteItem>}
    </Autocomplete>
  );
}
