export default function About() {
  return (
    <section id="about" className="page">
      <h2 className="section-title">
        <span className="slash">/</span> about me
      </h2>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm Pragati, a final-year <strong>BA (Hons) Computer Animation and
            Simulation</strong> student at the <strong>University of the Arts
            London</strong>. My work sits at the intersection of technical
            simulation and visual storytelling — from aerodynamic studies to
            visual effects and experimental art.
          </p>
          <p>
            My current projects are where I test that intersection. Suderia,
            an aerodynamic redesign simulation, has me treating engineering
            constraints as creative material; Tannin and Confluence are
            sharpening my animation and simulation craft in Houdini and Maya;
            and an ongoing cyberdeck build takes me out of the screen
            entirely — electronics, fabrication, and problem-solving with my
            hands. The toolkit I'm building runs from Python scripting to
            physical prototyping, and the work keeps confirming the same
            conviction: the most interesting problems live between
            disciplines.
          </p>
          <p>
            With one more year of my BA ahead, I'm looking in two directions:
            postgraduate study in design engineering, and opportunities to
            apply my skills in practice — placements, internships, and
            collaborations where simulation, VFX, and design thinking
            overlap. If either of those sounds like a conversation worth
            having, say hi.
          </p>
          <p className="mono-label">Tools I work with</p>
          <ul className="skills-list">
            <li>Houdini</li>
            <li>Maya</li>
            <li>Nuke</li>
            <li>Unreal Engine</li>
            <li>Python</li>
            <li>Procreate</li>
          </ul>
        </div>
        <div className="about-photo">
          <img src="/assets/me.JPG" alt="Pragati" />
        </div>
      </div>
    </section>
  );
}
