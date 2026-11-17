import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function OrderComingSoonModal({ open, productName, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-soon-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-[#171719] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36]"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EC1F36]">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" />
                <circle cx="10" cy="20" r="1.3" />
                <circle cx="17" cy="20" r="1.3" />
              </svg>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
              Coming Soon
            </p>
            <h3 id="order-soon-title" className="mt-2 text-2xl font-semibold tracking-tight text-[#171719]">
              Online ordering is launching soon
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {productName ? `${productName} will be available to order online very soon. ` : ""}
              We're getting everything ready — stay tuned!
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex rounded-full bg-[#EC1F36] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c9172d]"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
