import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function Page() {
    return (
      <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto py-4 px-12">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4">
            GAN In-between Frame Generator
          </h1>

          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <p className="text-white text-base md:text-lg mt-8">
              In traditional 2D animation, artists hand-draw thousands of frames for a single episode. The process 
              starts with the drawing of key frames that define the main poses and movements. Then, in-between frames are drawn to 
              create smooth transitions. This in-betweening task is typically monotonous 
              and often outsourced overseas. This project implements a solution using Generative Adversarial Networks 
              (GANs) to assist in the automatization of this process.
            </p>
            <div className="flex justify-center w-full py-4">
              <Image
                src="/images/figure1.1.png"
                alt="figure1"
                width={600}
                height={350}
              />
            </div>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              A little background on frame interpolation
            </h2>
            <p className="text-white text-base md:text-lg">
              The most straight-forward way to generate in-between frames programatically from drawings is through frame 
              interpolation, a pretty common task in computer vision. It consists of generating non-existent frames between  
              two existing frames to artificially increase a video&apos;s frame-rate. However, most modern frame interpolation systems 
              have been developed for natural video 
              (i.e., real-world footage), and their performance does not generalize well to 2D animation.
              Frame interpolation typically requires figuring out what regions in one frame correspond to
              what regions in the next frame, a.k.a., correspondence mapping. Nonetheless, in 2D animation, objects can change substantially more from one
              frame to the next. Why? In natural video, it is easy to have the camera take 24 photographs per second of video. 
              However, in animation, each frame is drawn by hand, so, to economize, it is common to have the animators draw 
              only 8-12 frames per second of video. This leads to consecutive animated frames often being much more different from
              each other than natural video frames, making correspondence mapping notoriously harder. 
            </p>
            <div className="flex justify-center w-full py-4">
              <Image
                src="/images/figure2.10.png"
                alt="figure2"
                width={600}
                height={400}
              />
            </div>

            <p className="text-white text-base md:text-lg">
              Therefore, trying to figure out how to move each pixel in a frame to turn it into the next frame is an ill-posed approach
              to solve in-betweening for 2D animation. Instead we can look at generative modeling, a more flexible approach that will 
              not explicitly look for correspondences across pixels to produce convincing in-between frames. In this project, we use 
              Generative Adversarial Networks (GANs), a relatively cheap (compared to DDPMs), yet powerful generative modeling technique, 
              to generate in-between frames.
            </p>

            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              Generative Adversarial Networks (GANs)
            </h2>
            <p className="text-white text-base md:text-lg">
              The ultimate criteria to determine the quality of a generated frame is not checking that each pixel is where it&apos;s supposed to be, 
              but whether a person thinks the frame looks good or not. Thus, ideally we would get a person to judge each attempt the system 
              does at generating an in-between frame, so that the generator network can try and try and try and try again until it gets the human to 
              say &apos;yes, that looks good&apos;. Sadly, it is just not feasible to have a person judge each frame, as deep learning models need to go through
              an absurdly large number of examples and iterations to learn something useful. Therefore, in lieu of a human, we use another
              network to serve as the judge. 
              That is the core idea behind GANs, where two networks are pit against each other: a generetor network that tries to produce convincing 
              images, and a discriminator network that tries to tell apart examples of real images from generated images. The generator network
              is trained to fool the discriminator network, and the discriminator network is trained to not be fooled. Eventually, this adversarial training
              gets the generator network to produce incredibly realistic looking images.
            </p>
            <div className="flex justify-center w-full py-4">
              <Image
                src="/images/gans.png"
                alt="figure3"
                width={600}
                height={400}
              />
            </div>

            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              The model
            </h2>
            <p className="text-white text-base md:text-lg">
              We used an GAN-based architecture to generate in-between frames, with some modifications to adapt it for frame interpolation. For one, 
              in the original GAN architecture, the generator network takes in a random noise vector and outputs an image. However, in our case, the 
              generator takes two consecutive frames as input, and outputs the frame that should go in-between. The discriminator network looks at the 
              generated frame, and the real in-between frame (we trained the model on a dataset of real frame sequences), and tries to tell them apart. 
              The discriminator sends its feedback to the generator. In addition, the generator also looks at the real in-between frame, and computes a
              perceptually oriented error meassure, which it integrates with the feedback from the discriminator to get a better sense of how to improve.
              For a more complete explanation of the model, including architecture specifications, loss functions and evaluation metrics, check out the 
              thesis paper linked at the end of this page.
            </p>
            <div className="flex justify-center w-full py-4">
              <Image
                src="/images/gangenerator.png"
                alt="figure4"
                width={600}
                height={400}
              />
            </div>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              Training and dataset
            </h2>
            <p className="text-white text-base md:text-lg">
              We trained our model on a set of 10,000 real animation triplets, obtained from the &apos;link to place&apos;. An animation
              triplet is merely a sequence of three consecutive frames (F<sub>1</sub>, F<sub>2</sub>, F<sub>3</sub>) in a video.
              The frames in the dataset are colored, and we need to work from uncolored frames, just as animators in real production
              scenarios do, so we remove the color using &apos;skethKeras&apos; (link). 
            </p>
            <div className="flex flex-col items-center justify-center w-full py-4">
              <Image
                src="/images/figure4.1.png"
                alt="Before line extraction"
                width={800}
                height={400}
              />
              <p className="text-white text-base md:text-lg mt-2 mb-6">
                Triplet before color removal
              </p>
              <Image
                src="/images/figure4.2.png"
                alt="After line extraction"
                width={800}
                height={400}
              />
              <p className="text-white text-base md:text-lg mt-2 mb-6">
                Triplet after color removal
              </p>
            </div>
            <p className="text-white text-base md:text-lg">
              Once we we have colorless triplets, we train by hiding the middle frame from the generator, and asking it to generate it.
              During training, both the generator and the discriminator get access to the real in-between frame after every attempt
                to correct their mistakes. To evaluate the system, though, we separate a special test set of triplets, where the middle frame
              is never shown to the generator nor the discriminator. This is a standard practice in machine learning, to ensure that 
              the model&apos;s performance generalizes to unseen data. 
            </p>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              Results and applications
            </h2>
            <div className="flex justify-center w-full py-4">
              <div className="gif" style={{marginRight: "20px"}}>
                <h3 className="text-white text-center md:text-lg mt-2 mb-2">
                  Pair of keyframes
                </h3>
                <Image
                  src="/images/generate_gt.gif"
                  alt="Pair of keyframes"
                  width={400}
                  height={400}
                />
              </div>
              <div className="gif" style={{marginLeft: "20px"}}>
                <h3 className="text-white text-center md:text-lg mt-2 mb-2">
                  Generated Triplet
                </h3>
                <Image
                  src="/images/good_gen_1_marked.gif"
                  alt="Generated triplet"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <p className="text-white text-base md:text-lg">
              By the time the training is done (30-50 epochs on the entire dataset), the hyper-paremeters fine-tuned, and given
              some adversarial equilibrium was maintained between generator and discriminator, we should be getting generations
              with the quality of the examples shown above. Once we are able to produce convincing in-between frames, we can actually
              add in-between frames to an entire animated video clip. We mentioned earlier that animators typically draw 8-12 frames per second
              of video. Yet the final video will display 24 frames per second anyway. This means that there are several duplicate frames
              per second of video. We can see the usefulness of our system by using our trained model to replace the duplicate frames
              with generated in-between frames.
            </p>
            <div className="flex justify-center w-full py-4">
              <div className="gif" style={{marginRight: "20px"}}>
                <h3 className="text-white text-center md:text-lg mt-2 mb-2">
                  Original video with duplicate frames
                </h3>
                <Image
                  src="/images/horimiya_gt.gif"
                  alt="Pair of keyframes"
                  width={400}
                  height={400}
                />
              </div>
              <div className="gif" style={{marginLeft: "20px"}}>
                <h3 className="text-white text-center md:text-lg mt-2 mb-2">
                  Video with generated in-between frames
                </h3>
                <Image
                  src="/images/horimiya_gen.gif"
                  alt="Generated triplet"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
              Conclusion
            </h2>
            <p className="text-white text-base md:text-lg">
              This project is a proof of concept that GANs can be used to generate in-between frames for 2D animation. By using an
              extremely simple architecture, with plain convolutional networks for the autoencoder generator and the discriminator, 
              trained end-to-end, without the need for data annotation or reliance on pre-trained components, we are able to generate 
              in-between frames that are visually convincing. We performed some ablations
              and found that leaving the autoencoder on its own leads to a decrease of over 50% in performance, in terms of the perceptual
              metrics used. We are currently working on adding a GAN component to other systems specifically designed for 2D animation 
              in-betweening, such as the one proposed by (link to paper) and (link to paper). We argue the contributions of the adversarial 
              dymanic will be most noticeable for the triplets where the middle frame it particularly different from the other two frames
              (in terms of topology). 
              <br />
              For a complete run of the project, with architecture specifications, loss functions, evaluation metrics, results, and formulations,
              check out the thesis paper linked below. <br />
              <a className="text-blue-400" href="/documents/IN_BETWEEN_FRAME_GENERATION_FOR_UNCOLORED_2D_ANIMATION.pdf" download="gan-inbetween-thesis.pdf">
                Thesis Paper
              </a>
            </p>
          </div>

          <div className="flex justify-center w-full">
            <a href="https://github.com/Blistt/Animation-GAN-InBetwener/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/githublogo2.png" alt="gan-git" width={85} height={85} />
            </a>
          </div>
          <div className="flex justify-center w-full">
            <p className="text-white text-base md:text-lg ml-4">
              Check out the project&apos;s code on GitHub
            </p>
          </div>
             
        </div>
      </main>
    )
}