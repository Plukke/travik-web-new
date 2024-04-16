import dayjs from "dayjs";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/tracom/:path*", "/create-plan/accommodations/:path*"],
};

export async function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const tracomToken = requestHeaders.get("x-tracom-token");

  console.log("tracomToken", tracomToken);

  const response = NextResponse.next();
  if (!tracomToken) {
    const res = await fetch(
      process.env.TC_BASE_URL + "/resources/authentication/authenticate",
      {
        method: "POST",
        headers: {
          Accept: "application/json;version=2.0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: process.env.TC_USERNAME,
          password: process.env.TC_PASSWORD,
          micrositeId: process.env.TC_MICROSITEID,
        }),
      }
    );
    const { token, expirationInSeconds } = await res.json();

    if (!token) {
      return Response.json(
        { success: false, message: "Authentication failed" },
        { status: 401 }
      );
    }

    response.headers.set("x-tracom-token", token);
    response.headers.set(
      "x-tracom-token-validity",
      dayjs().add(expirationInSeconds).valueOf()
    );
  }

  return response;
}
