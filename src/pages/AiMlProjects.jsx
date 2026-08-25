const projects = [
  {
    title: 'World Cup Game Prediction Engine',
    category: 'front-end engineering project',
    blurb: 'A front-end engineering project that predicts World Cup match outcomes, turning model predictions into an interactive, explorable game experience in the browser.',
    tags: ['react', 'prediction', 'sports analytics'],
    link: 'https://incredible-otter-801c3e.netlify.app/',
  },
];

export default function AiMlProjects() {
  return (
    <section id="ai-ml-projects" className="page">
      <h2 className="section-title">
        <span className="slash">/</span> AI/ML projects
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
    </section>
  );
}
