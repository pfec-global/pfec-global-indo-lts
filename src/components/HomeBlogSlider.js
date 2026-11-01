"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";
import { useLanguage } from "@/context/LanguageContext";
import BlogCard from "@/components/BlogCard";

const GAP = 20;

const fallbackPosts = [
  {
    slug: "pte-score-for-canada-2025",
    title: "PTE Score for Canada 2025: Accepted Colleges and Universities",
    category: "PTE",
  },
  {
    slug: "ielts-band-requirements-australia",
    title: "IELTS Band Requirements for Australian Universities",
    category: "IELTS",
  },
  {
    slug: "gre-preparation-plan",
    title: "GRE Preparation Plan: How to Study in 3 Months",
    category: "GRE",
  },
  {
    slug: "why-study-in-australia-2025",
    title: "Why Should You Study in Australia in 2025?",
    category: "Australia",
  },
];

const fallbackItems = Array.from({ length: 10 }, (_, index) => {
  const post = fallbackPosts[index % fallbackPosts.length];
  return {
    id: `fallback-${index + 1}`,
    title: post.title,
    href: `/blogs/${post.slug}`,
    image: "/images/study_area_image.webp",
    imageAlt: post.title,
    tag: post.category,
    tagHref: `/category/${post.category.toLowerCase()}`,
    author: "PFEC Global",
    authorHref: "/blogs",
    date: Date.UTC(2024, 1, 19) - index * 86400000,
    updated: "19th February 2024",
    readTime: "8 Min Read",
  };
});

const copy = {
  EN: {
    eyebrow: "Blogs & Articles",
    title: "Get the Latest Insights about Studying Abroad",
    description:
      "Read expert opinions, practical tips, recent news, migration policy changes, and study-abroad trends.",
    previous: "Previous blogs",
    next: "Next blogs",
    viewAll: "View All Blogs",
  },
  ID: {
    eyebrow: "Blog & Artikel",
    title: "Dapatkan Wawasan Terbaru tentang Kuliah di Luar Negeri",
    description:
      "Baca pendapat ahli, tips praktis, berita terbaru, perubahan kebijakan migrasi, dan tren kuliah di luar negeri.",
    previous: "Blog sebelumnya",
    next: "Blog berikutnya",
    viewAll: "Lihat Semua Blog",
  },
};

export default function HomeBlogSlider({ items }) {
  const posts = items?.length ? items.slice(0, 10) : fallbackItems;
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const { language } = useLanguage();
  const text = copy[language] || copy.EN;

  useDragScroll(trackRef);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;

    const step = card.getBoundingClientRect().width + GAP;
    const atStart = track.scrollLeft <= 5;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

    if (direction > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && atStart) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!pausedRef.current) move(1);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden bg-[#f7f6fc] py-12 font-jakarta sm:py-14 lg:py-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#24139b] sm:text-sm">
              {text.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[700px] text-[28px] font-bold leading-[1.1] tracking-[-0.03em] text-[#100b35] sm:text-[36px] lg:text-[42px]">
              {text.title}
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[440px] text-sm leading-relaxed text-[#4d4a62] sm:text-base">
              {text.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 lg:justify-end">
              <Link
                href="/blogs"
                className="mr-1 inline-flex h-10 items-center justify-center rounded-full border border-[#24139b] px-5 text-sm font-semibold text-[#24139b] transition hover:bg-[#24139b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24139b]"
              >
                {text.viewAll}
              </Link>
              <button
                type="button"
                aria-label={text.previous}
                onClick={() => move(-1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#24139b] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#3523b8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24139b]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={text.next}
                onClick={() => move(1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#24139b] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#3523b8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24139b]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          aria-label="Latest blog posts"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            pausedRef.current = false;
          }}
          onFocus={() => {
            pausedRef.current = true;
          }}
          onBlur={() => {
            pausedRef.current = false;
          }}
          className="mt-8 grid cursor-grab snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-5 overflow-x-auto pb-3 [scrollbar-width:none] active:cursor-grabbing sm:auto-cols-[calc((100%-1.25rem)/2)] lg:auto-cols-[calc((100%-2.5rem)/3)] xl:auto-cols-[calc((100%-3.75rem)/4)] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} className="snap-start" />
          ))}
        </div>
      </div>
    </section>
  );
}
