/** @type {import('next-sitemap').Config} */
module.exports = {
  // 与 layout.tsx metadataBase 保持一致，canonical 域名为裸域
  siteUrl: 'https://mnb-lab.cn',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}