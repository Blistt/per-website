"use client";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { BlockMath } from "react-katex"; // Import BlockMath component
import "katex/dist/katex.min.css"; // Import KaTeX CSS

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4">
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
                        <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-24 mb-2">
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
                The “artistic” experience is too subjective to be accurately measured in any form, much less algorithmically. However, recent advances in computer vision have allowed us to 
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
                images, i.e., photographs of real-world objects, as opposed to digital illustrations. Still, this project shows that feature embeddings 
                obtained using the VGG-19 network can yield successful results in the image retrieval of artistically similar digital illustrations. 
                </p>
                <h3 className="text-white text-center mt-8 font-bold">
                    VGG-19 Architecture
                </h3>
                <div className="flex justify-center">
                    <Image
                        src="/images/vgg19.png"
                        alt="VGG 19"
                        width={800}
                        height={600}
                    />
                </div>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-24 mb-2">
                    Dataset
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    The dataset &apos;Tagged Anime Illustrations&apos; was employed, and over 3000 images were collected. These images were combined 
                    with another dataset of 1045 images scraped from 4chan&apos;s wallpapers section. Given that the model utilized is pre-trained, 
                    and that no fine tuning was performed, a larger dataset was not necessary. 
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    Feature maps
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    A feature map is only a collection of (hopefully meaningful) characteristics/descriptors of an image. Traditionally, hard-coded rules were 
                    used to process an image and obtain these descriptors (e.g., color histograms, SIFT descriptors, histogram of gradients).
                    Now, we use neural networks that solve other tasks such as classifying an image (cat, dog, plane...), and use the internal representations these networks learn
                    to solve their tasks as our feature maps. In this project, we pass our images through the VGG-19 network once to obtain the feature maps. To embed a feature, 
                    the activation maps of the last layer in a convolutional block, for example, conv1, are flattened into a single 2D matrix. 
                    These feature maps encode some type of visual pattern across the image, however, for a given feature map, 
                    small variations of positioning can make two otherwise similarly patterned images have a drastically different feature map. 
                    To counteract this, the feature maps are transformed into Gram matrices:
                </p>
                <span className="text-white text-base md:text-lg mt-4">
                    <BlockMath math="G = A^T \cdot A" />
                </span>
                <p className = "text-white text-base md:text-lg mt-4" >
                    where A is the feature map. This operation essentially computes the correlation between the different elements in the feature map 
                    A.
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    Feature selection
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    Once the feature maps of each image are transformed into Gram matrices, they can then be combined together to produce the final 
                    embedding for the image. To combine them, the Gram matrices for all selected feature maps are flattened and appended into a 
                    single vector. The selection of the layers from which to obtain the feature maps that are included in the final embedding was done 
                    through experimentation. Detailed descriptions of the experimental results of selecting the feature maps of different layers are 
                    provided in the Results section. 
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    K Nearest Neighbors
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    Upon obtaining the embeddings of the images, Euclidean distance is calculated between the embeddings of all images. Images with 
                    smaller distances between their embeddings are considered more similar than images with larger distances. Thus, the 5 nearest 
                    neighbors were obtained for a test set of 60 images for both the digital illustrations and the paintings. Given that the accuracy 
                    of the neighbors cannot be determined by means other than appraisal by human eyes, using a larger test set was deemed impractical. 
                    The nearest neighbors using a more traditional CV image feature, color histograms, were obtained as well and presented next to the 
                    deep learning neighbors for comparison. 
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    Results
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    The results of the image retrieval system were evaluated by comparing the 5 nearest neighbors of the digital illustrations to 
                    the 5 nearest neighbors of the paintings. The results show that the deep learning-based image retrieval system was able to 
                    successfully retrieve artistically similar images. The images retrieved by the deep learning-based image retrieval system were 
                    visually more similar to the query image than the images retrieved by the color histogram-based image retrieval system, as can 
                    be visualized in the following figures. It should be noted that these results are qualitative in nature based on personal appraisal,
                     and no actual metrics were computed. Please run the demo and play around with different test sets to corroborate the results.
                </p>
                <h3 className="text-purple-500 text-lg text-center mt-8 font-bold">
                    Deep Learning embeddings
                </h3>
                <div className="flex justify-center">
                    <Image
                        src="/images/dlresults.png"
                        alt="dl-results"
                        width={800}
                        height={800}
                    />
                </div>
                <div className="max-w-[800px] mx-auto mt-2">
                    <p className="text-white text-base md:text-lg italic">
                        Feature embeddings nearest neighbors for digital illustrations. These images were selected as representatives of the distinct types of compositions in the dataset: faces, multiple characters, and landscapes.
                    </p>
                </div>

                <h3 className="text-purple-500 text-lg text-center mt-8 font-bold">
                    Color Histogram embeddings
                </h3>
                <div className="flex justify-center">
                    <Image
                        src="/images/chresults.png"
                        alt="ch-results"
                        width={800}
                        height={800}
                    />
                </div>
                <div className="max-w-[800px] mx-auto mt-2">
                    <p className="text-white text-base md:text-lg italic">
                        Color Histograms nearest neighbors. It should be noted how little to none compositional similarity can be observed between 
                        any of the images.
                    </p>
                </div>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    Feature Maps selection
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    A large volume of work with CNNs supports the notion that distinct layers within the network encode visual information 
                    at distinct scales, with the first layers encoding lower scale information, such as textures, and the deeper layers 
                    encoding higher level information, such as composition and structures. Results from this project are consistent with 
                    said findings. It can be observed in the next image that neighboring images for the feature embeddings of surface layers share 
                    lower level characteristics such as color palettes and textures, while embeddings for deeper layers share higher level 
                    characteristics, such as similar compositions. Some researchers have argued that lower level features correspond to the style 
                    of the illustration, while higher level features to its content. Again, it was surprising that the feature maps from 
                    the VGG-19 network were able to encode multiple levels of information for digital illustrations successfully for this 
                    task, seeing as its weights were trained with natural images, which are drastically different in several ways. 
                    For example, digital illustrations will frequently lack texture level information. As it can be observed in the next Figure, 
                    large sections of these images are filled with absolutely plain colors, something unlikely to occur in natural images, 
                    as even plain colored surfaces will have small variations due to light reflection. Prior research claimed that these types 
                    of attributes would throw deep learning algorithms off, thus rendering them not competitive for image retrieval with digital 
                    images. Findings from this project provide evidence to the contrary, which is probably a reflection of the rate at which 
                    the field of computer vision is advancing. 
                </p>
                <h3 className="text-purple-500 text-lg text-center mt-8 font-bold">
                    Style vs Content scale levels
                </h3>
                <div className="flex justify-center">
                    <Image
                        src="/images/featureselection.png"
                        alt="feature-selection"
                        width={800}
                        height={800}
                    />
                </div>
                <div className="max-w-[800px] mx-auto mt-2">
                    <p className="text-white text-base md:text-lg italic">
                        Layer level nearest neighbors: It should be noted how the similarity in the images in the first pair of layers seems to 
                        prioritize the color palette, while in latter layers the similarity is more compositional, disregarding the color palette.
                    </p>
                </div>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 md:mt-8 mb-2">
                    Conclusion
                </h2>
                <p className = "text-white text-base md:text-lg mt-4" >
                    At its conception, this project&apos;s goal was to test the feasibility of a content-based image retrieval system that used deep 
                    learning feature embeddings to compute similarity between digital images. Results showed that such a system is feasible, 
                    even when employing a model pre-trained on natural images without any sort of fine tuning. Results in the testing set seemed 
                    to work with all sorts of compositions and styles of illustration. However, it was noted that performance was consistently 
                    better for images with minimalistic compositions. Again, it should be noted that evaluation was purely the authors&apos; personal 
                    appraisal. As these results were obtained, the objective expanded to include the analyzing of the information conveyed by 
                    the feature maps corresponding to distinct layers of the network employed. As someone with some background in psychology, I 
                    personally find it amazing to see that it is possible to algorithmically decompose the visual experience of art into the style vs. content 
                    aspects of an image. With such a notion in mind, then rather than generating a single feature embedding to create the best 
                    content based image retrieval system, it might be interesting to create a system that allows the user to select the type of 
                    similarity between images desired: style vs content.
                </p>

                <div className="flex justify-center w-full mt-4">
                    <a href="https://github.com/Blistt/vgg-image-retrieval" target="_blank" rel="noopener noreferrer">
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
    );
}