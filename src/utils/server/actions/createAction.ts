import { z } from "zod";
import { ActionPayload, ActionResult, AnyObject } from "@abstrato/hero-ui";
import { actionResult } from "./actionResult";
import { parseParametersMetaErrors } from "./parseParameterErrors";
import { ActionException } from "@/exceptions/actionException";
import { ErrorCode } from "@/exceptions/errorCode";
import { clearEmptyStrings } from "@/utils/clearEmptyString";

type ServerAction<P extends ActionPayload, R> = (
  payload?: P
) => Promise<ActionResult<Awaited<R>>>;

type CreateResult<S extends z.AnyZodObject, R> = {
  execute: <H extends Handler<z.infer<S>, R>>(
    handler: H
  ) => ServerAction<AnyObject, ReturnType<H>>;
};

type ActionOptions<S extends z.AnyZodObject, R> = {
  schema?: S;
  onError?: (response?: ActionException) => void;
  onSuccess?: (response?: R) => void;
};

type Handler<T extends z.infer<z.AnyZodObject>, R> = (data: T) => Promise<R>;

export function createAction<
  S extends z.AnyZodObject = z.AnyZodObject,
  R = unknown
>(options: ActionOptions<S, R> = {}): CreateResult<S, R> {
  let _handler: Handler<z.infer<S>, R>;

  async function action(payload: ActionPayload = {}): Promise<ActionResult<R>> {
    try {
      let data: AnyObject | undefined = clearEmptyStrings(payload);

      if (options.schema) {
        const payloadData = await options.schema.safeParseAsync(data);

        if (!payloadData.success) {
          return actionResult.fieldErrors<R>(payloadData.error.errors);
        }

        data = payloadData.data;
      }

      const response = await _handler(data);

      options.onSuccess?.(response);

      return actionResult.success(response, "Sucesso");
    } catch (err: unknown) {
      return await runError<R>(err);
    }
  }

  async function runError<R>(err?: unknown) {
    // Aqui é onde todos os ActionException são interceptados
    // desde que lançados a partir de uma action

    let error: ActionException;

    if (err instanceof ActionException) {
      error = err;
    }
    // else if (isGrpcError(err)) {
    //   error = new ActionException(mapGrpcCodeToErrorCode(err.code), {
    //     details: err.details,
    //     ...(err.metadata ?? {}),
    //   });
    // }
    else {
      console.error(err);
      error = new ActionException(ErrorCode.INTERNAL_SERVER_ERROR, {
        error: err,
      });
    }

    options.onError?.(error);

    const status = resolveErrorStatus(error);
    const message = await resolveErrorMsg(error);

    if (error.code === ErrorCode.INVALID_PARAMETERS) {
      const issues = await parseParametersMetaErrors(error.meta);
      return actionResult.fieldErrors<R>(issues, message);
    }

    return actionResult.error<R>(status, message);
  }

  function resolveErrorStatus(error?: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
    ) {
      return error.status;
    }

    return 500;
  }

  async function resolveErrorMsg(error: unknown): Promise<string | undefined> {
    const errorCode = error instanceof ActionException ? error.code : undefined;

    const msgKey =
      errorCode === "" || !errorCode ? "failed" : errorCode.toLowerCase();

    return msgKey;
  }

  return {
    execute(handler) {
      _handler = handler;
      return action as ServerAction<z.infer<S>, ReturnType<typeof handler>>;
    },
  };
}
