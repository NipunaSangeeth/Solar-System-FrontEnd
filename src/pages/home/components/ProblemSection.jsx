import { AlertTriangle, ChevronRight } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    "Panel shading or dirt",
    "Unexpected drop in output",
    "Inverter errors",
    "Missed maintenance reminders",
  ];

  return (
    <section className="px-12 py-16 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full w-fit mb-8">
            <AlertTriangle className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Problem</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
            Home solar systems can face reduced efficiency and missed savings due to panel shading,
            dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly
            alerts.
          </h2>

          <ul className="space-y-4">
            {problems.map((prob, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <ChevronRight className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-gray-700 text-lg">{prob}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="rounded-3xl overflow-hidden shadow-sm aspect-[4/3]">
            <img
              src="/assets/images/wind-turbine-2.png"
              alt="Wind turbines close up"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
