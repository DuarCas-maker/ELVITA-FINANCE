import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <LegalPage title={legalPages.terms.title} sections={legalPages.terms.sections} />;
}
