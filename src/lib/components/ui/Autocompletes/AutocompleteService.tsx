"use client";

import { emissorServices } from "@/server/services/emissor";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@abstrato/hero-ui";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

type Item = {
  id: string;
  text: string;
};

type Props = Omit<AutocompleteProps<Item>, "children">;

export default function AutocompleteService(props: Props) {
  const [items, setItems] = useState<Item[]>([]);

  async function search(q: string) {
    if (q.length < 3) return;

    const response = await emissorServices.searchService(q);

    if (response.success) setItems(response.data.results);
  }

  useEffect(() => {
    const q = props.defaultSelectedKey;
    if (typeof q === "string") search(q);
  }, [props.defaultSelectedKey]);

  const onInputChange = debounce(search, 500);

  return (
    <Autocomplete
      // allowsCustomValue
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
