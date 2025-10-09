import React, { useRef, useState, useEffect, useCallback } from 'react';
// Framer Motion removed to eliminate the import error
import { ArrowLeft } from 'lucide-react';

// --- 1. Custom Hook for Typing Animation (Intersection Observer) ---
// This hook manages the typing animation state when the element enters the viewport.
const useTypingAnimation = (text: string, speed = 0.02) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayedText, setDisplayedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer callback must be safe regarding dependencies
    const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
            // Once it's visible, start the animation and stop observing
            setIsVisible(true);
        }
    }, []); // Empty dependency array ensures this callback never changes

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return; // Safely exit if no ref is available

        // Create the observer and start observing
        const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
        observer.observe(currentRef);

        // Cleanup function to unobserve when the component unmounts
        return () => {
            observer.unobserve(currentRef);
        };
    }, [handleIntersect]); // Only re-run if handleIntersect changes (it won't)

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

// --- 2. TypingText Component ---
// Wraps text content with the animation logic.
interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, className, speed }) => {
    // Cast ref to the specific element type (span)
    const { ref, displayedText } = useTypingAnimation(text, speed);
    
    // Add a blinking cursor effect for the final character if not fully visible
    // Note: The custom CSS for 'after:content-["|"]' and 'after:animate-pulse' is now in the <style> block below.
    const cursorClass = displayedText.length < text.length ? 'typing-cursor' : '';

    return (
        <span ref={ref} className={`font-sans ${className} ${cursorClass}`}>
            {displayedText}
        </span>
    );
};

