export default function HomePage() { 
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <h1 className="text-3xl font-extrabold mb-3">
        🏀 Tawi-Tawi Basketball League
      </h1>

      <p className="text-gray-400 mb-6">
        Select a league below to view schedules, today’s games, and standings.
      </p>

      {/* SEARCH PLAYER BUTTON */}
      <div className="mb-10">
        <a
          href="/players"
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-3 rounded-lg transition shadow-md"
        >
          🔍 Search for Player
        </a>
      </div>

      {/* LEAGUE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 50VHOYZ */}
        <a
          href="/league/50VHOYZ"
          className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl hover:bg-[#243249] cursor-pointer transition"
        >
          <h2 className="text-xl font-bold">50VHOYZ</h2>
          <p className="text-gray-400 mt-1">Color-based 10-team league</p>
        </a>

        {/* ALAS */}
        <a
          href="/league/ALAS"
          className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl hover:bg-[#243249] cursor-pointer transition"
        >
          <h2 className="text-xl font-bold">ALAS</h2>
          <p className="text-gray-400 mt-1">Competitive local basketball league</p>
        </a>

        {/* Kamahardikaan */}
        <a
          href="/league/Kamahardikaan"
          className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl hover:bg-[#243249] cursor-pointer transition"
        >
          <h2 className="text-xl font-bold">Kamahardikaan</h2>
          <p className="text-gray-400 mt-1">Municipality-based league</p>
        </a>

      </div>
    </div>
  );
}
