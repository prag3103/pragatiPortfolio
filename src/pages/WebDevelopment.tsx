import React, { useState, useEffect, useRef } from 'react';

import myBackgroundImage from '../assets/web_development/blue_ghingham_background.jpg';

// --- TYPE DEFINITIONS ---
interface Slide {
    title: string;
    content: string;
    detailPlaceholder: string; 
    color: string;
}

// --- SLIDE CONTENT DATA ---
const SLIDES: Slide[] = [
    {
        title: "Building this website (React/Next.js)",
        content: "Building responsive, highly performant user interfaces is my focus. I specialize in the React ecosystem, leveraging modern hooks, state management (Zustand/Redux), and server-side rendering for optimal speed.",
        detailPlaceholder: "Phase 1: Wireframing and Component Architecture definition using Figma and Storybook. All projects are built mobile-first and undergo rigorous testing before deployment.",
        color: "text-red-400",
    },
    {
        title: "Backend Architecture (Node/Express/Firebase)",
        content: "From robust RESTful APIs to real-time database solutions using Firestore and authentication via Firebase Auth, I design scalable, secure server-side applications.",
        detailPlaceholder: "Key Technologies: Node.js, TypeScript, Firestore (NoSQL), Express, and secure JWT handling for API routes. Focus on clean code and robust error handling.",
        color: "text-green-400",
    },
    {
        title: "Deployment & DevOps",
        content: "Mastery of modern deployment workflows, including CI/CD pipelines, containerization (Docker), and cloud platforms like Vercel and AWS, ensuring projects run reliably.",
        detailPlaceholder: "Environment setup includes automated testing, staging branches, and continuous deployment (CD) through GitHub Actions or Vercel. Aiming for 99.9% uptime.",
        color: "text-blue-400",
    },
];

