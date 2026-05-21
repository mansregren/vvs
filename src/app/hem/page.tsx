import { redirect } from "next/navigation";

// /hem är ersatt av /info — behåll redirect så ev. delade länkar funkar.
export default function HemPage() {
  redirect("/info");
}
