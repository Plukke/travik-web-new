"use client";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { Badge } from "./common/badge";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "./common/link";

register();

export default function Swiper() {
  const swiperElRef = useRef(null);

  // useEffect(() => {
  //   // listen for Swiper events using addEventListener
  //   swiperElRef.current.addEventListener("swiperprogress", (e) => {
  //     const [swiper, progress] = e.detail;
  //     console.log(progress);
  //   });

  //   swiperElRef.current.addEventListener("swiperslidechange", (e) => {
  //     console.log("slide changed");
  //   });
  // }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="auto"
      space-between="16"
      navigation="false"
      pagination="false"
    >
      <swiper-slide class="swiper-slide">
        <div className="group aspect-h-1 aspect-w-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
          <img
            src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
            className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
          />

          <div className="absolute top-3 left-3">
            <Badge color="yellow">
              <StarIcon className="w-4" /> 4.5
            </Badge>
          </div>

          <div className="flex items-end p-4 sm:absolute sm:inset-0">
            <div>
              <h3 className="font-semibold text-white">
                <Link href={`/itineraries/1`}>
                  <span className="absolute inset-0" />
                  Shibuya
                </Link>
              </h3>
              <p aria-hidden="true" className="mt-1 text-sm text-white">
                Tokyo, Japón
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide"></swiper-slide>
      <swiper-slide class="swiper-slide"></swiper-slide>
    </swiper-container>
  );
}
