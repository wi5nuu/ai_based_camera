import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnalysisService } from '@/services/AnalysisService';
import { useCallback } from 'react';

/**
 * HOOK: useColonyAnalysis
 * Orchestrates global domain state using TanStack Query for elite performance.
 */
export function useColonyAnalysis() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ['colony', 'dashboard'],
    queryFn: () => AnalysisService.getInstance().getDashboardData(),
    // Elite Configuration
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 mins
  });

  const handleReanalyze = useCallback(async () => {
    // Standard industry practice for manual refresh:
    // Invalidate the query to trigger a background refetch with loading indicators
    await queryClient.invalidateQueries({ queryKey: ['colony', 'dashboard'] });
  }, [queryClient]);

  return {
    inference: data?.inference ?? null,
    analysis: data?.analysis ?? null,
    compliance: data?.compliance ?? null,
    outcome: data?.outcome ?? null,
    loading: isLoading,
    refreshing: isRefetching,
    error: error instanceof Error ? error.message : null,
    handleReanalyze
  };
}
