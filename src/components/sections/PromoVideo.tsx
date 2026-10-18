"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const SRC = "/media/launchframe-promo.mp4";
const POSTER = "/media/launchframe-promo-poster.webp";

/**
 * Short muted brand film. Plays only while on screen, never autoplays for
 * reduced-motion users, and always offers a pause control (WCAG 2.2.2).
 */
export function PromoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !userPaused.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-xl bg-[#f4f2ed]">
        <video
          ref={ref}
          className="block aspect-[3/4] w-full object-cover"
          src={SRC}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="none"
          width={1440}
          height={1920}
          aria-describedby="promo-desc"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className={`group absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100"
          }`}
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink/80 text-ivory transition-transform duration-300 group-hover:scale-105">
            {playing ? <Pause aria-hidden className="size-5" /> : <Play aria-hidden className="ml-0.5 size-5" />}
          </span>
        </button>
      </div>
      <figcaption id="promo-desc" className="mt-3 text-sm opacity-70">
        <span>
          Launchframe brand film
          <span className="sr-only">
            : a muted animation. The question &ldquo;Is your website holding your business back?&rdquo; appears over a
            dated web page, which transforms into a clean modern layout, followed by the Launchframe logo and the line
            &ldquo;Websites that turn attention into enquiries.&rdquo;
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
