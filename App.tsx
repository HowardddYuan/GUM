import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PremiumConsultationScreen } from './src/screens/PremiumConsultationScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PremiumConsultationScreen />
    </QueryClientProvider>
  );
}
