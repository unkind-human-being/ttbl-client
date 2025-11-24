"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function LeaguePage() {
  const params = useParams();
  const leagueId = params.id as string; // 50VHOYZ, ALAS, Kamahardikaan

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function loadGames() {
      const ref = collection(db, "games");
      const snap = await getDocs(ref);

      const allGames = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as any[];

      // FILTER BY LEAGUE
      const filtered = allGames.filter((g: any) => g.league === leagueId);

      setGames(filtered as any[]);
      setLoading(false);
    }

    loadGames();
  }, [leagueId]);

  const todaysGames = games.filter((g: any) => g.date === today);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-extrabold mb-2">{leagueId} League</h1>
      <p className="text-gray-400 mb-8">Game schedules and match records</p>

      {/* TODAY'S GAMES */}
      <h2 className="text-2xl font-bold mb-3">Today’s Games</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : todaysGames.length === 0 ? (
        <p className="text-gray-500 mb-6">No games scheduled today.</p>
      ) : (
        <div className="space-y-4 mb-10">
          {todaysGames.map((g: any) => (
            <div
              key={g.id}
              className="bg-[#1e293b] rounded-xl p-5 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-1">
                {g.teamA} vs {g.teamB}
              </h3>
              <p className="text-gray-300">⏰ {g.time}</p>
              <p className="text-gray-300">📍 {g.venue}</p>
            </div>
          ))}
        </div>
      )}

      {/* FULL SCHEDULE */}
      <h2 className="text-2xl font-bold mb-3">All Game Schedules</h2>

      {games.length === 0 ? (
        <p className="text-gray-500">No games found for this league.</p>
      ) : (
        <div className="space-y-4">
          {games.map((g: any) => (
            <div
              key={g.id}
              className="bg-[#1e293b] rounded-xl p-5 border border-gray-700"
            >
              <h3 className="text-lg font-bold">
                {g.teamA} vs {g.teamB}
              </h3>

              <p className="text-gray-400 mt-1">🗓 {g.date}</p>
              <p className="text-gray-400">⏰ {g.time}</p>
              <p className="text-gray-400">📍 {g.venue}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
