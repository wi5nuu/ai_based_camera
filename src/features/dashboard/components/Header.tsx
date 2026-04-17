import { Bell, Search, Hexagon, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 sm:px-8 py-5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 hidden sm:block">
            <Hexagon className="h-6 w-6 text-indigo-600 fill-indigo-50" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">LogisticsLens AI Engine</h1>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-widest">
              Root Cause Analysis & Fleet Optimization
              <span className="h-1 w-1 rounded-full bg-slate-300"></span>
              v3.0.2
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Route ID (e.g. RT-102)..." 
            className="pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3 pl-1">
            <div className="text-right hidden xl:block">
              <p className="text-sm font-black text-slate-900">Aris Darmadi</p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Operations Lead</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30 text-xs sm:text-sm">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
