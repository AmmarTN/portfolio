import { startTransition, useState } from "react";
import type { CareerTimelineEntry } from "../data/portfolio";

interface CareerTimelineProps {
  entries: readonly CareerTimelineEntry[];
}

const CareerTimeline = ({ entries }: CareerTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(Math.max(entries.length - 1, 0));

  const activeEntry = entries[activeIndex];
  const n = entries.length;
  const dotOffset = n > 1 ? 100 / (n * 2) : 0;
  const progressPercent = n > 1 ? dotOffset + (activeIndex / (n - 1)) * (100 - 2 * dotOffset) : 0;

  const setTimelineIndex = (nextIndex: number) => {
    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  };

  const yearPrefix = activeEntry.year.slice(0, 2);
  const yearSuffix = activeEntry.year.slice(2);
  const isCurrentRole = activeEntry.kind === "work" && activeIndex === entries.length - 1;
  const chapterMapEntries = entries
    .map((entry, index) => ({ entry, index }))
    .slice()
    .reverse();

  return (
    <div className="rounded-[2rem] border border-[var(--white-icon-tr)] bg-[#0d0d10] px-6 pb-6 pt-10 shadow-[0_32px_120px_-80px_rgba(164,118,255,0.45)] md:px-8 md:pb-8 md:pt-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--sec)]">Timeline scrubber</p>
          <p className="max-w-3xl text-sm leading-7 text-[var(--white-icon)] md:text-base">
            Scrub through the milestones that shaped how I build software today. Click a chapter or drag across the rail
            to move through the story.
          </p>
        </div>

        <div className="select-none">
          <div className="text-[4.75rem] font-semibold leading-none tracking-[-0.06em] md:text-[6.5rem]">
            <span className="text-white/8">{yearPrefix}</span>
            <span className="text-[var(--white)]">{yearSuffix}</span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <div className="relative h-7 md:h-8">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/8" />
            <div
              className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--sec)] to-[#c3b4ff]"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#cfc8ff] bg-white shadow-[0_0_0_4px_rgba(164,118,255,0.25)]"
              style={{ left: `${progressPercent}%` }}
            />
            <input
              type="range"
              min={0}
              max={Math.max(entries.length - 1, 0)}
              step={1}
              value={activeIndex}
              onChange={(event) => setTimelineIndex(Number(event.currentTarget.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Career timeline"
            />
          </div>

          <div className="flex items-start justify-between gap-2 pt-0">
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
              const isEducation = entry.kind === "education";

              return (
                <button
                  key={`${entry.year}-${entry.title}`}
                  type="button"
                  onClick={() => setTimelineIndex(index)}
                  className={`group flex min-w-0 flex-1 flex-col items-center gap-1 transition duration-300 ${
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition duration-300 ${
                      isActive ? "bg-[var(--white)]" : isEducation ? "bg-[#5DCAA5]" : "bg-[var(--sec)]"
                    }`}
                  />
                  <span
                    className={`text-[10px] leading-none tracking-[0.08em] md:text-xs ${
                      isActive ? "text-[var(--white)]" : "text-[var(--white-icon)]"
                    }`}
                  >
                    {entry.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <article
            className={`rounded-3xl border p-6 transition duration-300 md:p-7 ${
              activeEntry.kind === "education"
                ? "border-[rgba(93,202,165,0.32)] bg-[rgba(93,202,165,0.06)]"
                : "border-[rgba(164,118,255,0.34)] bg-[rgba(164,118,255,0.08)]"
            }`}
          >
            <p
              className={`text-xs uppercase tracking-[0.22em] ${
                activeEntry.kind === "education" ? "text-[#7addbf]" : "text-[var(--sec)]"
              }`}
            >
              {isCurrentRole
                ? "Current role"
                : activeEntry.kind === "education"
                  ? "Education chapter"
                  : "Career chapter"}
            </p>
            <h4 className="mt-4 text-2xl font-semibold text-[var(--white)]">{activeEntry.title}</h4>
            <p className="mt-2 text-sm text-[var(--white-icon)] md:text-base">
              {activeEntry.organization} · {activeEntry.period}
            </p>
            {activeEntry.meta && <p className="mt-1 text-sm text-[var(--white-icon)]">{activeEntry.meta}</p>}
            <p className="mt-5 text-[var(--white)] leading-8">{activeEntry.summary}</p>

            <ul className="mt-6 space-y-3 text-[var(--white-icon)] leading-7">
              {activeEntry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className={`pt-[0.35rem] ${
                      activeEntry.kind === "education" ? "text-[#7addbf]" : "text-[var(--sec)]"
                    }`}
                  >
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-3xl border border-[var(--white-icon-tr)] bg-[rgba(255,255,255,0.03)] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--white-icon)]">Chapter map</p>
            <div className="mt-5 space-y-3">
              {chapterMapEntries.map(({ entry, index }) => {
                const isActive = index === activeIndex;
                const isEducation = entry.kind === "education";

                return (
                  <button
                    key={`${entry.year}-${entry.organization}`}
                    type="button"
                    onClick={() => setTimelineIndex(index)}
                    className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                      isActive
                        ? isEducation
                          ? "border-[rgba(93,202,165,0.28)] bg-[rgba(93,202,165,0.08)]"
                          : "border-[rgba(164,118,255,0.28)] bg-[rgba(164,118,255,0.08)]"
                        : "border-[var(--white-icon-tr)] bg-[#131313] hover:border-[rgba(255,255,255,0.12)]"
                    }`}
                  >
                    <div className="flex flex-col items-center pt-1">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${isEducation ? "bg-[#5DCAA5]" : "bg-[var(--sec)]"}`}
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-[10px] uppercase tracking-[0.18em] ${
                          isEducation ? "text-[#7addbf]" : "text-[var(--sec)]"
                        }`}
                      >
                        {entry.organization}
                      </p>
                      <p className="mt-2 text-base font-medium text-[var(--white)]">{entry.title}</p>
                      <p className="mt-1 text-sm text-[var(--white-icon)]">{entry.period}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
