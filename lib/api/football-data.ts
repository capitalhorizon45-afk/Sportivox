/**
 * Football-Data.org API Service
 * Docs: https://www.football-data.org/documentation/quickstart
 * Free tier: 10 req/min, major competitions only
 */

import type { FootballDataMatch, Competition, StandingsTable } from "@/lib/types";

const BASE_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY ?? "";

async function footballDataFetch<T>(endpoint: string): Promise<T> {
  if (!API_KEY || API_KEY === "your_football_data_api_key_here") {
    throw new Error("FOOTBALL_DATA_API_KEY is not configured.");
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "X-Auth-Token": API_KEY },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error(
      `Football-Data API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── Competition IDs ──────────────────────────────────────────────────────────

export const COMPETITIONS = {
  PREMIER_LEAGUE: "PL",
  LA_LIGA: "PD",
  BUNDESLIGA: "BL1",
  SERIE_A: "SA",
  LIGUE_1: "FL1",
  CHAMPIONS_LEAGUE: "CL",
  WORLD_CUP: "WC",
} as const;

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function getLiveMatches(): Promise<FootballDataMatch[]> {
  const data = await footballDataFetch<{ matches: FootballDataMatch[] }>(
    "/matches?status=IN_PLAY"
  );
  return data.matches;
}

export async function getTodaysMatches(): Promise<FootballDataMatch[]> {
  const today = new Date().toISOString().split("T")[0];
  const data = await footballDataFetch<{ matches: FootballDataMatch[] }>(
    `/matches?dateFrom=${today}&dateTo=${today}`
  );
  return data.matches;
}

export async function getUpcomingMatches(
  competitionCode: string,
  limit = 10
): Promise<FootballDataMatch[]> {
  const data = await footballDataFetch<{ matches: FootballDataMatch[] }>(
    `/competitions/${competitionCode}/matches?status=SCHEDULED&limit=${limit}`
  );
  return data.matches.slice(0, limit);
}

export async function getCompetitionMatches(
  competitionCode: string,
  matchday?: number
): Promise<FootballDataMatch[]> {
  const md = matchday ? `&matchday=${matchday}` : "";
  const data = await footballDataFetch<{ matches: FootballDataMatch[] }>(
    `/competitions/${competitionCode}/matches?${md}`
  );
  return data.matches;
}

// ─── Standings ────────────────────────────────────────────────────────────────

export async function getStandings(
  competitionCode: string
): Promise<StandingsTable | null> {
  try {
    const data = await footballDataFetch<{
      competition: Competition;
      season: { startDate: string };
      standings: Array<{ type: string; table: StandingsTable["table"] }>;
    }>(`/competitions/${competitionCode}/standings`);

    const total = data.standings.find((s) => s.type === "TOTAL");
    if (!total) return null;

    return {
      competition: data.competition,
      season: data.season.startDate.split("-")[0],
      table: total.table,
    };
  } catch {
    return null;
  }
}

// ─── Competitions ─────────────────────────────────────────────────────────────

export async function getCompetitions(): Promise<Competition[]> {
  const data = await footballDataFetch<{ competitions: Competition[] }>(
    "/competitions"
  );
  return data.competitions;
}
