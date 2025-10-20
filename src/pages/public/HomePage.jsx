import { HeroSection } from "@/components/HeroSection";
import ArticleSection from "@/components/ArticleSection";

function HomePage() {
  return (
    <div className="w-full px-4 sm:px-5 md:px-10 lg:px-20 xl:px-30">
      <HeroSection />
      <ArticleSection />
    </div>
  );
}
export default HomePage;
