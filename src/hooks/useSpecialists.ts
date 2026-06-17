import { useQuery } from '@tanstack/react-query';
import { specialistRepository } from '../features/specialists/repositories';

export function useSpecialists() {
  return useQuery({
    queryKey: ['specialists'],
    queryFn: () => specialistRepository.listSpecialists(),
    retry: false,
  });
}
