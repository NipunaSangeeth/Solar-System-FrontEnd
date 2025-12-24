import HeroSection from "@/pages/home/components/HeroSection";
import SolarEnaergyProduction from "@/pages/home/components/SolarEnaergyProduction";
//@ is also difind the config.js file, if i used it, says like sart it src (src/*)

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <SolarEnaergyProduction />
    </main>
  );
};

export default HomePage;
