import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import JourneyTimeline from "./components/JourneyTimeline";
import Testimonials from "./components/Testimonials";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#090807] text-[#f5f1ed] relative overflow-x-hidden selection:bg-[#ff6b2c]/30 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Featured Projects Section */}
        <Projects />

        {/* Services & Indicative Pricing */}
        <Services />

        {/* Career & Learning Journey */}
        <JourneyTimeline />

        {/* Collaboration Highlights & Testimonials */}
        <Testimonials />

        {/* Honors & Certifications */}
        <Achievements />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
