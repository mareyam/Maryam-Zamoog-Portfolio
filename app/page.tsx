import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Tools from "@/components/sections/Tools";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tools />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
