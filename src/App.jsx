import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import AiMlProjects from './pages/AiMlProjects';
import CreativePursuits from './pages/CreativePursuits';
import Antigallery from './pages/Antigallery';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (hash === '#antigallery') {
      window.scrollTo(0, 0);
    } else if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [hash]);

  return (
    <>
      <Nav />
      <main>
        {hash === '#antigallery' ? (
          <Antigallery />
        ) : (
          <>
            <Home />
            <About />
            <Projects />
            <AiMlProjects />
            <CreativePursuits />
          </>
        )}
      </main>
    </>
  );
}