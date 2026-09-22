import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BusinessProblems from "./components/BusinessProblems";
import Features from "./components/Features";
import Journey from "./components/Journey";
import Modules from "./components/Modules";
import Showcase from "./components/Showcase";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ConversionFlows from "./components/ConversionFlows";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <BusinessProblems />
        <Features />
        <Journey />
        <Modules />
        <Showcase />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ConversionFlows />
    </div>
  );
}
