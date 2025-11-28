
import { ChatMessage } from "../types";

// 模拟延迟函数，让体验更真实
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessageToButler = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  // 模拟网络请求和思考时间 (1.5秒)
  await delay(1500);

  const lowerMsg = newMessage.toLowerCase();

  // 模拟管家的智能回复逻辑
  if (lowerMsg.includes('机票') || lowerMsg.includes('飞') || lowerMsg.includes('航班')) {
    return "好的，张先生。正在为您查询最新的航班动态... \n\n已为您找到推荐行程：\n下周五上午10:30起飞，上海虹桥 -> 北京首都，国航公务舱。\n\n💰 市场价：¥3,800\n✨ 管家特权价：¥2,200\n🛡️ 为您节省：¥1,600\n\n是否需要我为您直接出票？";
  }
  
  if (lowerMsg.includes('酒店') || lowerMsg.includes('住')) {
    return "收到。根据您的喜好，我推荐入住【半岛酒店】的行政江景套房。\n\n由于我是黑金管家，可以为您申请“住三付二”的特别礼遇，并包含行政酒廊待遇。\n\n预计本次入住可累计节省约 ¥4,500。需要为您预留房间吗？";
  }

  if (lowerMsg.includes('高铁') || lowerMsg.includes('火车')) {
    return "没问题。在这个时间段，我可以为您通过VIP通道预订商务座，无需排队候车。\n\n票源比较紧张，但我这边有预留名额。全程为您安排专人引导进站，节省您的宝贵时间。确认是这个行程吗？";
  }

  if (lowerMsg.includes('好') || lowerMsg.includes('确认') || lowerMsg.includes('可以') || lowerMsg.includes('谢谢')) {
    return "太好了。我已经开始处理您的订单，预计15分钟内会发送确认单到您的手机。祝您生活愉快！如有其他吩咐，随时叫我。";
  }

  if (lowerMsg.includes('省') || lowerMsg.includes('优惠')) {
    return "为您精打细算是我的职责。本月截止目前，我已通过渠道优势为您累计节省了 ¥45,800 的差旅及生活开支。建议您关注一下我们新出的高端体检套餐，也非常划算。";
  }

  // 默认回复
  return "好的，张先生，您的吩咐我记下了。我会利用我的资源网络去处理这件事，力求为您拿到最优的价格和服务。请给我一点时间，处理好后第一时间向您汇报。";
};
