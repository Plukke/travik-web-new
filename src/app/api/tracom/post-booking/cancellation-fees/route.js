import { headers } from "next/headers";

export async function GET(request) {
  const authToken = headers().get("x-tracom-token");

  const searchParams = request.nextUrl.searchParams;
  const bookingReference = searchParams.get("bookingReference");
  const accommodationBookingReference = searchParams.get(
    "accommodationBookingReference"
  );

  if (!(bookingReference && accommodationBookingReference)) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  try {
    const res = await fetch(
      process.env.TC_BASE_URL +
        `/resources/booking/${bookingReference}/accommodations/${accommodationBookingReference}/cancellation-fee`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      }
    );
    const data = await res.json();

    return Response.json({ success: true, ...data });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
