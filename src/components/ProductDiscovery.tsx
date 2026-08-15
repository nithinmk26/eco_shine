"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import DoorCard from "@/components/DoorCard";
import { categories } from "@/data/catalogue";

type DoorItem = (typeof categories)[number]["doors"][number];
type ApplicationFilter = "all" | "bedroom" | "bathroom" | "entrance" | "office" | "living";

const applications = [
  { id: "all", label: "All Spaces" },
  { id: "entrance", label: "Main Entrance" },
  { id: "bedroom", label: "Bedrooms" },
  { id: "bathroom", label: "Bathrooms" },
  { id: "living", label: "Living Spaces" },
  { id: "office", label: "Offices & Workspaces" },
];

export default function ProductDiscovery() {
  const [selectedApp, setSelectedApp] = useState<ApplicationFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Flatten all doors with category name attached
  const allDoors: (DoorItem & { category: string; slug: string })[] = categories.flatMap((c) =>
    c.doors.map((d) => ({
      ...d,
      category: c.name,
      slug: c.slug,
    }))
  );

  // Filter logic based on category & space application keywords
  const filteredDoors = allDoors.filter((d) => {
    // Category match
    if (selectedCategory !== "all" && d.slug !== selectedCategory) {
      return false;
    }

    // Application match heuristics
    if (selectedApp === "entrance") {
      return d.slug.includes("veneer") || d.slug.includes("gold-patti");
    }
    if (selectedApp === "bathroom") {
      return d.slug.includes("wpc") || d.slug.includes("membrane");
    }
    if (selectedApp === "bedroom") {
      return d.slug.includes("laminated") || d.slug.includes("veneer");
    }
    if (selectedApp === "office") {
      return d.slug.includes("routing") || d.slug.includes("laminated");
    }
    if (selectedApp === "living") {
      return d.slug.includes("gold") || d.slug.includes("veneer") || d.slug.includes("laminated");
    }

    return true;
  });

  // Limit display grid to top 12 doors for fast rendering
  const displayedDoors = filteredDoors.slice(0, 12);

  return (
    <section id="discovery" className="border-t border-line bg-cream/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
            Interactive Finder
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl text-ink">
            Find Your Perfect Door
          </h2>
          <p className="mt-4 text-sm text-ink-soft leading-relaxed">
            Filter our extensive 2026 catalogue by space application or door finish to discover the ideal door for your architectural project.
          </p>
        </Reveal>

        {/* Filter Controls */}
        <div className="mt-12 flex flex-col gap-6">
          {/* Space Application Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id as ApplicationFilter)}
                className={`px-4 py-2 rounded text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer border ${
                  selectedApp === app.id
                    ? "bg-[#0B2545] text-paper border-[#0B2545] shadow-sm"
                    : "bg-paper text-ink border-line hover:border-gold hover:text-[#E65100]"
                }`}
              >
                {app.label}
              </button>
            ))}
          </div>

          {/* Category Selector Filter */}
          <div className="flex items-center justify-center gap-3 text-xs text-ink-soft">
            <label className="font-semibold uppercase tracking-wider text-[10px] text-gold">Collection Filter:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-paper border border-line px-3 py-1.5 rounded text-xs text-ink outline-none focus:border-gold font-medium cursor-pointer"
            >
              <option value="all">All 25 Collections</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.doors.length} models)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {displayedDoors.map((d, i) => (
            <DoorCard
              key={`${d.slug}-${d.code}-${i}`}
              code={d.code}
              image={d.image}
              category={d.category}
              index={i}
            />
          ))}
        </div>

        {/* Matching Count & View All Button */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">
            Showing {displayedDoors.length} of {filteredDoors.length} matching doors
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 border border-ink bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#E65100] hover:border-[#E65100] rounded shadow-md"
          >
            <span>Explore Full Catalogue Index</span>
            <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
