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
            I am Pragati and I am in my final year at UAL finishing up BA(hons) Creative Computing. My practice and exploration sits at the intersection of creative technology and conceptual design. 

My Projects on this portfolio have a lot of contradicting disciplines, some that bridge AI and ML while others purely lie on the artistic and visual feed. I have explored various projects from building apps and websites to getting deep into inferencing data (especially since it is F1 related). I also do 3d product visualizations and love using 3d as a medium to build apps and usable interfaces throughout my projects and practice.

I explore media and technology and thinking outside the box to build experiments and concepts to shape the future world - this is what I would say to someone if they asked me what I wanted to do in my life. 

I am a creative person and what I hope to do is build my technical disciplines to innovate and experiment with creative tech and solutions and get really hands on !!

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
            <li>Blender</li>
            <li>React</li>
            <li>Figma</li>
            <li>Python</li>
            <li>Swift ios development</li>
          </ul>
        </div>
        <div className="about-photo">
          <img src="/assets/me.JPG" alt="Pragati" />
        </div>
      </div>
    </section>
  );
}
