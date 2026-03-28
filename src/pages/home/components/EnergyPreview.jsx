const data = [
  { day: "Mon", date: "Mar 21", value: "21.9" },
  { day: "Tue", date: "Mar 22", value: "19.1" },
  { day: "Wed", date: "Mar 23", value: "24.2" },
  { day: "Thu", date: "Mar 24", value: "17.7" },
  { day: "Fri", date: "Mar 25", value: "40.9" },
  { day: "Sat", date: "Mar 26", value: "30.7" },
  { day: "Sun", date: "Mar 27", value: "18.2" },
];

export default function EnergyPreview() {
  return (
    <section className="px-12 py-12 bg-white">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Solar Energy Production</h2>
        <p className="text-sm text-gray-600 mt-1">Daily energy output for the past 7 days</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border border-gray-200/80 rounded-xl bg-slate-100/30 hover:shadow-sm transition-shadow"
          >
            <span className="text-sm font-medium text-gray-800">{item.day}</span>
            <span className="text-xs text-gray-500 mb-2">{item.date}</span>
            <span className="text-3xl font-bold text-blue-600">{item.value}</span>
            <span className="text-xs text-gray-500 mt-1">kWh</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:px-6 md:py-4 bg-blue-50/60 rounded-xl border border-blue-100/50">
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          <h3 className="text-sm font-semibold text-blue-900">Weekly Total</h3>
          <p className="text-xs text-blue-600 font-medium">Total energy produced this week</p>
        </div>
        <div className="text-center sm:text-right">
          <div className="text-xl font-bold text-blue-900">172.7 kWh</div>
          <p className="text-xs text-blue-600 font-medium tracking-wide">Avg: 24.7 kWh/day</p>
        </div>
      </div>
    </section>
  );
}
