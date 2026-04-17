import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/features/dashboard/components/Sidebar'
import { Header } from '@/features/dashboard/components/Header'
import { AnalysisSummary } from '@/features/analysis/components/AnalysisSummary'
import { ModelInsights } from '@/features/analysis/components/ModelInsights'
import { RootCauseEngine } from '@/features/analysis/components/RootCauseEngine'
import { LogisticsCameraFeed } from '@/features/analysis/components/LogisticsCameraFeed'
import { SLARiskManager } from '@/features/compliance/components/SLARiskManager'
import { ArchitectureSimulator } from '@/features/analysis/components/ArchitectureSimulator'
import { ExecutiveSummary } from '@/features/analysis/components/ExecutiveSummary'
import { LiveLogisticsAlerts } from '@/features/analysis/components/LiveLogisticsAlerts'
import { OperationalInfoBoard } from '@/features/analysis/components/OperationalInfoBoard'
import { useColonyAnalysis } from '@/hooks/useColonyAnalysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Truck, ShieldAlert, Loader2, Activity, Briefcase, Layers } from 'lucide-react'
import './App.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeTab, setActiveTab] = useState('overview');

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    
    // Switch tabs based on ID
    if (id === 'simulator' || id === 'summary') {
      setActiveTab(id);
    } else {
      setActiveTab('overview');
    }

    // Scroll to element if it's a specific section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { 
    inference, 
    analysis, 
    compliance, 
    outcome, 
    loading, 
    refreshing,
    error,
    handleReanalyze 
  } = useColonyAnalysis();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="h-24 w-24 border-b-4 border-indigo-600 rounded-full"
            />
            <Truck className="absolute inset-0 m-auto h-8 w-8 text-indigo-600" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Syncing Logistics Engine</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Initializing AI Models & Root Cause Analysis Layer</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !inference || !analysis || !compliance || !outcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <Card className="max-w-md w-full border-red-100 shadow-xl shadow-red-500/5 rounded-3xl">
          <CardContent className="pt-8 text-center p-8">
            <div className="inline-flex p-3 bg-red-50 rounded-2xl mb-4">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Logistics System Offline</h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">{error || 'Unknown logistics system error detected.'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
            >
              System Reboot
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Sidebar 
        open={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-auto p-4 sm:p-5 space-y-4 sm:space-y-6">
          {/* Global Loading Overlay */}
          <AnimatePresence>
            {refreshing && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 right-12 z-50 bg-white shadow-2xl rounded-2xl p-4 border border-indigo-100 flex items-center gap-3"
              >
                <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Updating Models...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="xl:col-span-5"
            >
              <AnalysisSummary outcome={outcome} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="xl:col-span-1"
            >
              <OperationalInfoBoard />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
            <div id="camera-feed" className="xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <LogisticsCameraFeed />
              </motion.div>
            </div>

            <div id="risk-manager" className="xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SLARiskManager />
              </motion.div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
            <TabsList className="bg-slate-100 p-2 rounded-2xl border border-slate-200/50 inline-flex shadow-inner">
              <TabsTrigger id="operational" value="overview" className="rounded-xl px-10 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                <Activity className="h-4 w-4 mr-2" />
                Operational Overview
              </TabsTrigger>
              <TabsTrigger id="simulator" value="simulator" className="rounded-xl px-10 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                <Layers className="h-4 w-4 mr-2" />
                Architecture Simulator
              </TabsTrigger>
              <TabsTrigger id="summary" value="summary" className="rounded-xl px-10 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                <Briefcase className="h-4 w-4 mr-2" />
                Executive Summary
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" key="overview" className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                    <div className="xl:col-span-2 space-y-12">
                      <RootCauseEngine analysis={analysis} onReanalyze={handleReanalyze} />
                    </div>
                    <div className="xl:col-span-1">
                      <LiveLogisticsAlerts />
                    </div>
                  </div>
                  <ModelInsights inference={inference} compliance={compliance} />
                </motion.div>
              </TabsContent>

              <TabsContent value="simulator" key="simulator">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                   <ArchitectureSimulator />
                </motion.div>
              </TabsContent>

              <TabsContent value="summary" key="summary">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ExecutiveSummary outcome={outcome} />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <footer className="pt-10 pb-12 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">LogisticsLens AI • Root Cause Edition v3.0</p>
              </div>
              <div className="flex gap-8">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">ISO 9001 CERTIFIED</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">AES-256 SECURED</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
