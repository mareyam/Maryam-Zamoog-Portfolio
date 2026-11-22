import DesignerHero from "@/components/sections/DesignerHero";
import ScrollCanvas from "@/components/sections/ScrollCanvas";
import ContactFooter from "@/components/sections/ContactFooter";
import ScrollTheme from "@/components/ScrollTheme";

export default function FirstPage() {
  return (
    <ScrollTheme>
      <DesignerHero />
      <ScrollCanvas />
      <ContactFooter />
    </ScrollTheme>
  );
}
