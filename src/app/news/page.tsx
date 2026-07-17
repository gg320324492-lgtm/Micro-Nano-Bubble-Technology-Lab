import type { Metadata } from "next";
import Link from "next/link";

import { ExternalLinksGrid } from "@/components/ExternalLinksSection";
import LabZoneTabs from "@/components/LabZoneTabs";
import LightboxGallery, {
  type GalleryItem,
} from "@/components/LightboxGallery";
import ShowcaseTabs from "@/components/ShowcaseTabs";
import SimpleCarousel from "@/components/SimpleCarousel";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "媒体与风采",
  description: "天津大学微纳米气泡课题组的媒体报道、新闻动态与团队风采展示。",
};

import { externalLinks, sortExternalLinksByDate } from "@/data/externalLinks";
import {
  galleryCategories,
  showcasePhotos,
  showcaseStories,
} from "@/data/showcase";

type NewsSectionHeaderProps = {
  badge: string;
  titleZh: string;
  titleEn: string;
  description: string;
};

function NewsSectionHeader({ badge, titleZh, titleEn, description }: NewsSectionHeaderProps) {
  return (
    <div className="space-y-3 text-left">
      <p className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
        {badge}
      </p>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text">
          {titleZh}
        </h2>
        <p className="mt-1 text-xs md:text-sm font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
          {titleEn}
        </p>
      </div>
      <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}

function NewsSectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 px-6 py-8 shadow-[var(--shadow-card)] backdrop-blur-sm md:px-10 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)]/40 via-transparent to-[var(--accent-secondary)]/20 opacity-70" />
      <div className="relative z-10 space-y-6">
        {children}
      </div>
    </div>
  );
}

function buildGalleryPanel(categoryId: "lab" | "ruide-cup" | "defense") {
  const cat = galleryCategories.find((c) => c.id === categoryId);
  if (!cat) return null;
  const items = cat.photos.map<GalleryItem>((p) => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption ?? p.alt,
    focusY: p.focusY,
  }));

  return (
    <div className="space-y-6">
      {categoryId !== "lab" && categoryId !== "ruide-cup" && categoryId !== "defense" ? (
        <NewsSectionHeader
          badge={cat.badge}
          titleZh={cat.titleZh}
          titleEn={cat.titleEn}
          description={cat.description}
        />
      ) : null}

      {categoryId === "lab" ? (
        <LabPanel photos={items} />
      ) : categoryId === "ruide-cup" ? (
        <>
          {/* 瑞德杯：上方轮播图，下方文字详情（沿用「风采展示」页布局） */}
          <Reveal>
            <SimpleCarousel
              images={cat.photos.map((p) => ({ src: p.src, alt: p.alt }))}
              autoPlay
              intervalMs={1500}
            />
          </Reveal>
          <RuideCupDetailCard />
        </>
      ) : categoryId === "defense" ? (
        <>
          {/* 答辩会：上方轮播图，下方文字详情（沿用「风采展示」页布局） */}
          <Reveal>
            <SimpleCarousel
              images={cat.photos.map((p) => ({ src: p.src, alt: p.alt }))}
              autoPlay
              intervalMs={1500}
            />
          </Reveal>
          <DefenseDetailCard />
        </>
      ) : (
        <LightboxGallery
          layout="grid-3"
          showHeader={false}
          tone="core"
          items={items}
        />
      )}
    </div>
  );
}

/* 实验室 Tab 内容：3 个分区 Tab（顶部图片）+ 5 个功能区文字详情（下方） */
function LabPanel({ photos }: { photos: GalleryItem[] }) {
  // 按功能区对照片分组（3 个 Tab）
  const displayItems = photos.filter((p) =>
    /荣誉墙|论文墙|专利墙|研究方向展区|自主搭建/.test(p.caption ?? "")
  );
  const experimentItems = photos.filter((p) =>
    /研究环境|实验设备一角/.test(p.caption ?? "")
  );
  const pilotItems = photos.filter((p) =>
    /实验室门牌/.test(p.caption ?? "")
  );

  const displayPanel = (
    <LightboxGallery
      layout="grid-3"
      showHeader={false}
      tone="core"
      items={displayItems}
    />
  );
  const experimentPanel = (
    <LightboxGallery
      layout="grid-3"
      showHeader={false}
      tone="core"
      items={experimentItems}
    />
  );
  const pilotPanel = (
    <LightboxGallery
      layout="grid-3"
      showHeader={false}
      tone="core"
      items={pilotItems}
    />
  );

  return (
    <>
      {/* 顶部：3 个分区 Tab（图片） */}
      <LabZoneTabs
        displayPanel={displayPanel}
        experimentPanel={experimentPanel}
        pilotPanel={pilotPanel}
      />

      {/* 下方：5 个功能区文字详情 */}
      <LabDetailCard />
    </>
  );
}

