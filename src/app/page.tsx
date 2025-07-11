import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <header className="top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 z-50">
        <div className="font-bold text-white text-xl sm:text-2xl">NoteNest</div>
        {session?.user?.id ? (
          <div className="font-medium bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-lg sm:text-2xl">
            <Link
              href="/monitor"
              className="ml-4 inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-500  text-base sm:text-lg border border-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          // <SignInButton />
          <Link href={"/signup"} className="bg-blue-200 px-2 py-1 text-black">
            Sign Up
          </Link>
        )}
      </header>

      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-10 pt-20 mt-5 pb-10">
        <div className="text-center mb-20 sm:mb-40 px-4 sm:px-0">
          <div>
            <button className="border hover:cursor-pointer border-gray-500 text-white font-medium rounded-2xl z-100 bg-black px-3 sm:px-4 py-1 text-sm sm:text-base">
              Organize Your Thoughts
            </button>
          </div>
          <div className="gap-4 sm:gap-8 mt-4 sm:mt-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-medium tracking-wide">
              Capture Ideas <br />
            </h1>
            <h1 className="bg-gradient-to-r text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide from-white to-gray-400 text-transparent bg-clip-text pb-4 sm:pb-6">
              Anytime, Anywhere
            </h1>
          </div>
          <h3 className="pt-2 sm:pt-3 text-lg sm:text-xl max-w-[600px] font-medium text-gray-300 mx-auto">
            Effortlessly manage, organize, and find your notes. Stay productive
            and never lose track of your important thoughts again.
          </h3>
        </div>
        <div></div>
      </main>
    </div>
  );
}
