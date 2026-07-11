/**
 * Server-side data access for GoalPulse.
 *
 * Everything here calls the live Football-Data.org / TheSportsDB APIs
 * directly — there is no mock fallback. If a request fails, the error
 * propagates so the route's `error.tsx` boundary can surface it instead
 * of silently showing fake data.
 */

import {
  getLiveMatches,
  getUpcomingMatches,
  getStandings,
} from "@/lib/api/football-data";
import type { Match, Standing } from "@/lib/types";

/**
 * European club football seasons run roughly August through May. Before a
 * new season kicks off (June/July), "current season" standings/results are
 * empty — so we compute the season we actually want data for up front
 * instead of guessing-then-retrying, which would double our API usage.
 */
export function currentFootballSeasonYear(): number {
  const now = new Date();
  const month = now.getUTCMonth() + 1; // 1-12
  return month >= 8 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function fetchLiveMatches(): Promise<Match[]> {
  const raw = await getLiveMatches();
  return raw.map((m) => ({
    id: m.id,
    utcDate: m.utcDate,
    status: m.status,
    homeTeam: {
      id: m.homeTeam.id,
      name: m.homeTeam.name,
      shortName: m.homeTeam.shortName,
      crest: m.homeTeam.crest,
    },
    awayTeam: {
      id: m.awayTeam.id,
      name: m.awayTeam.name,
      shortName: m.awayTeam.shortName,
      crest: m.awayTeam.crest,
    },
    score: {
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
    },
    competition: {
      id: m.competition.id,
      name: m.competition.name,
      code: m.competition.code,
      emblem: m.competition.emblem,
    },
  }));
}

export async function fetchUpcomingMatches(
  competitionCode = "PL"
): Promise<Match[]> {
  const raw = await getUpcomingMatches(competitionCode);
  return raw.map((m) => ({
    id: m.id,
    utcDate: m.utcDate,
    status: m.status,
    homeTeam: {
      id: m.homeTeam.id,
      name: m.homeTeam.name,
      shortName: m.homeTeam.shortName,
      crest: m.homeTeam.crest,
    },
    awayTeam: {
      id: m.awayTeam.id,
      name: m.awayTeam.name,
      shortName: m.awayTeam.shortName,
      crest: m.awayTeam.crest,
    },
    score: { home: null, away: null },
    competition: {
      id: m.competition.id,
      name: m.competition.name,
      code: m.competition.code,
      emblem: m.competition.emblem,
    },
  }));
}

// ─── Standings ────────────────────────────────────────────────────────────────

/** Standings for a competition's most recently active season. */
export async function fetchStandings(
  competitionCode = "PL"
): Promise<{ table: Standing[]; season: string }> {
  const season = String(currentFootballSeasonYear());
  const data = await getStandings(competitionCode, season);
  if (!data) {
    throw new Error(`Standings are not available for ${competitionCode}.`);
  }
  return { table: data.table, season: data.season };
}
