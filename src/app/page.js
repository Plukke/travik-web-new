import CategorySwiper from "@/components/CategorySwiper";
import DateRangeDialog from "@/components/DateRangeDialog";
import Swiper from "@/components/Swiper";
import { Button } from "@/components/common/button";
import { Subheading } from "@/components/common/heading";
import { Input, InputGroup } from "@/components/common/input";
import { Strong, Text, TextLink } from "@/components/common/text";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  return (
    <div className="flex flex-col w-full space-y-4 sm:pt-4">
      <div className="z-0">
        <div className="flex w-full flex-wrap items-end justify-between gap-4 pb-2">
          <Subheading>Categorías</Subheading>
          <div>
            <TextLink href="/search">Ver todo</TextLink>
          </div>
        </div>

        <CategorySwiper />
      </div>

      <div className="z-0">
        <div className="flex w-full flex-wrap items-end justify-between gap-4 pb-2">
          <Subheading>Experiencias top</Subheading>
          <div>
            <DateRangeDialog />
          </div>
        </div>
        <Swiper />
      </div>

      <div>
        <div className="flex w-full flex-wrap items-end justify-between gap-4 pb-2">
          <Subheading>Itinerarios populares</Subheading>
          <div>
            <TextLink href="#">Ver más</TextLink>
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {projects.map((project) => (
            <li
              key={project.name}
              className="col-span-1 flex rounded-md shadow-sm "
            >
              <div
                className={classNames(
                  project.bgColor,
                  "flex w-32 h-32 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                )}
              >
                {project.initials}
              </div>
              <div className="flex flex-1 truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white dark:bg-zinc-900 dark:border-white/10">
                <div className="flex-1 truncate px-4 pt-2 text-sm">
                  <a
                    href={project.href}
                    className="font-medium text-gray-900 dark:text-gray-200 hover:text-gray-600"
                  >
                    {project.name}
                  </a>
                  <p className="text-gray-500 mb-4 flex items-center space-x-2 -ml-1">
                    <MapPinIcon className="w-4" /> Varios destinos
                  </p>
                  <Text>
                    <Strong>$600.00</Strong>
                  </Text>
                  <p className="text-gray-400 text-xs text-wrap line-clamp-2 text-ellipsis">
                    Visita y disfruta de los mismos destinos y atracciones que
                    el pinche pillo
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
