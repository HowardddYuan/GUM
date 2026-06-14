import { useQuery } from '@tanstack/react-query';
import { hardcodedSpecialistRepository } from '../repositories/specialistRepository';

export function useSpecialists() {
  return useQuery({
    queryKey: ['specialists'],
    queryFn: () => hardcodedSpecialistRepository.listSpecialists(),
    retry: false,
  });
}
