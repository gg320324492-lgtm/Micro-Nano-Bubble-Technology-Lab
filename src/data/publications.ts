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
  note?: string; // 备注（例如“待补充 DOI / 期刊信息”）
};

export const publications: Publication[] = [
  {
    id: "pub-2026-00",
    year: 2026,
    title:
      "Catalyst-free aqueous-phase oxidation of toluene by ozone micro-nanobubbles coupled with H2O2 via interfacial reactive oxygen species",
    titleEn:
      "Catalyst-free aqueous-phase oxidation of toluene by ozone micro-nanobubbles coupled with H2O2 via interfacial reactive oxygen species",
    venue: "Journal of Hazardous Materials, 2026, 513, 142456",
    doi: "10.1016/j.jhazmat.2026.142456",
    url: "https://www.sciencedirect.com/science/article/pii/S0304389426003179",
  },
  {
    id: "pub-2026-01",
    year: 2026,
    title:
      "Inhibition mechanism of micro-nano bubbles on green algae in bloom water: A case of Chlorella pyrenoidosa",
    titleEn:
      "Inhibition mechanism of micro-nano bubbles on green algae in bloom water: A case of Chlorella pyrenoidosa",
    venue: "Journal of Water Process Engineering, 2026, 83, 109637",
    doi: "10.1016/j.jwpe.2026.109637",
    url: "https://www.sciencedirect.com/science/article/pii/S2214714426001959?via%3Dihub",
  },
  {
    id: "pub-2026-02",
    year: 2026,
    title:
      "Hydrogen micro-nano bubbles mitigate polystyrene microplastics-induced toxicity through gut microbiota composition and metabolic functions",
    titleEn:
      "Hydrogen micro-nano bubbles mitigate polystyrene microplastics-induced toxicity through gut microbiota composition and metabolic functions",
    url: "https://www.sciencedirect.com/science/article/pii/S2214714426004551?via%3Dihub",
    note: "Please open this ScienceDirect page and fill journalLine + doi from the article page before publishing.",
  },
  {
    id: "pub-2026-03",
    year: 2026,
    title:
      "Demulsification of Oily Sludge Using Ozone Micro-Nanobubbles in Aqueous Media",
    titleEn:
      "Demulsification of Oily Sludge Using Ozone Micro-Nanobubbles in Aqueous Media",
    venue: "Recycling, 2026, 11(2): 24",
    doi: "10.3390/recycling11020024",
    url: "https://www.mdpi.com/2313-4321/11/2/24",
  },
  {
    id: "pub-2026-04",
    year: 2026,
    title:
      "Study on the Mechanism and Circular Agriculture Potential of Micro-Nano Bubbles in the Resourceful Utilization of Saline–Alkali Soils",
    titleEn:
      "Study on the Mechanism and Circular Agriculture Potential of Micro-Nano Bubbles in the Resourceful Utilization of Saline–Alkali Soils",
    venue: "Sustainability, 2026, 18(6), 2855",
    doi: "10.3390/su18062855",
    url: "https://www.mdpi.com/2071-1050/18/6/2855",
  },
  {
    id: "pub-2026-05",
    year: 2026,
    title:
      "Enhancement mechanism of micro-nano bubbles on chlorination disinfection in drinking water: A case study of Escherichia coli",
    titleEn:
      "Enhancement mechanism of micro-nano bubbles on chlorination disinfection in drinking water: A case study of Escherichia coli",
    venue: "Chemical Engineering Journal, 2026, 530, 173425",
    doi: "10.1016/j.cej.2026.173425",
    url: "https://www.sciencedirect.com/science/article/pii/S1385894726008843",
  },
  {
    id: "pub-2026-06",
    year: 2026,
    title:
      "Mechanisms of Enhancing Tetracycline Oxidation in Wastewater by Ozone Micro-Nano Bubbles",
    titleEn:
      "Mechanisms of Enhancing Tetracycline Oxidation in Wastewater by Ozone Micro-Nano Bubbles",
    venue: "Processes, 2026, 14, 1093",
    doi: "10.3390/pr14061093",
    url: "https://www.mdpi.com/2227-9717/14/6/1093",
  },
  {
    id: "pub-2026-07",
    year: 2026,
    title:
      "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    titleEn:
      "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    venue: "Chemical Engineering Journal, 2026, 527: 171737",
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
    venue: "Chemical Engineering Journal, 2025, 515, 163782",
    doi: "10.1016/j.cej.2025.163782",
    url: "https://doi.org/10.1016/j.cej.2025.163782",
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
      "Mechanism by which micro-nano bubbles impact biofilm growth in drinking water distribution systems",
    titleEn:
      "Mechanism by which micro-nano bubbles impact biofilm growth in drinking water distribution systems",
    venue: "Environmental Science: Water Research & Technology, 2025, 11, 754-767",
    doi: "10.1039/D4EW00704B",
    url: "https://pubs.rsc.org/en/content/articlelanding/2025/ew/d4ew00704b",
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
      "Generation Mechanism of Hydroxyl Free Radicals in Micro Nano Bubbles Water and Its Prospect in Drinking Water",
    titleEn:
      "Generation Mechanism of Hydroxyl Free Radicals in Micro Nano Bubbles Water and Its Prospect in Drinking Water",
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
      "Control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
    titleEn:
      "Control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
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
    title: "Quantitative Evaluation of Biotreatment Suitability of Wastewater",
    titleEn: "Quantitative Evaluation of Biotreatment Suitability of Wastewater",
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

  // —— 以下为老师主页列出的中文期刊/会议与综述（保持原条目文本） ——
  {
    id: "pub-2020-book",
    year: 2020,
    title: "环境土壤治理，科学出版社，2020 （副主编）",
    titleZh: "环境土壤治理，科学出版社，2020 （副主编）",
    venue: "著作/教材",
  },
  {
    id: "pub-2024-cn-01",
    year: 2025,
    title:
      "微纳米气泡灌溉对设施番茄种植的影响机制研究. 天津大学学报（自然科学与工程技术版）, 2025, 58(5): 531-540",
    titleZh: "微纳米气泡灌溉对设施番茄种植的影响机制研究",
    venue: "天津大学学报（自然科学与工程技术版）, 2025, 58(5): 531-540",
    doi: "10.11784/tdxbz202406006",
    url: "https://bfffhd6f268ca85324373hxfv5ob6c9wcb6pcuffgi.eds.tju.edu.cn/",
  },
  {
    id: "pub-2024-cn-02",
    year: 2024,
    title:
      "典型高耗能工业园区碳排放特征及影响因素研究. 天津大学学报（自然科学与工程技术版）, 2024, 57(11): 1111-1123",
    titleZh: "典型高耗能工业园区碳排放特征及影响因素研究",
    venue: "天津大学学报（自然科学与工程技术版）, 2024, 57(11): 1111-1123",
    doi: "10.11784/tdxbz202312013",
    url: "https://bfffhd6f268ca85324373hxfv5ob6c9wcb6pcuffgi.eds.tju.edu.cn/",
  },
  {
    id: "pub-2020-cn-01",
    year: 2020,
    title:
      "纳管印染废水生物处理特性及其定量评价. 环境工程学报，2020，14(11):3021-3029",
    titleZh: "纳管印染废水生物处理特性及其定量评价",
    venue: "环境工程学报，2020，14(11):3021-3029",
  },
  {
    id: "pub-2019-cn-01",
    year: 2019,
    title:
      "引黄滴灌条件下混配水对堵塞物质表面特征的影响，农业机械学报．2019, 50(11): 267-277.",
    titleZh: "引黄滴灌条件下混配水对堵塞物质表面特征的影响",
    venue: "农业机械学报，2019, 50(11): 267-277",
  },
  {
    id: "pub-2017-cn-01",
    year: 2017,
    title:
      "高钙镁离子地下水滴灌施肥系统堵塞效应. 排灌机械工程学报. 2017, 35(4):345-350.",
    titleZh: "高钙镁离子地下水滴灌施肥系统堵塞效应",
    venue: "排灌机械工程学报，2017，35(4):345-350",
  },

  // —— 新增论文（源自科研成果_网站更新版_不含作者信息.docx，2026-07-21） ——
  {
    id: "pub-2025-05",
    year: 2025,
    title:
      "Study on the Factors Affecting the Drainage Efficiency of New Integrated Irrigation and Drainage Networks and Network Optimization Based on Annual Cost System",
    titleEn:
      "Study on the Factors Affecting the Drainage Efficiency of New Integrated Irrigation and Drainage Networks and Network Optimization Based on Annual Cost System",
    venue: "Water, 2025, 17(8): 1201",
  },
  {
    id: "pub-2024-03",
    year: 2024,
    title:
      "Effect of Flow Fluctuation on Water Pollution in Drinking Water Distribution Systems",
    titleEn:
      "Effect of Flow Fluctuation on Water Pollution in Drinking Water Distribution Systems",
    venue: "Environmental Research, 2024, 246: 118142",
  },
  {
    id: "pub-2021-cn-01",
    year: 2021,
    title:
      "给水管网管壁生物膜对水质变化的影响. 第九届饮用水安全保障技术交流会论文集，杭州：中国给水排水杂志社，2021：103-113",
    titleZh: "给水管网管壁生物膜对水质变化的影响",
    venue:
      "第九届饮用水安全保障技术交流会论文集，杭州：中国给水排水杂志社，2021：103-113",
  },
  {
    id: "pub-2018-02",
    year: 2018,
    title:
      "Chemical Clogging Behavior in Drip Irrigation Systems Using Reclaimed Water",
    titleEn:
      "Chemical Clogging Behavior in Drip Irrigation Systems Using Reclaimed Water",
    venue: "Transactions of the ASABE, 2018, 61(5): 1667-1675",
  },
  {
    id: "pub-2017-02",
    year: 2017,
    title:
      "Effects of Riverbed and Lake Bottom Sediment Thickness on Infiltration and Purification of Reclaimed Water",
    titleEn:
      "Effects of Riverbed and Lake Bottom Sediment Thickness on Infiltration and Purification of Reclaimed Water",
    venue: "Environmental Earth Sciences, 2017, 76(1): 37",
  },
  {
    id: "pub-2016-04",
    year: 2016,
    title:
      "Formulation of an Emitter Clogging Control Strategy for Drip Irrigation with Reclaimed Water",
    titleEn:
      "Formulation of an Emitter Clogging Control Strategy for Drip Irrigation with Reclaimed Water",
    venue: "Irrigation and Drainage, 2016, 65(4): 451-460",
  },
  {
    id: "pub-2015-01",
    year: 2015,
    title:
      "Nitrogen and Phosphate Adsorption on Biofilms in Reclaimed Water",
    titleEn:
      "Nitrogen and Phosphate Adsorption on Biofilms in Reclaimed Water",
    venue: "Environmental Earth Sciences, 2015, 74(1): 451-461",
  },
  {
    id: "pub-2013-01",
    year: 2013,
    title:
      "Structural and Fractal Characteristics of Biofilm Attached on the Surfaces of Aquatic Plants and Gravels in the Rivers and Lakes Reusing Reclaimed Wastewater",
    titleEn:
      "Structural and Fractal Characteristics of Biofilm Attached on the Surfaces of Aquatic Plants and Gravels in the Rivers and Lakes Reusing Reclaimed Wastewater",
    venue: "Environmental Earth Sciences, 2013, 70(5): 2319-2333",
  },
];

export default publications;
