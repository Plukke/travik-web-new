"use client";
import { useRef } from "react";
import { register } from "swiper/element/bundle";
import { Button } from "./common/button";

const tabs = [
  { name: "Todos", href: "/search", current: false },
  { name: "Playa", href: "/categories/1", current: false },
  { name: "Creadores", href: "/categories/2", current: true },
  { name: "Travik", href: "/categories/3", current: false },
  { name: "Ciudad", href: "/categories/4", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

register();

export default function CategorySwiper() {
  const swiperElRef = useRef(null);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="auto"
      space-between="8"
      navigation="false"
      pagination="false"
      free-mode="true"
    >
      {tabs.map((tab) => (
        <swiper-slide key={tab.name} class="swiper-cat-slide">
          <Button
            href={tab.href}
            outline={!tab.current}
            color="orange"
            className={classNames("text-nowrap")}
            aria-current={tab.current ? "page" : undefined}
          >
            {tab.name}
          </Button>
        </swiper-slide>
      ))}
    </swiper-container>
  );
}
