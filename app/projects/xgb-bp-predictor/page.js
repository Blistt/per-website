"use client";
import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function Page() {
    return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto py-4 px-12">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4">
            XGBoost Blood Pressure Predictor
            </h1>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 md:pr-8">
                    <p className="text-white text-base md:text-lg md:mt-20">
                    Blood Pressure (BP) is a crucial indicator of cardiovascular health, and one of the most important vital signs 
                    monitored by healthcare professionals to assess a patient&apos;s overall health. This project uses measures of daily
                    behavior, such as exercise and sleep, collected from smartwatches to predict blood pressure levels and provide
                    personalized recommendations to regulate BP. We use XGBoost regressors to predict daily 
                    systolic and diastolic BP levels for an overall user base, then personalize on an individual level through
                    transfer learning. Lastly, we use the personalized feature importance of each measured behavior to suggest concrete changes
                    (e.g., 30 more minutes of sleep, 400 more steps) that the user can make to bring their BP to desired ranges. 
                    </p>
                </div>
                <div className="md:w-1/2">
                    <div className="flex justify-center mt-8">
                    <Image
                        src="/images/main-idea.png"
                        alt="XGB Blood Pressure Predictor"
                        width={350}
                        height={350}
                    />
                    </div>
                </div>
            </div>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                BP regulation and Machine Learning
            </h2>
            <p className="text-white text-base md:text-lg mt-4">
                There are a few examples of BP regulation via Machine Learning originated behavioral recommendations. Most notably,
                this <a href="https://ieeexplore.ieee.org/document/8531109" className="text-blue-400"> study </a> from UC 
                San Diego, where they used Random Forest (RF) regressors to predict BP levels from biometric data, then derive recommendations
                from the feature importances of the measured behaviors (i.e., how much variance each behavior, such as sleep minutes, explains
                in the BP prediction task). While the results achieved in this study were impressive in terms of BP prediciton error,
                they trained their models on rigorously collected clinical trial data from only 6 participants over the span of several months.
                The participants in the study adhered to a strict data collection schedule, which, although ideal in terms of dataset quality,
                is an extremely rare ocurrence in production scenarios, where users will seldom display such discipline. Furthermore, the small sample size of
                only 6 individuals puts into question whether the model would generalize well to a larger, more diverse population. There are a few 
                improvements that the 6 years of advancements in Machine Learning since the paper was published have allowed us to make. 
            </p>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-8 mb-2">
                Data Collection and Augmentations
            </h2>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <div className="flex justify-center mt-8">
                    <Image
                        src="/images/heartcounts.jpg"
                        alt="My Heart Counts Dataset"
                        width={350}
                        height={350}
                    />
                    </div>
                </div>
                <div className="md:w-3/4 md:pr-8">
                    <p className="text-white text-base md:text-lg mt-6 md:px-4">
                        We used the <a href="https://www.synapse.org/#!Synapse:syn11269541/tables/" className="text-blue-400"> My Heart Counts </a> public dataset.
                        This dataset is comprised of the biometric, nutritional, and activity data of over 10,000 individuals, collected through multiple
                        instruments. We focused on the data collected via Apple Watches, for a total of 12 variables, which include step count, sleep minutes, 
                        active minutes, calories, burned, etc.
                        We also retrieved blood pressure readings, both systolic and diastolic, from the participants. 
                        It was noted early on, that while the dataset was rich in terms of the number of participants, the data, particularly the BP readings, was extremely sparse.
                        Only a fraction of the participants (~1,000) provided BP readings more than once. Considering that BP is best modeled as an autoregressive  time series variable, 
                        meaning, past BP readings are crucial predictors of future BP values, we had to come up with a way to augment the data to alleviate its sparsity in some measure.
                        We employed three augmentation strategies: 
                    </p>
                </div>
            </div>
            <ul className="list-disc text-white text-base md:text-lg mt-4">
                <li>
                    <strong>K-rolling average:</strong> replaces missing values with the rolling average of a k sized window along the temporal
                    dimension for each user
                </li>
                <li>
                    <strong>KNN intra user imputation:</strong> searches for nearest neighbors only within the same user
                </li>
                <li>
                <strong>KNN inter user imputation:</strong> searches for nearest neighbors accross all users
                </li>
            </ul>
            <p className="text-white text-base md:text-lg mt-4">
                After experimentation, we found that the KNN intra user imputation strategy yielded the best results in terms of BP prediction error.
            </p>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-8 mb-2">
                Our System
            </h2>
            <h3 className="text-white text-xl md:text-2xl font-bold text-left mt-6 mb-2">
                BP prediction
            </h3>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 md:pr-8">
                    <p className="text-white text-base md:text-lg mt-6 md:px-4">
                        The first step in our BP regulation system is BP prediction. We use the activity data collected from the Apple Watches to predict daily
                        systolic and diastolic BP levels. We use gradient boosted trees for this purpose. Specifically, we use XGBoost regressors, a well established
                        implementation of a state-of-the-art family of ML algorithms. Our training has two stages: 
                    </p>
                    <ol className="list-disc text-white text-base md:text-lg mt-4">
                        <li>
                            <strong>Base training:</strong> we train a model on a dataset with all users to predict BP levels for the overall user base
                        </li>
                        <li>
                            <strong>Personalized prediction:</strong> we use transfer learning to personalize the overall model to each individual user
                        </li>
                    </ol>
                </div>
                <div className="md:w-2/5">
                    <div className="flex justify-center mt-8">
                    <Image
                        src="/images/bpprediction.png"
                        alt="My Heart Counts Dataset"
                        width={450}
                        height={600}
                    />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <Image
                    src="/images/entiresystem.png"
                    alt="My Heart Counts Dataset"
                    width={700}
                    height={800}
                />
            </div>
            <p className="text-white text-base md:text-lg mt-4">
                In the original UCSD study, they personalize their system to each user by training an entire model from scratch for each user. This is 
                feasible in a research setting with a small dataset of 6 individuals, but is not scalable to a larger population, and it is not suitable for a production environment
                where users won&apos;t necessarily be willing to provide months&apos; worth of data before they can receive the personalized recommendations they signed up for.
                We solve that through transfer learning: we first train the model on a large dataset of all users, then fine-tune the model on data set apart for each 
                individual user. This way, despite there only being a few days worth of data for each user, the model can still make accurate predictions informed
                by its training on a large, diverse sample of users. Then, as the user provides more data, the fine-tuning process will rely less on its base training and 
                more on the user&apos;s own data, thus enhancing personalization.
            </p>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                Evaluation
            </h2>
            <p className="text-white text-base md:text-lg mt-4">
                We use standard error metrics, namely Mean Absolute Error (MAE) and Mean Squared Error (MSE) to evaluate our model&apos;s performance. These metrics, particularly MAE,
                are straightforward measures of the error made by the model in the prediction of BP levels. Our system achieves a MAE of  
                <span className="text-purple-500 font-bold"> 9.7</span> for systolic BP and <span className="text-purple-500 font-bold"> 6.3 </span> 
                for diastolic BP. In other words, our model&apos;s predictions are off, on average, by 9.7 mmHg for systolic BP and 6.3 mmHg for diastolic BP. 
                For evaluation purposes, we also implement UCSD&apos;s model, with personalized RF regressors, and find that our model outperforms theirs by over 
                <span className="text-purple-500 font-bold"> 25% </span> in terms of MAE after averaging for both systolic and diastolic BP.
            </p>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2">
                Recommendations
            </h2>
            <p className="text-white text-base md:text-lg mt-4">
                The last step in the pipeline is producing the recommendations. Gradient boosted trees have the nice property where
                the variance in the final prediction that each input feature accounts for is significantly more tractable than it would be for more sophisticated 
                approaches, such as deep learning. XGBoost even provides a built-in feature importance metric, that essentially quantifies how much each input feature 
                (e.g., sleep minutes, step count) contributes to the final prediction. We use this feature importance to compute the recommended changes a user would
                need to make to bring their daily BP levels to a desired range. For example, for a given user showing BP levels higher than the desired range of 120-80 mmHg,
                the system might output the following recommendations for the user&apos;s top 3 most important activities:
            </p>
            <table className="text-white mx-auto border border-white mt-6">
                <thead>
                    <tr>
                    <th className="p-2 border border-white text-purple-500">Activity</th>
                    <th className="p-2 border border-white text-purple-500">Original Value</th>
                    <th className="p-2 border border-white text-purple-500">Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="p-2 border border-white">active_calories</td>
                    <td className="p-2 border border-white">355.67</td>
                    <td className="p-2 border border-white">+87.44</td>
                    </tr>
                    <tr>
                    <td className="p-2 border border-white">awake_count</td>
                    <td className="p-2 border border-white">2.0</td>
                    <td className="p-2 border border-white">0.1869 (wake up one less time during the night)</td>
                    </tr>
                    <tr>
                    <td className="p-2 border border-white">sleep_minutes</td>
                    <td className="p-2 border border-white">367.0</td>
                    <td className="p-2 border border-white">+33.4101</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-white text-base md:text-lg mt-4">
                In this example with a user from our validation dataset, the system recommends the user to increase their active calories by 87.44, wake up one less time during the night, and sleep an additional
                33.41 minutes to bring their BP levels to the desired range. Needless to say, UX considerations would probably lead us to round these numbers to nicer,
                more meaningful values, such as maybe multiples of 15 or 30 minutes for sleep, and 100 for active calories. 
            </p>
        <h2 className="text-purple-500 text-2xl md:text-3xl font-bold text-left mt-8 mb-2">
            Conclusion
        </h2>
        <p className="text-white text-base md:text-lg mt-4">
            In this project, we succesfully implement an ML system that suggests concrete, personalized behavioral changes a user can undertake to regulate their BP. We use a backbone of XGBoost
            regressors trained on ~400,000 datapoints provided by over 10,000 users to produce these recommendations, and show it can predict unseen BP with an average error of 9.7 mmHg for systolic BP and 6.3 mmHg for diastolic BP. Furthermore,
            we address limitations of prior attempts at BP regulation through ML by using transfer learning to personalize the model to each user, and by using a substantially larger and more diverse dataset,
            which we augment to alleviate its inherent sparsity. The code for this project is available on GitHub (), along with detailed instructions on how to run, train and evaluate the implemented system.
        </p>
        </div>
    </main>
    );
}