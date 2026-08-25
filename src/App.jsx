import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import AiMlProjects from './pages/AiMlProjects';
import CreativePursuits from './pages/CreativePursuits';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Home />
        <About />
        <Projects />
        <AiMlProjects />
        <CreativePursuits />
      </main>
    </>
  );
}
