"use client";

import { useState } from "react";
import { faqList } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            FAQ
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Punya pertanyaan lain? Jangan ragu untuk langsung chat tim support kami.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left font-semibold text-[#1a2744] hover:text-blue-600 flex justify-between items-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  <span
                    className={`text-2xl font-light text-blue-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 py-4 bg-white text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
