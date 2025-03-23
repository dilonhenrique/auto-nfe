"use server";

import { ActionException } from "@/exceptions/actionException";
import { ErrorCode } from "@/exceptions/errorCode";
import { invoiceServices } from "@/server/services/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import { createAction } from "@/utils/server/actions/createAction";

export default createAction({ schema: invoiceUserSchema }).execute(
  async (user) => {
    const response = await invoiceServices.login(user);

    if (!response.success) throw new ActionException(ErrorCode.UNAUTHORIZED);

    return user;
  }
);
