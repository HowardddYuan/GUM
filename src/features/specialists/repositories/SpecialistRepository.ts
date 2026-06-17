import type { Specialist } from '../types/Specialist';

export interface SpecialistRepository {
  listSpecialists(): Promise<Specialist[]>;
}
