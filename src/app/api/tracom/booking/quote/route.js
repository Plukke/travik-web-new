import { headers } from "next/headers";

export async function POST(request) {
  const authToken = headers().get("x-tracom-token");
  const body = await request.json();

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

  return Response.json({ success: true, ...data });
}
