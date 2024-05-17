import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectsData =[
  {
    id: 1,
    title: 'Project 1',
    description: 'This is a description of project 1',
    image: '/images/project1.png',
    link: 'https://www.google.com',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'This is a description of project 2',
    image: '/images/project2.png',
    link: 'https://www.google.com'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'This is a description of project 3',
    image: '/images/project3.png',
    link: 'https://www.google.com'
  }
]

const ProjectsSection = () => {
  return (
    <h2>
      My Projects 
    </h2>
  )
}

export default ProjectsSection
