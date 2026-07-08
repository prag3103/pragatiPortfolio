import BinaryTree from '../components/BinaryTree';

export default function Home() {
  return (
    <section id="home" className="page home">
      <BinaryTree />
      <div>
        <h1>
          hi, I am <span className="accent">Pragati</span>.
        </h1>
        <p className="home-blurb">
          Final-year BA (Hons) Computer Animation and Simulation student at the
          University of the Arts London. I build simulations and tell stories
          with code, motion, and the occasional strange experiment in between.
        </p>
        <a className="btn" href="mailto:you@example.com">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16v16H4zM4 6l8 6 8-6" />
          </svg>
          Say hi!
        </a>
      </div>
    </section>
  );
}
