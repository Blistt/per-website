import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4'>
                    Retrieving Artistically Similar Images with Convolutional Neural Networks
                </h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 md:pr-8">
                        <p className="text-white text-base md:text-lg md:mt-20">
                            This project implements a content-based 
                            image retrieval system for digital illustrations 
                            using deep learning embedded features. 
                            Specifically, similarity between digital 
                            illustrations was obtained from feature maps 
                            encoding visual information at varying scales, 
                            with the lower ones depicting style-level 
                            information, and the larger ones depicting 
                            content-level information.
                        </p>
                        <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-24 mb-2'>
                            Introduction    
                        </h2> 
                    </div>
                    <div className="md:w-1/2">
                        <div className="flex justify-center mt-8">
                            <Image
                                src="/images/image-retrieval.png"
                                alt="XGB Blood Pressure Predictor"
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className="text-white mt-4 italic">
                            <p>
                                Which of the 2 images on the right is more similar to the one on the left? 
                                While image a) may have the same color palette, image b) has a highly similar
                                composition.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-white text-base md:text-lg mt-4">
                Traditionally, providing a measure of similarity between images of artwork has been a task only performed by humans. 
                This is attributed to the fact that the “artistic” experience is considered highly subjective in nature, and thus, typically
                 deemed non-measurable in any form, much less algorithmically. However, recent advances in computer vision have allowed us to 
                 make strides in the algorithmic solving of this problem, while simultaneously providing some interesting insights on the distinct 
                 elements of visual artistic perception. Measuring how similar two images are is a long-standing research topic in the 
                 Computer Vision community, where it is formally known as Content Based Image Retrieval. The most effective approaches
                  proposed to date are predominantly deep-learning-based. That is, neural networks are used to automatically learn features 
                  from images, which are then combined and utilized to compute image to image similarity, a practice known as feature embedding.
                Deep learning feature embeddings have been used for a wide variety of applications, such as product recommendation in e-commerce, 
                medical image search, person re-identification, and many more. Furthermore, convolutional neural networks (CNNs) can easily be 
                used to create an image retrieval system from pre-trained components. Using a pre-trained CNN model (the VGG-19 network), 
                the feature maps, that is the outputs of the layers of the network, are pooled and combined to 
                create the embeddings of the images. It should be noted that the VGG-19 model was developed for the classification of natural 
                images, i.e., photographs of real-world objects, as opposed to digital illustrations. This project shows that feature embeddings 
                obtained using the VGG-19 network can yield successful results in the image retrieval of artistically similar digital illustrations. 
                </p>
                <div className="flex justify-center mt-8">
                    <Image
                        src="/images/vgg19.png"
                        alt="VGG 19"
                        width={800}
                        height={600}
                    />
                </div>
                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-24 mb-2'>
                    Dataset
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    The dataset ‘Tagged Anime Illustrations’ was employed, and over 3000 images were collected. These images were combined 
                    with another dataset of 1045 images scraped from 4chan's wallpapers section. Given that the model utilized is pre-trained, 
                    and that no fine tuning was performed, a larger dataset was not necessary. 
                </p>
                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2'>
                    Feature maps
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    All the images in the dataset were passed through the VGG-19 network once to obtain the feature maps. To embed a feature, 
                    the activation maps of the last layer in a convolutional block, for example, conv1, are flattened into a single 2D matrix. 
                    These feature maps encode some type of visual pattern across the image, however, for a given feature map, 
                    small variations of positioning can make two otherwise similarly patterned images have a drastically different feature map. 
                    To counteract this, the feature maps are transformed into gram Matrices in the following way:

                </p>
            </div>
        </main>
    );
}