"use server";

import { ActionException } from "@/exceptions/actionException";
import { ErrorCode } from "@/exceptions/errorCode";
import { NFE_COOKIES } from "@/server/clients/emissorNacional/cookieNf";
import { invoiceServices } from "@/server/services/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import { createAction } from "@/utils/server/actions/createAction";
import { cookies } from "next/headers";

export default createAction({ schema: invoiceUserSchema }).execute(
  async (user) => {
    const response = await invoiceServices.login(user);

    if (!response.success) throw new ActionException(ErrorCode.UNAUTHORIZED);

    cookies().set(NFE_COOKIES, response.data!, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 15, // 15 min ou o tempo da sessão
    });

    return user;
  }
);
