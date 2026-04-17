import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { 
  Database, Cpu, Eye, Share2, 
  CloudDownload, Activity, ArrowRight, Layers 
} from 'lucide-react'

const layers = [
  {
    id: 'sources',
    title: 'Data Sources',
    description: 'GPS, Traffic API, Weather API, ERP Systems',
    icon: CloudDownload,
    color: 'bg-blue-50 text-blue-600',
    items: ['Telematics Data', 'Real-time Traffic', 'Atmospheric Conditions']
  },
  {
    id: 'ingestion',
    title: 'Data Ingestion',
    description: 'Streaming (Kafka) + Batch Processing',
    icon: Activity,
    color: 'bg-indigo-50 text-indigo-600',
    items: ['Stream Processing', 'Data Validation', 'Temporal Alignment']
  },
  {
    id: 'storage',
    title: 'Storage Layer',
    description: 'Data Lake + Relational Warehouse',
    icon: Database,
    color: 'bg-purple-50 text-purple-600',
    items: ['Historical Archives', 'Feature Store', 'Operational DB']
  },
  {
    id: 'ml',
    title: 'ML Layer',
    description: 'XGBoost Delay Prediction & A* Optimization',
    icon: Cpu,
    color: 'bg-pink-50 text-pink-600',
    items: ['Delay Regression', 'Route Meta-Heuristics', 'SLA Risk Classifier']
  },
  {
    id: 'decision',
    title: 'Decision Engine',
    description: 'Rule-based Dispatch & Logic Optimization',
    icon: Share2,
    color: 'bg-amber-50 text-amber-600',
    items: ['Dynamic Rerouting', 'Fuel Scenarios', 'Alert Dispatcher']
  },
  {
    id: 'viz',
    title: 'Visualization',
    description: 'Real-time Dashboard & Alerting System',
    icon: Eye,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['Carbon Analytics', 'Risk Heatmaps', 'Fleet Health']
  }
]

export function ArchitectureSimulator() {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">System Architecture Simulator</CardTitle>
            <CardDescription>Visualizing the end-to-end logistics AI workflow</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-slate-100 hidden md:block" />

          <div className="space-y-12">
            {layers.map((layer, index) => (
              <motion.div 
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 md:items-start group"
              >
                {/* Icon Column */}
                <div className={`z-10 h-20 w-20 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-white ${layer.color}`}>
                  <layer.icon className="h-10 w-10" />
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{layer.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{layer.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-widest shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="md:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity hidden">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                {index < layers.length - 1 && (
                  <div className="md:hidden flex justify-center py-4">
                    <ArrowRight className="h-6 w-6 text-slate-200 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
