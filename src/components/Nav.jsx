import { useEffect, useState } from 'react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-ml-projects', label: 'AI/ML Projects' },
  { id: 'creative-pursuits', label: 'Creative Pursuits' },
];

function Icon({ path, label, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Nav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav">
      <span className="nav-name">Pragati</span>
      <nav className="nav-links">
        {links.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-socials">
        {/* Replace # with your real links */}
        <Icon
          href="mailto:you@example.com"
          label="Email"
          path="M4 4h16v16H4zM4 6l8 6 8-6"
        />
        <Icon
          href="#"
          label="LinkedIn"
          path="M4 8h4v12H4zM6 4a2 2 0 1 1 0 .01M10 8h4v2a4 4 0 0 1 8 2v8h-4v-7a2 2 0 0 0-4 0v7h-4z"
        />
        <Icon
          href="#"
          label="Instagram"
          path="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 7h.01"
        />
      </div>
    </header>
  );
}
