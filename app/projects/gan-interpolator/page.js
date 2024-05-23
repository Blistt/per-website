import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
      <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto py-4 px-12">
            <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
              GAN In-between Frame Generator
            </h1>
            <div className="mt-4 md:mt-0 text-left flex flex-col h-full items-center">
              <p className="text-white text-base md:text-lg" style={{ color: '#999', fontStyle: 'italic', marginBottom: '10px' }}>
                Too long, won't read: This project implements a frame interpolation system that generates in-between frames
                in an animated video using a Generative Adversarial Network (GAN).
              </p>
              <p className="text-white text-base md:text-lg">
                In traditional 2D animation, artists hand-draw thousands of frames for a single episode. The process 
                starts with key frames that define the main poses and movements. Then, in-between frames are drawn to 
                create smooth transitions. This in-betweening task is often seen as monotonous 
                and often outsourced.
              </p>
              <div className="flex justify-center w-full py-4">
                <Image
                  src='/images/figure1.1.png'
                  alt='figure1'
                  width={600}
                  height={350}
                />
              </div>
              <p className='text-white text-base md:text-lg'>
                The most straight-forward way to generate in-between frames programatically from drawings is through frame 
                interpolation, a pretty common task in computer vision. It consists of generating non-existent frames between  
                two existing frames. However, most modern frame interpolation systems have been developed for natural video 
                (i.e., real-world footage), and their performance does not generalize well to 2D animation.
                Frame interpolation typically entails correspondence mapping: figuring out what regions in one frame correspond to
                what regions in the next frame. In 2D animation, objects change substantially more from one frame to the next. 
                In natural video, it is easy to have the camera take 24 photographs per second of video. 
                However, in animation, each frame is drawn by hand, so, to economize, it is common to have the animators draw 
                only 8-12 frames per second of video. This leads to animated frames being much more different from
                each other than natural video frames, making correspondence mapping notoriously harder, to the point that it
                becomes an ill-posed approach to solve in-betweening for 2D animation.
              </p>
              <div className="flex justify-center w-full py-4">
                <Image
                  src='/images/figure2.10.png'
                  alt='figure1'
                  width={600}
                  height={400}
                />
              </div>
              <p className='text-white text-base md:text-lg'>
                Generative modeling on the other hand, is a more flexible approach that will not explicitly look for correspondences
                accross pixels to produce convincing in-between frames. This project uses Generative Adversarial Networks (GANs), a 
                family of generative models widely used in the creative domain. GANs work by training two competing neural networks: 
                a generator that attempts to generate fake images indistinguishable from real ones, and a discriminator 
                that attempts to distinguish between real and fake images. 
              </p>

              
            </div>   
        </div>
      </main>
    )
}