import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4">
                    Radio Music Recommender
                </h1>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <p className="text-white text-base md:text-lg">
                        This projects implements a radio retrieval system that allows a user to use a song as a 
                        query to tune into a radio station playing the most musically similar content. 
                    </p>
                </div>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Introduction
                </h2>
                <p className="text-white text-base md:text-lg">
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
                    radio station playing something similar to a given query song, there aren&apos;t many avenues other than peforming manual
                    search. If thinking only of local radio stations, this is not a problem, as one can quickly go over the entire lot in a matter of 
                    seconds. But now, it is easy to get access to global radio, in which case manual search is not a viable option. We
                    implement the backend of a system that allows a user to input a song as a query, and automatically tune into a radio 
                    station playing the most musically similar content.
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    System Overview
                </h2>
                <div className="flex justify-center w-full py-4">
                    <Image
                        src="/images/radiomusicsystem.png"
                        alt="radio music system"
                        width={800}
                        height={800}
                    />
                </div>
                <p className="text-white text-base md:text-lg">
                    The system has a simple flow with only 3 components: a radio sampler, a radio selector, and a radio tuner.
                    The radio sampler is responsible for collecting audio samples from the candidate radio stations. The radio selector
                    is responsible for computing the musical similarity between the provided query song and the audio samples collected by 
                    radio sampler, then identifying the station playing the most similar music. Lastly, radio tuner simply tunes into the 
                    radio station chosen by radio selector.
                </p>

                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Radio Sampler
                </h2>
                <p className="text-white text-base md:text-lg">
                    The purpose of the radio sampler is to capture a set of FM radio station frequency signals and output a sample
                    of the audio they are playing in a human friendly format. At this initial stage, we prototype the system to sample 
                    FM frequencies with the help of an RTL-SDR device. There is a noticeable gap between raw radio waves and the music we hear. 
                    Radio sampler is responsible for bridging this gap, then storing the audio samples for the system to use.
                    Written in Python, it follows three main steps: First, it captures radio signals by communicating with an RTL-SDR hardware module.
                    Similar to tuning a radio station, it captures raw radio signals at specific frequencies. Then, radio tuner processes these signals.
                    Initially chaotic and noisy, the captured signals are cleaned up using standard python libraries like numpy and scipy.signal. This process
                    includes down-sampling and demodulating. These processes correct distortions and extract meaningful information in a way that&apos;s friendly 
                    to the human hearing system. Lastly, the script saves a few seconds of the audio from each radio frequency (station) in an mp3 file for
                    the musical similarity computation. 
                </p>
                
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Radio Selector
                </h2>
                <p className="text-white text-base md:text-lg">
                    After obtaining the sampled audio mp3 files using radio_sampler, we used a pre-trained Convolutional Neural Network (CNN) model, 
                    <a href="https://github.com/jordipons/musicnn" className="text-blue-400"> musicnn</a> to obtain an audio representation 
                    that encoded musical similarity between audio files. 
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                    Musicnn
                </h3>
                <p className="text-white text-base md:text-lg">
                    Musicnn is a music tagger system. It uses a modified convolutional neural net with extra dense layers 
                    and recurrent modules to account for the importance of the temporal dimension in the audio domain. 
                    The output of this system is the classification of a song into one of 48 genres. Musicnn, however, 
                    was also designed as a more general purpose feature extractor, with the library providing functions to 
                    obtain an internal network representation (prior to the classification layer) that can be used as a 
                    machine friendly encoding of the musical features in an audio file. One of these representations is 
                    called a “taggram”, which measures the degree to which the song contains multiple musical genres at 
                    every given time interval.
                </p>
                <div className="flex justify-center mt-8">
                    <Image
                        src="/images/taggram.jpg"
                        alt="taggram"
                        width={500}
                        height={500}
                    />
                </div>

                <p className="text-white text-base md:text-lg mt-4">
                    We average the taggram musicnn provides over the temporal dimension, such that we get a taggram of the audio 
                    file, giving us a map of the presence/absence of multiple musical genres overall during the song.  The taggram 
                    representation effectively turns any given audio file into a 50-dimensional vector of musical genres. 
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                    Taggram neighbor search
                </h3>
                <p className="text-white text-base md:text-lg">
                    Once the taggrams are obtained, we simply compute the distance (euclidean, in this case) between the taggram 
                    representation of the query audio file, and the taggram representation of each of the candidate sampled audio 
                    files from the radio stations. The taggram with the shortest distance is considered the most musically similar 
                    audio file. Radio selector outputs the radio frequency corresponding to this file, which radio tuner will use to 
                    tune into that radio station.
                </p>


                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Radio Tuner
                </h2>
                <p className="text-white text-base md:text-lg">
                    The radio tuner module is a truncated version of the radio sampler module. It essentially uses the same functions
                    to bridge the gap between radio waves and the music we hear, minus the saving of the files and tuning to multiple stations.
                    Radio tuner simply tunes into the radio station that radio selector has chosen as the most musically similar to the query song,
                    performs all the necessary processing to turn the radio signal into hearable music, and plays it through the device&apos;s 
                    speakers/headphones.
                </p>

                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Evaluation
                </h2>
                <p className="text-white text-base md:text-lg">
                    To evaluate the system&apos;s performance, we simply used a set of 20 songs as queries, and sampled from around 22 local radio stations.
                    We chose a small set of radio stations to allow for live sampling. Given our computational resources and hardware (RTL-SDR), choosing a 
                    larger set of radio stations would have required to pre-compute the samples, which is unsuitable for the task, as radio stations do not
                    consistently play the same music. We recruited a small set of 4 volunteer to query these songs then rate on a 5-point Likert scale how
                    similar the music playing in the selected radio station was to the query song. After averaging the results across all songs and all participants,
                    we obtained an average <span className="text-purple-500 font-bold">similarity score of 3.4 out of 5.</span>
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Conclusion
                </h2>
                <p className="text-white text-base md:text-lg">
                    This project successfully integrates existing deep learning and signal processing tools to produce a simple system that finds radio stations playing
                    music similar to a given query song. Nonetheless, the system is still in its infancy, as experimentation reveals key challenges to overcome
                    before such a tool can be put into production. Our main challenge lies not with the proper computation of musical similarity, as we found musicnn and 
                    similar tools to work more than satisfactorily. The main challenge lies with the disconnect between sampling time and the tuning to the selected radio station. 
                    The musical similarity is calculated between the sampled audio and the query song, however, with live sampling, this process can take as much as 40 seconds. 
                    Therefore, by the time the system tunes into the selected radio station, the music playing may have changed, or even gone into commercials.
                    As evidence for this, we found that when asking our volunteers to rate the similarity of the music playing between the sampled audio and the query song for the winning station
                    (as opposed for the music playing by the time the system tunes into it), the average similarity score rises to 4.2 out of 5. Efficient sampling and signal processing, thus, 
                    become the next steps to take in order to turn the system into a usable product.
                </p>

                <div className="flex justify-center w-full mt-4">
                    <a href="https://github.com/Blistt/wavebox/" target="_blank" rel="noopener noreferrer">
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
};