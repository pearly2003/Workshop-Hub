import { useState, useEffect, useCallback } from "react";

export function ImageSidebar({ image, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (image) requestAnimationFrame(() => setVisible(true));
  }, [image]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  if (!image) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-350
          ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl
          flex flex-col overflow-hidden
          transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40">
            Image Preview
          </span>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
              border border-black/10 bg-black/[0.03]
              text-black/35 hover:text-black/70 hover:bg-black/[0.07]
              transition-colors duration-200 focus:outline-none"
            aria-label="Close"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M1 1l9 9M10 1L1 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-5">
          <div
            className={`w-full rounded-2xl overflow-hidden border border-black/[0.07]
              bg-black/[0.03] p-2.5
              transition-all duration-500 delay-100
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <img
              src={typeof image === "string" ? image : image?.src}
              alt="Preview"
              className="w-full h-full object-contain max-h-[75vh] rounded-xl"
            />
          </div>
        </div>

        {/* Footer */}
        {/* <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-t border-black/[0.07]">
          <span className="font-mono text-[11px] text-black/30">3.2 MB</span>
          <div className="flex gap-2">
            {[
              {
                label: "Download",
                path: "M12 15V3m0 12-4-4m4 4 4-4M3 19h18",
              },
              {
                label: "Share",
                path: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684 6.632 3.316m-6.632-6 6.632-3.316m0 0a3 3 0 1 0 0-2.684 3 3 0 0 0 0 2.684Zm0 9.316a3 3 0 1 0 0-2.684 3 3 0 0 0 0 2.684Z",
              },
            ].map(({ label, path }) => (
              <button
                key={label}
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  border border-black/10 bg-black/[0.03]
                  text-black/35 hover:text-black/70 hover:bg-black/[0.07]
                  transition-colors duration-200 focus:outline-none"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
        </div> */}
      </aside>
    </>
  );
}
export function useImageExpander() {
  const [selected, setSelected] = useState(null);
  const open = useCallback((img) => setSelected(img), []);
  const close = useCallback(() => setSelected(null), []);
  return { selected, open, close };
}
export function ImageCell({ src, onExpand, className }) {
  return (
    <button
      onClick={() => onExpand(src)}
      className={`group relative block overflow-hidden ring-1 ring-white/10 hover:ring-violet-500/60
        focus:outline-none focus:ring-2 focus:ring-violet-500
        transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 ${className || ""}`}
      // className={`group relative block w-16 h-16 rounded-lg overflow-hidden
      //     ring-1 ring-white/10 hover:ring-violet-500/60
      //   focus:outline-none focus:ring-2 focus:ring-violet-500
      //   transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 ${className || ""}`}
      aria-label="Expand image"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* zoom hint overlay */}
      <span
        className="absolute inset-0 flex items-center justify-center
        bg-black/0 group-hover:bg-black/40 transition-colors duration-200"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow"
        >
          <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.5" />
          <path
            d="M12.5 12.5L16 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 6v4M6 8h4"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
