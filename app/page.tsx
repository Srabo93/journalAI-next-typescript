import { auth } from "@clerk/nextjs";
import Link from "next/link";

const Home = async () => {
  const { userId } = auth();

  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-4 text-6xl">The best Journal App</h1>
        <p className="mb-4 text-2xl text-white/60">
          This is the best app for tracking your mood through your life. All you
          have to do is to be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="rounded-lg bg-blue-600 p-4 uppercase">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
