import { 
  Truck, FastForward, ShieldAlert, BarChart3, 
  LayoutDashboard, Settings, X, Camera
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ open, onToggle, activeSection, onNavigate }: SidebarProps) {
  // Navigation items mapping
  const navItems = [
    { icon: LayoutDashboard, label: 'Logistics OS', id: 'overview' },
    { icon: Camera, label: 'Camera Insights', id: 'camera-feed' },
    { icon: ShieldAlert, label: 'SLA Risk Manager', id: 'risk-manager' },
    { icon: FastForward, label: 'Root Cause Engine', id: 'operational' },
    { icon: BarChart3, label: 'Architecture & ROI', id: 'simulator' },
    { icon: Settings, label: 'System Config', id: 'config' },
  ];

  return (
    <>
      {/* Mobile Overlay backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: open ? 280 : 80,
          x: open ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        className={`bg-slate-900 text-white flex flex-col h-screen fixed inset-y-0 left-0 lg:sticky top-0 z-50 transition-all duration-300 shadow-2xl lg:shadow-none overflow-hidden`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div 
                key="logo-open"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tighter">Logistics AI</span>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto"
              >
                <div className="p-2 bg-indigo-600 rounded-xl">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {open && (
             <button onClick={onToggle} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
               <X className="h-5 w-5 text-slate-400" />
             </button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth < 1024) onToggle();
              }}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                activeSection === item.id 
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 min-w-[20px] ${activeSection === item.id ? 'text-white' : ''}`} />
              {open && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm tracking-wide whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 shrink-0">
          <AnimatePresence>
            {open && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3 text-center">System Health</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400">Core Engine</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                </div>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
