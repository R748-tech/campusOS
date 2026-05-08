"use client";
import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Campus<span className="text-violet-500">OS</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Create your student profile</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-violet-500"
                  : s < step
                  ? "w-4 bg-violet-800"
                  : "w-4 bg-[#2a2a2a]"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-white text-lg font-semibold mb-1">Who are you?</h2>
              <p className="text-gray-500 text-sm mb-6">Basic details to get started</p>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Full Name</label>
                  <input type="text" placeholder="Rohit Sharma"
                    className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">College Email</label>
                  <input type="email" placeholder="yourname@college.edu"
                    className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Password</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-white text-lg font-semibold mb-1">Your College</h2>
              <p className="text-gray-500 text-sm mb-6">This makes everything context-aware</p>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">College Name</label>
                  <input type="text" placeholder="e.g. IIT Delhi"
                    className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Course</label>
                  <select className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition">
                    <option value="">Select course</option>
                    <option>B.Tech</option>
                    <option>B.Sc</option>
                    <option>BCA</option>
                    <option>MBA</option>
                    <option>MCA</option>
                    <option>M.Tech</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Branch / Specialization</label>
                  <input type="text" placeholder="e.g. Computer Science"
                    className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-white text-lg font-semibold mb-1">Almost there!</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us where you are and what you want</p>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Current Year</label>
                  <select className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition">
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>5th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">What are you here for? (pick all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Study Help", "Placements", "Projects", "Hackathons", "Networking", "Just Vibes"].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`border rounded-lg py-2 text-xs transition ${
                          selectedGoals.includes(goal)
                            ? "border-violet-500 text-violet-400 bg-violet-900/20"
                            : "border-[#2a2a2a] text-gray-400 hover:border-violet-500"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 border border-[#2a2a2a] text-gray-400 hover:border-violet-500 hover:text-white py-3 rounded-lg text-sm transition"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg text-sm transition"
            >
              {step === 3 ? "Join CampusOS 🚀" : "Continue"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}