// src/data/contact.ts

export type ContactInfo = {
  email: string;
  addressZh: string;
  websiteZh: string;
  joinZh: string;
  coopZh: string;
};

export const contact: ContactInfo = {
  email: "wangtianzhi@tju.edu.cn",
  addressZh: "天津市南开区卫津路92号（天津大学），邮编：300072",
  websiteZh: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",
  joinZh:
    "常年招收硕士生（约3–4名/年）、博士生（约1–2名/年）及本科生科研助理。欢迎环境/化工/材料/机械/计算机等背景同学加入。",
  coopZh:
    "欢迎围绕微纳米气泡发生器、臭氧纳米气泡一体机、水质在线监测设备与应用场景开展产学研合作与项目联合申报。",
};

export default contact;
