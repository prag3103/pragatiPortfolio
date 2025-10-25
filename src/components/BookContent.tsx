import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projectData: { [key: string]: { title: string; pages: { header: string; text: string; imageUrl?: string; }[] } } = {
    'purple book': {
        title: "Retro device",
        pages: [
            { header: "Introduction: Project Overview", text: "This project explored optimizing pathfinding algorithms (A* and Dijkstra) for complex dynamic graphs. Focus was placed on parallel processing techniques in C++.", imageUrl: "https://placehold.co/400x300/8A2BE2/FFFFFF?text=Project+Intro" },
            { header: "Page 2: Implementation Details", text: "We used a custom priority queue implementation and benchmarked performance against standard library containers. The results showed a 15% efficiency gain in median path resolution time.", imageUrl: "https://placehold.co/400x300/8A2BE2/FFFFFF?text=Code+Snippet" },
            { header: "Page 3: Conclusion & Future Work", text: "Future work involves integrating machine learning models to predict optimal search heuristics, further reducing computational cost for large-scale maps.", imageUrl: "https://placehold.co/400x300/8A2BE2/FFFFFF?text=Future+Plans" },
        ],
    },
    'green book': {
        title: "Change in Art",
        pages: [
            { header: "Page 1: Project Goal", text: "Development of a low-energy, high-efficiency web application focusing on minimizing DOM repaint cycles and using green hosting solutions.", imageUrl: "https://placehold.co/400x300/00B000/FFFFFF?text=UI/UX+Design" },
            { header: "Page 2: Accessibility Focus", text: "Detailed study and implementation of WCAG 2.1 compliance, achieving level AA certification through semantic HTML and high-contrast styling.", imageUrl: "https://placehold.co/400x300/00B000/FFFFFF?text=WCAG+Results" },
        ],
    },
    'yellow book': {
        title: "Three sides",
        pages: [
            { header: "Page 1: Model Training", text: "Used TensorFlow and Python to train a neural network for predicting stock market volatility based on social media sentiment analysis.", imageUrl: "https://placehold.co/400x300/FFD700/000000?text=ML+Diagram" },
            { header: "Page 2: Results Analysis", text: "The model achieved 78% accuracy, outperforming the baseline ARIMA model by 22% in short-term predictions.", imageUrl: "https://placehold.co/400x300/FFD700/000000?text=Accuracy+Chart" },
        ],
    },
    'lilac book': {
        title: "Computer Vision and Object Detection",
        pages: [
            { header: "Page 1: Deep Learning Setup", text: "Implemented a YOLO (You Only Look Once) model using PyTorch for real-time object detection in drone footage, focusing on agricultural applications.", imageUrl: "https://placehold.co/400x300/C8A2C8/FFFFFF?text=YOLO+Output" },
            { header: "Page 2: Performance Tuning", text: "Optimized tensor operations using GPU acceleration, leading to a frame rate increase from 12 FPS to 45 FPS.", imageUrl: "https://placehold.co/400x300/C8A2C8/FFFFFF?text=Performance+Graphs" },
            { header: "Page 3: Conclusion", text: "The final model is capable of identifying crop diseases and pest infestations with high precision in varying lighting conditions.", imageUrl: "https://placehold.co/400x300/C8A2C8/FFFFFF?text=Final+Model" },
        ],
    },
};

interface BookContentProps {
    bookId: string;
}

const BookContent: React.FC<BookContentProps> = ({ bookId }) => {
    const book = projectData[bookId];
    const [pageIndex, setPageIndex] = useState(0);

    const currentPageContent = useMemo(() => {
        if (!book || !book.pages[pageIndex]) return null;
        return book.pages[pageIndex];
    }, [book, pageIndex]);

    const totalPages = book ? book.pages.length : 0;

    const handleNext = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(pageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };

    if (!book) {
        return <div className="text-center text-red-400">Error: No project content found for ID: {bookId}</div>;
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="text-center pb-4 border-b border-gray-700">
                <h1 className="text-3xl font-bold text-[#ffc82c]">{book.title}</h1>
                <p className="text-sm text-gray-400 mt-1">Page {pageIndex + 1} of {totalPages}</p>
            </div>

            <div className="flex-grow overflow-y-auto p-4 flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2 flex flex-col space-y-4">
                    <h2 className="text-xl font-semibold text-[#ffc82c]">{currentPageContent?.header}</h2>
                    <p className="text-gray-300 leading-relaxed">{currentPageContent?.text}</p>
                </div>
                <div className="md:w-1/2 w-full flex justify-center items-center">
                    {currentPageContent?.imageUrl ? (
                        <img 
                            src={currentPageContent.imageUrl} 
                            alt={currentPageContent.header} 
                            className="rounded-lg shadow-xl max-h-80 w-auto object-cover border border-gray-700" 
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x300/444444/FFFFFF?text=Image+Load+Error`; }}
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                            No Image Provided
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-center space-x-8">
                <button 
                    onClick={handlePrev} 
                    disabled={pageIndex === 0}
                    className={`p-3 rounded-full transition ${pageIndex === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#ffc82c] text-gray-900 hover:bg-[#e0b026]'}`}
                    aria-label="Previous Page"
                >
                    <ArrowLeft size={24} />
                </button>
                <button 
                    onClick={handleNext} 
                    disabled={pageIndex === totalPages - 1}
                    className={`p-3 rounded-full transition ${pageIndex === totalPages - 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#ffc82c] text-gray-900 hover:bg-[#e0b026]'}`}
                    aria-label="Next Page"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default BookContent;