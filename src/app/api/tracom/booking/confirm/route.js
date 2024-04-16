import { headers } from "next/headers";

export async function POST(request) {
  const authToken = headers().get("x-tracom-token");
  const body = await request.json();
  const { accommodationId, combinationKey } = body || {};

  if (!(accommodationId && combinationKey)) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  const res = await fetch(
    process.env.TC_BASE_URL +
      `/resources/booking/accommodations/${accommodationId}/confirm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        accommodation: {
          combinationKey,
        },
      }),
    }
  );
  const data = await res.json();

  return Response.json({ success: true, ...data });
}
