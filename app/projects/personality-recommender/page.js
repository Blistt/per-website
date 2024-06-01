import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4'>
                    Personality-based recommender system
                </h1>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <p className="text-white text-base md:text-lg">
                        This projects implements a recommender system that integrates a user's personality traits 
                        with database ratings to recommend movies and streaming shows. We also identify the
                        personality traits that are most important for the recommendation process to better understand
                        how users makes choices when watching and rating content.
                    </p>
                    <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                        Introduction
                    </h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/3 md:pr-8">
                            <p className="text-white text-base md:text-lg">
                                Amazon, Netflix, Youtube, Spotify, TikTok, Instagram...their digital catalogues are just too big
                                for anyone to browse through blindly. They need to be filtered and personalized to the user's taste through
                                a recommender system that people tend to plainly call "the algorithm". These companies have made public claims
                                about how critical their recommender systems are, with people consuming the majority of their content as a result
                                of these recommendations. Over a decade ago, Netflix even offered a million dollar prize to anyone who could 
                                improve their recommendation by 10% according to one standard performance forward metric, Root Mean Squared
                                Error (RMSE). The academic and industry communities soon realized, though, that evaluating the recommender systems 
                                was not a trivial task, and evaluation itself became a research topic that remains, to this day, an ongoing one. 
                                There's a myriad of metrics now assessing several aspects of the recommendation process, in several types of scenarios,
                                for several types of users...There's even been a few papers suggesting that UX considerations weight as heavily, if not
                                more, than most offline metrics. 
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex justify-center w-full py-4">
                                <Image
                                    src='/images/cf.png'
                                    alt='collaborative filtering'
                                    width={600}
                                    height={600}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-white text-base md:text-lg">
                        Aspects such as how much the user trusts the system, how explainable the recommendations
                        are perceived, or how the recommendations themselves seem to respond to user feedback can make or break a recommender system.
                        With this in mind, we piggy back on the success of personality tests developed by psychology researchers to categorize 
                        consistent, individualized patterns of behavior. We administer a battery of personality questionnaires to a few thousand
                        users, scrape the ratings they've given to movies and TV shows, then implement and evaluate a model that integrates 
                        both sources.
                    </p>
                    <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                        Dataset and Participants
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        Our dataset consists of personality scores and ratings for movies/streaming shows. We recruited 3967 participants with accounts
                        in  <a href="https://myanimelist.net/">(MyAnimeList)</a>, from which we scraped their ratings for movies and streaming shows. We also
                        administered a battery of personality questionnaires to the participants. 
                    </p>
                    <h3 className='text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2'>
                        Ratings
                    </h3>
                    <p className="text-white text-base md:text-lg">
                        The ratings were provided on a scale from 0 to 10. We scrapped a total of 495,793 ratings on 12,268 different shows.
                    </p>
                    <h3 className='text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2'>
                        Personality scores
                    </h3>
                    <p className="text-white text-base md:text-lg">
                        After careful consideration and a thorough literature review, we assessed for the presence/absence of the 
                        following personality traits:
                        <ul className="list-disc list-inside">
                            <li>Five Factor Model (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)</li>
                            <li>Need for Cognition</li>
                            <li>Sensation Seeking</li>
                            <li>Metaphor Use</li>
                            <li>Self-Location</li>
                        </ul>
                    </p>
                    <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
                        Recommender System Model
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        We implemented a simple Collaborative Filtering (CF) algorithm, one of the earliest and most standardized recommendation algorithms.
                        In terms of Machine Learning, CF is essentially a large scale implementation of the K-Nearest Neighbors (KNN) regressor algorithm with a special
                        score aggregation scheme. 
                    </p>
                    <div className="flex justify-center w-full py-4">
                        <Image
                            src='/images/cfmodel.png'
                            alt='collaborative filtering model'
                            width={600}
                            height={600}
                        />
                    </div>
                    <p className="text-white text-base md:text-lg">
                        We integrate the personality scores with the ratings to the CF model in a cascading fashion. We start by predicting missing ratings
                        with a 
                    </p>
                </div>
            </div>
        </main>
    )
}