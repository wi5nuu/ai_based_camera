import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { 
  Leaf, Target, 
  DollarSign, Briefcase, ChevronRight 
} from 'lucide-react'
import { BusinessOutcome } from '@/features/analysis/models/Entities'

interface ExecutiveSummaryProps {
  outcome: BusinessOutcome;
}

export function ExecutiveSummary({ outcome }: ExecutiveSummaryProps) {
  const impacts = [
    {
      title: 'Cost Reduction',
      value: outcome.annualLaborSavings,
      description: 'Projected annual savings through route optimization and reduced idle time.',
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Emission Reduction',
      value: `${outcome.data.cost_reduction.fuel_cost_reduction_percentage}%`,
      description: 'Estimated decrease in carbon footprint by optimizing fuel consumption.',
      icon: Leaf,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      title: 'SLA Improvement',
      value: `+${outcome.data.sla_improvement.improvement_percentage}%`,
      description: 'Increase in on-time delivery rates and overall service reliability.',
      icon: Target,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    }
  ]

  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-slate-900 text-white p-8">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="h-6 w-6 text-indigo-400" />
          <CardTitle className="text-2xl font-black tracking-tight">Executive Summary</CardTitle>
        </div>
        <CardDescription className="text-slate-400 font-medium">
          Strategic business impact estimation & fleet utilization insights
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {impacts.map((impact, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className={`h-12 w-12 rounded-2xl ${impact.bg} flex items-center justify-center`}>
                <impact.icon className={`h-6 w-6 ${impact.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{impact.title}</h4>
                <p className={`text-3xl font-medium ${impact.color} tracking-tighter mt-1`}>{impact.value}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {impact.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Fleet Utilization Outlook</h3>
              <p className="text-sm text-slate-500 font-medium">
                Projected utilization improvement across the entire fleet based on current model accuracy.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current</p>
                <p className="text-2xl font-medium text-slate-400">{outcome.data.fleet_utilization.current_utilization_rate}%</p>
              </div>
              <ChevronRight className="h-6 w-6 text-slate-300" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Projected</p>
                <p className="text-3xl font-medium text-indigo-600">{outcome.data.fleet_utilization.projected_utilization_rate}%</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-slate-300" 
              style={{ width: `${outcome.data.fleet_utilization.current_utilization_rate}%` }} 
            />
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${outcome.data.fleet_utilization.improvement_percentage}%` }}
              className="h-full bg-indigo-500" 
            />
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-4 text-center uppercase tracking-[0.2em]">
            Sustainable Growth Threshold: 85% Utilization
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
