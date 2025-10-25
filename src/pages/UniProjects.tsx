import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import Library from '@/components/Library.jsx'; 
import BookContent from '@/components/BookContent';
import { useNavigate } from 'react-router-dom';

// Modal overlay for the book content
const BookOverlay: React.FC<{ children: React.ReactNode, isVisible: boolean }> = ({ children, isVisible }) => (
    <div 
        className={`fixed inset-0 z-50 transition-opacity duration-500 backdrop-blur-md ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-10">
            {children}
        </div>
    </div>
);

export default function UniProjects() {
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [activeBookId, setActiveBookId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleBookOpen = useCallback((bookId: string) => {
        setActiveBookId(bookId);
        setIsBookOpen(true);
    }, []);

    const handleBookClose = useCallback(() => {
        setIsBookOpen(false);
        setTimeout(() => setActiveBookId(null), 500); 
    }, []);

    const handleBackToPortfolio = () => {
        navigate(-1);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* FIX 1: Adjusted camera position from [5, 5, 5] to [0, 1.8, 3.5]. 
                This places the view inside the room at eye level (1.8m) and 3.5m back from the center.
            */}
            <Canvas camera={{ position: [0, -5, 0] }}>
                <Suspense fallback={<Html center className="text-white text-xl">Loading Library...</Html>}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, 0, -20]} intensity={0.5} />
                    <Environment preset="apartment" /> 
                    <Library onBookClick={handleBookOpen} />
                </Suspense>
                
                {/* FIX 2: Added the target property to OrbitControls. 
                    This sets the rotation/focus point to [0, 1.2, 0], ensuring the camera orbits 
                    around the center of the room at a comfortable viewing height.
                */}
                <OrbitControls enableZoom={true} enablePan={true} target={[0, 1.2, 0]} />
            </Canvas>

            <button 
                onClick={handleBackToPortfolio}
                className="absolute top-4 left-4 z-10 bg-white/10 text-white p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition"
                aria-label="Back to Portfolio"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <BookOverlay isVisible={isBookOpen}>
                {activeBookId && (
                    <div className="bg-[#1f1f1f] text-white p-6 rounded-xl shadow-2xl max-w-4xl w-full h-4/5 flex flex-col border border-[#ffc82c] relative">
                        <button 
                            onClick={handleBookClose} 
                            className="absolute top-4 right-4 text-white hover:text-[#ffc82c] font-bold text-3xl z-20 transition"
                            aria-label="Close Project Book"
                        >
                            &times;
                        </button>
                        <BookContent bookId={activeBookId} />
                    </div>
                )}
            </BookOverlay>
        </div>
    );
}
