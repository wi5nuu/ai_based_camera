import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, BarChart3, Award, Target } from 'lucide-react'
import { BusinessOutcome } from '@/features/analysis/models/Entities'

interface AnalysisSummaryProps {
  outcome: BusinessOutcome;
}

export function AnalysisSummary({ outcome }: AnalysisSummaryProps) {
  const cards = [
    {
      label: 'Route Efficiency',
      value: outcome.efficiencyImprovement,
      change: 'Projected vs Current',
      icon: TrendingUp,
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      subText: 'text-blue-600/70'
    },
    {
      label: 'Delay Accuracy',
      value: '94.2%',
      change: 'AI Precision: Nominal',
      icon: Target,
      gradient: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-100',
      text: 'text-emerald-700',
      subText: 'text-emerald-600/70'
    },
    {
      label: 'Est. Annual Savings',
      value: outcome.annualLaborSavings,
      change: 'Calculated annual ROI',
      icon: Award,
      gradient: 'from-purple-50 to-fuchsia-50',
      border: 'border-purple-100',
      text: 'text-purple-700',
      subText: 'text-purple-600/70'
    },
    {
      label: 'Fleet Utilization',
      value: '88.5%',
      change: 'Uptime: Certified',
      icon: BarChart3,
      gradient: 'from-amber-50 to-orange-50',
      border: 'border-amber-100',
      text: 'text-amber-700',
      subText: 'text-amber-600/70'
    }
  ]

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-1.5 bg-blue-600 rounded-full"></div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Expert Domain Summary</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <Card key={i} className={`bg-gradient-to-br ${card.gradient} ${card.border} border-2 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
            <CardContent className="p-3.5 px-4">
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${card.subText} mb-0.5`}>{card.label}</p>
                  <p className={`text-xl font-medium ${card.text} tracking-tighter`}>{card.value}</p>
                </div>
                <div className={`p-1.5 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm group-hover:rotate-6 transition-transform`}>
                  <card.icon className={`h-4 w-4 ${card.text}`} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className={`h-1 w-1 rounded-full ${card.text.replace('text', 'bg')} animate-pulse`}></div>
                <p className={`text-[9px] font-bold ${card.subText}`}>{card.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
