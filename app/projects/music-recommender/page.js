import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4'>
                    Radio Music Recommender
                </h1>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <p className="text-white text-base md:text-lg">
                        This projects implements a radio retrieval system that allows a user to use a song as a 
                        query to tune into a radio station playing the most musically similar content. 
                    </p>
                </div>
                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                    Introduction
                </h2>
                <p className='text-white text-base md:text-lg'>
                    Music streaming has become the undisputable main medium for music distribution. Radio (FM/AM), a former king,
                    is now the most popular legacy medium, particularly for car drivers. Nonetheless, radio has not done much
                    with the technological advancements that the streaming industry developed, such as content-based music retrieval
                    (getting a list of songs similar to a given query song).
                    Identifying musically similar audio clips based entirely on their content used to be a challenging task.
                    Hand-engineered features were used to describe the audio content, and they needed to be fine tuned for 
                    very specific use cases that would not necessarily generalize. With the advent of deep learning, we can 
                    use pre-trained networks for a task, like say, music genre classification, to extract extremely useful features from 
                    audio and obtain amazing results without the need to perform any actual training. Spotify, YouTube Music and other service
                    providers have been on the game of perfecting their music recommender systems for a while, and already provide
                    excellent tools to identify songs similar to a given query song. <br />
                    Nevertheless, if a user wanted to perform content-based music retrieval for radio stations, that is, look for a 
                    radio station playing something similar to a given query song, there aren't many avenues other than peforming manual
                    search. If thinking only of local radio stations, this is not a problem, as one can quickly go over the entire lot in a matter of 
                    seconds. But now, it is easy to get access to global radio, in which case manual search is not a viable option. We
                    implement the backend of a system that allows a user to input a song as a query, and automatically tune into a radio 
                    station playing the most musically similar content.
                </p>
                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                    System Overview
                </h2>
                <div className="flex justify-center w-full py-4">
                    <Image
                        src='/images/radiomusicsystem.png'
                        alt='radio music system'
                        width={800}
                        height={800}
                    />
                </div>
                <p className='text-white text-base md:text-lg'>
                    The system has a simple flow with only 3 components: a radio sampler, a radio selector, and a radio tuner.
                    The radio sampler is responsible for collecting audio samples from the candidate radio stations. The radio selector
                    is responsible for computing the musical similarity between the provided query song and the audio samples collected by 
                    radio sampler, then identifying the station playing the most similar music. Lastly, radio tuner simply tunes into the 
                    radio station chosen by radio selector.
                </p>

                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                    Radio Sampler
                </h2>
                
                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                    Radio Selector
                </h2>

                <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                    Radio Tuner
                </h2>

            </div>    
        </main>
    )
};