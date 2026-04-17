import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts'
import { BarChart3, LineChart } from 'lucide-react'
import { InferenceStatus, ComplianceReport } from '@/features/analysis/models/Entities'

interface ModelInsightsProps {
  inference: InferenceStatus;
  compliance: ComplianceReport;
}

export function ModelInsights({ inference, compliance }: ModelInsightsProps) {
  const chartData = compliance.chartData;
  const featureData = inference.sortedFeatures;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <LineChart className="h-4 w-4 text-indigo-600" />
            <CardTitle className="text-base font-bold">Prediction Drivers</CardTitle>
          </div>
          <CardDescription className="text-[10px]">Top influential XGBoost features</CardDescription>
        </CardHeader>
        <CardContent className="pt-5 pb-2 flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={featureData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={90} 
                style={{ fontSize: '9px', fontWeight: 'bold', fill: '#64748b' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#6366f1" 
                radius={[0, 4, 4, 0]} 
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
            <CardTitle className="text-base font-bold">Risk Assessment</CardTitle>
          </div>
          <CardDescription className="text-[10px]">Active routes risk distribution</CardDescription>
        </CardHeader>
        <CardContent className="pt-5 pb-2 flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={30} 
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', fontWeight: '500', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
