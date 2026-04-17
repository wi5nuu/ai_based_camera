import type { 
  RawInferenceData, RawRouteData, RawComplianceData, 
  RawImpactData 
} from '@/lib/schemas';

/**
 * ENTITY: InferenceStatus
 * Handles the logic for AI Model Performance.
 */
export class InferenceStatus {
  public readonly data: RawInferenceData;
  constructor(data: RawInferenceData) {
    this.data = data;
  }

  get formattedAccuracy(): string {
    return `${(this.data.accuracy * 100).toFixed(1)}%`;
  }

  get isUnderperforming(): boolean {
    return this.data.accuracy < 0.75;
  }

  get sortedFeatures() {
    return Object.entries(this.data.feature_importance)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase(),
        value: Math.round(value * 100)
      }));
  }
}

/**
 * ENTITY: RouteAnalysis
 * Represents a specific logistics route being analyzed.
 */
export class RouteAnalysis {
  public readonly routeId: string;
  public readonly stops: number;
  public readonly confidence: number;
  public readonly latencyMs: number;
  public readonly history: number[];

  constructor(
    routeId: string,
    stops: number,
    confidence: number,
    latencyMs: number,
    history: number[]
  ) {
    this.routeId = routeId;
    this.stops = stops;
    this.confidence = confidence;
    this.latencyMs = latencyMs;
    this.history = history;
  }

  static fromRaw(data: RawRouteData): RouteAnalysis {
    return new RouteAnalysis(
      'ROUTE-TRK-882',
      data.stops,
      0.96, // Model confidence simulation
      85,
      data.optimization_history
    );
  }

  get fuelEfficiency(): number {
    return (100 - (this.stops * 2.5)).toFixed(1) as any; // Efficiency score calculation
  }

  get delayRiskLevel(): string {
    if (this.confidence > 0.9) return 'Low Risk';
    if (this.confidence > 0.7) return 'Moderate';
    return 'Critical Watch';
  }
}

/**
 * ENTITY: ComplianceReport
 * Logic for ISO compliance and risk alerts.
 */
export class ComplianceReport {
  public readonly data: RawComplianceData;
  constructor(data: RawComplianceData) {
    this.data = data;
  }

  get criticalAlertsCount(): number {
    return this.data.sample_alerts.filter(a => a.risk_score > 70).length;
  }

  get chartData() {
    return [
      { name: 'Low Risk', value: this.data.risk_distribution.low_risk, color: '#10B981' },
      { name: 'Medium Risk', value: this.data.risk_distribution.medium_risk, color: '#F59E0B' },
      { name: 'High Risk', value: this.data.risk_distribution.high_risk, color: '#EF4444' },
      { name: 'Critical Risk', value: this.data.risk_distribution.critical_risk, color: '#7C3AED' },
    ];
  }
}

/**
 * ENTITY: BusinessOutcome
 * Handles ROI and efficiency transformation logic.
 */
export class BusinessOutcome {
  public readonly data: RawImpactData;
  constructor(data: RawImpactData) {
    this.data = data;
  }

  get annualLaborSavings(): string {
    const savings = this.data.cost_reduction.total_annual_cost_savings_usd;
    return `$${(savings / 1000).toFixed(0)}k/yr`;
  }

  get efficiencyImprovement(): string {
    return `+${this.data.fleet_utilization.improvement_percentage}%`;
  }
}
