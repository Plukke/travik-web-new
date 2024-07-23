import { Button } from "@/components/common/button";
import { Heading, Subheading } from "@/components/common/heading";
import { Input, InputGroup } from "@/components/common/input";
import { TextLink } from "@/components/common/text";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const categories = [
  {
    id: 1,
    name: "Playa",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "",
  },
  {
    id: 2,
    name: "Montaña",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Bosque",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Ciudad",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 5,
    name: "Camping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 6,
    name: "Cabañas",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  // More products...
];

export default function SearchPage() {
  return (
    <div>
      <div className="flex space-x-3">
        <div className="w-full">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              name="search"
              placeholder="Buscar experiencia&hellip;"
              aria-label="Search"
              type="search"
            />
          </InputGroup>
        </div>

        {/* <Button outline>
          <FunnelIcon />
        </Button> */}
      </div>

      {/* Category grid */}
      <section
        aria-labelledby="categories-heading"
        className="mx-auto max-w-7xl overflow-hidden pt-4"
      >
        <h2 id="categories-heading" className="sr-only">
          Categorías
        </h2>

        <Subheading>
          ¿Qué buscas para tu nueva aventura? Explora las experiencias en las
          categorías
        </Subheading>

        <div className="-mx-4 grid grid-cols-2 border-l border-gray-200 dark:border-gray-800 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          <div className="animate-pulse  border-b border-r border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group-hover:opacity-75">
              <div className="rounded bg-slate-200 h-full w-full"></div>
            </div>
            <div className="pb-4 pt-3 flex justify-center">
              <div className="h-5 w-2/3 bg-slate-200 mt-2 rounded"></div>
            </div>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative border-b border-r border-gray-200 dark:border-gray-800 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group-hover:opacity-75">
                <img
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-3 text-center">
                <Heading level={3}>
                  <TextLink
                    href={`/categories/${category.id}`}
                    className="text-sm font-medium no-underline"
                  >
                    {category.name}
                  </TextLink>
                </Heading>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
