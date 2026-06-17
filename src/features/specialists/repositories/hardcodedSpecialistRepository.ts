import { specialistMockConfig } from '../../../config/specialistMockConfig';
import type { SpecialistRepository } from './SpecialistRepository';
import type { Specialist } from '../types/Specialist';

const specialists: Specialist[] = [
  { id: 'kan-chung', name: 'Kan Chung' },
  { id: 'alisa-mak', name: 'Alisa Mak' },
  { id: 'justin-liu', name: 'Justin Liu' },
];

function wait(durationMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export const hardcodedSpecialistRepository: SpecialistRepository = {
  async listSpecialists() {
    await wait(specialistMockConfig.delayMs);

    if (specialistMockConfig.shouldFail) {
      throw new Error('Unable to load specialists');
    }

    return specialists;
  },
};
