import { appConfig } from "@/configs/app.config";
import { createProduct } from "@/libs/api/products.api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("ApiKey");

    if (apiKey !== appConfig.API_KEY)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (!data)
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );

    const product = await createProduct(data);

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
