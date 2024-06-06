"use client";
import React, {useTransition, useState} from "react";
import Image from "next/image";
import TabButton from "./TabButton";


const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <ul className="list-disc pl-2 text-white">
                <li>Python</li>
                <li>PyTorch & TensorFlow</li>
                <li>MySQL</li>
                <li>Java</li>
                <li>Next Js</li>
            </ul>
        )
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className="list-disc pl-2 text-white">
                <li>BS in Mathematics & Psychology, University of Texas at El Paso</li>
                <li>MS in Data and Information Sciences, University of Texas at El Paso</li>
            </ul>
        )
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className="list-disc pl-2 text-white">
                <li>GAN Specialization - Coursera</li>
                <li>Recommender Systems Specialization - Coursera</li>
                <li>Deep Learning Specialization - Coursera</li>
            </ul>
        )
    }

]


const HomeSection = () => {
    const [tab, setTab] = useState("skills");
    const [isPending, startTransition] = useTransition();
    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };
    return (
        <section id="home">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-8 sm:gap-x-16">
                <div className="col-span-7 place-self-center text-center sm:text-left">
                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-blue-950">
                            Francisco Arriaga
                        </span>
                    </h1>
                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        - AI Developer
                    </h1>
                    <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                        <p className="text-white text-base md:text-lg">
                            I&apos;m an AI developer specialized in deep learning and computer vision. My work has focused primarily in
                            generative modeling and recommender systems. A mixed background in mathematics, psychology, and computer science
                            allows me to approach problems with technical rigor without foregoing explainability. I leverage years of experience 
                            as an academic researcher as well as a Machine Learning contractor and Statistical Research Analyst for industry. 
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-12">
                            <a className="button py-2 sm:w-fit rounded-full flex justify-center" href="https://github.com/Blistt" target="_blank" rel="noopener noreferrer">
                                <button className="sm:w-fit rounded-full flex justify-center">
                                    <Image
                                        src="/images/githublogo2.png"
                                        alt= "github"
                                        width={68}
                                        height={68} />
                                </button>
                            </a>
                            <a className="button" href="/documents/FranciscoArriaga_Resume.pdf" download="Francisco_Arriaga_Resume.pdf">
                                <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-950 via-purple-500 to-pink-300 hover:bg-slate-800 text-white mt-3">
                                    <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-2 py-4">
                                        Download Resume
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-span-5 place-self-center py-6 mt-4 lg:mt-0">
                    <div className="rounded-full bg-[#181818] w-[250px] h-[250px] relative overflow-hidden">
                        <Image
                            src="/images/fran-clean.png"
                            alt="linkedin"
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            width={200}
                            height={200}
                        />
                    </div>

                    <div className="flex flex-row justify-start mt-8 text-white">
                        <TabButton 
                            selectTab={() => handleTabChange("skills")} 
                            active={tab === "skills"}> 
                            Skills 
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange("education")} 
                            active={tab === "education"}> 
                            Education 
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange("certifications")} 
                            active={tab === "certifications"}> 
                            Certifications
                        </TabButton>
                    </div>
                    <div className = "mt-8">
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
