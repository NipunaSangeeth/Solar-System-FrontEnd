import { Zap, ChevronRight, Triangle } from "lucide-react";

export default function SolutionSection() {
  const solutions = [
    "Real-time energy tracking",
    "Anomaly alerts",
    "Historical performance reports",
    "Remote diagnostics & support",
  ];

  return (
    <section className="px-12 py-16 bg-slate-50">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side Image */}
        <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-sm aspect-[4/3] lg:aspect-auto min-h-[400px]">
          <img
            src="/assets/images/wind-turbine-3.png"
            alt="Wind turbines over water"
            className="w-full h-full object-cover"
          />
          {/* Floating Widget */}
          <div className="absolute bottom-8 left-8 bg-blue-500 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg backdrop-blur-sm bg-opacity-90">
            <Triangle className="w-8 h-8 fill-white text-white" />
            <span className="text-white font-semibold text-sm">SanSolar</span>
          </div>
        </div>

        {/* Right Side Content Container */}
        <div className="w-full lg:w-1/2 bg-blue-500 rounded-3xl p-10 lg:p-16 flex flex-col justify-center shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400 rounded-full w-fit mb-8">
            <Zap className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black uppercase tracking-wider">Solution</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-8">
            The Solar Home Dashboard empowers you to monitor your solar panels, receive instant
            alerts for anomalies, and optimize your energy usage for maximum savings and peace of
            mind.
          </h2>

          <ul className="space-y-4">
            {solutions.map((sol, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <ChevronRight className="w-5 h-5 text-lime-400 shrink-0" />
                <span className="text-blue-50 text-lg">{sol}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