// --- GLOBAL STYLES (Enabling Retro/CRT Effects) ---
// Note: This component is required to insert the complex CSS animations and fonts
// The background image logic is shown in the main WebDevelopment function below.
const GlobalRetroStyles: React.FC = () => (
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

            body { 
                font-family: 'VT323', monospace; 
            }
            .font-retro {
                font-family: 'VT323', monospace;
            }
            .shadow-retro {
                box-shadow: 0 0 20px rgba(0, 255, 153, 0.5), 0 0 5px rgba(0, 255, 153, 0.8);
            }
            /* Scanlines Effect */
            .scanlines {
                background: repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.4) 0,
                    rgba(0, 0, 0, 0.4) 1px,
                    transparent 2px,
                    transparent 3px
                );
            }
            /* Static Noise Effect - keyframes for constant movement */
            @keyframes static-anim {
                0% { background-position: 0 0; }
                100% { background-position: 100% 100%; }
            }
            .static-noise {
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGFBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAPr3HrAAAAB3RSTlMAAAAAAHuUaO4AAAATSURBVDjLY2AYBYMGEAABYAYGgwgCAJ6SAXfA1Q0UAAAAAElFTkSuQmCC');
                background-size: 50px 50px;
                animation: static-anim 0.2s infinite;
            }
            /* Custom Scrollbar for retro look */
            .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #111827; 
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #00ff99; 
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #00cc7a; 
            }
        `}
    </style>
);


// 1. Static/Scanline Overlay (The CRT Effect)
const CRTScreenOverlay: React.FC = () => (
    <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Scanlines Effect */}
        <div className="scanlines absolute inset-0 opacity-20"></div>
        {/* Static Noise Effect */}
        <div className="static-noise absolute inset-0 opacity-10"></div>
    </div>
);

// 2. Typing Search Bar Component
const TypingSearch: React.FC = () => {
    // Explicitly typed constants/state for TypeScript compatibility
    const textToType: string = "Welcome to my web development process";
    const [displayedText, setDisplayedText] = useState<string>("");
    const [cursorVisible, setCursorVisible] = useState<boolean>(true);
    const indexRef = useRef<number>(0);

    // Typing effect logic
    useEffect(() => {
        const typeChar = () => {
            // Using non-null assertion on indexRef.current as it's initialized to 0
            if (indexRef.current! < textToType.length) {
                setDisplayedText(prev => prev + textToType[indexRef.current!]);
                indexRef.current!++;
            }
        };
        const typingInterval = setInterval(typeChar, 80);
        return () => clearInterval(typingInterval);
    }, [textToType]);

    // Blinking cursor logic
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const cursor: string = cursorVisible ? "_" : " ";

    return (
        <div className="p-4 bg-white/90 rounded-full w-full max-w-4xl shadow-retro border-2 border-black">
            <div className="text-2xl sm:text-3xl lg:text-4xl text-black font-retro tracking-wider whitespace-nowrap overflow-hidden">
                {displayedText}
                <span className="text-yellow-500">{cursor}</span>
            </div>
        </div>
    );
};

// 3. Main Slideshow Component
const Slideshow: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const nextSlide = (): void => {
        setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const slide: Slide = SLIDES[currentSlide];

    return (
        // Increased max-w-5xl to max-w-7xl and h-[50vh] to h-[75vh] for bigger presentation box
        <div className="relative w-full max-w-full h-[75vh] bg-gray-900 border-4 border-[#00ff99] shadow-2xl p-6 rounded-lg overflow-hidden flex flex-col justify-between">
            {/* Content Display */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 text-white">
                <h3 className={`text-5xl font-bold mb-6 ${slide.color} font-retro`}>
                    {slide.title}
                </h3>
                <p className="text-gray-200 text-xl leading-relaxed font-mono mb-6 border-l-4 border-[#00ff99] pl-4">
                    {slide.content}
                </p>


                {/* Custom layout for first slide*/}

                {currentSlide === 0 ? (
                    <>
                        {/* Top Row: Four Boxes in a Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center">
                                    {/* Placeholder Box */}
                                    <div className="w-full h-24 border-2 border-[#00ff99] rounded-lg mb-2 flex items-center justify-center text-sm font-retro text-gray-400">
                                        [Mockup {i}]
                                    </div>
                                    {/* Text Lines */}
                                    <div className="w-full h-1 bg-gray-700 rounded-full mb-1"></div>
                                    <div className="w-3/4 h-1 bg-gray-700 rounded-full"></div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Row: Large Box and Long Text Lines */}
                        <div className="flex flex-col lg:flex-row gap-6 items-start mt-4">
                            {/* Large Box */}
                            <div className="w-full lg:w-1/3 h-48 border-2 border-[#00ff99] rounded-lg mb-4 flex items-center justify-center text-lg font-retro text-gray-400">
                                [Final Design Mockup]
                            </div>
                            {/* Long Text Lines */}
                            <div className="w-full lg:w-2/3 space-y-3">
                                <div className="w-full h-2 bg-gray-700 rounded-full"></div>
                                <div className="w-11/12 h-2 bg-gray-700 rounded-full"></div>
                                <div className="w-full h-2 bg-gray-700 rounded-full"></div>
                                <div className="w-1/2 h-2 bg-gray-700 rounded-full"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Default layout for slides 1, 2, ...
                    <>
                        {/* Detail Placeholder (Displaying for non-first slides) */}
                        <div className="mt-8 p-4 bg-gray-800/70 border-dashed border-2 border-gray-600 rounded-md text-sm text-[#00ff99] font-retro whitespace-pre-wrap">
                            {slide.detailPlaceholder}
                        </div>
                        {/* Generic Image Placeholder */}
                        <div className="mt-8 h-32 bg-gray-800 border-dashed border-2 border-gray-600 flex items-center justify-center text-lg text-gray-500 font-retro">
                            {`[ Placeholder for images / embedded content for ${slide.title} ]`}
                        </div>
                    </>
                )}
                
                
                {/* Placeholder for images/embedded content */}
                

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-8 pt-4">
                <button
                    onClick={prevSlide}
                    className="nav-button hover:text-[#00ff99] transition duration-200"
                    aria-label="Previous Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div className="text-[#00ff99] text-2xl font-mono self-center">
                    {currentSlide + 1} / {SLIDES.length}
                </div>
                <button
                    onClick={nextSlide}
                    className="nav-button hover:text-[#00ff99] transition duration-200"
                    aria-label="Next Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </div>
    );
};

// --- MAIN WEB DEVELOPMENT PAGE ---
export default function WebDevelopment() {
    // This variable represents your imported image.
    // In your local project, you would use: import myBackgroundImage from '@/assets/my-background.png';
    // To make this file runnable in this environment, we use a string that assumes the local variable name.
   
    const placeholderBackgroundUrl = "https://placehold.co/1920x1080/0d1117/30415a?text=RETRO+BACKGROUND";

    return (
        <div 
            className="relative w-screen h-screen flex items-center justify-center p-4 overflow-hidden"
            style={{ 
               // This is where your imported image path goes.
                // Replace `placeholderBackgroundUrl` with `myBackgroundImage` 
                // once you add the import in your local environment.
                backgroundImage: `url(${myBackgroundImage})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Inject Global Styles */}
            <GlobalRetroStyles />
            
            {/* Main Content Card */}
            <div className="flex flex-col items-center space-y-8 z-10 w-full max-w-7xl">
                <TypingSearch />
                <Slideshow />
            </div>
            
            {/* The Retro Overlay */}
            <CRTScreenOverlay />
        </div>
    );
}
