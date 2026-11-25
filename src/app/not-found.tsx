import Link from "next/link";

export default function NotFound() {
  return (
    <div className="theme-navy min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-[var(--navy-accent-bright)]">404</h1>
      <p className="text-2xl text-[var(--navy-ink-dim)] mt-4">Page not found</p>
      <p className="text-[var(--muted)] mt-2">Sorry, the page you visited does not exist</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-[var(--navy-cta-bg)] text-[var(--navy-cta-ink)] rounded-lg hover:bg-[var(--navy-accent-bright)] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
