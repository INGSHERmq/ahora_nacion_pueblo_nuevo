"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { getOrCreateFingerprint } from "@/lib/utils";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadCount() {
      const fingerprint = getOrCreateFingerprint();
      const todayKey = `visit_counted_${new Date().toISOString().slice(0, 10)}`;
      const alreadyCounted = sessionStorage.getItem(todayKey);

      if (!alreadyCounted && fingerprint) {
        const { data, error } = await supabase.rpc("increment_visit", {
          p_fingerprint: fingerprint,
        });

        if (!error && typeof data === "number") {
          setCount(data);
          sessionStorage.setItem(todayKey, "1");
          return;
        }
      }

      const { data, error } = await supabase.rpc("get_visit_count");
      if (!error && typeof data === "number") {
        setCount(data);
      }
    }

    loadCount();
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <span className="font-medium text-white/90">Visitas:</span>
      <motion.span
        key={count ?? "loading"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-base font-bold text-white"
      >
        {count === null ? "..." : count.toLocaleString("es-PE")}
      </motion.span>
    </div>
  );
}
