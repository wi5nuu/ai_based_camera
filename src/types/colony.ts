export interface InferenceMetrics {
  rmse: number;
  f1_score: number;
  accuracy: number;
  feature_importance: Record<string, number>;
}

export interface CFUAnalysis {
  specimen_id: string;
  total_colonies: number;
  colony_density: number; // CFU/ml
  avg_confidence: number;
  detection_time_ms: number;
  optimization_history?: number[];
}

export interface ComplianceMetrics {
  f1_score: number;
  auc_roc: number;
  accuracy: number;
  feature_importance: Record<string, number>;
  sample_alerts: Array<{
    analysis_id: string;
    risk_score: number;
    risk_category: 'Low' | 'Medium' | 'High' | 'Critical';
    alert_color: string;
    recommended_action: string;
  }>;
  risk_distribution: Record<string, number>;
}

export interface BioMetrics {
  model_performance: {
    rmse: number;
    mae: number;
    r2_score: number;
  };
  feature_importance: Record<string, number>;
  laboratory_summary: {
    total_analyses: number;
    total_specimens: number;
    total_detections: number;
    avg_precision: number;
    potential_false_positives_saved: number;
  };
  specimen_analytics: Array<{
    specimen_id: string;
    colony_count: number;
    media_type: string;
    confidence_score: number;
    dilution_factor: number;
  }>;
}

export interface BusinessImpact {
  lab_efficiency: {
    current_rate: number;
    projected_rate: number;
    improvement_percentage: number;
  };
  cost_reduction: {
    total_annual_savings_usd: number;
    manual_labor_reduction_percentage: number;
  };
  accuracy_improvement: {
    improvement_percentage: number;
    total_errors_prevented: number;
  };
  key_metrics: {
    total_investment_required_usd: number;
    annual_savings_usd: number;
    payback_period_months: number;
    roi_3year: number;
  };
}
