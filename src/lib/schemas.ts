import { z } from 'zod';

/**
 * RAW SCHEMAS (Matches the /models/*.json files)
 */

export const RawInferenceSchema = z.object({
  rmse: z.number(),
  f1_score: z.number(),
  accuracy: z.number(),
  feature_importance: z.record(z.string(), z.number())
});

export const RawRouteSchema = z.object({
  optimal_route: z.array(z.string()),
  total_distance_km: z.number(),
  fuel_consumption_l: z.number(),
  carbon_emission_kg: z.number(),
  optimization_history: z.array(z.number()),
  stops: z.number()
});

export const RawComplianceSchema = z.object({
  f1_score: z.number(),
  auc_roc: z.number(),
  accuracy: z.number(),
  feature_importance: z.record(z.string(), z.number()),
  sample_alerts: z.array(z.object({
    delivery_id: z.string(),
    risk_score: z.number(),
    risk_category: z.string(),
    alert_color: z.string(),
    recommended_action: z.string()
  })),
  risk_distribution: z.record(z.string(), z.number())
});

export const RawBioAnalyticsSchema = z.object({
  model_performance: z.object({
    rmse: z.number(),
    mae: z.number(),
    r2_score: z.number()
  }),
  feature_importance: z.record(z.string(), z.number()),
  fleet_summary: z.object({
    total_routes: z.number(),
    total_distance_km: z.number(),
    total_emission_kg: z.number(),
    avg_efficiency_score: z.number(),
    potential_savings_kg: z.number()
  }),
  route_analytics: z.array(z.object({
    route_id: z.string(),
    distance_km: z.number(),
    efficiency_score: z.number()
  }))
});

export const RawExecutiveSummarySchema = z.object({
  key_metrics: z.object({
    total_investment_required_usd: z.number(),
    annual_savings_usd: z.number(),
    payback_period_months: z.number(),
    roi_3year: z.number()
  }),
  fleet_utilization: z.object({
    current_utilization_rate: z.number(),
    projected_utilization_rate: z.number(),
    improvement_percentage: z.number()
  }),
  cost_reduction: z.object({
    total_annual_cost_savings_usd: z.number(),
    fuel_cost_reduction_percentage: z.number()
  }),
  sla_improvement: z.object({
    improvement_percentage: z.number()
  })
});

// Infer types from schemas
export type RawInferenceData = z.infer<typeof RawInferenceSchema>;
export type RawRouteData = z.infer<typeof RawRouteSchema>;
export type RawComplianceData = z.infer<typeof RawComplianceSchema>;
export type RawBioData = z.infer<typeof RawBioAnalyticsSchema>;
export type RawImpactData = z.infer<typeof RawExecutiveSummarySchema>;
