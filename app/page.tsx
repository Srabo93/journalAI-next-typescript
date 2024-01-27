import Link from "next/link";

const Home = () => {
  return (
  <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-xl mx-auto">
      <h1 className="text-6xl mb-4">The best Journal App</h1>
      <p className="text-2xl text-white/60 mb-4">This is the best app for tracking your mood through your life. All you have to do is to be honest.</p>
      <div>
          <Link href="/journal">
            <button className="bg-blue-600 p-4 rounded-lg">Get Started</button>
          </Link>
      </div>
      </div>
    </div>
  );
} 
export default Home
