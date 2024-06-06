import Navbar from "../../components/Navbar";
import Image from "next/image";
import { BlockMath, InlineMath } from "react-katex"; // Import BlockMath component
import "katex/dist/katex.min.css"; // Import KaTeX CSS

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto py-4 px-12">
                <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4">
                    Personality-based recommender system
                </h1>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <p className="text-white text-base md:text-lg">
                        This projects implements a recommender system that integrates a user&apos;s personality traits 
                        with database ratings to recommend movies and streaming shows. We also identify the
                        personality traits that are most important for the recommendation process to better understand
                        how users makes choices when watching and rating content.
                    </p>
                    <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                        Introduction
                    </h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/3 md:pr-8">
                            <p className="text-white text-base md:text-lg">
                                Amazon, Netflix, Youtube, Spotify, TikTok, Instagram...their digital catalogues are just too big
                                for anyone to browse through blindly. They need to be filtered and personalized to the user&apos;s taste through
                                a recommender system that people tend to plainly call &apos;the algorithm&apos;. These companies have made public claims
                                about how critical their recommender systems are, with people consuming the majority of their content as a result
                                of these recommendations. Evaluating these systems, though, is not a trivial task, it is an open research topic 
                                that gets many potential solutions published every year. 
                                As a result, there is a myriad of metrics now assessing several aspects of the recommendation process, in several 
                                types of scenarios,
                                for several types of users...There&apos;s even been a few papers suggesting that UX considerations weight as heavily, if not
                                more, than the choice of recommendation algorithm. Aspects such as how much the user trusts the system, how explainable 
                                the recommendations are perceived, or how the recommendations themselves seem to respond to user feedback can make or break a 
                                recommender system.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex justify-center w-full py-4">
                                <Image
                                    src="/images/cf.png"
                                    alt="collaborative filtering"
                                    width={600}
                                    height={600}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-white text-base md:text-lg">
                        With this in mind, we piggy back on the success of personality tests developed by psychology researchers to categorize 
                        consistent, individualized patterns of behavior. More importantly, we show that people&apos;s trust in these tests can transfer,
                        in some measure, to movie and streaming show recommendations obtained through a personality assessment.
                    </p>
                    <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                        Dataset and Participants
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        Our dataset consists of personality scores and ratings for movies/streaming shows. We recruited 3967 participants with accounts
                        in  <a href="https://myanimelist.net/" className="text-blue-400">MyAnimeList</a>, from which we scraped their ratings for movies and streaming shows. We also
                        administered a battery of personality questionnaires to the participants. 
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                        Ratings
                    </h3>
                    <p className="text-white text-base md:text-lg">
                        The ratings were provided on a scale from 0 to 10. We scrapped a total of 495,793 ratings on 12,268 different shows.
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                        Personality scores
                    </h3>
                    <p className="text-white text-base md:text-lg">
                        After careful consideration and a thorough literature review, we assessed for the presence/absence of the 
                        following personality traits:
                    </p>
                    <ul className="list-disc list-inside text-white text-base md:text-lg mt-2">
                        <li>Five Factor Model (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)</li>
                        <li>Need for Cognition</li>
                        <li>Sensation Seeking</li>
                        <li>Metaphor Use</li>
                        <li>Self-Location</li>
                    </ul>
                    <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                        Recommender System Model
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        We implemented a simple Collaborative Filtering (CF) algorithm, one of the earliest and most standardized recommendation algorithms.
                        In terms of Machine Learning, CF is essentially a large scale implementation of the K-Nearest Neighbors (KNN) regressor algorithm with a special
                        score aggregation scheme. 
                    </p>
                    <div className="flex justify-center w-full py-4">
                        <Image
                            src="/images/cfmodel.png"
                            alt="collaborative filtering model"
                            width={600}
                            height={600}
                        />
                    </div>
                    <p className="text-white text-base md:text-lg">
                        We integrate the personality scores with the ratings to the CF model in a cascading fashion. We start by predicting missing ratings
                        with a single pass of KNN based entirely on personality ratings. Then, we can use KNN again on the enriched set of ratings (with the 
                        predicted personality ratings) and predict missing ratings again. 
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                        Rating prediction
                    </h3>
                    <p className="text-white text-base md:text-lg">
                        For the rating prediction, we use weighed aggregation based of the
                        neighbors&apos; correlation coefficient (Pearson&apos;s). Specifically, we calculate the unknown rating  <InlineMath math="\widetilde{r}_{u,i}"/> given 
                        by user <InlineMath math="u"/> to item <InlineMath math="i"/> as:
                    </p>
                    <span className="text-white text-base md:text-lg mt-4">
                        <BlockMath math="\widetilde{r}_{u,i} = \bar{r_{u}} + k \sum_{v \in \Omega_{u}} simr(u, v) * (r_{v,i} - \bar{r_{v}})" />
                    </span>
                    <p className="text-white text-base md:text-lg">
                        where <InlineMath math="\bar{r_{u}}"/> is the average rating of user <InlineMath math="u"/>, <InlineMath math="\Omega_{u}"/> is the 
                        set of <InlineMath math="u"/>&apos;s neighbors, <InlineMath math="simr(u, v)"/> is the Pearson&apos;s correlation coefficient between 
                        users <InlineMath math="u"/> and <InlineMath math="v"/>, and <InlineMath math="k"/> is a normalization factor, set 
                        as <InlineMath math="1/\sum_{v \in \Omega_{u}} |simr(u, v)|"/>. 
                        Essentially, this formula calculates the unknown rating based on an aggregation of the neighbors&apos; ratings on that item, 
                        weighted by how similar the neighbors are to the user. Additionally, we subtract the average rating so that we only consider 
                        the deviations from users" average rating. 
                        Some users rate the shows they like the most wtih a 10 and the ones they like the least with a 5, while others rate their favorite 
                        shows with an 8, and the ones they dislike with a 1. Thus, it is standard practice to account for these differences when aggregating
                        ratings for prediction.
                    </p>
                    <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                        Evaluation and Results
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        We evaluated through Leave-One-Out Cross Validation (LOOCV), meaning that we hid every rating in the database from the system,
                        predicted it, then compared the prediction to the actual rating. For the comparison, we computed the Mean Absolute Error (MAE), 
                        which is simply the absolute difference between the predicted and the actual rating <InlineMath math="MAE = |r - \widetilde{r}|"/>.
                        Additionally, we recruited 14 participants to actually receive recommendations from the system and give us their explicit feedback through
                        a set of three 5-point Likert-style questions (ratings from 1 to 5). We divided the participants such that 5 of them received recommendations based on ratings only, 5 based on personality only,
                        and 4 based on both ratings and personality.
                    </p>
                    <table className="text-white mx-auto border border-white mt-6">
                        <thead>
                            <tr>
                            <th className="p-2 border border-white text-purple-500"></th>
                            <th className="p-2 border border-white text-purple-500">Ratings</th>
                            <th className="p-2 border border-white text-purple-500">Personality</th>
                            <th className="p-2 border border-white text-purple-500"> Personality + Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="p-2 border border-white">MAE</td>
                            <td className="p-2 border border-white">1.15</td>
                            <td className="p-2 border border-white">1.17</td>
                            <td className="p-2 border border-white">1.10</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-white text-base md:text-lg mt-4">
                        In terms of raw error metric (MAE), we find a combination of personality and ratings information to produce the best results. Interestingly,
                        we found that using only personality information is almost as effective (less than 2% difference) as using only ratings.
                    </p>
                    <table className="text-white mx-auto border border-white mt-6">
                        <thead>
                            <tr>
                            <th className="p-2 border border-white text-purple-500">Question</th>
                            <th className="p-2 border border-white text-purple-500">Ratings</th>
                            <th className="p-2 border border-white text-purple-500">Personality</th>
                            <th className="p-2 border border-white text-purple-500"> Personality + Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="p-2 border border-white">Overall quality of recommendations</td>
                            <td className="p-2 border border-white">3.52</td>
                            <td className="p-2 border border-white">4.01</td>
                            <td className="p-2 border border-white">3.95</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                            <td className="p-2 border border-white">Likelihood of watching any of the recommended shows</td>
                            <td className="p-2 border border-white">3.01</td>
                            <td className="p-2 border border-white">3.14</td>
                            <td className="p-2 border border-white">3.32</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                            <td className="p-2 border border-white">Willingness to use the system again</td>
                            <td className="p-2 border border-white">3.56</td>
                            <td className="p-2 border border-white">4.2</td>
                            <td className="p-2 border border-white">4.7</td>
                            </tr>
                        </tbody>
                    </table>
                <p className="text-white text-base md:text-lg mt-4">
                    Through the user study, we found the addition of personality to the recommendation process to have a substantially stronger impact, 
                    with users reporting 24% higher willingness to use the system again when it integrated both ratings and personalty information, 
                    and even reported the highest overall quality of recommendations to be highest when ONLY personality information was used. 
                    While the user study contained a substantially smaller sample size than the MAE offline evaluation (15 participants vs 3967), 
                    thus subject to more variability due to chance, it is interesting to note that the system versions integrating personality 
                    outperformed the other ones in all questions. By looking at these two tables, we can note that if users&apos; historical behavior is evaluated 
                    independently (as in the MAE evaluation), 
                    the purely ratings-based recommendations fare better. However, if asked directly, users rate the quality of purely personality-based 
                    recommendations higher. 
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                    Identifying relevant personality traits
                </h3>
                <p className="text-white text-base md:text-lg">
                    We analyzed, through a series of hierarchical linear regressions, what personality traits were most relevant for the recommendation process.
                    The following traits had the highest Beta coefficients, meaning they accounted for the most variance in the rating prediction task, and were
                    also the only statistically significant traits, meaning they had a lower chance of of having ocurred due to chance:
                </p>
                <ul className="list-disc list-inside text-white text-base md:text-lg mt-2">
                    <li>Self-Location</li>
                    <li>Openness</li>
                    <li>Agreeableness</li>
                    <li>Sensation Seeking</li>
                </ul>
                <p className="text-white text-base md:text-lg mt-4">
                    These traits are presented in order of the magnitude of their Beta coefficients, with Self-Location being the most important trait.
                    Self-location is a single-question test that asks participants if they locate their self either in a) their head or b) their heart. Openness, 
                    for which the full name is Openness to Experience, is a trait that measures a person&apos;s willingness to explore new experiences, 
                    ideas, and behavior. Agreeableness is a trait that measures a person&apos;s tendency to comply with the group&apos;s preferences and avoid conflict. Lastly,
                    sensation seeking measures a person&apos;s tendency to seek high intensity stimuli, such as loud music, dangerous sports, etc. Prior studies
                    have shown Agreeableness to be an important trait in the recommendation task, as it most likely assists in distinguishing low baseline raters from 
                    high baseline raters (i.e., harsh critics vs lenient critics). Openness would seem to help pair individuals with diverse tastes with other 
                    individuals with diverse tastes, conversely, it probably can also help pair individuals with monotonous tastes with other individuals with monotonous tastes. 
                    Sensation seeking, on the other hand,
                    is probably useful at the time of pairing users up with similar stimulation thresholds (i.e, how much action, spiciness or intensity they expect from a
                    show/movie). Lastly, regarding Self-Location, the most relevant trait, it has been shown, through studies, that head-locators characterized themselves as rational,
                    logical, and interpersonally cold, whereas heart-locators characterized themselves as emotional,
                    feminine, and interpersonally warm. Thus, this trait may be assisting at pairing up users seeking shows with similar levels of emotional warmth.
                </p>
                <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                    Conclusion
                </h2>
                <p className="text-white text-base md:text-lg">
                    These results are a testament to the importance of UX considerations in users&apos; perceptions of recommendation quality, seeing
                    how when users know that their personality is being taken into account, they rate the recommendations higher, but when evaluated offline, the
                    ratings-only recommendations fare slightly better. Naturally, combining both sources of information produces the best results. Furthermore, 
                    the fact that using only personality information is almost as effective as using only ratings, even in the offline MAE evaluation, has important
                    production implications. This essentially allows for new users, who have not rated any content yet, to receive recommendations based on 
                    their personality alone by answering a short questionnaire. Moreover, now that we have identified the most important personality traits 
                    for the recommendation task, we can focus on making the questionnaire as short as possible, while still capturing the most relevant information.
                </p>
                    

                </div>

                <div className="flex justify-center w-full mt-4">
                    <a href="https://github.com/Blistt/Recommender-System-Personality" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/githublogo2.png" alt="gan-git" width={85} height={85} />
                    </a>
                </div>
                <div className="flex justify-center w-full">
                    <p className="text-white text-base md:text-lg ml-4">
                    Check out the project"s code on GitHub
                    </p>
                </div>

            </div>
        </main>
    )
}