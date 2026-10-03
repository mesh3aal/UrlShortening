export default function Brief() {
  return (
    <div className="flex flex-col gap-y-6 sm:gap-2 sm:flex-row justify-around bg-white shadow-sm mt-16 p-8 rounded-3xl">
      <div className="flex flex-col items-center gap-y-2.5">
        <h1 className="text-black text-2xl">10M+</h1>
        <p className="text-base text-gray-800">Links Shortened</p>
      </div>
      <div className="flex flex-col items-center gap-y-2.5">
        <h1 className="text-black text-2xl">500K+</h1>
        <p className="text-base text-gray-800">Active Users</p>
      </div>
      <div className="flex flex-col items-center gap-y-2.5">
        <h1 className="text-black text-2xl">99.9%</h1>
        <p className="text-base text-gray-800">Uptime</p>
      </div>
      <div className="flex flex-col items-center gap-y-2.5">
        <h1 className="text-black text-2xl">150+</h1>
        <p className="text-base text-gray-800">Countries</p>
      </div>
    </div>
  )
}
