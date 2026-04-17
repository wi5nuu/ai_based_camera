import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Zap, Target, ShieldAlert } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'SLA Deviation Risk',
    message: 'Route RT-304 delayed by loading congestion at Terminal B.',
    time: '2 mins ago',
    icon: ShieldAlert,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Cam-AI Traffic Alert',
    message: 'Increased vehicle density detected at Sortation Facility A.',
    time: '8 mins ago',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    id: 3,
    type: 'success',
    title: 'Route Optimized',
    message: 'System triggered fuel optimization for fleet unit 088.',
    time: '15 mins ago',
    icon: Target,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  }
]

export function LiveLogisticsAlerts() {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="p-6 border-b border-slate-100 bg-white/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-rose-500 animate-ping opacity-75" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold tracking-tight">Live Operational Feed</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Real-time Root Cause Insights</CardDescription>
            </div>
          </div>
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-2"
          >
            <Clock className="h-3 w-3 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-600">LIVE SYNC</span>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border ${alert.border} ${alert.bg} group hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="flex gap-4">
                <div className={`p-2.5 rounded-xl bg-white shadow-sm shrink-0 h-fit transition-transform group-hover:scale-110`}>
                  <alert.icon className={`h-5 w-5 ${alert.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${alert.color} uppercase tracking-tight`}>{alert.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                    {alert.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all">
          View All History
        </button>
      </CardContent>
    </Card>
  )
}
