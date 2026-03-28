// import HeroSection from "@/pages/home/components/HeroSection";
// import SolarEnaergyProduction from "@/pages/home/components/SolarEnaergyProduction";
// //@ is also difind the config.js file, if i used it, says like sart it src (src/*)
// the Landing page Components put this Bestpractice 

import EnergyPreview from "./components/EnergyPreview";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import Navbar from "./components/Navbar";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import UserPersona from "./components/UserPersona";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <HeroSection />
        <EnergyPreview />
        <InfoSection />
        <ProblemSection />
        <SolutionSection />
        <UserPersona />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;