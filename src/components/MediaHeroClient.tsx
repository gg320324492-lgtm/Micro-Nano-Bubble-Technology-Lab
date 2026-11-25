// 媒体页顶部标题区：C · 分栏版式（已固化；A 左对齐 / B 居中 / D 编号与切换器已移除）
// 左标题 / 右描述并排，下方 MEDIA 头做成左标题 + 右英文/描述的横条
import type { ReactNode } from "react";

type Props = {
  pageTitle: string;
  pageSubtitle: string;
  badge: string;
  titleZh: string;
  titleEn: string;
  description: string;
  children: ReactNode;
};

export default function MediaHeroClient({
  pageTitle,
  pageSubtitle,
  badge,
  titleZh,
  titleEn,
  description,
  children,
}: Props) {
  return (
    <div className="news-hero" data-style="c" id="media">
      <header className="nh nh--c">
        <div className="nh__cols">
          <div>
            <span className="nh__kicker">MEDIA &amp; SHOWCASE</span>
            <h1 className="nh__h1">{pageTitle}</h1>
          </div>
          <div className="nh__col-right">
            <p className="nh__lede">{pageSubtitle}</p>
          </div>
        </div>
        <div className="nh__bar">
          <div className="nh__bar-left">
            <span className="nh__badge">{badge}</span>
            <h2 className="nh__h2">{titleZh}</h2>
          </div>
          <div className="nh__bar-right">
            <p className="nh__en">{titleEn}</p>
            <p className="nh__desc">{description}</p>
          </div>
        </div>
      </header>

      {/* 媒体内容 */}
      {children}
    </div>
  );
}
