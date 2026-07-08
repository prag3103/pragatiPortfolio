const projects = [
  {
    title: 'Tannin',
    category: 'internship project',
    blurb: "A creative web development internship with a wine startup in Bangalore, building their dynamic brand website end to end. I created the hero section's 3D animation in Blender — including fluid simulations of pouring wine — bringing product storytelling directly into the browser.",
    tags: ['blender', 'fluid simulation', 'web dev'],
  },
  {
    title: 'Scuderia: Aerodynamic Redesign Simulation',
    category: 'academic project',
    blurb: 'An aerodynamic study redesigning a car body and simulating both versions in Houdini to test the changes against real airflow behaviour. The original and redesigned models are compared side by side on an interactive website, turning simulation data into something you can explore rather than just read.',
    tags: ['cfd', 'simulation'],
  },
  {
    title: 'Confluence',
    category: 'academic project',
    blurb: "A simulation and fabrication project built on the idea that water holds memory. Fluid behaviour explored in simulation is translated into physical form, turning water's abstractness — the thing that has always fascinated me — into something you can stand in front of.",
    tags: ['simulation', 'fabrication'],
  },
  {
    title: 'Cyberdeck Electronics Project',
    category: 'academic project',
    blurb: 'A fun electronic project I am working on.',
    tags: ['hardware', 'electronics'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="page">
      <h2 className="section-title">
        <span className="slash">/</span> projects
      </h2>
      <div className="projects-scroll">
        {projects.map((p) => (
          <article className="project-card" key={p.title}>
            <span className="mono-label">{p.category}</span>
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="scroll-hint">← scroll →</p>
    </section>
  );
}
