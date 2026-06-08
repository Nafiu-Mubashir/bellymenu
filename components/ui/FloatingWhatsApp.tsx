"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string; // e.g. "2348012345678"
  message?: string;    // pre-filled WA message
}

export default function FloatingWhatsApp({
  phoneNumber,
  message = "Hello! I'd like to enquire about catering for my event.",
}: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show tooltip after 4 s to gently prompt the user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const encodedMsg = encodeURIComponent(message);
  const href = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-xl border border-neutral-100 px-4 py-3 max-w-[220px]"
          >
            <button
              onClick={() => {
                setShowTooltip(false);
                setDismissed(true);
              }}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-300 transition-colors"
            >
              <X size={10} />
            </button>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              👋 Chat with us on WhatsApp!
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              We reply within minutes
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-neutral-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37,211,102,0.4)",
            "0 0 0 12px rgba(37,211,102,0)",
            "0 0 0 0 rgba(37,211,102,0)",
          ],
        }}
        transition={{
          boxShadow: { repeat: Infinity, duration: 2.4, ease: "easeOut" },
        }}
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </motion.a>
    </div>
  );
}
