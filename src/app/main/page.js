import { Link } from "@/components/common/link";

export default function MainPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <div className="mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left lg:grid">
        <Link
          href="/discover"
          className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:col-start-2"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Descubrir{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Consulta los planes diseñados por Travik.
          </p>
        </Link>

        <Link
          href="/create-plan"
          className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 lg:col-end-4"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Mi plan{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Diseña un plan de viaje a la medida y comparte...
          </p>
        </Link>
      </div>
    </main>
  );
}
