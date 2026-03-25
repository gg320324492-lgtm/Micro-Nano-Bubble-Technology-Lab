import ContactMethods from "@/components/contact/ContactMethods";
import JoinSteps from "@/components/contact/JoinSteps";
import FaqSection from "@/components/contact/FaqSection";
import Heading from "@/components/ui/Heading";
import contact from "@/data/contact";

export default function ContactPage() {
  const email = contact.email;
  const address = contact.addressZh;
  const addressLine1 = address.split("，")[0] ?? address;
  const addressLine2 = address.split("，")[1] ?? "";
  const website = contact.websiteZh;
  const websiteText = "faculty.tju.edu.cn";
  const amapLink = `https://www.amap.com/search?query=${encodeURIComponent(addressLine1)}`;

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-28 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />

      <header className="relative mb-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] md:mb-10 md:p-8">
        <Heading
          as="h1"
          title="联系我们 / 加入我们 Contact&JoinUs"
          className="[&>h1]:text-[var(--text)]"
          subtitleClassName="text-[var(--text-secondary)]"
          subtitle="欢迎联系科研合作与加入事宜。你可以通过邮件、地图导航和教师主页快速建立沟通，我们会尽快回复并提供清晰路径。"
        />
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <ContactMethods
            email={email}
            amapLink={amapLink}
            address={address}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            website={website}
            websiteText={websiteText}
          />

          <FaqSection />
        </div>

        <div className="lg:col-span-2">
          <JoinSteps />
        </div>
      </div>
    </main>
  );
}
