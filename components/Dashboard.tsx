import React from 'react';
import { UserStats, ItineraryItem, NavigationTab } from '../types';
import { ShieldCheck, Plane, Train, Briefcase, ChevronRight, Mic } from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  itinerary: ItineraryItem[];
  onQuickAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, itinerary, onQuickAction }) => {
  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">下午好，张先生</h1>
          <p className="text-slate-500 text-sm">金岁黑金会员 | 专属管家已在线</p>
        </div>
        <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-gold-400 font-bold text-xl shadow-lg border-2 border-gold-200">
          张
        </div>
      </header>

      {/* Hero Stats Card - Savings Focus */}
      <div className="bg-gradient-to-br from-navy-900 to-slate-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
             <ShieldCheck className="text-gold-400 w-5 h-5" />
             <p className="text-gold-200 text-sm">为您累计节省</p>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="text-2xl align-top mr-1">¥</span>
            {stats.savings.toLocaleString()}
          </h2>
          
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/5">
             <p className="text-sm text-slate-300">
               本年度已通过管家完成 <span className="text-white font-bold">{stats.ordersCount}</span> 项专属预订
             </p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Voice Command Style */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">一键吩咐</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onQuickAction("帮我订一张去北京的机票")}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Plane size={20} />
            </div>
            <span className="font-medium text-slate-700">订机票</span>
          </button>
          
          <button 
            onClick={() => onQuickAction("帮我查一下最近去上海的高铁")}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <Train size={20} />
            </div>
            <span className="font-medium text-slate-700">订高铁</span>
          </button>

           <button 
            onClick={() => onQuickAction("这就安排这周末的酒店")}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
              <Briefcase size={20} />
            </div>
            <span className="font-medium text-slate-700">订酒店</span>
          </button>

          <button 
            onClick={() => onQuickAction("我想通过语音说话")}
            className="bg-navy-900 p-4 rounded-2xl shadow-sm border border-navy-800 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
              <Mic size={20} />
            </div>
            <span className="font-medium text-white">语音吩咐</span>
          </button>
        </div>
      </div>

      {/* Upcoming Itinerary */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-slate-900">近期行程</h3>
          <span className="text-sm text-slate-400">全部行程</span>
        </div>
        
        <div className="space-y-3">
          {itinerary.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold">{item.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold text-navy-900">{item.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500 mt-0.5">{item.details}</p>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                item.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {item.status === 'confirmed' ? '已出票' : '处理中'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};