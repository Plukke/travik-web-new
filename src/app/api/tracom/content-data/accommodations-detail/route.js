import { headers } from "next/headers";

export async function GET(request) {
  const authToken = headers().get("x-tracom-token");

  const searchParams = request.nextUrl.searchParams;
  const accommodations = searchParams.get("accommodations");

  if (!accommodations) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  try {
    let urlquery = `lang=ES`;
    const acco =
      accommodations && typeof accommodations === "string"
        ? JSON.parse(accommodations)
        : [];

    if (acco && acco.length) {
      urlquery =
        urlquery +
        acco.reduce((sum, val) => sum + "&" + "accommodationId=" + val, "");
    }

    const res = await fetch(
      process.env.TC_BASE_URL +
        `/resources/accommodations/datasheet?${urlquery}`,
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
