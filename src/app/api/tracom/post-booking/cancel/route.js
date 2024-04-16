import { headers } from "next/headers";

export async function DELETE(request) {
  const authToken = headers().get("x-tracom-token");
  const body = await request.json();
  const { bookingReference, accommodationBookingReference } = body || {};

  if (!(bookingReference && accommodationBookingReference)) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  const res = await fetch(
    process.env.TC_BASE_URL +
      `/resources/booking/${bookingReference}/accommodations/${accommodationBookingReference}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    }
  );
  const data = await res.json();

  return Response.json({ success: true, ...data });
}
