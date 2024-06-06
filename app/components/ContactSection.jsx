import React from "react";
import Image from "next/image";

const ContactSection = () => {
    return (
        <section id="contact">
            <div className="text-white mt-8">
                <h2 className="text-4xl font-bold">Contact info</h2>
                <div className="flex items-center mt-2">
                    <p className="text-base md:text-lg">
                        <strong className="text-purple-500">Email:</strong> fran.arrp@gmail.com
                    </p>
                    <a href="https://www.linkedin.com/in/francisco-arriaga-pazos/" target="_blank" rel="noopener noreferrer"
                    className="ml-6">
                        <Image
                            src="/images/linkedin.png"
                            alt="linkedin"
                            width={45}
                            height={45}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
