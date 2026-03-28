export default function InfoSection() {
  return (
    <section className="px-12 py-16 bg-slate-50">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Side Large Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="rounded-3xl overflow-hidden shadow-sm aspect-[4/3]">
            <img
              src="/assets/images/wind-turbine-3.png"
              alt="Wind turbines in the ocean"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Your Solar Energy Generation
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            This month, your solar panels generated{" "}
            <span className="text-blue-600 font-semibold">X kWh</span> of clean energy, helping
            you save on electricity bills and reduce your carbon footprint. Track your energy
            production trends and see how much power you contribute back to the grid.
          </p>

          {/* Smaller floating image */}
          <div className="w-72 h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src="/assets/images/solar-construction.webp"
              alt="Technicians maintaining solar panels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
