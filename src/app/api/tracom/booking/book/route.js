import { headers } from "next/headers";

export async function POST(request) {
  const authToken = headers().get("x-tracom-token");
  const body = await request.json();
  const { accommodationId, combinationKey, externalReference } = body || {};

  if (!(accommodationId && combinationKey && externalReference)) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  const res = await fetch(
    process.env.TC_BASE_URL +
      `/resources/booking/accommodations/${accommodationId}/book`,
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
        externalReference,
      }),
    }
  );
  const data = await res.json();

  return Response.json({ success: true, ...data });
}
