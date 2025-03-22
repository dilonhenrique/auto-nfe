import { parseZodErrors } from "@/utils/parsers/zodError";
import { ActionResult } from "@abstrato/hero-ui";
import { ZodIssue } from "zod";

export const actionResult = {
  success,
  fieldErrors,
  error,
};

function success<T>(
  data: T,
  message: string = "Salvo com sucesso!"
): ActionResult<T> {
  return {
    success: true,
    data,
    message,
    status: 200,
  };
}

function fieldErrors<T>(
  errors: ZodIssue[],
  message: string = "Confira os campos e tente novamente"
): ActionResult<T> {
  return {
    success: false,
    fieldErrors: parseZodErrors(errors),
    message,
    status: 400,
  };
}

function error<T>(
  status: number = 500,
  message: string = "Erro interno"
): ActionResult<T> {
  return {
    success: false,
    fieldErrors: {},
    message,
    status,
  };
}
