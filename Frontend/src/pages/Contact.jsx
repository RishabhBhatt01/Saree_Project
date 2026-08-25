function Contact() {
    return (
        <main className="bg-[#faf6f1] min-h-screen">

            {/* HEADER */}

            <section className="bg-white py-16 px-6">

                <div className="max-w-6xl mx-auto">

                    <div className="bg-[#332525] text-white rounded-3xl p-10 md:p-14 w-full min-h-[420px]">

                        <p className="text-sm tracking-[0.3em] text-[#e8cfd6]">
                            SAARÉE
                        </p>

                        <h2 className="mt-14 font-serif text-4xl md:text-5xl">
                            Customer Care
                        </h2>

                        <p className="mt-7 text-gray-200 leading-relaxed max-w-1xl">
                            Need help with your order, product, payment or delivery?
                            Our customer care team is here to assist you.
                        </p>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* EMAIL */}

                            <div>
                                <p className="text-sm text-gray-400">
                                    EMAIL
                                </p>

                                <a
                                    href="mailto:support@saaree.com"
                                    className="mt-2 inline-block hover:text-[#e8cfd6] transition"
                                >
                                    support@saaree.com
                                </a>
                            </div>


                            {/* WHATSAPP */}

                            <div>
                                <p className="text-sm text-gray-400">
                                    WHATSAPP
                                </p>

                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block hover:text-[#e8cfd6] transition"
                                >
                                    +91 98765 43210
                                </a>
                            </div>


                            {/* HOURS */}

                            <div>
                                <p className="text-sm text-gray-400">
                                    CUSTOMER CARE HOURS
                                </p>

                                <p className="mt-2 text-gray-300">
                                    Monday – Saturday
                                    <br />
                                    10:00 AM – 6:00 PM
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Contact;