import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";

export const metadata = { title: "Data & Security Notice" };

export default function DataSecurityPage() {
  return <LegalPage title={legalPages.security.title} sections={legalPages.security.sections} />;
}
