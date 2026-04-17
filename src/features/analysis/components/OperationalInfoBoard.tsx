import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function OperationalInfoBoard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const announcements = [
    {
      id: 1,
      tag: 'TRAFFIC',
      msg: 'Delay on Route RT-202 due to weather. Rerouting active.',
      type: 'warning'
    },
    {
      id: 2,
      tag: 'SYSTEM',
      msg: 'AI Camera v3.0 sync completed. Precision +2.1%.',
      type: 'info'
    },
    {
      id: 3,
      tag: 'FLEET',
      msg: 'Main Yard at 88% capacity. Priority loading enabled.',
      type: 'critical'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];

  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden h-full flex flex-col">
      <CardHeader className="p-2.5 px-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-indigo-600 rounded-md">
              <Bell className="h-3 w-3 text-white" />
            </div>
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-700">Daily Brief</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Updates</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 px-4 flex-1 flex flex-col justify-between min-h-[100px]">
        <div className="relative overflow-hidden flex-1 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <div className="flex flex-col gap-1">
                <span className={`text-[8px] font-black tracking-[0.2em] uppercase ${
                  current.type === 'critical' ? 'text-rose-600' : 
                  current.type === 'warning' ? 'text-amber-600' : 
                  'text-indigo-600'
                }`}>
                  {current.tag}
                </span>
                <p className="text-[11px] font-bold text-slate-700 leading-snug line-clamp-2">
                  {current.msg}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
           <div className="flex gap-4">
              <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Active Fleet</span>
                  <span className="text-[10px] font-black text-slate-800">128U</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Next Shift</span>
                  <span className="text-[10px] font-black text-slate-800">14:00</span>
              </div>
           </div>
           
           <div className="flex gap-1">
              {announcements.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-3 bg-indigo-500' : 'w-1 bg-slate-200'
                  }`} 
                />
              ))}
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
