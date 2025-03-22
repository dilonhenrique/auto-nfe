import { AnyObject } from "@abstrato/hero-ui";
import { ZodIssue } from "zod";

type ParameterError = {
  name: string;
  reason: string;
};

export async function parseParametersErrors(
  errors?: ParameterError[]
): Promise<ZodIssue[]> {
  const issues: ZodIssue[] = [];

  if (errors) {
    for (const error of errors) {
      issues.push({
        path: error.name.split("."),
        code: "custom",
        message: error.reason,
      });
    }
  }

  return issues;
}

export async function parseParametersMetaErrors(
  meta?: AnyObject
): Promise<ZodIssue[]> {
  if (meta && "parameter" in meta) {
    return await parseParametersErrors(meta.parameter as ParameterError[]);
  }

  return [];
}
