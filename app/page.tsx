export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Campus<span className="text-violet-500">OS</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Your campus. Your people. Your world.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">
          <h2 className="text-white text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in with your college email</p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-1 block">College Email</label>
            <input
              type="email"
              placeholder="yourname@college.edu"
              className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition text-sm">
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#2a2a2a]" />
            <span className="text-gray-600 text-xs mx-3">or</span>
            <div className="flex-1 h-px bg-[#2a2a2a]" />
          </div>

          {/* Register */}
          <p className="text-center text-gray-500 text-sm">
            New student?{" "}
            <a href="/register" className="text-violet-400 hover:underline">
            Create account
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}