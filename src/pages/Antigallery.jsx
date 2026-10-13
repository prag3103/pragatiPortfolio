const TEAL = '#5ecbb0';
const img = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

function Showcase({ image, alt, tealSide, overlay, children }) {
  const tealPosition =
    tealSide === 'right'
      ? { top: '1.25rem', bottom: '4.5rem', left: '2rem', right: '-2rem' }
      : { top: '1.25rem', bottom: '4.5rem', left: '-2rem', right: '2rem' };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
        margin: '4rem 0',
      }}
    >
      <div style={{ position: 'relative', maxWidth: overlay ? '560px' : '480px', width: '100%', zIndex: 0 }}>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            ...tealPosition,
            display: 'block',
            backgroundColor: TEAL,
            borderRadius: '12px',
            zIndex: -1,
          }}
        />
        <img
          src={image}
          alt={alt}
          style={{
            position: 'relative',
            width: '100%',
            display: 'block',
            borderRadius: '12px',
          }}
        />
        {overlay && (
          <>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '0',
                right: '-1.25rem',
                width: '15%',
                height: '32%',
                display: 'block',
                backgroundColor: TEAL,
                borderRadius: '12px',
                zIndex: -1,
              }}
            />
            <img
              src={overlay}
              alt="Antigallery gallery screen on iPhone"
              style={{
                position: 'absolute',
                top: '-19%',
                right: '-1%',
                width: '19%',
                zIndex: 1,
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.45))',
              }}
            />
          </>
        )}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

