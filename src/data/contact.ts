// src/data/contact.ts

export type ContactInfo = {
  email: string;
  addressZh: string;
  websiteZh: string;
  joinZh: string;
  coopZh: string;
};

export const contact: ContactInfo = {
  email: "zhaohangjia@tju.edu.cn",
  addressZh: "天津市津南区海河教育园区雅观路135号，天津大学北洋园校区，邮编：300354",
  websiteZh: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",
  joinZh:
    "常年招收硕士生（约3–4名/年）、博士生（约1–2名/年）及本科生科研助理。欢迎环境/化工/材料/机械/计算机等背景同学加入。",
  coopZh:
    "欢迎围绕微纳米气泡发生器、臭氧纳米气泡一体机、水质在线监测设备与应用场景开展产学研合作与项目联合申报。",
};

export default contact;
