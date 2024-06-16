import { checkOrderStatusOnMono } from "@/libs/api/checkout.api";
import { changeOrderStatusByInvoiceId } from "@/libs/api/order.api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) return;

    const validatedOrder = await checkOrderStatusOnMono(data.invoiceId);

    if (!validatedOrder?.invoiceId) return;

    await changeOrderStatusByInvoiceId(
      validatedOrder.invoiceId,
      validatedOrder.status
    );

    return NextResponse.json({ message: "Successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
