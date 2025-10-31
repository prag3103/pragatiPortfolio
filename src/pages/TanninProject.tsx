import tanninVideo from '../assets/tannin-projects/final tannin video - Copy.mp4';
import tanninImage1 from '../assets/tannin-projects/home.png';
import tanninImage2 from '../assets/tannin-projects/about.png';
import tanninImage3 from '../assets/tannin-projects/carota.png';
import tanninImage4 from '../assets/tannin-projects/citrine.png';
import tanninImage5 from '../assets/tannin-projects/scarlett.png';
import tanninImage6 from '../assets/tannin-projects/jadeite.png';
import tanninImage7 from '../assets/tannin-projects/contact.png';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const useTypingAnimation = (text: string, speed = 0.02) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayedText, setDisplayedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
        observer.observe(currentRef);

        return () => {
            // SYNTAX ERROR FIXED: Corrected `currentCef` to `currentRef`
            observer.unobserve(currentRef);
        };
    }, [handleIntersect]);

    useEffect(() => {
        if (isVisible && displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, displayedText, text, speed]);

    return { ref, displayedText, isVisible };
};

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, className, speed }) => {
    const { ref, displayedText } = useTypingAnimation(text, speed);
    const cursorClass = displayedText.length < text.length ? 'typing-cursor' : '';

    return (
        <span ref={ref} className={`font-sans ${className} ${cursorClass}`}>
            {displayedText}
        </span>
    );
};

const TanninContent: React.FC = () => {
    // MODIFICATION: Use the useNavigate hook here
    const navigate = useNavigate();

    const SectionPlaceholder: React.FC<{ title: string; height?: string }> = ({ title, height = 'h-96' }) => (
        <div className={`w-full ${height} bg-[#1a0521] rounded-xl flex items-center justify-center border border-[#F59E0B]/30 shadow-2xl`}>
            <p className="text-xl font-bold text-[#F59E0B]/70 uppercase tracking-widest">{title}</p>
        </div>
    );

    return (
        <div 
            className="w-full h-full bg-[#16041a]/90 backdrop-blur-xl rounded-3xl overflow-y-auto custom-scrollbar shadow-3xl p-6 sm:p-10 lg:p-16 border-2 border-[#F59E0B]/50 transition-all duration-500 ease-out"
            style={{ fontFamily: 'Helvetica, sans-serif' }}
        >
            <div className="sticky top-0 -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 lg:-mx-16 lg:-mt-16 pt-6 px-6 sm:px-10 lg:px-16 pb-4 z-10 bg-[#16041a]/80 backdrop-blur-sm flex justify-between items-center border-b border-[#F59E0B]/20">
                <button 
                    // MODIFICATION: The onClick handler now uses the `Maps` function
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white/80 hover:text-white transition-colors transform hover:scale-105 active:scale-95 duration-200"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <span className="font-bold text-sm uppercase tracking-wider">Back to Portfolio</span>
                </button>
                <span className="text-xl font-bold text-[#F59E0B]">Tannin</span>
            </div>
            
            <div className="space-y-20 pt-16">
                <section className="text-center space-y-4">
                    <h1 className="text-7xl font-bold text-[#F59E0B]">
                        <TypingText text="Tannin" className="inline-block" speed={0.1} />
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-xl leading-relaxed">
                        <TypingText 
                            text="A web development, branding, art direction, and storytelling project that crafts Tanin into a rich, luxurious wine brand—where digital design and narrative elegance evoke the depth, refinement, and timeless allure of fine wine."
                            className="inline-block" 
                            speed={0.015}
                        />
                    </p>
                    <div className="pt-8">
                        <div className="w-full h-[500px] rounded-xl overflow-hidden">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src={tanninVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-5xl font-bold text-[#F59E0B]">
                        <TypingText text="§ PAGES" className="inline-block" speed={0.03} />
                    </h2>
                    <div className="flex overflow-x-auto space-x-6 p-4 -m-4">
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage1} alt="Tannin product shot 1" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage2} alt="Tannin product shot 2" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage3} alt="Tannin product shot 3" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage4} alt="Tannin product shot 4" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage5} alt="Tannin product shot 5" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage6} alt="Tannin product shot 6" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-shrink-0 w-[32rem] h-96">
                            <img src={tanninImage7} alt="Tannin product shot 7" className="w-full h-full object-cover rounded-xl" />
                        </div>
                    </div>
                    <p className="text-white/50 text-right text-sm italic pt-2">
                          <TypingText text="SCROLL HORIZONTALLY (Placeholder)" speed={0.01} />
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-5xl font-bold text-[#F59E0B] text-center">
                          <TypingText text="TEXT ANIMATION PLACEHOLDER" className="inline-block" speed={0.03} />
                    </h2>
                    
                </section>

                <section className="space-y-6">
                    <h3 className="text-3xl font-bold text-[#F59E0B]">
                        <TypingText text="3D - Models" speed={0.03} />
                    </h3>
                    
                    <div className="flex overflow-x-auto space-x-4 p-4 rounded-xl border border-[#F59E0B]/30">
                        <div className="flex-shrink-0 w-64 h-48 bg-[#1a0521] rounded-lg flex items-center justify-center text-[#F59E0B]/70 font-bold">Scrollable Flavor Card 1</div>
                        <div className="flex-shrink-0 w-64 h-48 bg-[#1a0521] rounded-lg flex items-center justify-center text-[#F59E0B]/70 font-bold">Scrollable Flavor Card 2</div>
                        <div className="flex-shrink-0 w-64 h-48 bg-[#1a0521] rounded-lg flex items-center justify-center text-[#F59E0B]/70 font-bold">Scrollable Flavor Card 3</div>
                        <div className="flex-shrink-0 w-64 h-48 bg-[#1a0521] rounded-lg flex items-center justify-center text-[#F59E0B]/70 font-bold">Scrollable Flavor Card 4</div>
                        <div className="flex-shrink-0 w-64 h-48 bg-[#1a0521] rounded-lg flex items-center justify-center text-[#F59E0B]/70 font-bold">Scrollable Flavor Card 5</div>
                    </div>
                    <p className="text-white/50 text-sm italic text-right">
                          <TypingText text="SCROLL to see 5 flavors (Placeholder)" speed={0.01} />
                    </p>
                    
                    <div className="pt-8 space-y-4">
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="Here is the link to the tannin website. It is a github repo, since the company is still in it's development stages: https://prag3103.github.io/tannin-website/" speed={0.015} />
                        </p>
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="More text space..." speed={0.015} />
                        </p>
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="...The end." speed={0.015} />
                        </p>
                    </div>
                </section>
                
                <div className="h-20" /> 
            </div>
        </div>
    );
};

export default function TanninProject() {
    return (
        <div 
            className={`fixed inset-0 z-50 p-4 sm:p-8 lg:p-12 transition-opacity duration-300 opacity-100 pointer-events-auto`} 
            style={{ fontFamily: 'Helvetica, sans-serif' }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" />
            <div className="relative max-w-[80rem] mx-auto h-full">
                {/* MODIFICATION: Render TanninContent without an onClose prop */}
                <TanninContent />
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #F59E0B;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #16041a;
                }

                body * {
                    font-family: 'Helvetica', 'Arial', sans-serif !important;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                .typing-cursor::after {
                    content: "|";
                    animation: pulse 1s infinite;
                }
            `}</style>
        </div>
    );
}