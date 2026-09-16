"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Jangan catat rute admin / login untuk menjaga akurasi statistik pengunjung publik
    if (!pathname || pathname.startsWith("/admin")) return;

    const recordPageView = async () => {
      try {
        const supabase = createClient();

        // Deteksi tipe perangkat secara ringan
        const ua = navigator.userAgent || "";
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const deviceType = isMobile ? "Mobile" : "Desktop";

        // Deteksi sumber trafik (Referrer)
        let referrer = "Direct";
        if (document.referrer) {
          try {
            referrer = new URL(document.referrer).hostname;
          } catch {
            referrer = document.referrer;
          }
        }
        if (referrer.includes("google")) referrer = "Google Search";
        else if (referrer.includes("instagram")) referrer = "Instagram";
        else if (referrer.includes("facebook")) referrer = "Facebook";
        else if (referrer.includes("whatsapp")) referrer = "WhatsApp";
        else if (referrer.includes("t.co") || referrer.includes("twitter") || referrer.includes("x.com")) referrer = "Twitter / X";
        else if (referrer.includes(window.location.hostname)) referrer = "Internal";

        // Abaikan navigasi antar halaman internal website sendiri agar tidak bias
        if (referrer === "Internal") referrer = "Direct / Navigasi";

        await supabase.from("page_views").insert([
          {
            path: pathname,
            referrer,
            device_type: deviceType,
          },
        ]);
      } catch {
        // Silent fail agar tidak pernah mengganggu pengalaman browsing pengunjung
      }
    };

    // Eksekusi secara asynchronous non-blocking
    const timeout = setTimeout(recordPageView, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
