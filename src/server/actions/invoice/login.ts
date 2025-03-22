"use server";

import { invoiceServices } from "@/server/services/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import { createAction } from "@/utils/server/actions/createAction";

export default createAction({ schema: invoiceUserSchema }).execute(
  async (user) => {
    return await invoiceServices.login(user);
  }
);
