import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Target, Info, ShieldCheck, Camera } from 'lucide-react'
import { useState, useEffect } from 'react'

const mockDetections = [
  { id: 1, x: 25, y: 30, w: 120, h: 80, label: 'TRUCK-01', confidence: 0.98 },
  { id: 2, x: 65, y: 45, w: 100, h: 70, label: 'TRUCK-02', confidence: 0.96 },
  { id: 3, x: 45, y: 70, w: 110, h: 75, label: 'DELIVERY-VAN', confidence: 0.94 },
  { id: 4, x: 80, y: 25, w: 90, h: 60, label: 'TRUCK-03', confidence: 0.99 },
]

export function LogisticsCameraFeed() {
  const [activeAnalysis, setActiveAnalysis] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActiveAnalysis(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="border-slate-200 overflow-hidden bg-white shadow-xl shadow-slate-200/40 rounded-2xl h-full">
      <CardHeader className="bg-slate-50/50 backdrop-blur-md border-b border-slate-100 flex flex-row items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-md">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-base font-black tracking-tight">AI Camera Feed</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Bay Monitoring</CardDescription>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-[10px] font-medium text-emerald-700 uppercase tracking-[0.2em]">Live Stream Active</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 relative aspect-video bg-slate-900 group overflow-hidden border-r border-slate-100">
            {/* Real Camera Feed Image (Using Generated Image) */}
            <img 
              src="./logistics_warehouse_camera_view_1776387369803.png" 
              alt="Logistics Warehouse Feed" 
              className="w-full h-full object-cover opacity-80 grayscale-[0.3] transition-all duration-700 group-hover:scale-110"
            />
            
            {/* AI Bounding Boxes Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
              <AnimatePresence>
                {activeAnalysis && mockDetections.map((d) => (
                  <motion.g
                    key={d.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * d.id, type: 'spring', stiffness: 200 }}
                  >
                    <rect
                      x={d.x * 8}
                      y={d.y * 4.5}
                      width={d.w}
                      height={d.h}
                      className="fill-none stroke-indigo-400 stroke-2"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
                    />
                    <rect
                      x={d.x * 8}
                      y={(d.y * 4.5) - 20}
                      width={80}
                      height={20}
                      className="fill-indigo-500"
                    />
                    <text
                      x={(d.x * 8) + 5}
                      y={(d.y * 4.5) - 6}
                      className="fill-white font-medium text-[10px] uppercase tracking-tighter"
                    >
                      {d.label}
                    </text>
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>

            {/* Scanning Laser Line */}
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 w-full h-[3px] bg-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.8)] z-10 pointer-events-none"
            />

            {/* Rec Icon */}
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-medium text-white uppercase tracking-widest">REC 00:44:12</span>
            </div>
          </div>

          <div className="p-5 space-y-6 bg-slate-50/30">
            <div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Detection Engine</h3>
              <div className="space-y-2">
                {mockDetections.map((d) => (
                  <motion.div 
                    key={d.id}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + (0.2 * d.id) }}
                    className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-slate-100 rounded-lg text-indigo-600 font-bold text-[8px] group-hover:bg-indigo-50 transition-colors">{d.label.split('-')[0]}</div>
                      <span className="text-[11px] font-bold text-slate-700 tracking-tight">{d.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-indigo-600">{(d.confidence * 100).toFixed(0)}%</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 text-center">
              <div className="inline-flex p-3 bg-indigo-50 rounded-2xl mb-3">
                <Target className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-sm font-black text-slate-900 tracking-tight">Dynamic Rerouting</p>
              <p className="text-[9px] text-slate-500 mt-1 leading-relaxed font-medium px-4">
                Bayesian engine identifies loading anomalies for real-time dispatch.
              </p>
              <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group uppercase tracking-widest">
                <Info className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                Analyze Feed
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
