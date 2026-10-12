const projects = [
  {
    title: 'Tannin',
    category: 'internship project',
    blurb: "A creative web development internship with a wine startup in Bangalore, building their dynamic brand website end to end. I created the hero section's 3D animation in Blender — including fluid simulations of pouring wine — bringing product storytelling directly into the browser.",
    tags: ['blender', 'fluid simulation', 'web dev'],
    link: 'https://prag3103.github.io/tannin-website/',
  },
  {
    title: 'Confluence',
    category: 'academic project',
    blurb: "A simulation and fabrication project built on the idea that water holds memory. Fluid behaviour explored in simulation is translated into physical form, turning water's abstractness — the thing that has always fascinated me — into something you can stand in front of.",
    tags: ['simulation', 'fabrication'],
  },
  {
    title: 'Nuni: Your Language Learning buddy',
    category: 'academic project',
    blurb: 'A fun electronic project I am working on.',
    tags: ['hardware', 'electronics'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="page">
                  <div className="project-card" onClick={() => { window.location.hash = 'antigallery'; }} style={{ width: '100%', maxWidth: 'none', marginBottom: '5rem', padding: '3rem', cursor: 'pointer' }}>
        <span className="mono-label">Recent mini Project · swift app</span>
        <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>Antigallery</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '40rem' }}>
          A Swift app for intentional and creative galleries — a small project challenge I worked on.
        </p>
        <div className="tags">
          <span>#swift</span>
          <span>#ios</span>
          <span>#app design</span>
        </div>
      </div>
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
            {p.link && (
              <a
                className="btn project-link"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit website
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="scroll-hint">← scroll →</p>
    </section>
  );
}