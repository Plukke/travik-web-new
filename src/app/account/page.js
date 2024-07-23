import { Button } from "@/components/common/button";
import { Heading } from "@/components/common/heading";
import { Input } from "@/components/common/input";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const secondaryNavigation = [
  { name: "Perfil", href: "#", current: true },
  { name: "Mis reservas", href: "#", current: false },
  // { name: "Datos de pago", href: "#", current: false },
];

export default function AccountPage() {
  return (
    <div>
      <Heading>Mi cuenta</Heading>

      <main>
        <h1 className="sr-only">Account Settings</h1>

        <header className="border-b border-white/5">
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={item.current ? "text-orange-400" : ""}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Settings forms */}
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 sm:px-6 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    <Button outline>Change avatar</Button>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <Input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <Button type="submit" color="orange">
                  Guardar
                </Button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6"
                  >
                    Current password
                  </label>
                  <div className="mt-2">
                    <Input
                      id="current-password"
                      name="current_password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium leading-6"
                  >
                    New password
                  </label>
                  <div className="mt-2">
                    <Input
                      id="new-password"
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <Input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <Button type="submit" color="orange">
                  Guardar
                </Button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <Button type="submit" color="red">
                Yes, delete my account
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
