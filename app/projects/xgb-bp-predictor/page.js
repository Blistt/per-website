import Navbar from "../../components/Navbar";
import Image from 'next/image';

export default function Page() {
    return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto py-4 px-12">
            <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold py-4'>
            XGBoost Blood Pressure Predictor
            </h1>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 md:pr-8">
                    <p className="text-white text-base md:text-lg md:mt-20">
                    Blood Pressure (BP) is a crucial indicator of cardiovascular health, and one of the most important vital signs 
                    monitored by healthcare professionals to assess a patient's overall health. This project uses measures of daily
                    behavior, such as exercise and sleep, collected from smartwatches to predict blood pressure levels and provide
                    personalized recommendations to regulate BP. We use XGBoost regressors to predict daily 
                    systolic and diastolic BP levels for an overal user base, then personalize on an individual level through
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
            <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-6 mb-2'>
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
            <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-8 mb-2'>
                Data Collection and Augmentations
            </h2>
            <p className="text-white text-base md:text-lg mt-4">
                We used the <a href="https://www.synapse.org/#!Synapse:syn11269541/tables/" className="text-blue-400"> My Heart Counts </a> public dataset.
                This dataset is comprised of the biometric, nutritional, and activity data of over 10,000 individuals, collected through multiple
                instruments. We emphasized on the data collected via Apple Watches, which includes step count, sleep minutes, active minutes, calories, burned, etc.
                We also retrieved blood pressure readings, both systolic and diastolic, from the participants. 
                It was noted early on, that while the dataset was rich in terms of the number of participants, the data, particularly the BP readings, was extremely sparse.
                Only a fraction of the participants (~1,000) provided BP readings more than once. Considering that BP is best modeled as an autoregressive  time series variable, 
                meaning, past BP readings are crucial predictors of future BP values, we had to come up with a way to augment the data to alleviate its sparsity in some measure.
                We employed three augmentation strategies: 
            </p>
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
            <h2 className='text-purple-500 text-2xl md:text-3xl font-bold text-left mt-8 mb-2'>
                Our Model
            </h2>
            
        </div>
    </main>
    );
}