export default function CreativePursuits() {
  return (
    <section id="creative-pursuits" className="page">
      <h2 className="section-title">
        <span className="slash">/</span> creative pursuits
      </h2>

      <h3 className="pursuits-sub">Visual effect videos</h3>
      <div className="video-grid">
        <div className="video-card">
          <video className="thumb" controls preload="metadata" src="/assets/A%20New%20You_final_v001.mov" />
          <h3>A New You</h3>
          <p>Add a short writeup — concept, techniques, and your role.</p>
        </div>
        <div className="video-card">
          <video className="thumb" controls preload="metadata" src="/assets/new%20life.mp4" />
          <h3>Altered States</h3>
          <p>Add a short writeup — concept, techniques, and your role.</p>
        </div>
      </div>
      <a
        className="btn"
        style={{ marginTop: 28 }}
        href="https://www.behance.net/pragatiprabhak1"
        target="_blank"
        rel="noreferrer"
      >
        More 3D Projects
      </a>

      <h3 className="pursuits-sub">Art</h3>
      <div className="art-grid">
        <img className="art-placeholder" src="/assets/fear%201%20public%20expression.png" alt="Fear 1" />
        <img className="art-placeholder" src="/assets/Identitiy%20crisis.pdf.png" alt="Identity Crisis" />
        <img className="art-placeholder" src="/assets/day%20dreamer.pdf.png" alt="Day Dreamer" />
      </div>
    </section>
  );
}
