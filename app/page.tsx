import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <div className="hero min-h-screen">
        <Hero />
      </div>
      {/* <div className="about min-h-auto py-4" id="about">
        <About />
      </div> */}
      <div className="about  min-h-auto mt-4 py-20" id="projects">
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
          A small selection of recent projects
        </h1>
        <Projects />
      </div>
      <div className="about  min-h-auto mt-4 py-10 md:py-20" id="testimonials">
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-purple-400 bg-opacity-50">
          Words of Praise
        </h1> 
        <Testimonials />
      </div>
      <div className="about min-h-auto" id="contact">
        <Footer />
      </div>
    </main>
  );
}
