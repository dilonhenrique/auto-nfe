import { AnyObject } from "@abstrato/hero-ui";
import { isNull } from "lodash";

export function clearEmptyStrings(obj: AnyObject) {
  for (const key of Object.keys(obj)) {
    if (obj[key] === "") {
      delete obj[key];
    } else if (
      !(obj[key] instanceof Date) &&
      !isNull(obj[key]) &&
      typeof obj[key] === "object"
    ) {
      obj[key] = clearEmptyStrings(obj[key]);
      if (Object.keys(obj[key]).length === 0) delete obj[key];
    }
  }
  return Array.isArray(obj) ? obj.filter((val) => val) : obj;
}
