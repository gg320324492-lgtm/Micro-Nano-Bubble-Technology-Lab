// src/app/honors/page.tsx
import { redirect } from "next/navigation";

export default function HonorsRedirect() {
  redirect("/publications?tab=honors");
}
