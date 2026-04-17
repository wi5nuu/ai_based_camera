import { 
  RawInferenceSchema, RawRouteSchema, RawComplianceSchema, 
  RawBioAnalyticsSchema, RawExecutiveSummarySchema 
} from '@/lib/schemas';
import { 
  InferenceStatus, RouteAnalysis, 
  ComplianceReport, BusinessOutcome 
} from '@/features/analysis/models/Entities';

/**
 * REPOSITORY: LogisticsRepository
 * Responsible for raw data fetching and Zod validation.
 */
class LogisticsRepository {
  async getInferenceData() {
    const res = await fetch('/models/delay_model_metrics.json').then(r => r.json());
    return RawInferenceSchema.parse(res); // Runtime validation
  }

  async getAnalysisData() {
    const res = await fetch('/models/route_optimization.json').then(r => r.json());
    return RawRouteSchema.parse(res);
  }

  async getComplianceData() {
    const res = await fetch('/models/sla_risk_metrics.json').then(r => r.json());
    return RawComplianceSchema.parse(res);
  }

  async getCarbonAnalyticsData() {
    const res = await fetch('/models/carbon_metrics.json').then(r => r.json());
    return RawBioAnalyticsSchema.parse(res);
  }

  async getImpactData() {
    const res = await fetch('/models/executive_summary.json').then(r => r.json());
    return RawExecutiveSummarySchema.parse(res);
  }
}

/**
 * SERVICE: AnalysisService (Singleton)
 * Orchestrates the repository and domain entities.
 */
export class AnalysisService {
  private static instance: AnalysisService;
  private repository: LogisticsRepository;

  private constructor() {
    this.repository = new LogisticsRepository();
  }

  public static getInstance(): AnalysisService {
    if (!AnalysisService.instance) {
      AnalysisService.instance = new AnalysisService();
    }
    return AnalysisService.instance;
  }

  /**
   * Main entry point for the dashboard data.
   * Returns OOP Entities instead of raw interfaces.
   */
  async getDashboardData() {
    const [rawInf, rawRoute, rawComp, , rawImpact] = await Promise.all([
      this.repository.getInferenceData(),
      this.repository.getAnalysisData(),
      this.repository.getComplianceData(),
      this.repository.getCarbonAnalyticsData(),
      this.repository.getImpactData(),
    ]);

    return {
      inference: new InferenceStatus(rawInf),
      analysis: RouteAnalysis.fromRaw(rawRoute),
      compliance: new ComplianceReport(rawComp),
      outcome: new BusinessOutcome(rawImpact)
    };
  }
}
