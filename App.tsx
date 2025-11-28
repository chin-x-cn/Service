import React, { useState } from 'react';
import { NavigationTab, UserStats, ItineraryItem, ServiceItem } from './types';
import { Dashboard } from './components/Dashboard';
import { ServiceMarketplace } from './components/ServiceMarketplace';
import { ButlerChat } from './components/ButlerChat';
import { Home, Diamond, MessageCircle, User } from 'lucide-react';

const MOCK_STATS: UserStats = {
  savings: 45800,
  ordersCount: 12,
  nextTrip: '3月15日'
};

const MOCK_ITINERARY: ItineraryItem[] = [
  {
    id: '1',
    type: 'flight',
    title: '上海 ✈️ 三亚',
    date: '3月15日 10:30',
    status: 'confirmed',
    details: '吉祥航空 HO1177 | 公务舱'
  },
  {
    id: '2',
    type: 'hotel',
    title: '三亚亚特兰蒂斯',
    date: '3月15日 入住',
    status: 'confirmed',
    details: '皇家俱乐部套房 | 3晚'
  },
  {
    id: '3',
    type: 'dining',
    title: '甬府宴 (上海)',
    date: '3月20日 18:00',
    status: 'processing',
    details: '预订确认中...'
  }
];

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [chatInitialMessage, setChatInitialMessage] = useState<string>('');

  const handleQuickAction = (action: string) => {
    setChatInitialMessage(action);
    setCurrentTab(NavigationTab.BUTLER);
  };

  const handleRequestBooking = (item: ServiceItem) => {
    setChatInitialMessage(`你好，我想预订"${item.title}"，请帮我安排一下行程。`);
    setCurrentTab(NavigationTab.BUTLER);
  };

  const renderContent = () => {
    switch (currentTab) {
      case NavigationTab.DASHBOARD:
        return (
          <Dashboard 
            stats={MOCK_STATS} 
            itinerary={MOCK_ITINERARY} 
            onQuickAction={handleQuickAction}
          />
        );
      case NavigationTab.PRIVILEGES:
        return <ServiceMarketplace onRequestBooking={handleRequestBooking} />;
      case NavigationTab.BUTLER:
        return (
          <ButlerChat 
            initialMessage={chatInitialMessage} 
            onClearInitial={() => setChatInitialMessage('')} 
          />
        );
      case NavigationTab.PROFILE:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <User size={64} className="mb-4 opacity-50" />
            <p className="text-xl">会员中心</p>
            <p className="text-sm mt-2">查看您的会籍权益与账单</p>
          </div>
        );
      default:
        return <Dashboard stats={MOCK_STATS} itinerary={MOCK_ITINERARY} onQuickAction={handleQuickAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex justify-center">
      <main className="w-full max-w-md bg-white shadow-2xl relative overflow-hidden h-screen flex flex-col">
        
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900 z-50" />

        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-slate-50 pt-6 px-4">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-slate-200 px-6 py-3 pb-6 flex justify-between items-end z-40 relative">
          <button 
            onClick={() => setCurrentTab(NavigationTab.DASHBOARD)}
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === NavigationTab.DASHBOARD ? 'text-navy-900' : 'text-slate-400'}`}
          >
            <Home size={24} strokeWidth={currentTab === NavigationTab.DASHBOARD ? 2.5 : 2} />
            <span className="text-[10px] font-medium">首页</span>
          </button>
          
          <button 
             onClick={() => setCurrentTab(NavigationTab.PRIVILEGES)}
             className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === NavigationTab.PRIVILEGES ? 'text-navy-900' : 'text-slate-400'}`}
          >
            <Diamond size={24} strokeWidth={currentTab === NavigationTab.PRIVILEGES ? 2.5 : 2} />
            <span className="text-[10px] font-medium">特权</span>
          </button>

          {/* Special Center Button for Butler */}
          <button 
            onClick={() => setCurrentTab(NavigationTab.BUTLER)}
            className="relative -top-6 bg-navy-900 text-gold-400 rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-xl border-4 border-slate-50 active:scale-95 transition-transform"
          >
            <MessageCircle size={26} fill="currentColor" className="text-gold-400" />
          </button>

          <button 
             onClick={() => setCurrentTab(NavigationTab.PROFILE)}
             className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === NavigationTab.PROFILE ? 'text-navy-900' : 'text-slate-400'}`}
          >
            <User size={24} strokeWidth={currentTab === NavigationTab.PROFILE ? 2.5 : 2} />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;