import { NextResponse } from "next/server";
import { checkOrderStatusOnMono } from "@/libs/api/checkout.api";
import { changeOrderStatusByCheckId } from "@/libs/api/order.api";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) return;

    const validatedOrder = await checkOrderStatusOnMono(data.invoiceId);

    if (!validatedOrder?.reference) return;

    await changeOrderStatusByCheckId(
      Number(validatedOrder.reference),
      validatedOrder.status
    );

    return NextResponse.json({ message: "Successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
