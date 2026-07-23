import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import CreativePursuits from './pages/CreativePursuits';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Home />
        <About />
        <Projects />
        <CreativePursuits />
      </main>
    </>
  );
}
