"use client";
import React from "react"
import ProjectCard from "./ProjectCard"

const ProjectsData =[
  {
    id: 1,
    title: "GAN Frame Interpolator",
    description: "Adds non-existent frames between two frames of an animation using Generative Adversarial Networks.",
    image: "/images/sakuga.jpg",
    blog: "projects/gan-interpolator",
    git: "https://github.com/Blistt/Animation-GAN-InBetwener"
  },
  // {
  //   id: 2,
  //   title: "XGB Blood Pressure Predictor",
  //   description: "Predicts blood pressure levels from biometric data (from smartwatches) using XGBoost regressors.",
  //   image: "/images/xgb-predictor.png",
  //   blog: "projects/xgb-bp-predictor",
  //   git: "https://github.com/Blistt"
  // },
  // {
  //   id: 3,
  //   title: "Image Retrieval System",
  //   description: "Retrieves artistically similar images to a query image using deep learning embeddings.",
  //   image: "/images/vgg-image-retrieval.png",
  //   blog: "projects/vgg-image-retrieval",
  //   git: "https://github.com/Blistt/vgg-image-retrieval"
  // },
  // {
  //   id: 4,
  //   title: "Radio Music Recommender",
  //   description: "Tunes to a radio station playing the most musically similar song to a query song.",
  //   image: "/images/music-rec2.png",
  //   blog: "projects/music-recommender",
  //   git: "https://github.com/Blistt/wavebox"
  // },
  // {
  //   id: 5,
  //   title: "Personality-based Recommender System",
  //   description: "Recommends movies and TV shows based on the user\"s personality traits combined with database ratings.",
  //   image: "/images/personality-rec.png",
  //   blog: "projects/personality-recommender",
  //   git: "https://github.com/Blistt/Recommender-System-Personality"
  // },
  // {
  //   id: 6,
  //   title: "Synopsis-based Books & Movie Recommender",
  //   description: "Recommends books, movies and TV shows based on a query synopsis using classical NLP techniques and LLM embeddings",
  //   image: "/images/synopsis-rec.png",
  //   blog: "https://www.google.com",
  //   git: "https://github.com/Blistt/Information-Retrieval-System-Synopses"
  // }
]

const ProjectsSection = () => {
  return (
    <section id="projects">
      <h2 className="text-4xl font-bold text-white mt-4">
        My Projects 
      </h2>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-4">
        {ProjectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imgUrl={project.image}
            blogUrl={project.blog}
            gitUrl={project.git}
            className="w-full"
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
