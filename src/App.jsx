import { useEffect } from "react";
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
import { ContactPage, PrivacyPolicyPage, TermsPage } from "./pages/LegalPages";

function HomePage() {
  return (
    <>
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
    </>
  );
}

function normalizePath(pathname) {
  const cleaned = pathname.replace(/\/+$/, "");
  return cleaned || "/";
}

export default function App() {
  const path = normalizePath(window.location.pathname);
  const page =
    path === "/privacy"
      ? "privacy"
      : path === "/terms"
        ? "terms"
        : path === "/contact"
          ? "contact"
          : "home";

  useEffect(() => {
    const titles = {
      home: "Bispun — Business Control CRM",
      privacy: "Privacy Policy — Bispun",
      terms: "Terms & Conditions — Bispun",
      contact: "Contact — Bispun",
    };
    document.title = titles[page];
  }, [page]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {page === "privacy" && <PrivacyPolicyPage />}
        {page === "terms" && <TermsPage />}
        {page === "contact" && <ContactPage />}
        {page === "home" && <HomePage />}
      </main>
      <Footer />
      {page === "home" && <ConversionFlows />}
    </div>
  );
}
