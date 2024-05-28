import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto py-4 px-12">
          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4'>
            XGBoost Blood Pressure Predictor
          </h1>
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <p className="text-white text-base md:text-lg">
              Blood Pressure (BP) is a crucial indicator of cardiovascular health, and one of the most important vital signs 
              monitored by healthcare professionals to assess a patient's overall health. This project uses measures of daily
              behavior, such as exercise and sleep, collected from smartwatches to predict blood pressure levels and provide
              personalized recommendations to regulate BP to desired ranges. 
            </p>
          </div>
        </div>
    </main>
    );
}