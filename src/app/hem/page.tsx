import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// /hem är ersatt av /info — behåll redirect så ev. delade länkar funkar.
export default function HemPage() {
  redirect("/info");
}
