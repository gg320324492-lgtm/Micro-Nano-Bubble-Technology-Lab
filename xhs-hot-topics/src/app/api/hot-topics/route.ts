import { NextResponse } from 'next/server';

const mockHotTopics = [
  { id: 1, title: "春节档电影票房创新高", hot: 1250000, category: "娱乐" },
  { id: 2, title: "AI技术突破引发热议", hot: 980000, category: "科技" },
  { id: 3, title: "冬奥会精彩瞬间回顾", hot: 870000, category: "体育" },
  { id: 4, title: "新能源车销量大增", hot: 760000, category: "汽车" },
  { id: 5, title: "职场生存指南走红", hot: 650000, category: "职场" },
  { id: 6, title: "健康饮食新趋势", hot: 540000, category: "健康" },
  { id: 7, title: "旅游打卡新景点推荐", hot: 430000, category: "旅游" },
  { id: 8, title: "明星日常穿搭分享", hot: 320000, category: "时尚" },
  { id: 9, title: "居家收纳技巧大全", hot: 210000, category: "生活" },
  { id: 10, title: "新手爸妈育儿经", hot: 150000, category: "亲子" },
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: mockHotTopics,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '获取热点失败' },
      { status: 500 }
    );
  }
}
