import type { DashboardSummary, DetectionRule, LogImportResult, SecurityAlert, AlertStatus } from '../types'
import { mockAlerts, mockRules, mockSummary } from '../data/mock'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
const USE_MOCK = (import.meta.env.VITE_USE_MOCK_API ?? 'true') === 'true'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init, headers: { ...(init?.body instanceof FormData ? {} : {'Content-Type':'application/json'}), ...init?.headers }
  })
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(`API ${response.status}: ${message || response.statusText}`)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
const delay = (ms=250) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  async getSummary(): Promise<DashboardSummary> {
    if (USE_MOCK) { await delay(); return mockSummary }
    return request('/dashboard/summary')
  },
  async getAlerts(): Promise<SecurityAlert[]> {
    if (USE_MOCK) { await delay(); return [...mockAlerts] }
    return request('/alerts')
  },
  async updateAlertStatus(id: string, status: AlertStatus): Promise<SecurityAlert> {
    if (USE_MOCK) { await delay(150); const item = mockAlerts.find(a=>a.id===id); if(!item) throw new Error('Alert not found'); item.status=status; return item }
    return request(`/alerts/${encodeURIComponent(id)}/status`, {method:'PATCH',body:JSON.stringify({status})})
  },
  async getRules(): Promise<DetectionRule[]> {
    if (USE_MOCK) { await delay(); return [...mockRules] }
    return request('/rules')
  },
  async updateRule(id: string, enabled: boolean): Promise<DetectionRule> {
    if (USE_MOCK) { await delay(150); const item=mockRules.find(r=>r.id===id); if(!item) throw new Error('Rule not found'); item.enabled=enabled; return item }
    return request(`/rules/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify({enabled})})
  },
  async importLogs(file: File): Promise<LogImportResult> {
    if (USE_MOCK) {
      await delay(700)
      const text = await file.text()
      const rows = file.name.toLowerCase().endsWith('.json') ? (JSON.parse(text) as unknown[]).length : Math.max(0,text.trim().split(/\r?\n/).length-1)
      return {importId:`IMP-${Date.now()}`,fileName:file.name,totalRecords:rows,acceptedRecords:rows,rejectedRecords:0,alertsCreated:Math.min(3,Math.floor(rows/10)),warnings:['Demo mode: results are simulated. Connect the API to process logs for real.']}
    }
    const body=new FormData(); body.append('file',file)
    return request('/logs/import',{method:'POST',body})
  },
  async getMlInsights() {
    if (USE_MOCK) { await delay(); return {model:'Isolation Forest',status:'Not connected',scoredEntities:0,highAnomalies:0,message:'ML integration is planned for Phase 2.'} }
    return request<{model:string;status:string;scoredEntities:number;highAnomalies:number;message:string}>('/ml/insights')
  }
}
export const apiMode = USE_MOCK ? 'Demo data' : 'Live API' 