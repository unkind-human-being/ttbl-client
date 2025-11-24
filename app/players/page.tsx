"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function PlayerSearchPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const teamsData: any = {
    "50VHOYZ": ["Red","Blue","Yellow","Green","Orange","Purple","Black","White","Pink","Gray"],
    "ALAS": ["Alpha","Omega","Titans","Stallions","Warriors","Eagles","Knights","Royals","Mavericks","Vikings"],
    "Kamahardikaan": [
      "BONGAO","LANGUYAN","SIMUNUL","SAPA-SAPA","PANGLIMA SUGALA","TURTLE ISLAND",
      "SITANGKAI","MAPUN","TANDUBAS","SOUTH UBIAN","SIBUTU"
    ]
  };

  // Load all players
  useEffect(() => {
    async function loadPlayers() {
      const ref = collection(db, "players");
      const snap = await getDocs(ref);

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPlayers(list);
      setLoading(false);
    }

    loadPlayers();
  }, []);

  // FILTERING
  const filteredPlayers = players.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchLeague = leagueFilter === "" ? true : p.league === leagueFilter;
    const matchTeam = teamFilter === "" ? true : p.team === teamFilter;
    return matchName && matchLeague && matchTeam;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <h1 className="text-3xl font-extrabold mb-4">🔍 Search Players</h1>

      {/* SEARCH + FILTERS */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 mb-8">

        <input
          type="text"
          placeholder="Search player name..."
          className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg"
            value={leagueFilter}
            onChange={(e) => {
              setLeagueFilter(e.target.value);
              setTeamFilter("");
            }}
          >
            <option value="">All Leagues</option>
            <option value="50VHOYZ">50VHOYZ</option>
            <option value="ALAS">ALAS</option>
            <option value="Kamahardikaan">Kamahardikaan</option>
          </select>

          <select
            className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            disabled={leagueFilter === ""}
          >
            <option value="">All Teams</option>

            {leagueFilter !== "" &&
              teamsData[leagueFilter].map((team: string, i: number) => (
                <option key={i} value={team}>{team}</option>
              ))}
          </select>

        </div>
      </div>

      {/* PLAYER LIST */}
      {loading ? (
        <p className="text-gray-400">Loading players...</p>
      ) : filteredPlayers.length === 0 ? (
        <p className="text-gray-500">No players found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlayers.map((p) => (
            <div
              key={p.id}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 flex flex-col items-center"
            >
              {/* PLAYER PHOTO */}
              <img
                src={p.photoURL || "/default-avatar.png"}
                alt={p.name}
                className="w-32 h-32 object-cover rounded-full border border-gray-600 mb-4"
              />

              {/* INFO */}
              <h2 className="text-xl font-bold">{p.name}</h2>

              <p className="text-gray-400 mt-1">🎂 {p.birthday}</p>
              <p className="text-gray-400">📏 {p.height} cm</p>
              <p className="text-gray-400">🏆 {p.league}</p>
              <p className="text-gray-400">🏀 {p.team}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
