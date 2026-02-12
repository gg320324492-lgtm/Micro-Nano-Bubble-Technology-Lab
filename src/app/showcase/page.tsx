// src/app/showcase/page.tsx
import Link from "next/link";
import SimpleCarousel from "@/components/SimpleCarousel";
import { showcasePhotos } from "@/data/showcase";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";

export default function ShowcasePage() {
  const hasPhotos = showcasePhotos?.length > 0;

  return (
    <Section container="wide">
      {/* 标题 */}
      <Reveal className="mb-8">
        <Heading as="h1" title="风采展示" />
      </Reveal>

      {/* 上：照片轮播 */}
      <ImageReveal>
        <section className="mb-12">
          {hasPhotos ? (
            <SimpleCarousel images={showcasePhotos} autoPlay intervalMs={2000} />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center text-sm text-slate-500">
              Coming soon
            </div>
          )}
        </section>
      </ImageReveal>

      {/* 下：课题组介绍（替代故事卡片） */}
      <Reveal>
        <Card as="section" className="p-6 md:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">微纳米气泡课题组简介</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              微纳米气泡（Micro/Nano Bubbles, MNBs）因其超大比表面积、界面活性与更长停留时间，
              在
              <strong className="font-semibold text-gray-900">
                传质强化、氧化反应增强、增氧与水质改善
              </strong>
              等方向展现出独特优势。我们聚焦“从机理到装备，再到应用落地”的完整链路：既回答为什么有效，也持续把有效做成可复制、可工程化的系统。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* 左列 */}
            <div>
              <h3 className="text-lg font-semibold">我们在研究什么</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                课题组围绕微纳米气泡的
                <strong className="font-semibold text-gray-900">
                  生成、调控与反应强化
                </strong>
                展开，关注气泡粒径/浓度/电位等特性如何影响传质与反应动力学，并将其应用于饮用水安全、环境治理与智能化工程系统中。
              </p>

              <div className="mt-4 space-y-2 text-muted-foreground leading-7">
                <p>• 气泡生成与结构调控：流道结构、喷射/旋流、空化与剪切协同机制</p>
                <p>• 气泡表征与行为：粒径分布、浓度、ζ 电位、稳定性与溶解行为</p>
                <p>• 强化氧化与污染控制：臭氧/活性氧物种生成与反应路径、动力学与机理</p>
                <p>• 工程化与智能化：装置集成、传感监测、控制策略与应用场景验证</p>
              </div>
            </div>

            {/* 右列 */}
            <div>
              <h3 className="text-lg font-semibold">我们如何做研究</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                我们强调“数据闭环”：从设计—实验—建模—验证—迭代，形成可解释、可复现的研究流程。
                在这里，你不仅能做实验，更能学会把结果讲清楚、把机理讲扎实、把系统做稳定。
              </p>

              <div className="mt-4 space-y-2 text-muted-foreground leading-7">
                <p>• 实验：反应器搭建、运行参数设计、对照组与重复性控制</p>
                <p>• 表征：气泡粒径/浓度、溶解臭氧、自由基指示、理化与微生物指标等</p>
                <p>• 建模与分析：动力学拟合、结构参数影响分析、机理推断与可视化表达</p>
                <p>• 工程落地：装置迭代、现场试验、稳定性评估与可维护性设计</p>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">你在这里会收获什么</h3>
              <div className="mt-4 space-y-2 text-muted-foreground leading-7">
                <p>• 完整的科研训练：问题拆解 → 实验设计 → 数据分析 → 论文表达</p>
                <p>• 工程能力提升：设备搭建、传感器与控制、系统集成与调参</p>
                <p>• 团队协作氛围：高频讨论、互相支持、共同打磨结果与表达</p>
                <p>• 清晰的成长路径：从“会做”到“做对”，再到“讲得清、做得稳”</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">加入我们</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                如果你对
                <strong className="font-semibold text-gray-900">
                  水环境治理、饮用水安全、微纳米气泡、强化氧化、装置与控制
                </strong>
                这些方向感兴趣，欢迎来聊聊你的想法与背景。你可以从一个小任务开始，逐步参与到更完整的课题中，并在团队支持下快速成长。
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={buttonClassName("primary", "px-5 py-2.5 text-sm")}
                >
                  联系我们 / 加入我们
                </Link>
                <Link
                  href="/people"
                  className={buttonClassName("secondary", "px-5 py-2.5 text-sm")}
                >
                  了解成员
                </Link>
              </div>
            </div>
          </div>

          {/* 结尾收束 */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50/90 to-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <p className="text-xl leading-8 text-slate-800 md:text-2xl md:leading-9">
              我们相信：真正有价值的研究，既能把机理讲清楚，也能把系统做稳定，更能在真实场景里产生可验证的成果。
              <span className="font-semibold"> 期待你的加入。</span>
            </p>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
