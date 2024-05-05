import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log(data);

    if (!data)
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
