import { useEffect, useRef } from 'react';

/*
 * A coded binary tree, drawn as dots (matching the dotted-particle vibe
 * of the reference site). Each branch splits into two — a literal binary
 * tree — and the whole structure sways gently. Moving the cursor over it
 * bends the canopy toward the pointer and kicks off a decaying "gust" of
 * extra sway, proportional to how fast the cursor is moving.
 */
export default function BinaryTree() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;

    const DEPTH = 9;          // levels of the binary tree
    const SPREAD = 0.42;      // how wide branches split (radians)
    const SHRINK = 0.72;      // each branch is this fraction of its parent
    const DOT_GAP = 7;        // px between dots along a branch

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // pointer state: smoothed x position (0.5 = centered / neutral) and a
    // decaying "gust" magnitude that spikes on fast pointer movement.
    const pointer = { x: 0.5, y: 0.5, active: false };
    const smooth = { x: 0.5 };
    let gust = 0;

    function handlePointerMove(e) {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const dx = nx - pointer.x;
      const dy = ny - pointer.y;
      gust = Math.min(1.6, gust + Math.hypot(dx, dy) * 22);
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawBranch(x, y, angle, length, depth, t) {
      if (depth === 0 || length < 4) return;

      const depthFactor = (DEPTH - depth + 1) / DEPTH;

      // gentle ambient sway, stronger on outer branches
      const ambientSway = reduceMotion ? 0 : Math.sin(t / 1400 + depth * 0.7) * 0.02 * (DEPTH - depth + 1);

      // bend toward the cursor's horizontal position
      const bend = reduceMotion ? 0 : (smooth.x - 0.5) * 0.9 * depthFactor;

      // quick "swish swash" oscillation, kicked up by cursor movement and decaying
      const swish = reduceMotion ? 0 : gust * Math.sin(t / 110 + depth * 1.15) * 0.11 * depthFactor;

      const a = angle + ambientSway + bend + swish;

      const steps = Math.max(2, Math.floor(length / DOT_GAP));
      const endX = x + Math.cos(a) * length;
      const endY = y + Math.sin(a) * length;

      for (let i = 0; i <= steps; i++) {
        const px = x + (endX - x) * (i / steps);
        const py = y + (endY - y) * (i / steps);
        const size = depth > DEPTH - 3 ? 1.6 : 1.1;
        const alpha = 0.25 + (depth / DEPTH) * 0.55;
        ctx.fillStyle = `rgba(110, 231, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      drawBranch(endX, endY, a - SPREAD, length * SHRINK, depth - 1, t);
      drawBranch(endX, endY, a + SPREAD, length * SHRINK, depth - 1, t);
    }

    function render(t) {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // ease the smoothed pointer x toward the live pointer (or back to
      // neutral once it leaves), and let the gust decay each frame
      const target = pointer.active ? pointer.x : 0.5;
      smooth.x += (target - smooth.x) * 0.06;
      gust *= 0.9;

      drawBranch(width / 2, height - 10, -Math.PI / 2, height * 0.24, DEPTH, t);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    }

    resize();
    render(0);
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-tree" aria-hidden="true" />;
}
