import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Tag, MapPin, Sparkles, ArrowRight } from 'lucide-react';

const PRIVILEGES: ServiceItem[] = [
  {
    id: '1',
    title: '三亚亚特兰蒂斯 - 皇家套房',
    category: 'travel',
    description: '含双人早餐、水族馆门票及机场以此接送。',
    originalPrice: 4800,
    memberPrice: 3200,
    imageUrl: 'https://picsum.photos/400/300?random=1',
    location: '三亚 · 海棠湾',
    tags: ['五星级', '海景', '接送机']
  },
  {
    id: '2',
    title: '京沪高铁商务座 - 优先出票',
    category: 'travel',
    description: '无需排队，享受VIP休息室，专人引导进站。',
    originalPrice: 2350,
    memberPrice: 1980,
    imageUrl: 'https://picsum.photos/400/300?random=2',
    location: '北京 - 上海',
    tags: ['商务座', 'VIP通道']
  },
  {
    id: '3',
    title: '黑珍珠三钻家宴 - 厨师上门',
    category: 'dining',
    description: '米其林团队上门服务，定制菜单，包含食材与清理。',
    originalPrice: 8800,
    memberPrice: 5800,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    location: '全国可用',
    tags: ['私厨', '高端餐饮']
  },
  {
    id: '4',
    title: '日本京都 - 赏樱私人团',
    category: 'travel',
    description: '避开人流的私密赏樱路线，入住百年虹夕诺雅。',
    originalPrice: 45000,
    memberPrice: 32000,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    location: '日本 · 京都',
    tags: ['出境游', '私人向导']
  }
];

interface Props {
  onRequestBooking: (item: ServiceItem) => void;
}

export const ServiceMarketplace: React.FC<Props> = ({ onRequestBooking }) => {
  const [filter, setFilter] = useState<'all' | 'travel' | 'dining'>('all');

  const filteredItems = filter === 'all' 
    ? PRIVILEGES 
    : PRIVILEGES.filter(s => s.category === filter);

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">尊享特权</h2>
        <p className="text-slate-500 text-sm mt-1">为您精选的高端服务，享受管家专属折扣</p>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: '全部' },
          { id: 'travel', label: '出行住宿' },
          { id: 'dining', label: '餐饮生活' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === item.id
                ? 'bg-navy-900 text-white'
                : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-5">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100">
            <div className="h-40 w-full overflow-hidden relative">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-white">
                <MapPin className="w-3 h-3 text-gold-400" />
                {item.location}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map(tag => (
                   <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                 <div className="flex flex-col">
                    <span className="text-xs text-slate-400">市场参考价</span>
                    <span className="text-sm text-slate-400 line-through decoration-slate-400">¥{item.originalPrice.toLocaleString()}</span>
                 </div>
                 <div className="h-8 w-px bg-slate-200 mx-2"></div>
                 <div className="flex flex-col">
                    <span className="text-xs text-gold-700 font-bold">管家特惠价</span>
                    <span className="text-xl font-bold text-navy-900">¥{item.memberPrice.toLocaleString()}</span>
                 </div>
              </div>

              <button 
                onClick={() => onRequestBooking(item)}
                className="w-full bg-navy-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Sparkles size={16} className="text-gold-400" />
                让管家预订
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};