/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode } from "@/exceptions/errorCode";

export function isErrorCode(val: string): val is ErrorCode {
  return (<any>Object).values(ErrorCode).includes(val);
}
