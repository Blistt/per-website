'use client';
import React, {useTransition, useState} from 'react';
import Image from 'next/image';
import TabButton from './TabButton';

const TAB_DATA = [
    {
        title: 'Skills',
        id: 'skills',
        content: (
            <ul className='list-disc pl-2'>
                <li>Python</li>
                <li>PyTorch</li>
                <li>TensorFlow</li>
                <li>Java</li>
                <li>MySQL</li>
            </ul>
        )
    },
    {
        title: 'Education',
        id: 'education',
        content: (
            <ul className='list-disc pl-2'>
                <li>BS in Mathematics & Psychology, University of Texas at El Paso</li>
                <li>MS in Data and Information Sciences, University of Texas at El Paso</li>
            </ul>
        )
    },
    {
        title: 'Certifications',
        id: 'certifications',
        content: (
            <ul className='list-disc pl-2'>
                <li>Coursera GAN Specialization</li>
                <li>Coursera Recommender Systems Specialization</li>
                <li>Coursera Deep Learning Specialization</li>
            </ul>
        )
    }

]

const AboutSection = () => {
    const [tab, setTab] = useState('skills');
    const [isPending, startTransition] = useTransition();
    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };
    return (
        <section className='text-white'> 
            <div className="gap-8 items-center py-8 px-4 xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-16">
                <Image src="/images/fran-clean.png" width={200} height={200} />
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    <p className="text-white texxt-base md:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className='flex flex-row justify-start mt-8'>
                        <TabButton 
                            selectTab={() => handleTabChange('skills')} 
                            active={tab === 'skills'}> 
                            Skills 
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange('education')} 
                            active={tab === 'education'}> 
                            Education 
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange('certifications')} 
                            active={tab === 'certifications'}> 
                            Certifications
                        </TabButton>
                    </div>
                        <div className = 'mt-8'>
                            {TAB_DATA.find((t) => t.id === tab).content}
                        </div>
                </div>
            </div>
        </section>
)};




export default AboutSection;