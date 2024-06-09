import { checkOrderStatusOnMono } from "@/libs/api/checkout.api";
import { sendWebhook } from "@/libs/api/emails.api";
import { changeOrderStatusByInvoiceId } from "@/libs/api/order.api";
import { updateUserLoyalty } from "@/libs/api/user.api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) return;

    const validatedOrder = await checkOrderStatusOnMono(data.invoiceId);

    if (!validatedOrder?.invoiceId) return;

    const order = await changeOrderStatusByInvoiceId(
      validatedOrder.invoiceId,
      validatedOrder.status
    );

    await updateUserLoyalty(order.user.id);

    const webhookRes = await sendWebhook(order);

    return NextResponse.json({ message: "Successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
