/**
 * Data fetching helpers that try the live API first
 * and gracefully fall back to mock data when API keys are absent or requests fail.
 *
 * Usage in server components:
 *   const matches = await fetchLiveMatches();   // live or mock
 */

import { getLiveMatches, getUpcomingMatches, getStandings } from "@/lib/api/football-data";
import {
  MOCK_LIVE_MATCHES,
  MOCK_UPCOMING_MATCHES,
  MOCK_STANDINGS,
} from "@/lib/mock-data";
import type { Match, Standing, StandingsTable } from "@/lib/types";

const hasFootballKey =
  !!process.env.FOOTBALL_DATA_API_KEY &&
  process.env.FOOTBALL_DATA_API_KEY !== "your_football_data_api_key_here";

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function fetchLiveMatches(): Promise<Match[]> {
  if (!hasFootballKey) return MOCK_LIVE_MATCHES;
  try {
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
  } catch {
    return MOCK_LIVE_MATCHES;
  }
}

export async function fetchUpcomingMatches(
  competitionCode = "PL"
): Promise<Match[]> {
  if (!hasFootballKey) return MOCK_UPCOMING_MATCHES;
  try {
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
  } catch {
    return MOCK_UPCOMING_MATCHES;
  }
}

// ─── Standings ────────────────────────────────────────────────────────────────

export async function fetchStandings(
  competitionCode = "PL"
): Promise<{ table: Standing[]; usingMock: boolean }> {
  if (!hasFootballKey) return { table: MOCK_STANDINGS, usingMock: true };
  try {
    const data: StandingsTable | null = await getStandings(competitionCode);
    if (!data) return { table: MOCK_STANDINGS, usingMock: true };
    return { table: data.table, usingMock: false };
  } catch {
    return { table: MOCK_STANDINGS, usingMock: true };
  }
}

export { hasFootballKey };
