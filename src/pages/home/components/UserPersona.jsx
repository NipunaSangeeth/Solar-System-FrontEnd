import { ChevronRight, User } from "lucide-react";

export default function UserPersona() {
  const goals = [
    "Maximize solar energy savings.",
    "Detect and resolve issues early.",
    "Track daily, weekly, and monthly output.",
    "Get notified of anomalies instantly.",
  ];

  const needs = [
    "A simple dashboard for real-time monitoring.",
    "Instant alerts for system anomalies.",
    "Easy access to historical performance data.",
    "Clear, actionable insights for better energy management.",
  ];

  return (
    <section className="px-12 py-16 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">

          <div className="mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Goals:</h3>
            <ul className="space-y-4">
              {goals.map((goal, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-gray-900 shrink-0" />
                  <span className="text-gray-900 font-medium text-[17px]">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Needs:</h3>
            <ul className="space-y-4">
              {needs.map((need, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-gray-900 shrink-0" />
                  <span className="text-gray-900 font-medium text-[17px]">{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/50 flex items-center justify-between w-full max-w-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full bg-gradient-to-b from-blue-300 via-amber-200 to-amber-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-base">Alex P.</span>
                <span className="text-gray-500 text-sm">42 y.o.</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Homeowner</span>
              <span className="font-bold text-gray-900 text-sm">Solar User</span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
          <div className="absolute top-6 left-6 z-10 bg-blue-500 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <User className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">User Profile</span>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-sm h-full min-h-[500px]">
            <img
              src="/assets/images/solar-construction.webp"
              alt="Technicians installing solar panels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
