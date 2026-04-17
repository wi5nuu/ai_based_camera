import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ShieldAlert, FastForward, Activity, AlertTriangle } from 'lucide-react'

const riskItems = [
  {
    title: 'SLA Risk Scoring',
    detail: 'Automated prediction of potential SLA breaches based on real-time traffic.',
    status: 'Nominal',
    progress: 100,
    icon: ShieldAlert,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Route Optimization',
    detail: 'Genetic algorithm engine reducing fuel distance and carbon footprint.',
    status: 'Optimizing',
    progress: 100,
    icon: FastForward,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    title: 'Delay Prediction',
    detail: 'XGBoost model forecasting arrival times within 5-minute precision.',
    status: 'Active',
    progress: 96,
    icon: Activity,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Anomaly Detection',
    detail: 'Camera-based root cause analysis for loading bay disruptions.',
    status: 'Scoping',
    progress: 85,
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }
]

export function SLARiskManager() {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Risk & Operational Integrity</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SLA-critical predictive status</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[8px] font-black text-indigo-700 uppercase tracking-widest">Secure</span>
        </div>
      </div>
      
      <CardContent className="p-5 flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {riskItems.map((item, index) => (
            <div key={index} className="border border-slate-100 bg-slate-50/30 rounded-xl p-4 group hover:border-indigo-200 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-1.5 rounded-lg ${item.bg} group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${
                    item.status === 'Nominal' || item.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">{item.title}</h3>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">{item.detail}</p>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confidence</span>
                  <span className="text-[9px] font-medium text-slate-900">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-1 bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
