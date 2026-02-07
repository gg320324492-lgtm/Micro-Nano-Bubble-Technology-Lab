// src/app/contact/page.tsx
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function ContactPage() {
  // ✅ 这里的文案建议仍从 src/data/contact.ts 来
  // 你也可以把这几项挪回 data 文件里，再在此 import 使用
  const email = "wangtianzhi@tju.edu.cn";
  const address = "天津市南开区卫津路92号（天津大学），邮编：300072";
  const website = "https://faculty.tju.edu.cn/226066/zh_CN/index.htm";
  const amapLink = "https://www.amap.com"; // 你有更精确的链接就换成你的

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Hero */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          联系我们 / 加入我们 <span className="text-muted-foreground">Contact & Join Us</span>
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground leading-7">
          欢迎就科研合作、项目交流、参观访问与招生加入等事宜与我们联系。我们会尽快回复，并为你提供清晰的加入路径。
        </p>

        {/* Quick actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            发邮件联系
          </a>
          <a
            href={amapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium"
          >
            打开地图导航
          </a>
          <a
            href="#join"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium"
          >
            查看加入方式
          </a>
        </div>
      </header>

      {/* Main cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Contact */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">联系方式</h2>
            <p className="text-sm text-muted-foreground">Contact</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">邮箱 Email</div>
                <a className="break-all font-medium" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
              <CopyButton text={email} />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">地址 Address</div>
                <div className="font-medium">{address}</div>
              </div>
              <CopyButton text={address} />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">主页 Website</div>
                <a className="break-all font-medium underline" href={website} target="_blank" rel="noreferrer">
                  {website}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground leading-7">
            建议邮件主题格式：<span className="font-medium text-gray-900">【加入/合作】姓名-学校/单位-意向方向</span>，
            并附上简历或个人介绍（PDF）。
          </div>
        </div>

        {/* Join */}
        <div id="join" className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">加入我们</h2>
            <p className="text-sm text-muted-foreground">Join</p>
          </div>

          <p className="text-sm text-muted-foreground leading-7">
            我们欢迎对水环境治理、饮用水安全、微纳米气泡、强化氧化、装置与控制等方向感兴趣的同学加入。
            你可以从一个小任务开始，逐步参与到完整课题中，在团队支持下快速成长。
          </p>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div>• 招生对象：本科生 / 硕士生 / 博士生（长期有效）</div>
            <div>• 我们更看重：主动性、动手能力、数据意识与持续学习能力</div>
            <div>• 你可能参与：实验搭建、表征测试、动力学拟合、图表与论文表达、工程化与控制</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
            >
              申请加入（邮件）
            </a>
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium"
            >
              了解研究方向
            </Link>
          </div>
        </div>
      </section>

      {/* Join steps + FAQ (replace Notes) */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Steps */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">加入流程</h3>
          <p className="mt-1 text-sm text-muted-foreground">3 steps</p>

          <div className="mt-5 space-y-4 text-sm">
            <div className="rounded-xl border p-4">
              <div className="font-semibold">1）邮件自我介绍</div>
              <div className="mt-1 text-muted-foreground leading-7">
                说明你的背景、兴趣点与期望方向，附简历/成绩单/代表作（如有）。
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="font-semibold">2）沟通交流（线上/线下）</div>
              <div className="mt-1 text-muted-foreground leading-7">
                了解课题组项目与工作方式，匹配你的时间与目标，确定切入任务。
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="font-semibold">3）从小任务开始</div>
              <div className="mt-1 text-muted-foreground leading-7">
                用 1–2 周完成一个明确的小目标（实验/数据/建模/文献），快速进入状态。
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">常见问题</h3>
          <p className="mt-1 text-sm text-muted-foreground">FAQ</p>

          <div className="mt-5 space-y-3 text-sm">
            <details className="rounded-xl border p-4">
              <summary className="cursor-pointer font-semibold">
                我没有相关基础，可以加入吗？
              </summary>
              <div className="mt-2 text-muted-foreground leading-7">
                可以。我们更看重学习能力与执行力。入组后会从可落地的小任务开始，逐步补齐实验与数据分析能力。
              </div>
            </details>

            <details className="rounded-xl border p-4">
              <summary className="cursor-pointer font-semibold">
                课题组更偏实验还是偏建模/控制？
              </summary>
              <div className="mt-2 text-muted-foreground leading-7">
                我们强调“机理—实验—建模—工程化”闭环。你可以根据兴趣侧重某一块，也鼓励跨方向能力组合。
              </div>
            </details>

            <details className="rounded-xl border p-4">
              <summary className="cursor-pointer font-semibold">
                邮件里需要写哪些信息？
              </summary>
              <div className="mt-2 text-muted-foreground leading-7">
                建议包含：姓名/年级/学校、研究兴趣、可投入时间、过往经历与技能点（实验/编程/写作等），并附 PDF 简历。
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Big ending CTA */}
      <div className="mt-10 rounded-2xl border bg-muted p-6">
        <p className="text-xl md:text-2xl leading-9 text-gray-900">
          我们相信：真正有价值的研究，既能把机理讲清楚，也能把系统做稳定，更能在真实场景里产生可验证的成果。
          <span className="font-semibold"> 期待你的加入。</span>
        </p>
      </div>
    </main>
  );
}