// --- 3. TanninProject Content Component ---
// This contains the layout, sections, and placeholders.
const TanninContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const SectionPlaceholder: React.FC<{ title: string; height?: string }> = ({ title, height = 'h-96' }) => (
        <div className={`w-full ${height} bg-[#1a0521] rounded-xl flex items-center justify-center border border-[#F59E0B]/30 shadow-2xl`}>
            <p className="text-xl font-bold text-[#F59E0B]/70 uppercase tracking-widest">{title}</p>
        </div>
    );

    // Replaced motion.div with standard div and added CSS transition classes
    return (
        <div 
            className="w-full h-full bg-[#16041a]/90 backdrop-blur-xl rounded-3xl overflow-y-auto custom-scrollbar shadow-3xl p-6 sm:p-10 lg:p-16 border-2 border-[#F59E0B]/50 transition-all duration-500 ease-out"
            style={{ fontFamily: 'Helvetica, sans-serif' }}
        >
            {/* Header / Back Button */}
            <div className="sticky top-0 -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 lg:-mx-16 lg:-mt-16 pt-6 px-6 sm:px-10 lg:px-16 pb-4 z-10 bg-[#16041a]/80 backdrop-blur-sm flex justify-between items-center border-b border-[#F59E0B]/20">
                <button 
                    onClick={onClose}
                    className="flex items-center text-white/80 hover:text-white transition-colors transform hover:scale-105 active:scale-95 duration-200"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <span className="font-bold text-sm uppercase tracking-wider">Back to Portfolio</span>
                </button>
                <span className="text-xl font-bold text-[#F59E0B]">Tannin</span>
            </div>
            
            {/* ADJUSTMENT: Increased pt-16 (from pt-10) to move content below sticky header */}
            <div className="space-y-20 pt-16">

                {/* Section 1: Title and Overview */}
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
                    {/* ADJUSTMENT: Changed height from h-64 to h-[500px] (or similar large value) */}
                    <div className="pt-8">
                        <SectionPlaceholder title="3D TITLE TRACK PLACEHOLDER AS ANIMATED VIDEO" height="h-[500px]" /> 
                    </div>
                </section>

                {/* Section 2: Image Scroll - NOW HORIZONTALLY SCROLLABLE WITH 6 PLACEHOLDERS */}
                <section className="space-y-6">
                    <h2 className="text-5xl font-bold text-[#F59E0B]">
                        <TypingText text="§ JUST THE IMAGES YOU CAME FOR" className="inline-block" speed={0.03} />
                    </h2>
                    {/* Horizontal scroll container */}
                    <div className="flex overflow-x-auto space-x-6 p-4 -m-4">
                        {/* 6 placeholders */}
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 1" height="h-full" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 2" height="h-full" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 3" height="h-full" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 4" height="h-full" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 5" height="h-full" />
                        </div>
                        <div className="flex-shrink-0 w-96 h-96">
                            <SectionPlaceholder title="Image placeholder bottle 6" height="h-full" />
                        </div>
                    </div>
                    <p className="text-white/50 text-right text-sm italic pt-2">
                         <TypingText text="SCROLL HORIZONTALLY (Placeholder)" speed={0.01} />
                    </p>
                </section>

                {/* Section 3: Text Animation Placeholder */}
                <section className="space-y-6">
                    <h2 className="text-5xl font-bold text-[#F59E0B] text-center">
                         <TypingText text="TEXT ANIMATION PLACEHOLDER" className="inline-block" speed={0.03} />
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SectionPlaceholder title="Image placeholder 1" height="h-40" />
                        <SectionPlaceholder title="Image placeholder 2" height="h-40" />
                        <SectionPlaceholder title="Image placeholder 3" height="h-40" />
                        <SectionPlaceholder title="Image placeholder 4" height="h-40" />
                    </div>
                </section>

                {/* Section 4: Scrollable Flavors & More Text */}
                <section className="space-y-6">
                    <h3 className="text-3xl font-bold text-[#F59E0B]">
                        <TypingText text="Get the customization as you scroll down this website" speed={0.03} />
                    </h3>
                    
                    {/* Horizontal scroll placeholder for flavors */}
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
                    
                    {/* Final Text Block */}
                    <div className="pt-8 space-y-4">
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="This is where the remaining text and content blocks will go. The entire page is dedicated to providing an immersive, deep-dive experience into the Tannin Project, using high-impact visuals and bespoke animations." speed={0.015} />
                        </p>
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="More text space..." speed={0.015} />
                        </p>
                        <p className="text-white/80 text-lg leading-loose">
                            <TypingText text="...The end." speed={0.015} />
                        </p>
                    </div>
                </section>
                
                {/* Final Footer Spacer */}
                <div className="h-20" /> 
            </div>
        </div>
    );
};


// --- 4. Main Export (Handles Modal Logic) ---
export default function TanninProject() {
    const [isOpen, setIsOpen] = useState(true); // Always open for now, assumes navigation handles state

    // Simulate navigation/routing back to homepage
    const handleClose = () => {
        setIsOpen(false);
        // In a real app, you would use navigate('/') here
        console.log("Navigating back to portfolio home.");
    };

    // Note: Replaced AnimatePresence with standard conditional rendering
    return (
        <>
            {isOpen && (
                <div 
                    className={`fixed inset-0 z-50 p-4 sm:p-8 lg:p-12 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                    style={{ fontFamily: 'Helvetica, sans-serif' }}
                >
                    
                    {/* Blurred Background Overlay (Home Page) */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" 
                    />

                    {/* Modal Container */}
                    <div className="relative w-full h-full max-w-7xl mx-auto">
                        <TanninContent onClose={handleClose} />
                    </div>

                    {/* Custom CSS for cursor and scrollbar */}
                    <style>{`
                        /* Custom Scrollbar (WebKit only) */
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

                        /* Global style for the bold helvetica look */
                        body * {
                            font-family: 'Helvetica', 'Arial', sans-serif !important;
                        }
                        
                        /* Animation for typing cursor */
                        @keyframes pulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                        
                        /* Styling for the blinking cursor (replacing Tailwind pseudo-class syntax) */
                        .typing-cursor::after {
                            content: "|";
                            animation: pulse 1s infinite;
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}
