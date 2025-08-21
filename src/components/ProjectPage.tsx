import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectPageProps {
  title: string;
  description: string;
  color: string;
  category: string;
}

export default function ProjectPage({ title, description, color, category }: ProjectPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 animate-float"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
        />
        <div 
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full opacity-20 animate-float"
          style={{ background: `linear-gradient(135deg, ${color}80, ${color})`, animationDelay: '2s' }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="glass-card hover:glow transition-smooth"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
      </nav>

      {/* Content */}
      <div className="pt-24 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 glass-card mb-4">
            <span className="text-sm font-medium" style={{ color }}>
              {category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Project Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Project Details */}
          <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color }}>
              Project Overview
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This section is where you can describe your project in detail. 
                Share the challenges you faced, the solutions you implemented, 
                and the impact of your work.
              </p>
              <p>
                You can add multiple paragraphs here to tell the complete story 
                of your project from conception to completion.
              </p>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="hover:glow transition-smooth">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
              <Button 
                style={{ backgroundColor: color, color: 'white' }}
                className="hover:opacity-90 transition-smooth"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </div>
          </Card>

          {/* Project Image/Media */}
          <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div 
              className="w-full h-64 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
            >
              Project Media
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Add your project images, videos, or interactive demos here.
            </p>
          </Card>
        </div>

        {/* Technologies Used */}
        <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color }}>
            Technologies & Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Three.js'].map((tech, index) => (
              <div 
                key={tech}
                className="glass-card p-4 text-center hover:glow transition-smooth"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="font-medium">{tech}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Additional Content Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-20">
          <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Feature one description</li>
              <li>• Feature two description</li>
              <li>• Feature three description</li>
              <li>• Feature four description</li>
            </ul>
          </Card>

          <Card className="glass-card p-8 animate-fade-in" style={{ animationDelay: '1200ms' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color }}>
              Challenges & Solutions
            </h3>
            <p className="text-muted-foreground">
              Describe the main challenges you encountered during this project 
              and how you overcame them. This shows your problem-solving skills 
              and technical expertise.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}