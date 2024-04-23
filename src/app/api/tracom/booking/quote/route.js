import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
  const authToken = headers().get("x-tracom-token");
  const body = await request.json();

  try {
    const res = await fetch(
      process.env.TC_BASE_URL + "/resources/booking/accommodations/quote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    return NextResponse.json({ success: false, ...error });
  }
}
