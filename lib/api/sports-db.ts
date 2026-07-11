/**
 * TheSportsDB API Service
 * Docs: https://www.thesportsdb.com/api.php
 * Free tier (key=3): limited endpoints; Premium for full access
 */

import type { SportsDBEvent, SportsDBTeam, SportsDBLeague } from "@/lib/types";

const API_KEY = process.env.THESPORTSDB_API_KEY ?? "3";
const BASE_URL =
  process.env.THESPORTSDB_BASE_URL ?? "https://www.thesportsdb.com/api/v1/json";

async function sportsDbFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${API_KEY}${endpoint}`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(
      `TheSportsDB API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── League IDs (TheSportsDB) ─────────────────────────────────────────────────

export const LEAGUE_IDS = {
  PREMIER_LEAGUE: "4328",
  LA_LIGA: "4335",
  BUNDESLIGA: "4331",
  SERIE_A: "4332",
  IPL: "4460",          // Cricket - Indian Premier League
  NBA: "4387",          // Basketball - NBA
  ATP: "4464",          // Tennis - ATP World Tour
} as const;

// ─── Events / Matches ─────────────────────────────────────────────────────────

export async function getEventsByLeague(
  leagueId: string,
  season: string
): Promise<SportsDBEvent[]> {
  const data = await sportsDbFetch<{ events: SportsDBEvent[] | null }>(
    `/eventsseason.php?id=${leagueId}&s=${season}`
  );
  return data.events ?? [];
}

export async function getLiveEvents(): Promise<SportsDBEvent[]> {
  const data = await sportsDbFetch<{ events: SportsDBEvent[] | null }>(
    "/livescore.php"
  );
  return data.events ?? [];
}

export async function getNextEvents(leagueId: string): Promise<SportsDBEvent[]> {
  const data = await sportsDbFetch<{ events: SportsDBEvent[] | null }>(
    `/eventsnextleague.php?id=${leagueId}`
  );
  return data.events ?? [];
}

export async function getLastEvents(leagueId: string): Promise<SportsDBEvent[]> {
  const data = await sportsDbFetch<{ events: SportsDBEvent[] | null }>(
    `/eventspastleague.php?id=${leagueId}`
  );
  return data.events ?? [];
}

export async function searchEvents(query: string): Promise<SportsDBEvent[]> {
  const data = await sportsDbFetch<{ event: SportsDBEvent[] | null }>(
    `/searchevents.php?e=${encodeURIComponent(query)}`
  );
  return data.event ?? [];
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export async function searchTeams(query: string): Promise<SportsDBTeam[]> {
  const data = await sportsDbFetch<{ teams: SportsDBTeam[] | null }>(
    `/searchteams.php?t=${encodeURIComponent(query)}`
  );
  return data.teams ?? [];
}

export async function getTeamsByLeague(leagueId: string): Promise<SportsDBTeam[]> {
  const data = await sportsDbFetch<{ teams: SportsDBTeam[] | null }>(
    `/lookup_all_teams.php?id=${leagueId}`
  );
  return data.teams ?? [];
}

// ─── Leagues ──────────────────────────────────────────────────────────────────

export async function getLeaguesBySport(sport: string): Promise<SportsDBLeague[]> {
  const data = await sportsDbFetch<{ leagues: SportsDBLeague[] | null }>(
    `/all_leagues.php?s=${encodeURIComponent(sport)}`
  );
  return data.leagues ?? [];
}

export async function getLeagueById(leagueId: string): Promise<SportsDBLeague | null> {
  const data = await sportsDbFetch<{ leagues: SportsDBLeague[] | null }>(
    `/lookupleague.php?id=${leagueId}`
  );
  return data.leagues?.[0] ?? null;
}
