import type { Fixture, Sport, Team, Athlete } from "./types";

export interface SportsRepository {
  listActive(): Promise<Sport[]>;
  findBySlug(slug: string): Promise<Sport | null>;
}

export interface TeamsRepository {
  listBySport(sportId: string): Promise<Team[]>;
}

export interface FixturesRepository {
  listByCompetition(competitionId: string): Promise<Fixture[]>;
  findById(id: string): Promise<Fixture | null>;
}

export interface AthletesRepository {
  findById(id: string): Promise<Athlete | null>;
  search(query: string): Promise<Athlete[]>;
}

export interface MediaStorage {
  upload(file: File, options: { folder: string }): Promise<{ key: string; url: string }>;
  remove(key: string): Promise<void>;
}

export interface RealtimeProvider {
  subscribe<T>(topic: string, onMessage: (payload: T) => void): () => void;
}
