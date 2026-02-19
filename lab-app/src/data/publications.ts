// 论文 publications 数据模型

export type Publication = {
  id: string;
  year: number;
  title: string;
  titleZh?: string;
  titleEn?: string;
  venue?: string;
  doi?: string;
  url?: string;
};

export const publications: Publication[] = [
  {
    id: "pub-2025-01",
    year: 2025,
    title: "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    titleEn: "Disinfection mechanism of micro-nano bubbles on Bacillus cereus in drinking water under ultraviolet irradiation",
    venue: "Chemical Engineering Journal, 2025, 171737",
    doi: "10.1016/j.cej.2025.171737",
    url: "https://doi.org/10.1016/j.cej.2025.171737",
  },
  {
    id: "pub-2025-02",
    year: 2025,
    title: "Disinfection mechanism of chlorine-resistant bacteria by micro-nano bubbles in drinking water: A case study of Bacillus cereus",
    titleEn: "Disinfection mechanism of chlorine-resistant bacteria by micro-nano bubbles in drinking water: A case study of Bacillus cereus",
    venue: "Chemical Engineering Journal, 2025, 515, 153782",
    doi: "10.1016/j.cej.2025.153782",
    url: "https://doi.org/10.1016/j.cej.2025.153782",
  },
  {
    id: "pub-2025-03",
    year: 2025,
    title: "Control mechanism of Escherichia coli invasion by micro-nano bubbles in drinking water distribution system",
    titleEn: "Control mechanism of Escherichia coli invasion by micro-nano bubbles in drinking water distribution system",
    venue: "Environmental Research, 2025, 270, 120897",
    doi: "10.1016/j.envres.2025.120897",
    url: "https://doi.org/10.1016/j.envres.2025.120897",
  },
  {
    id: "pub-2025-04",
    year: 2025,
    title: "Effect mechanism of micro-nano bubbles on biofilm in drinking water distribution systems",
    titleEn: "Effect mechanism of micro-nano bubbles on biofilm in drinking water distribution systems",
    venue: "Environmental Science: Water Research & Technology, 2025, 11, 754–767",
    doi: "10.1039/D4EW00704B",
    url: "https://doi.org/10.1039/D4EW00704B",
  },
  {
    id: "pub-2024-01",
    year: 2024,
    title: "Promoting strategies for biological stability in drinking water distribution system from the perspective of micro-nano bubbles",
    titleEn: "Promoting strategies for biological stability in drinking water distribution system from the perspective of micro-nano bubbles",
    venue: "Science of the Total Environment, 2024, 176615",
    doi: "10.1016/j.scitotenv.2024.176615",
    url: "https://doi.org/10.1016/j.scitotenv.2024.176615",
  },
  {
    id: "pub-2024-02",
    year: 2024,
    title: "Generation Mechanism of Hydroxyl Free Radicals in Micro–Nanobubbles Water and Its Prospect in Drinking Water",
    titleEn: "Generation Mechanism of Hydroxyl Free Radicals in Micro–Nanobubbles Water and Its Prospect in Drinking Water",
    venue: "Processes, 2024, 12, 683",
    doi: "10.3390/pr12040683",
    url: "https://doi.org/10.3390/pr12040683",
  },
  {
    id: "pub-2023-01",
    year: 2023,
    title: "Effects of hydraulic conditions on biofilm detached in drinking water distribution system",
    titleEn: "Effects of hydraulic conditions on biofilm detached in drinking water distribution system",
    venue: "Journal of Water Process Engineering, 2023, 53, 103882",
    doi: "10.1016/j.jwpe.2023.103882",
    url: "https://doi.org/10.1016/j.jwpe.2023.103882",
  },
  {
    id: "pub-2023-02",
    year: 2023,
    title: "Effects of flow velocity on biofilm composition and microbial molecular ecological network in reclaimed water distribution systems",
    titleEn: "Effects of flow velocity on biofilm composition and microbial molecular ecological network in reclaimed water distribution systems",
    venue: "Chemosphere, 2023, 341, 140010",
    doi: "10.1016/j.chemosphere.2023.140010",
    url: "https://doi.org/10.1016/j.chemosphere.2023.140010",
  },
  {
    id: "pub-2022-01",
    year: 2022,
    title: "Novel control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
    titleEn: "Novel control strategies for biofilm control in reclaimed water distribution systems from the perspective of microbial antagonism and electrochemistry",
    venue: "Science of the Total Environment, 2022, 834, 155289",
    doi: "10.1016/j.scitotenv.2022.155289",
    url: "https://doi.org/10.1016/j.scitotenv.2022.155289",
  },
  {
    id: "pub-2021-01",
    year: 2021,
    title: "Effect of Coagulation on Bio-treatment of Textile Wastewater: Quantitative Evaluation and Application",
    titleEn: "Effect of Coagulation on Bio-treatment of Textile Wastewater: Quantitative Evaluation and Application",
    venue: "Journal of Cleaner Production, 2021, 312, 127798",
    doi: "10.1016/j.jclepro.2021.127798",
    url: "https://doi.org/10.1016/j.jclepro.2021.127798",
  },
  {
    id: "pub-2020-01",
    year: 2020,
    title: "Accumulation mechanism of biofilm under different water shear forces along the networked pipelines in a drip irrigation system",
    titleEn: "Accumulation mechanism of biofilm under different water shear forces along the networked pipelines in a drip irrigation system",
    venue: "Scientific Reports, 2020, 10, 63898",
    doi: "10.1038/s41598-020-63898-5",
    url: "https://doi.org/10.1038/s41598-020-63898-5",
  },
  {
    id: "pub-2016-01",
    year: 2016,
    title: "Biofilm growth kinetics and nutrient (N/P) adsorption in an urban lake using reclaimed water: A quantitative baseline for ecological health assessment",
    titleEn: "Biofilm growth kinetics and nutrient (N/P) adsorption in an urban lake using reclaimed water: A quantitative baseline for ecological health assessment",
    venue: "Ecological Indicators, 2016, 71: 598–607",
    doi: "10.1016/j.ecolind.2016.07.060",
    url: "https://doi.org/10.1016/j.ecolind.2016.07.060",
  },
];

export default publications;
