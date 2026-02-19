// 专利数据模型

export type Patent = {
  id: string;
  year?: number;
  title: string;
  number?: string;
};

export const patents: Patent[] = [
  { id: "pat-01", year: 2024, title: "一种微纳米气泡发生器", number: "CN222312350U" },
  { id: "pat-02", year: 2024, title: "一种二次供水水箱水质改善设备", number: "CN222312351U" },
  { id: "pat-03", year: 2024, title: "一种可调节微纳米气泡发生器", number: "CN222312352U" },
  { id: "pat-04", year: 2024, title: "一种臭氧纳米气泡水箱", number: "CN222312353U" },
  { id: "pat-05", year: 2024, title: "一种用于设施农业地下供水系统的滴灌带冲洗装置及方法", number: "202410698770.X" },
  { id: "pat-06", year: 2024, title: "一种臭氧纳米气泡发生器", number: "CN 119044590 A" },
  { id: "pat-07", year: 2024, title: "一种臭氧纳米气泡系统及臭氧纳米气泡水的产生方法", number: "CN 119044589 A" },
  { id: "pat-08", year: 2024, title: "一种用于臭氧纳米气泡的曝气装置", number: "CN 119044588 A" },
  { id: "pat-09", year: 2023, title: "一种油田污水处理装置及处理方法", number: "CN 116986754 A" },
  { id: "pat-10", year: 2023, title: "一种三相流态微纳米气泡发生器", number: "CN 116986775 A" },
  { id: "pat-11", year: 2023, title: "一种臭氧纳米气泡水处理系统", number: "ZL 202321738756.7" },
  { id: "pat-12", year: 2023, title: "一种臭氧纳米气泡发生器", number: "ZL 202321709114.0" },
  { id: "pat-13", year: 2023, title: "一种三相流态微纳米气泡发生器", number: "ZL 202321448031.9" },
  { id: "pat-14", year: 2023, title: "一种基于粪便资源化的菌剂", number: "CN 116286555 A" },
  { id: "pat-15", year: 2023, title: "一种农业废弃物破碎机", number: "CN219765445U" },
  { id: "pat-16", year: 2023, title: "一种蔬菜种植育苗箱", number: "CN219812669U" },
  { id: "pat-17", year: 2019, title: "一种废水生物处理特性评价方法", number: "201911132489.7" },
  { id: "pat-18", year: 2018, title: "垃圾焚烧发电热电联产与水热液化协同处置城市生活垃圾的方法", number: "CN 109099435 A" },
  { id: "pat-19", year: 2014, title: "利用微生物拮抗作用清除滴灌系统灌水器堵塞的方法", number: "ZL 201410019340.9" },
  { id: "pat-20", year: 2014, title: "滴灌系统管壁附生生物膜培养装置及其使用方法", number: "ZL201410076970.x" },
  { id: "pat-21", year: 2014, title: "滴灌灌水器附生生物膜模拟培养装置及其应用", number: "ZL201410105514.3" },
  { id: "pat-22", year: 2015, title: "滴灌系统灌水器内部堵塞物质分布的原位测试与评价方法", number: "ZL201510224934.8" },
];

export default patents;
