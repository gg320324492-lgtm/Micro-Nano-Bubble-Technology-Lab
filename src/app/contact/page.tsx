import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function ContactPage() {
  const email = "wangtianzhi@tju.edu.cn";
  const addressLine1 = "天津市南开区卫津路92号（天津大学）";
  const addressLine2 = "邮编：300072";
  const address = `${addressLine1}，${addressLine2}`;
  const website = "https://faculty.tju.edu.cn/226066/zh_CN/index.htm";
  const websiteText = "faculty.tju.edu.cn";
  const amapLink = "https://www.amap.com";
  const mailSubject = "【加入/合作】姓名-学校/单位-意向方向";
  const fullContact = `邮箱：${email}\n地址：${address}\n主页：${website}`;

  const actionBtnClass =
    "inline-flex h-8 min-w-[78px] items-center justify-center rounded-full border px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-50";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-9">
        <h1 className="text-3xl font-semibold tracking-tight">
          联系我们 / 加入我们 <span className="text-muted-foreground">Contact & Join Us</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          欢迎联系科研合作与加入事宜，我们会尽快回复并提供清晰路径。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(mailSubject)}`}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            发送邮件 / 申请加入
          </a>
          <a
            href={amapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium"
          >
            打开地图
          </a>
          <CopyButton text={fullContact} className="px-5 py-2.5 text-sm font-medium" />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">联系方式</h2>
            <p className="text-sm text-muted-foreground">Contact</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">邮箱 Email</div>
                <a className="break-all font-medium" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
              <CopyButton text={email} className={actionBtnClass} />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">地址 Address</div>
                <div className="font-medium">{addressLine1}</div>
                <div className="font-medium">{addressLine2}</div>
              </div>
              <CopyButton text={address} className={actionBtnClass} />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
              <div className="min-w-0">
                <div className="text-muted-foreground">主页 Website</div>
                <a className="font-medium underline" href={website} target="_blank" rel="noreferrer">
                  {websiteText}
                </a>
              </div>
              <a href={website} target="_blank" rel="noreferrer" className={actionBtnClass}>
                打开
              </a>
            </div>
          </div>
        </div>

        <div id="join" className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">加入我们</h2>
            <p className="text-sm text-muted-foreground">Join</p>
          </div>

          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              <span className="font-medium text-slate-900">我们欢迎谁：</span>
              欢迎对水环境治理、饮用水安全、微纳米气泡、强化氧化、装置与控制方向感兴趣的同学加入。
            </p>
            <p>
              <span className="font-medium text-slate-900">我们看重什么：</span>
              我们更看重主动性、动手能力、数据意识与持续学习能力。
            </p>
            <p>
              <span className="font-medium text-slate-900">你需要准备什么：</span>
              建议准备自我介绍、研究兴趣与可投入时间，并附简历或个人介绍（PDF）。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(mailSubject)}`}
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

      <section className="mt-8 grid items-start gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">加入流程</h3>
          <p className="mt-1 text-sm text-muted-foreground">3 steps</p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">1）邮件自我介绍</div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">通常 1 天内完成</span>
              </div>
              <p className="mt-2 text-muted-foreground">说明背景与兴趣方向，附简历/成绩单/代表作（如有）。</p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">2）沟通交流</div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">通常 1–3 天安排</span>
              </div>
              <p className="mt-2 text-muted-foreground">了解课题项目与工作方式，匹配你的时间与目标。</p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">3）从小任务开始</div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">通常 1–2 周进入状态</span>
              </div>
              <p className="mt-2 text-muted-foreground">完成一个明确小目标，逐步参与到完整课题中。</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">常见问题</h3>
            <p className="mt-1 text-sm text-muted-foreground">FAQ</p>

            <div className="mt-5 space-y-3 text-sm">
              <details className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">我没有相关基础，可以加入吗？</summary>
                <div className="mt-2 text-muted-foreground leading-7">
                  可以。我们更看重学习能力与执行力，通常会从可落地的小任务开始。
                </div>
              </details>

              <details className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">课题组更偏实验还是偏建模/控制？</summary>
                <div className="mt-2 text-muted-foreground leading-7">
                  我们强调“机理—实验—建模—工程化”闭环，可根据兴趣侧重，也鼓励跨方向能力组合。
                </div>
              </details>

              <details className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">邮件里需要写哪些信息？</summary>
                <div className="mt-2 text-muted-foreground leading-7">
                  建议包含姓名/年级/学校、研究兴趣、可投入时间，以及过往经历与技能点，并附 PDF 简历。
                </div>
              </details>
            </div>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">申请邮件清单</h4>
            <div className="mt-3 space-y-1.5 text-sm text-slate-600">
              <div>• 自我介绍</div>
              <div>• 研究兴趣</div>
              <div>• 简历</div>
              <div>• 成绩单</div>
              <div>• 代表作 / 项目经历</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-black/10 bg-slate-50 p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
        <h3 className="text-xl font-semibold text-slate-900">合作入口</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">欢迎围绕成果转化与应用场景开展合作沟通。</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("【合作】姓名-单位-合作方向")}`}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            合作联系
          </a>
          <Link
            href="/industrialization"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-slate-800"
          >
            产业化页面
          </Link>
        </div>
      </div>
    </main>
  );
}