export default function Antigallery() {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.hash = 'projects';
  };

  return (
    <section id="antigallery" className="page">
      <button
        type="button"
        className="btn"
        onClick={goBack}
        style={{ background: 'transparent', cursor: 'pointer', marginBottom: '3rem' }}
      >
        ← back to projects
      </button>

      <span className="mono-label">featured project · swift app</span>
      <h2 className="section-title">
        <span className="slash">/</span> antigallery
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          margin: '2rem 0 4rem',
        }}
      >
        {[
          ['role', 'product design + prototyping'],
          ['focus', 'memory, journaling, photo storytelling'],
          ['timeline', '3-week concept sprint'],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              border: `1px solid ${TEAL}33`,
              borderRadius: '12px',
              padding: '1rem 1.1rem',
              background: 'rgba(94, 203, 176, 0.03)',
            }}
          >
            <div className="mono-label" style={{ fontSize: '0.64rem', marginBottom: '0.55rem' }}>
              {label}
            </div>
            <div style={{ color: '#e9f8f5', lineHeight: 1.5 }}>{value}</div>
          </div>
        ))}
      </div>

      <Showcase
        image={img('logo.png')}
        alt="Antigallery cover — creative galleries and intentional memories"
        tealSide="right"
      >
        <p>
          Antigallery was a passion project I built in the weeks before my third year began in
          full swing. It started with a simple question: what if our camera rolls felt less like
          storage and more like memory?
        </p>
        <p>
          Most galleries treat photos as endless grids to scroll past. I wanted to design an app
          that displays your photos in playful, thematic ways, and that lets you write little
          notes on the back of each photo, just like you would on a printed polaroid. A photo
          captures what a moment looked like; the note holds onto what it felt like: the
          conversation, the inside joke, the thought you had right then.
        </p>
        <p>
          I love the idea of intentional photos. Antigallery could sit alongside journalling, or
          simply be a space for anyone who feels creatively and emotionally attached to the
          pictures that stay in their camera roll.
        </p>
        <p>
          This first version features one theme, The Flowerbed of Memories. Photos are grouped
          into flowers by time. Each flower spins like a wheel to move through its moments, and
          one tap brings a photo to the front so you can flip it over and write its story.
        </p>
        <p>Scroll down to see my process.</p>
      </Showcase>

      <hr
        style={{
          border: 'none',
          borderTop: `1px solid ${TEAL}`,
          opacity: 0.4,
          margin: '6rem 0 3rem',
        }}
      />

      <h2 className="section-title">
        <span className="slash">/</span> design process
      </h2>

      <Showcase
        image={img('figma_mockup1.png')}
        overlay={img('iphoneb.png')}
        alt="Antigallery wireframes and screen designs in Figma"
        tealSide="left"
      >
        <p>
          Every screen in Antigallery started in Figma. I used it to wireframe the core flow of
          the app, from the welcome screen through importing photos and choosing a theme, all the
          way to the gallery itself. I designed at the iPhone Duo's outer-screen size from the
          start.
        </p>
        <p>
          Figma was also where I experimented most freely. I explored different ways a photo
          could live on the screen, beyond a standard grid, until the idea of the Flowerbed of
          Memories took shape: photos sitting on the petals of watercolor flowers, grouped by when
          they were taken. My handwritten notes on the canvas, like "intuitive time organization,
          just how normal photos would be organized", became the rules the app is built on.
        </p>
      </Showcase>

      <Showcase
        image={img('iphonec.png')}
        alt="Antigallery photo view with a flower-driven memory layout"
        tealSide="right"
      >
        <p>
          The interaction model became the heart of the concept. Rather than stacking memories in a
          conventional feed, the gallery uses motion to create a slower, more reflective rhythm: a
          flower turns, a moment moves forward, and a photo settles into focus before you interact
          with it.
        </p>
        <p>
          I was especially interested in making aeriality and tenderness coexist. The app should feel
          playful and soft, but still serve an emotional function. That meant designing a gallery
          that can hold both the visual record of a moment and the personal meaning behind it.
        </p>
        <p>
          Antigallery is a reminder that digital albums do not have to be cold archives. They can be
          carefully composed spaces for memory, reflection, and story.
        </p>
      </Showcase>

      {/* V1 Recording */}
      <hr
        style={{
          border: 'none',
          borderTop: `1px solid ${TEAL}`,
          opacity: 0.4,
          margin: '6rem 0 3rem',
        }}
      />

      <h2 className="section-title">
        <span className="slash">/</span> v1 recording
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          margin: '4rem 0',
        }}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: '320px',
            width: '100%',
            margin: '0 auto',
            zIndex: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '1.25rem',
              bottom: '-1.25rem',
              left: '-1.5rem',
              right: '1.5rem',
              display: 'block',
              backgroundColor: TEAL,
              borderRadius: '28px',
              zIndex: -1,
            }}
          />
          <video
            src={img('v1_screenrecording.mp4')}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Screen recording of Antigallery version 1 running on an iPhone"
            style={{
              position: 'relative',
              width: '100%',
              display: 'block',
              borderRadius: '28px',
              border: '6px solid #111',
              background: '#000',
              boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
            }}
          />
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.7 }}>
          <p>
            This is the first working version of Antigallery, running on my own iPhone with my own
            camera roll. Built in SwiftUI, it brings the Figma concept to life: photos are imported
            straight from the Photos app and sorted into flowers by time, from today and yesterday
            through to past months and years.
          </p>
          <p>
            In the recording you can see the full flow: importing photos, choosing the Flowerbed of
            Memories theme, spinning a flower to travel through its moments, and tapping a photo to
            bring it forward. A double tap flips the photo over, where a memory can be written on
            its back.
          </p>
        </div>
      </div>

      {/* Notes on v1 to build a better v2 */}
      <hr
        style={{
          border: 'none',
          borderTop: `1px solid ${TEAL}`,
          opacity: 0.4,
          margin: '6rem 0 3rem',
        }}
      />

      <h2 className="section-title">
        <span className="slash">/</span> notes on v1 to build a better v2
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          margin: '3rem 0 4rem',
        }}
      >
        {[
          [
            '01',
            'improve flexible layout',
            'I built the original app by simulating it on the iPhone 18 Pro, so the sizing looks off on my iPhone 16. I need to adjust the flexible layout in my code so it fits most iPhone screen sizes.',
          ],
          [
            '02',
            'sharing + saving photos',
            'Adding a sharing feature, and the ability to save photos from the app back to your iPhone Photos. A handy feature so memories can be shared between friends and family.',
          ],
          [
            '03',
            'a more real flowerbed',
            "Figuring out how to make the flower theme look more real, since the quality of the flower PNGs I used could be improved. I'm also deciding whether to keep the flowerbed as a 2D or a 3D design.",
          ],
        ].map(([number, title, body]) => (
          <div
            key={number}
            style={{
              border: `1px solid ${TEAL}33`,
              borderRadius: '12px',
              padding: '1.5rem 1.4rem',
              background: 'rgba(94, 203, 176, 0.03)',
            }}
          >
            <div className="mono-label" style={{ fontSize: '0.7rem', marginBottom: '0.75rem', color: TEAL }}>
              {number}
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#e9f8f5',
                marginBottom: '0.75rem',
              }}
            >
              {title}
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}