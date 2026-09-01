"use client";

import { PointerEvent, useRef } from "react";

export function SignatureCanvas({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height
    };
  }

  function start(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const { x, y } = point(event);
    context.beginPath();
    context.moveTo(x, y);
  }

  function move(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const { x, y } = point(event);
    context.lineWidth = 2.3;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#101835";
    context.lineTo(x, y);
    context.stroke();
    onChange(canvas.toDataURL("image/png"));
  }

  function stop() {
    drawingRef.current = false;
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label mb-0">Owner 1 Signature *</p>
          <p className="mt-1 text-sm text-charcoal/60">Use mouse, trackpad, or touch input.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary px-4 py-2 text-xs" onClick={clear}>Clear Signature</button>
          <button type="button" className="btn-secondary px-4 py-2 text-xs" onClick={clear}>Sign Again</button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={260}
        className="mt-4 h-52 w-full touch-none border border-line bg-white"
        aria-label="Owner 1 signature panel"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
      />
      {value ? <p className="mt-2 text-sm text-charcoal/60">Signature captured as PNG data URL.</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}