/* 实验室详情卡：5 个功能区介绍（沿用「风采展示」Card 排版） */
function LabDetailCard() {
  return (
    <Reveal>
      <Card as="section" className="p-6 md:p-10">
        {/* 顶部：实验室简介 */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[var(--text)]">
            天津大学微纳米气泡实验室 · 功能区介绍
          </h3>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            实验室坐落于天津大学北洋园校区环境科学与工程学院，于近期完成装修升级。整体空间按照
            <strong className="font-semibold text-[var(--text)]">「展示—实验—测试—中试—样品」</strong>
            的全链路科研流程进行布局，划分为五个相互衔接又相对独立的功能区，既满足日常机理性实验需求，又可承接工程化放大与现场应用验证。
          </p>
        </div>

        {/* 第一行双栏：左 展示区 / 右 实验区 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">一、展示区 · Display Area</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              面向来访者与团队成员的「门面」空间，集中展示课题组成员、研究方向、阶段性论文与专利成果，以及历年获得的荣誉与奖项。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 团队简介墙：导师、博士生、硕士生与已毕业成员介绍</p>
              <p>• 研究方向展区：四大研究方向的图文与代表性装置</p>
              <p>• 荣誉墙 · 论文墙 · 专利墙：历年奖项与代表性产出</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">二、实验区 · Experiment Area</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              课题组日常开展机理研究与应用验证的「主阵地」，配备自主搭建的多套微纳米气泡生成与水处理实验装置，可同时支持 6–8 名同学并行实验。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 气泡生成与反应器：流道结构、喷射/旋流、空化与剪切协同</p>
              <p>• 水处理与循环水系统：自来水、配置水与养殖水的连续流实验</p>
              <p>• 在线传感：温度、pH、溶解氧、电导率、流量实时监测</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-[var(--border)]" />

        {/* 第二行双栏：左 机理测试区 / 右 中试区 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">三、机理测试区 · Mechanism Testing</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              围绕「为什么有效」展开的关键测试空间，聚焦气泡特性、反应过程与产物分布的高精度测量，是建立机理性认知的支撑平台。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 气泡粒径与浓度：激光粒度仪、高速摄像与显微计数</p>
              <p>• ζ 电位与稳定性：纳米/微米气泡表面电荷与停留行为</p>
              <p>• 反应活性物种：溶解臭氧、·OH 等自由基的定性与定量</p>
              <p>• 理化与微生物指标：COD、氨氮、菌落总数等</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">四、中试区 · Pilot Area</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              从实验室走向工程现场的「桥接区」，建设了日处理量百升至吨级的中试连续流装置，用于验证实验室成果在不同真实水质下的稳定性与可放大性。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 撬装式中试装置：模块化设计，便于搬运到现场</p>
              <p>• 多场景水质适配：饮用水、市政污水、工业循环水</p>
              <p>• 远程监控与数据回传：支持长期运行稳定性评估</p>
            </div>
          </div>
        </div>

        {/* 第三块：样品库（占满整行） */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-[var(--text)]">五、样品库 · Sample Library</h4>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            配套独立的样品储存空间，覆盖水样、土样、生物样品与气泡相关耗材的低温/避光/密封保存，确保实验可追溯、可复现。
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {[
              { title: "水样储存", desc: "4°C 冷藏，用于理化与微生物分析" },
              { title: "土样与底泥", desc: "-20°C 冷冻，保留原始理化特性" },
              { title: "生物样品", desc: "固定/冷冻双模式，便于显微观察" },
              { title: "气泡耗材", desc: "专用气瓶与注射器，保证纯度" },
            ].map((it) => (
              <div
                key={it.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-3.5 py-3"
              >
                <div className="text-sm font-semibold text-[var(--text)]">{it.title}</div>
                <div className="mt-1 text-[13px] text-[var(--text-secondary)]">{it.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 收尾金句 */}
        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--accent-soft)]/20 p-6">
          <p className="text-xl leading-8 text-[var(--text)] md:text-2xl md:leading-9">
            五个功能区相互衔接、彼此支撑——从展示与文化、到实验与机理、再到中试与样品库，构成一条完整的「从机理到工程」的科研链路。
            <span className="font-semibold"> 欢迎来访交流。</span>
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

/* 学位论文答辩 · 详情卡（沿用「风采展示」Card 排版） */
function DefenseDetailCard() {
  return (
    <Reveal>
      <Card as="section" className="p-6 md:p-10">
        {/* 顶部：答辩会简介 */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[var(--text)]">
            天津大学环境学院硕博学位论文答辩会
          </h3>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            学位论文答辩既是研究生培养的「最后一公里」，也是课题组成果对外展示的关键节点。每一次答辩背后，是数月乃至数年的实验、建模、写作与反复打磨——
            <strong className="font-semibold text-[var(--text)]">
              既考验科研成果的扎实程度，也考验表达与临场应变的能力
            </strong>
            。课题组坚持把每一次答辩当作学术训练的延伸，让每位同学带着「能讲清楚的机理」与「能站住的结论」走出答辩教室。
          </p>
        </div>

        {/* 第一行双栏：左 答辩流程 / 右 答辩准备 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">一、答辩流程</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              答辩按照学院统一规范组织，每位研究生有约 25–35 分钟的陈述与提问时间。流程紧凑、节奏明快，强调「把研究讲清楚、把问题答明白」。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 开场：答辩主席介绍委员、宣读答辩纪律</p>
              <p>• 个人陈述：研究背景、问题、方法、结果、创新点</p>
              <p>• 委员提问：围绕机理、证据链、应用前景与工作量</p>
              <p>• 答辩评议：闭门讨论并投票，当场宣读结果</p>
              <p>• 合影留念：与答辩委员、课题组师生共同记录</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">二、答辩准备</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              课题组形成了一套「预答辩—试讲—复盘」的内部训练流程：正式答辩前 2–3 周组织组内预答辩，针对逻辑、表达、PPT 与可能被问到的「刁钻问题」反复演练。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 预答辩：组内全员参加，按正式流程模拟一遍</p>
              <p>• PPT 反复打磨：每页只讲一个观点，图表大于文字</p>
              <p>• Q&amp;A 清单：师兄师姐与导师轮流「扮演评委」</p>
              <p>• 心理建设：把答辩视为一次真诚的学术对话</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-[var(--border)]" />

        {/* 第二行双栏：左 近年成果 / 右 毕业生发展 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">三、近年答辩成果</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              近年来，课题组硕博研究生均一次性通过学位论文答辩，多名同学获评「校级优秀硕士学位论文」「院级优秀博士学位论文」等荣誉。答辩委员会对课题组的机理性研究与工程化应用给予了一致肯定。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 一次性通过率：近三年保持 100%</p>
              <p>• 优秀学位论文：累计获评校级 / 院级优秀论文 5+ 篇</p>
              <p>• 研究方向：覆盖饮用水安全、环境治理、水产养殖、智能化装备</p>
              <p>• 委员评价：「机理扎实、数据可靠、应用前景明确」</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">四、毕业生发展</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              完成答辩的同学或继续在国内外知名高校深造，或进入环保、市政、水务、智能装备等行业头部企业。课题组多年积累的「能讲清楚机理、能做稳系统」的培养理念，让大家在新的岗位上依然具备扎实的成长后劲。
            </p>
            <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 升学去向：清华大学、同济大学、天津大学等高校博士生</p>
              <p>• 行业去向：环保央企、市政设计院、水务集团、智能装备企业</p>
              <p>• 校友网络：历届毕业生保持长期联系，跨届互助</p>
              <p>• 反哺机制：优秀校友返校分享、担任校外导师</p>
            </div>
          </div>
        </div>

        {/* 第三块：答辩小贴士（占满整行） */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-[var(--text)]">五、答辩小贴士 · Tips for Your Defense</h4>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            多年答辩经验沉淀的几条实用建议，覆盖 PPT、表达、心态三个维度：
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "10 / 20 / 30", desc: "10 页 PPT、20 分钟、30 号字号，强迫自己精炼" },
              { title: "讲问题，不讲过程", desc: "开门见山抛出问题，再讲你如何解决" },
              { title: "图表自解释", desc: "每张图都配一句 takeaway，让评委一眼看懂" },
              { title: "预演三遍", desc: "至少对镜子讲一遍、对同学讲一遍、对导师讲一遍" },
              { title: "准备 Q&A 清单", desc: "把可能被问到的问题写下来，提前写好答案要点" },
              { title: "承认不确定", desc: "不清楚就老实说，不要硬撑，坦诚反而加分" },
            ].map((it) => (
              <div
                key={it.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-3.5 py-3"
              >
                <div className="text-sm font-semibold text-[var(--text)]">{it.title}</div>
                <div className="mt-1 text-[13px] text-[var(--text-secondary)]">{it.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 收尾金句 */}
        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--accent-soft)]/20 p-6">
          <p className="text-xl leading-8 text-[var(--text)] md:text-2xl md:leading-9">
            答辩不是终点，而是把研究「讲清楚、讲扎实、讲出意义」的一次综合演练。
            <span className="font-semibold"> 答辩顺利，未来可期。</span>
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

/* 瑞德杯论坛 · 会议详情卡（沿用「风采展示」Card 排版） */
function RuideCupDetailCard() {
  const reports = [
    { time: "08:35 – 08:50", speaker: "赵航佳", topic: "水界面污染物行为的多尺度计算模拟" },
    { time: "08:50 – 09:05", speaker: "杨慧", topic: "微纳米气泡协同紫外对蜡样芽孢杆菌杀菌机制研究" },
    { time: "09:05 – 09:20", speaker: "余歆睿", topic: "微纳米气泡协同硫酸铜的除藻效能与作用机理研究" },
    { time: "09:20 – 09:35", speaker: "张宏魁", topic: "微纳米气泡对盐碱土壤源化利用的作用机制与循环农业潜力研究" },
    { time: "09:35 – 09:50", speaker: "陈金薪", topic: "臭氧微纳米气泡前沿研究综述：界面反应场、ROS 证据链与多场协同工程应用" },
    { time: "09:50 – 10:05", speaker: "王书馨", topic: "16S rRNA 扩增子测序的原理、发展与应用" },
    { time: "10:05 – 10:20", speaker: "李胜景", topic: "微纳米气泡赋能的种养一体化高效生产模式构建——八里台大棚年度成果汇报" },
    { time: "10:20 – 10:35", speaker: "刘子毅", topic: "微纳米气泡定向调控微藻代谢过程" },
    { time: "10:35 – 10:50", speaker: "吴孟铨", topic: "分子动力学（LAMMPS）的原理、应用与学习方法" },
    { time: "10:50 – 11:05", speaker: "关小未", topic: "循环水养殖体系下微纳米气泡对水培系统中硝酸盐去除的强化效果及机理研究" },
    { time: "11:05 – 11:20", speaker: "杜同贺", topic: "分享与年度回顾" },
    { time: "11:20 – 11:35", speaker: "陈天祥", topic: "高浓度臭氧微纳米气泡水在清洗过程中对果蔬的品质影响" },
    { time: "11:35 – 11:40", speaker: "韩重阳", topic: "年度科研工作总结与展望" },
    { time: "11:40 – 11:45", speaker: "李锐远", topic: "本年度研究总结与未来展望" },
    { time: "11:45 – 11:50", speaker: "胡小琪", topic: "臭氧微纳米气泡对油泥破乳实验进展及下学期计划" },
    { time: "11:50 – 11:55", speaker: "宋洋", topic: "基于臭氧微纳米气泡对膜污染的控制及饮用水处理的研究" },
    { time: "11:55 – 12:00", speaker: "耿嘉栋", topic: "臭氧发生器应用现状及前景分析" },
    { time: "12:05 – 12:10", speaker: "蒋卢迪", topic: "磁絮凝在含油废水中的应用进展" },
  ];

  return (
    <Reveal>
      <Card as="section" className="p-6 md:p-10">
        {/* 顶部：会议名称 + 主办信息 */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[var(--text)]">
            首届「瑞德杯」研究生学术论坛暨微纳米气泡课题组 2025 年终总结大会
          </h3>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            一年一度的「瑞德杯」是课题组内部的学术交流与年度复盘平台：同学们在一天之内集中汇报过去一年的研究成果，外部专家与导师现场点评，并以「报告评比」机制强化逻辑表达、答辩应对与学术规范训练；同时复盘年度工作、明确下一年度主线与分工。
          </p>
        </div>

        {/* 第一行：会议主题 | 会议目标 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">一、会议主题</h4>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              本次会议聚焦微纳米气泡在{" "}
              <strong className="font-semibold text-[var(--text)]">
                环境工程、化学工程、自动化
              </strong>{" "}
              等方向的研究进展，推动研究生学术表达与团队协同，系统总结课题组 2025 年度工作，部署 2026 年度重点任务。
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">二、会议目标</h4>
            <div className="mt-3 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 搭建高质量学术交流平台，促进不同研究方向之间的成果分享与方法互鉴</p>
              <p>• 集中汇报课题组 2025 年度代表性论文、专利、项目与关键数据进展</p>
              <p>• 依托「瑞德杯」报告评比机制，强化科研逻辑表达与答辩规范</p>
              <p>• 年度工作复盘：明确 2026 年度研究主线、分工与里程碑</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-[var(--border)]" />

        {/* 第二行：时间地点 | 参会人员 / 支持单位 */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">三、时间与地点</h4>
            <div className="mt-3 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• <strong className="font-semibold text-[var(--text)]">时间</strong>：2026 年 2 月 8 日（星期日）上午 8:30</p>
              <p>• <strong className="font-semibold text-[var(--text)]">地点</strong>：天津大学北洋园校区环境楼 59 楼 A217</p>
              <p>• <strong className="font-semibold text-[var(--text)]">参会人员</strong>：微纳米气泡课题组全体成员</p>
              <p>• <strong className="font-semibold text-[var(--text)]">支持单位</strong>：瑞德智创技术（天津）有限公司</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text)]">四、议程概览</h4>
            <div className="mt-3 space-y-2 text-[var(--text-secondary)] leading-7">
              <p>• 08:30 – 08:35　开幕式</p>
              <p>• 08:35 – 12:10　主题报告（18 位同学依次汇报）</p>
              <p>• 12:20 – 12:30　颁发证书（瑞德杯优秀报告奖）</p>
              <p>• 17:30 – 20:00　晚餐与自由交流</p>
            </div>
          </div>
        </div>

        {/* 第三块：报告主题列表（占满整行） */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-[var(--text)]">五、会议报告 · 报告人及题目</h4>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {reports.map((r) => (
              <div
                key={`${r.time}-${r.speaker}`}
                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-3.5 py-2.5"
              >
                <span className="shrink-0 rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                  {r.time}
                </span>
                <div className="min-w-0 leading-snug">
                  <div className="text-sm font-semibold text-[var(--text)]">{r.speaker}</div>
                  <div className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{r.topic}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 收尾金句 */}
        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--accent-soft)]/20 p-6">
          <p className="text-xl leading-8 text-[var(--text)] md:text-2xl md:leading-9">
            一年一度的「瑞德杯」，既是同学们展示成果、磨砺表达的舞台，也是课题组承上启下、规划新一年的关键节点。
            <span className="font-semibold"> 让每一次汇报都成为下一段科研的起点。</span>
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

export default function NewsPage() {
  const hasPhotos = showcasePhotos?.length > 0;
  const hasStories = showcaseStories?.length > 0;
  const sortedExternalLinks = sortExternalLinksByDate(externalLinks);

  /* 风采展示 Tab 内容：轮播 + 课题组介绍 */
  const showcasePanel = (
    <div className="space-y-10">
      <Reveal>
        {hasPhotos ? (
          <SimpleCarousel images={showcasePhotos} autoPlay intervalMs={1500} />
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center text-sm text-[var(--muted)]">
            Coming soon
          </div>
        )}
      </Reveal>

      <Reveal>
        <Card as="section" className="p-6 md:p-10">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-[var(--text)]">微纳米气泡课题组简介</h3>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              微纳米气泡（Micro/Nano Bubbles, MNBs）因其超大比表面积、界面活性与更长停留时间，在{" "}
              <strong className="font-semibold text-[var(--text)]">
                传质强化、氧化反应增强、增氧与水质改善
              </strong>{" "}
              等方向展现出独特优势。我们聚焦"从机理到装备，再到应用落地"的完整链路：既回答为什么有效，也持续把有效做成可复制、可工程化的系统。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold text-[var(--text)]">我们在研究什么</h4>
              <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                课题组围绕微纳米气泡的{" "}
                <strong className="font-semibold text-[var(--text)]">
                  生成、调控与反应强化
                </strong>{" "}
                展开，关注气泡粒径/浓度/电位等特性如何影响传质与反应动力学，并将其应用于饮用水安全、环境治理与智能化工程系统中。
              </p>

              <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
                <p>• 气泡生成与结构调控：流道结构、喷射/旋流、空化与剪切协同机制</p>
                <p>• 气泡表征与行为：粒径分布、浓度、ζ 电位、稳定性与溶解行为</p>
                <p>• 强化氧化与污染控制：臭氧/活性氧物种生成与反应路径、动力学与机理</p>
                <p>• 工程化与智能化：装置集成、传感监测、控制策略与应用场景验证</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text)]">我们如何做研究</h4>
              <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                我们强调"数据闭环"：从设计—实验—建模—验证—迭代，形成可解释、可复现的研究流程。在这里，你不仅能做实验，更能学会把结果讲清楚、把机理讲扎实、把系统做稳定。
              </p>

              <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
                <p>• 实验：反应器搭建、运行参数设计、对照组与重复性控制</p>
                <p>• 表征：气泡粒径/浓度、溶解臭氧、自由基指示、理化与微生物指标等</p>
                <p>• 建模与分析：动力学拟合、结构参数影响分析、机理推断与可视化表达</p>
                <p>• 工程落地：装置迭代、现场试验、稳定性评估与可维护性设计</p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-[var(--border)]" />

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold text-[var(--text)]">你在这里会收获什么</h4>
              <div className="mt-4 space-y-2 text-[var(--text-secondary)] leading-7">
                <p>• 完整的科研训练：问题拆解 → 实验设计 → 数据分析 → 论文表达</p>
                <p>• 工程能力提升：设备搭建、传感器与控制、系统集成与调参</p>
                <p>• 团队协作氛围：高频讨论、互相支持、共同打磨结果与表达</p>
                <p>• 清晰的成长路径：从"会做"到"做对"，再到"讲得清、做得稳"</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text)]">加入我们</h4>
              <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                如果你对{" "}
                <strong className="font-semibold text-[var(--text)]">
                  水环境治理、饮用水安全、微纳米气泡、强化氧化、装置与控制
                </strong>{" "}
                这些方向感兴趣，欢迎来聊聊你的想法与背景。你可以从一个小任务开始，逐步参与到更完整的课题中，并在团队支持下快速成长。
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className={buttonClassName("primary", "px-5 py-2.5 text-sm")}>
                  联系我们 / 加入我们
                </Link>
                <Link href="/people" className={buttonClassName("secondary", "px-5 py-2.5 text-sm")}>
                  了解成员
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--accent-soft)]/20 p-6">
            <p className="text-xl leading-8 text-[var(--text)] md:text-2xl md:leading-9">
              我们相信：真正有价值的研究，既能把机理讲清楚，也能把系统做稳定，更能在真实场景里产生可验证的成果。
              <span className="font-semibold"> 期待你的加入。</span>
            </p>
          </div>
        </Card>
      </Reveal>

      {hasStories ? (
        <div className="grid gap-5 md:grid-cols-2">
          {showcaseStories.map((s) => (
            <Reveal key={s.title}>
              <Card className="p-6">
                <div className="text-xs font-bold text-[var(--muted)]">{s.date ?? ""}</div>
                <div className="mt-2 text-lg font-semibold text-[var(--text)]">{s.title}</div>
                {s.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--accent-soft)]/40 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {s.content}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );

  const labPanel = buildGalleryPanel("lab");
  const ruideCupPanel = buildGalleryPanel("ruide-cup");
  const defensePanel = buildGalleryPanel("defense");

  return (
    <Section container="wide">
      <Reveal className="mb-8">
        <Heading
          as="h1"
          title="媒体与风采 Media & Showcase"
          className="[&_h1]:text-[var(--text)]"
          subtitleClassName="text-[var(--text-secondary)]"
          subtitle="汇总课题组媒体报道与团队风采。"
        />
      </Reveal>

      {/* 媒体报道 */}
      <section id="media" className="scroll-mt-[120px]">
        <NewsSectionContainer>
          <NewsSectionHeader
            badge="Media"
            titleZh="媒体报道"
            titleEn="Media Coverage"
            description="了解我们在外部平台上的更多故事、报道与合作机会。"
          />
          <ExternalLinksGrid links={sortedExternalLinks} initialVisibleCount={6} />
        </NewsSectionContainer>
      </section>

      {/* 课题组图集：风采展示 / 实验室 / 瑞德杯 / 答辩会 —— Tab 切换 */}
      <section id="showcase" className="mt-14 scroll-mt-[120px]">
        <NewsSectionContainer>
          <NewsSectionHeader
            badge="Gallery"
            titleZh="课题组图集"
            titleEn="Team Gallery"
            description="课题组日常活动、实验室、学术会议与学位论文答辩等图片集合。"
          />
          <ShowcaseTabs
            showcasePanel={showcasePanel}
            labPanel={labPanel}
            ruideCupPanel={ruideCupPanel}
            defensePanel={defensePanel}
          />
        </NewsSectionContainer>
      </section>
    </Section>
  );
}