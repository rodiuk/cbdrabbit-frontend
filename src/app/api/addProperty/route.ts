import { appConfig } from "@/configs/app.config";
import { createProperty } from "@/libs/api/properties.api";
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

    const property = await createProperty(data);

    return NextResponse.json(
      { message: "Property added successfully", property },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
