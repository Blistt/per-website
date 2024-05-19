import Image from "next/image";
import HomeSection from "./components/HomeSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div class="container mt-24 mx-auto py-4 px-12">
        <HomeSection />
        <ProjectsSection />
      </div>
    </main>
  );
}