// src/data/publications.ts

export type Publication = {
  id: string;
  year: number;
  title: string; // 页面优先用这个展示
  titleZh?: string;
  titleEn?: string;
  venue?: string; // 期刊/卷期页等
  doi?: string;
  url?: string; // doi 或期刊链接
};

export const publications: Publication[] = [
  {
    id: "pub-2025-01",
    year: 2025,
    title:
      "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    titleEn:
      "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    venue: "Chemical Engineering Journal, 2025, 171737",
    doi: "10.1016/j.cej.2025.171737",
    url: "https://doi.org/10.1016/j.cej.2025.171737",
  },
  {
    id: "pub-2025-02",
    year: 2025,
    title:
      "Disinfection mechanism of chlorine-resistant bacteria by micro-nano bubbles in drinking water: A case study of Bacillus cereus",
    titleEn:
      "Disinfection mechanism of chlorine-resistant bacteria by micro-nano bubbles in drinking water: A case study of Bacillus cereus",
    venue: "Chemical Engineering Journal, 2025, 515, 153782",
    doi: "10.1016/j.cej.2025.153782",
    url: "https://doi.org/10.1016/j.cej.2025.153782",
  },
  {
    id: "pub-2025-03",
    year: 2025,
    title:
      "Control mechanism of Escherichia coli invasion by micro-nano bubbles in drinking water distribution system",
    titleEn:
      "Control mechanism of Escherichia coli invasion by micro-nano bubbles in drinking water distribution system",
    venue: "Environmental Research, 2025, 270, 120897",
    doi: "10.1016/j.envres.2025.120897",
    url: "https://doi.org/10.1016/j.envres.2025.120897",
  },
  {
    id: "pub-2025-04",
    year: 2025,
    title:
      "Effect mechanism of micro-nano bubbles on biofilm in drinking water distribution systems",
    titleEn:
      "Effect mechanism of micro-nano bubbles on biofilm in drinking water distribution systems",
    venue: "Environmental Science: Water Research & Technology, 2025, 11, 754–767",
    doi: "10.1039/D4EW00704B",
    url: "https://doi.org/10.1039/D4EW00704B",
  },

  {
    id: "pub-2024-01",
    year: 2024,
    title:
      "Promoting strategies for biological stability in drinking water distribution system from the perspective of micro-nano bubbles",
    titleEn:
      "Promoting strategies for biological stability in drinking water distribution system from the perspective of micro-nano bubbles",
    venue: "Science of the Total Environment, 2024, 176615",
    doi: "10.1016/j.scitotenv.2024.176615",
    url: "https://doi.org/10.1016/j.scitotenv.2024.176615",
  },
  {
    id: "pub-2024-02",
    year: 2024,
    title:
      "Generation Mechanism of Hydroxyl Free Radicals in Micro–Nanobubbles Water and Its Prospect in Drinking Water",
    titleEn:
      "Generation Mechanism of Hydroxyl Free Radicals in Micro–Nanobubbles Water and Its Prospect in Drinking Water",
    venue: "Processes, 2024, 12, 683",
    doi: "10.3390/pr12040683",
    url: "https://doi.org/10.3390/pr12040683",
  },

  {
    id: "pub-2023-01",
    year: 2023,
    title:
      "Effects of hydraulic conditions on biofilm detached in drinking water distribution system",
    titleEn:
      "Effects of hydraulic conditions on biofilm detached in drinking water distribution system",
    venue: "Journal of Water Process Engineering, 2023, 53, 103882",
    doi: "10.1016/j.jwpe.2023.103882",
    url: "https://doi.org/10.1016/j.jwpe.2023.103882",
  },
  {
    id: "pub-2023-02",
    year: 2023,
    title:
      "Effects of flow velocity on biofilm composition and microbial molecular ecological network in reclaimed water distribution systems",
    titleEn:
      "Effects of flow velocity on biofilm composition and microbial molecular ecological network in reclaimed water distribution systems",
    venue: "Chemosphere, 2023, 341, 140010",
    doi: "10.1016/j.chemosphere.2023.140010",
    url: "https://doi.org/10.1016/j.chemosphere.2023.140010",
  },
  {
    id: "pub-2023-03",
    year: 2023,
    title:
      "Effect of Rational Fertilizer for Eggplants on Nitrogen and Phosphorus Pollutants in Agricultural Water Bodies",
    titleEn:
      "Effect of Rational Fertilizer for Eggplants on Nitrogen and Phosphorus Pollutants in Agricultural Water Bodies",
    venue: "Processes, 2023, 11(2): 579",
    doi: "10.3390/pr11020579",
    url: "https://doi.org/10.3390/pr11020579",
  },

  // ✅ 2022：原条目 “824, 153848” 的 DOI 对不上且作者不含王天志；已改为可核验且确为王天志作者的 STOTENV 条目
  {
    id: "pub-2022-01",
    year: 2022,
    title:
      "Novel control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
    titleEn:
      "Novel control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
    venue: "Science of the Total Environment, 2022, 834, 155289",
    doi: "10.1016/j.scitotenv.2022.155289",
    url: "https://doi.org/10.1016/j.scitotenv.2022.155289",
  },

  {
    id: "pub-2021-01",
    year: 2021,
    title:
      "Effect of Coagulation on Bio-treatment of Textile Wastewater: Quantitative Evaluation and Application",
    titleEn:
      "Effect of Coagulation on Bio-treatment of Textile Wastewater: Quantitative Evaluation and Application",
    venue: "Journal of Cleaner Production, 2021, 312, 127798",
    doi: "10.1016/j.jclepro.2021.127798",
    url: "https://doi.org/10.1016/j.jclepro.2021.127798",
  },

  {
    id: "pub-2022-02",
    year: 2022,
    title: "Novel Quantitative Evaluation of Biotreatment Suitability of Wastewater",
    titleEn: "Novel Quantitative Evaluation of Biotreatment Suitability of Wastewater",
    venue: "Water, 2022, 14(7), 1038",
    doi: "10.3390/w14071038",
    url: "https://doi.org/10.3390/w14071038",
  },
  {
    id: "pub-2022-03",
    year: 2022,
    title:
      "Formation and Microbial Composition of Biofilms in a Drinking Water Distribution System with Intermittent Micro-Nano-Bubbles Treatment",
    titleEn:
      "Formation and Microbial Composition of Biofilms in a Drinking Water Distribution System with Intermittent Micro-Nano-Bubbles Treatment",
    venue: "Water, 2022, 14(8): 1216",
    doi: "10.3390/w14081216",
    url: "https://doi.org/10.3390/w14081216",
  },

  // ✅ 2020：原条目标题与 DOI 不匹配，已改为可核验且确为王天志作者的 Scientific Reports 条目
  {
    id: "pub-2020-01",
    year: 2020,
    title:
      "Accumulation mechanism of biofilm under different water shear forces along the networked pipelines in a drip irrigation system",
    titleEn:
      "Accumulation mechanism of biofilm under different water shear forces along the networked pipelines in a drip irrigation system",
    venue: "Scientific Reports, 2020, 10, 63898",
    doi: "10.1038/s41598-020-63898-5",
    url: "https://doi.org/10.1038/s41598-020-63898-5",
  },

  // ✅ 2016：老师主页可核验 Ecological Indicators 条目
  {
    id: "pub-2016-01",
    year: 2016,
    title:
      "Biofilm growth kinetics and nutrient (N/P) adsorption in an urban lake using reclaimed water: A quantitative baseline for ecological health assessment",
    titleEn:
      "Biofilm growth kinetics and nutrient (N/P) adsorption in an urban lake using reclaimed water: A quantitative baseline for ecological health assessment",
    venue: "Ecological Indicators, 2016, 71: 598–607",
    doi: "10.1016/j.ecolind.2016.07.060",
    url: "https://doi.org/10.1016/j.ecolind.2016.07.060",
  },

  // ✅ 2016：老师主页可核验 Environmental Earth Sciences 条目
  {
    id: "pub-2016-02",
    year: 2016,
    title: "Biofilm microbial community structure in an urban lake utilizing reclaimed water",
    titleEn: "Biofilm microbial community structure in an urban lake utilizing reclaimed water",
    venue: "Environmental Earth Sciences, 2016, 75, 314",
    doi: "10.1007/s12665-015-5197-6",
    url: "https://doi.org/10.1007/s12665-015-5197-6",
  },

  // ✅ 2014：老师主页可核验 Environmental Earth Sciences 条目
  {
    id: "pub-2014-01",
    year: 2014,
    title:
      "Biofilms on the surface of gravels and aquatic plants in rivers and lakes with reusing reclaimed water",
    titleEn:
      "Biofilms on the surface of gravels and aquatic plants in rivers and lakes with reusing reclaimed water",
    venue: "Environmental Earth Sciences, 2014, 72: 743–755",
    doi: "10.1007/s12665-013-2998-3",
    url: "https://doi.org/10.1007/s12665-013-2998-3",
  },

  // ✅ 2019：老师主页可核验 SN Applied Sciences 条目（两篇）
  {
    id: "pub-2019-01",
    year: 2019,
    title:
      "Microbial mechanism of organic contaminant removal of sodium bentonite/clay (BC) mixtures in high-permeability regions utilizing reclaimed wastewater",
    titleEn:
      "Microbial mechanism of organic contaminant removal of sodium bentonite/clay (BC) mixtures in high-permeability regions utilizing reclaimed wastewater",
    venue: "SN Applied Sciences, 2019, 1(4)",
    doi: "10.1007/s42452-019-0320-z",
    url: "https://doi.org/10.1007/s42452-019-0320-z",
  },
  {
    id: "pub-2019-02",
    year: 2019,
    title:
      "Effects of Mixing Yellow River Water with Brackish Water on the Emitter’s Clogging Substance and Solid Particles in Drip Irrigation",
    titleEn:
      "Effects of Mixing Yellow River Water with Brackish Water on the Emitter’s Clogging Substance and Solid Particles in Drip Irrigation",
    venue: "SN Applied Sciences, 2019, 1(1269)",
    doi: "10.1007/s42452-019-1287-5",
    url: "https://doi.org/10.1007/s42452-019-1287-5",
  },

  // ✅ 2017：农业水管理（可核验包含王天志）
  {
    id: "pub-2017-01",
    year: 2017,
    title:
      "Effects of microbial community variation on bio-clogging in drip irrigation emitters using reclaimed water",
    titleEn:
      "Effects of microbial community variation on bio-clogging in drip irrigation emitters using reclaimed water",
    venue: "Agricultural Water Management, 2017, 194: 139–149",
    doi: "10.1016/j.agwat.2017.09.006",
    url: "https://doi.org/10.1016/j.agwat.2017.09.006",
  },

  // —— 以下条目：暂未检索到“作者确含王天志”的 DOI（或检索结果不稳定/不一致），因此不添加 DOI —— //
  {
    id: "pub-2018-01",
    year: 2018,
    title:
      "Evaluating chemical composition and relevant microbial communities in thermophilic and mesophilic anaerobic digestions of food waste",
    titleEn:
      "Evaluating chemical composition and relevant microbial communities in thermophilic and mesophilic anaerobic digestions of food waste",
    venue: "Environmental Science and Pollution Research, 2018, 25(26): 26369-26377",
  },
  {
    id: "pub-2019-03",
    year: 2019,
    title:
      "Effect of organic matter on bio-clogging in reclaimed water drip irrigation systems",
    titleEn:
      "Effect of organic matter on bio-clogging in reclaimed water drip irrigation systems",
    venue: "Environmental Science and Pollution Research, 2019, 26(10): 10413-10421",
  },
  {
    id: "pub-2016-03",
    year: 2016,
    title:
      "Bioclogging in porous media under anaerobic condition: characteristics of clogging development and relevant microbial activities",
    titleEn:
      "Bioclogging in porous media under anaerobic condition: characteristics of clogging development and relevant microbial activities",
    venue: "Bioresource Technology, 2016, 221: 14-20",
  },

  // —— 以下为老师主页列出的中文期刊/会议与综述（保持原条目文本） ——
  {
    id: "pub-2020-book",
    year: 2020,
    title: "环境土壤治理，科学出版社，2020 （参编）",
    titleZh: "环境土壤治理，科学出版社，2020 （参编）",
    venue: "著作/教材",
  },
  {
    id: "pub-2024-cn-01",
    year: 2024,
    title:
      "黄俊，贾琨，李志杰，王天志. 微纳米气泡灌溉对设施番茄种植的影响机制研究，天津大学学报，2024（已收录）",
    titleZh: "微纳米气泡灌溉对设施番茄种植的影响机制研究",
    venue: "天津大学学报，2024（已收录）",
  },
  {
    id: "pub-2024-cn-02",
    year: 2024,
    title:
      "邱顾源，张铭哲，王天志. 典型高耗能工业园区碳排放特征及影响因素研究，天津大学学报，2024（已收录）",
    titleZh: "典型高耗能工业园区碳排放特征及影响因素研究",
    venue: "天津大学学报，2024（已收录）",
  },
  {
    id: "pub-2020-cn-01",
    year: 2020,
    title:
      "王天志，王伟楠，胡洪营，瞿连锁. 纳管印染废水生物处理特性评价及预处理策略筛选. 环境工程学报，2020，14(11):3021-3029",
    titleZh: "纳管印染废水生物处理特性评价及预处理策略筛选",
    venue: "环境工程学报，2020，14(11):3021-3029",
  },
  {
    id: "pub-2019-cn-01",
    year: 2019,
    title:
      "李云开，曲磊，王天志，等. 引黄滴灌条件下灌水器生物堵塞特征与机理研究. 农业机械学报，2019，50(11):267-277",
    titleZh: "引黄滴灌条件下灌水器生物堵塞特征与机理研究",
    venue: "农业机械学报，2019，50(11):267-277",
  },
  {
    id: "pub-2017-cn-01",
    year: 2017,
    title:
      "李云开，王克远，王天志，等. 高钙镁离子地下水滴灌系统灌水器堵塞特征与机理研究. 排灌机械工程学报，2017，35(4):345-350",
    titleZh: "高钙镁离子地下水滴灌系统灌水器堵塞特征与机理研究",
    venue: "排灌机械工程学报，2017，35(4):345-350",
  },
  {
    id: "pub-2019-conf-01",
    year: 2019,
    title:
      "Wang Tianzhi, Wang Weijie, Hu Hongying. Assessing bio-treatability of textile printing and dyeing wastewater. IWA International Conference. 2019",
    titleEn:
      "Assessing bio-treatability of textile printing and dyeing wastewater. IWA International Conference. 2019",
    venue: "IWA International Conference, 2019",
  },
  {
    id: "pub-2019-conf-02",
    year: 2019,
    title:
      "Hu Hongying, Wang Tianzhi, Wang Weijie. Assessing bio-treatability of textile printing and dyeing wastewater. IWA International Conference. 2019",
    titleEn:
      "Assessing bio-treatability of textile printing and dyeing wastewater. IWA International Conference. 2019",
    venue: "IWA International Conference, 2019",
  },
  {
    id: "pub-2021-review",
    year: 2021,
    title:
      "Soon-Thiam Khu, Xin Changchun, Wang Tianzhi. MNBs in drinking water distribution systems: A review. IWA International Conference. 2021",
    titleEn:
      "MNBs in drinking water distribution systems: A review. IWA International Conference. 2021",
    venue: "IWA International Conference, 2021",
  },
];

export default publications;
