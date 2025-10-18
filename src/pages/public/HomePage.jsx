import { HeroSection } from "@/components/HeroSection"
import ArticleSection from "@/components/ArticleSection"

function HomePage() {
  return (
    <>  
    <div className="container mx-auto px-5">
    <HeroSection />
    <ArticleSection />
    </div>
    </>
  )
}
export default HomePage