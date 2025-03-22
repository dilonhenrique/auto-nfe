import { AnyObject } from "@abstrato/hero-ui";
import { CODE_STATUS_MAP, ErrorCode } from "./errorCode";
import { isErrorCode } from "@/utils/validators/enum";

class ActionException extends Error {
  status: number;
  code: string;
  meta: AnyObject;

  constructor(
    code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    meta: AnyObject = {}
  ) {
    super(code.toLowerCase()); // message

    const isValidCode = isErrorCode(code);

    this.code = code;
    this.status = isValidCode ? CODE_STATUS_MAP[code] : 500;
    this.meta = meta;
    Object.setPrototypeOf(this, ActionException.prototype);
  }
}

export { ActionException };
