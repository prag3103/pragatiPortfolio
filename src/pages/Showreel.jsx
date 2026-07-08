export default function Showreel() {
  return (
    <section id="showreel" className="page">
      <h2 className="section-title">
        <span className="slash">/</span> showreel
      </h2>

      {/*
        When your reel is ready, replace this placeholder with an embed:

        <iframe
          style={{ width: '100%', aspectRatio: '16 / 9', border: 0, borderRadius: 10 }}
          src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
          title="Showreel"
          allow="fullscreen"
        />
      */}
      <div className="showreel-frame">
        <div className="play">▶</div>
        <span className="mono-label">showreel video — coming soon</span>
      </div>
    </section>
  );
}
