import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FastForward, Target, Zap, ChevronRight, Timer, Truck, ShieldCheck, MapPin } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { RouteAnalysis } from '@/features/analysis/models/Entities'

interface RootCauseEngineProps {
  analysis: RouteAnalysis;
  onReanalyze: () => void;
}

export function RootCauseEngine({ analysis, onReanalyze }: RootCauseEngineProps) {
  const chartData = analysis.history.map((value, index) => ({
    iteration: index + 1,
    confidence: Number(value.toFixed(2))
  }));

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <FastForward className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Root Cause Analysis</CardTitle>
            <CardDescription className="text-[10px]">Real-time delay prediction engine</CardDescription>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReanalyze}
          className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold px-4 rounded-xl shadow-sm"
        >
          <Target className="h-4 w-4 mr-2 text-indigo-600" />
          Rerun Prediction
        </Button>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['Warehouse', 'Sortation', 'Loading', 'Dispatch', 'Terminal'].map((tag, i) => (
            <div key={i} className="flex items-center">
              <Badge
                variant={i === 4 ? 'default' : 'secondary'}
                className={`${i === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 font-semibold'} px-2 py-0.5 rounded-md border-none text-[9px]`}
              >
                {tag}
              </Badge>
              {i < 4 && <ChevronRight className="h-3 w-3 text-slate-300 mx-0.5" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-center group hover:bg-indigo-50 transition-colors">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Stops</p>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-indigo-600" />
              <p className="text-xl font-medium text-slate-900">{analysis.stops}</p>
            </div>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-center group hover:bg-emerald-50 transition-colors">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Level</p>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <p className="text-lg font-medium text-slate-900">{analysis.delayRiskLevel}</p>
            </div>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-center group hover:bg-blue-50 transition-colors">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency</p>
            <div className="flex items-center justify-center gap-2">
              <Timer className="h-3.5 w-3.5 text-blue-600" />
              <p className="text-xl font-medium text-slate-900">{analysis.fuelEfficiency}%</p>
            </div>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-center group hover:bg-amber-50 transition-colors">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latency</p>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              <p className="text-xl font-medium text-slate-900">{analysis.latencyMs}ms</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-indigo-500" />
              <p className="text-xs font-bold text-slate-700">Probability Curve (RT-{analysis.routeId.split('-')[1]})</p>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confidence: {analysis.confidence * 100}%</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="iteration" hide />
              <YAxis domain={['auto', 'auto']} style={{ fontSize: '10px', fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                name="Prediction Score" 
                stroke="#4F46E5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorConfidence)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
