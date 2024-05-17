import React from 'react'

const ProjectCard = ({ imgURL, title, description }) => {
  return (
    <div>
        <div 
            style={{ background: `url(${imgURL})`, backgroundSize: "cover"}}
            className='h-52 md:h-72'
        ></div>
        <div classname='text-white'>
            <h5>{title}</h5>
            <p>{description}</p>
        </div>
    </div>
  );
};

export default ProjectCard;
