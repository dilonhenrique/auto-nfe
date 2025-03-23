import { ActionException } from "@/exceptions/actionException";
import { invoiceServices } from "@/server/services/invoice";
import { invoiceDataSchema } from "@/utils/schemas/invoiceData";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import { createAction } from "@/utils/server/actions/createAction";
import { z } from "zod";

const schema = z.object({
  user: invoiceUserSchema,
  invoice: invoiceDataSchema,
});

export default createAction({ schema }).execute(async (payload) => {
  const response = await invoiceServices.emit(payload);

  if (!response.success) throw new ActionException(response.error?.code);

  return response.data;
});
