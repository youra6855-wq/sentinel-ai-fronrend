import type { DashboardSummary, DetectionRule, SecurityAlert } from '../types'
const now = new Date()
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60000).toISOString()
export const mockAlerts: SecurityAlert[] = [
  { id:'ALT-2048', title:'Repeated failed authentication', severity:'Critical', status:'New', timestamp:ago(4), sourceIp:'185.220.101.42', account:'admin', ruleName:'AUTH-001 · Brute force pattern', description:'Multiple failed authentication attempts for the same account were observed within the configured time window.', evidence:['17 failed login attempts within 5 minutes','Target account: admin','Source: 185.220.101.42','No successful authentication observed in this sequence'], eventCount:17, detectionSource:'Rule-based', anomalyScore:0.94 },
  { id:'ALT-2047', title:'Failed attempts followed by success', severity:'High', status:'In Review', timestamp:ago(18), sourceIp:'91.240.118.12', account:'m.salem', ruleName:'AUTH-002 · Failure then success', description:'A successful login followed a cluster of failed attempts for the same account/source.', evidence:['8 failed attempts followed by 1 success','Account: m.salem','Sequence completed within 3 minutes'], eventCount:9, detectionSource:'ML-supported', anomalyScore:0.88 },
  { id:'ALT-2046', title:'Unusual event frequency', severity:'Medium', status:'New', timestamp:ago(42), sourceIp:'10.0.4.28', account:'service_worker', ruleName:'EVT-003 · Frequency threshold', description:'An event category exceeded its configured frequency threshold in the selected time window.', evidence:['Observed: 126 events','Configured threshold: 80 events','Window: 10 minutes'], eventCount:126, detectionSource:'Rule-based', anomalyScore:0.61 },
  { id:'ALT-2045', title:'Anomalous source behavior', severity:'Low', status:'Closed', timestamp:ago(91), sourceIp:'172.16.2.14', account:'api_user', ruleName:'IF-001 · Isolation Forest', description:'The entity was ranked as unusual by the anomaly model. This is an unconfirmed lead, not proof of malicious activity.', evidence:['Anomaly score: 0.42','Distinct sources above baseline','No rule-based detection matched'], eventCount:4, detectionSource:'ML-only', anomalyScore:0.42 },
  { id:'ALT-2044', title:'Repeated failed authentication', severity:'High', status:'In Review', timestamp:ago(144), sourceIp:'45.133.1.9', account:'root', ruleName:'AUTH-001 · Brute force pattern', description:'A repeated failed authentication pattern crossed the configured threshold.', evidence:['11 failed login attempts within 5 minutes','Target account: root','Source: 45.133.1.9'], eventCount:11, detectionSource:'Rule-based', anomalyScore:0.76 },
  { id:'ALT-2043', title:'Unusual event frequency', severity:'Medium', status:'New', timestamp:ago(230), sourceIp:'10.0.8.11', account:'system', ruleName:'EVT-003 · Frequency threshold', description:'A burst of events exceeded the normal threshold for this event category.', evidence:['Observed: 94 events','Configured threshold: 80 events','Window: 10 minutes'], eventCount:94, detectionSource:'Rule-based', anomalyScore:0.58 }
]
export const mockSummary: DashboardSummary = {
  totalEvents: 24891, totalAlerts: 142, criticalAlerts: 8, openIncidents: 37,
  eventsSeries: [
    {label:'09:00',events:1800,alerts:8},{label:'10:00',events:2400,alerts:12},{label:'11:00',events:2100,alerts:9},
    {label:'12:00',events:3200,alerts:18},{label:'13:00',events:2800,alerts:14},{label:'14:00',events:3900,alerts:22},
    {label:'15:00',events:3400,alerts:17},{label:'16:00',events:5100,alerts:26}
  ],
  severityBreakdown:[{name:'Critical',value:8},{name:'High',value:34},{name:'Medium',value:61},{name:'Low',value:39}]
}
export const mockRules: DetectionRule[] = [
  {id:'AUTH-001',name:'Repeated failed authentication',description:'Detects multiple failed login events for the same account or source within a defined time window.',severity:'High',enabled:true,threshold:'5 failures / 5 min',category:'Authentication'},
  {id:'AUTH-002',name:'Failed attempts followed by success',description:'Flags a successful login following a cluster of failed attempts for the same account/source.',severity:'High',enabled:true,threshold:'5 failures + success / 10 min',category:'Authentication'},
  {id:'EVT-003',name:'Unusual event frequency',description:'Detects event categories that exceed their configured count threshold in a time window.',severity:'Medium',enabled:true,threshold:'80 events / 10 min',category:'Event analysis'},
  {id:'IF-001',name:'Isolation Forest anomaly',description:'Ranks unusual account/source windows. Model output is an unconfirmed investigation lead.',severity:'Low',enabled:false,threshold:'Model configured threshold',category:'Machine learning'}
]