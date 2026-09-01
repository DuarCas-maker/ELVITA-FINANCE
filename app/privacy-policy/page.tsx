import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/data/legal";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPage title={legalPages.privacy.title} sections={legalPages.privacy.sections} />;
}
