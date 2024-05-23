import Navbar from "../../components/Navbar"; // Adjust the path as needed

export default function Page() {
    return   (
      <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div class="container mt-24 mx-auto py-4 px-12">
          Gan-interpolator
        </div>
      </main>
    )
  }