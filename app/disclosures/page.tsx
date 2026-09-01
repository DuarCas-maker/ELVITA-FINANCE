import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";
import { disclosures } from "@/data/site";

export const metadata = { title: "Disclosures" };

export default function DisclosuresPage() {
  return <LegalPage title={legalPages.disclosures.title} sections={[["Application Authorization", disclosures.join("\n\n")], ...legalPages.disclosures.sections.slice(1)]} />;
}
