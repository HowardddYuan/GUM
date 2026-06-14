export type Specialist = {
  id: string;
  name: string;
};

export interface SpecialistRepository {
  listSpecialists(): Promise<Specialist[]>;
}

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
    await wait(350);
    return specialists;
  },
};
