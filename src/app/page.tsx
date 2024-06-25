import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center gap-4 mt-10 ml-10">
      <Link
        href="/without-zod"
        className="py-2 px-4 rounded-md bg-orange-600 text-white font-bold text-lg max-w-fit"
      >
        Without Zod
      </Link>
      <Link
        href="/with-zod"
        className="py-2 px-4 rounded-md bg-orange-600 text-white font-bold text-lg max-w-fit"
      >
        With Zod
      </Link>
    </main>
  );
}
