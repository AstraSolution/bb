const SectionTitle = ({ heading }) => {
    return (
        <div className="relative bg">
            {/* bottom curve */}
            <div className="absolute inset-x-0 bottom-0 ">
                <svg
                    viewBox="0 0 224 12"
                    fill="currentColor"
                    className="w-full -mb-1 text-teal-50"
                    preserveAspectRatio="none"
                >
                    <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
                </svg>
            </div>

            {/* Information section */}
            <div className="text-center px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                    <h2 className="mb-6 text-3xl font-bold text-white sm:text-5xl">
                        {heading}
                    </h2>
                </div>
            </div>
        </div>


    );
};

export default SectionTitle;