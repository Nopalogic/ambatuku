import ContentSection from "@/components/admin/content-section";

import { AppearanceForm } from "./form";

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  );
}
