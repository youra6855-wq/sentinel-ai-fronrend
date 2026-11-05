export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
export type AlertStatus = 'New' | 'In Review' | 'Closed'
export type DetectionSource = 'Rule-based' | 'ML-supported' | 'ML-only'
export interface SecurityAlert {
  id: string; title: string; severity: Severity; status: AlertStatus; timestamp: string;
  sourceIp: string; account: string; ruleName: string; description: string;
  evidence: string[]; eventCount: number; detectionSource: DetectionSource; anomalyScore?: number;
}
export interface DashboardSummary {
  totalEvents: number; totalAlerts: number; criticalAlerts: number; openIncidents: number;
  eventsSeries: { label: string; events: number; alerts: number }[];
  severityBreakdown: { name: string; value: number }[];
}
export interface LogImportResult {
  importId: string; fileName: string; totalRecords: number; acceptedRecords: number;
  rejectedRecords: number; alertsCreated: number; warnings: string[];
}
export interface DetectionRule {
  id: string; name: string; description: string; severity: Severity; enabled: boolean;
  threshold: string; category: string;
}