import Link from "next/link";

import { ExternalLinksGrid } from "@/components/ExternalLinksSection";
import SimpleCarousel from "@/components/SimpleCarousel";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

import { externalLinks } from "@/data/externalLinks";
import { showcasePhotos, showcaseStories } from "@/data/showcase";

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

export default function NewsPage() {
  const hasPhotos = showcasePhotos?.length > 0;
  const hasStories = showcaseStories?.length > 0;

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
          <ExternalLinksGrid links={externalLinks} />
        </NewsSectionContainer>
      </section>

      {/* 风采展示 */}
      <section id="showcase" className="mt-14 scroll-mt-[120px]">
        <NewsSectionContainer>
          <NewsSectionHeader
            badge="Showcase"
            titleZh="风采展示"
            titleEn="Team Showcase"
            description="课题组活动照片与日常瞬间，以及我们在组内沉淀的一些方法与故事。"
          />

          <div className="space-y-10">
          <Reveal>
            {hasPhotos ? (
              <SimpleCarousel images={showcasePhotos} autoPlay intervalMs={2200} />
            ) : (
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center text-sm text-[var(--muted)]">
                Coming soon
              </div>
            )}
          </Reveal>

          {/* 轮播图下方：课题组介绍（回退为原展示页内容） */}
          <Reveal>
            <Card as="section" className="p-6 md:p-10">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[var(--text)]">微纳米气泡课题组简介</h3>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                  微纳米气泡（Micro/Nano Bubbles, MNBs）因其超大比表面积、界面活性与更长停留时间，在{" "}
                  <strong className="font-semibold text-[var(--text)]">
                    传质强化、氧化反应增强、增氧与水质改善
                  </strong>{" "}
                  等方向展现出独特优势。我们聚焦“从机理到装备，再到应用落地”的完整链路：既回答为什么有效，也持续把有效做成可复制、可工程化的系统。
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
                    我们强调“数据闭环”：从设计—实验—建模—验证—迭代，形成可解释、可复现的研究流程。在这里，你不仅能做实验，更能学会把结果讲清楚、把机理讲扎实、把系统做稳定。
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
                    <p>• 清晰的成长路径：从“会做”到“做对”，再到“讲得清、做得稳”</p>
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
        </NewsSectionContainer>
      </section>
    </Section>
  );
}
