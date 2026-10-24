
"use client";

import { useEffect, useRef, useState } from "react";

// =====================================
// API CONFIGURATION - UNCHANGED
// =====================================

const API_BASE = "https://coursefindercms.pfecglobal.com";
const PORTAL_URL = "https://coursefinder.pfecglobal.com";

const SEARCH_IMAGE =
  "https://pfecglobal.in/wp-content/uploads/2026/05/Search-invalid-1.png";

const LOGO_URL =
  "https://testing.pfecglobal.in/wp-content/uploads/2026/05/Frame-1000002126.png";

// =====================================
// ICONS
// =====================================

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-[#ff4b37]"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-[#f04b36]"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function StudyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-[#f04b36]"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-[#f04b36]"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

// =====================================
// MULTI-SELECT DROPDOWN
// =====================================

function Dropdown({
  name,
  label,
  options,
  selected,
  onChange,
  openDropdown,
  setOpenDropdown,
  loading,
}) {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);

  const isOpen = openDropdown === name;

  const filteredOptions = options.filter((item) =>
    String(item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    } else {
      setSearch("");
    }

    setActiveIndex(-1);
  }, [isOpen]);

  function isSelected(item) {
    return selected.some(
      (value) => String(value.id) === String(item.id)
    );
  }

  function toggleItem(item) {
    if (isSelected(item)) {
      onChange(
        selected.filter(
          (value) => String(value.id) !== String(item.id)
        )
      );
    } else {
      onChange([...selected, item]);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) =>
        Math.min(current + 1, filteredOptions.length - 1)
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) =>
        Math.max(current - 1, 0)
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (filteredOptions[activeIndex]) {
        toggleItem(filteredOptions[activeIndex]);
      }
    }

    if (event.key === "Escape") {
      setOpenDropdown(null);
    }
  }

  return (
    <div className="relative min-w-0 flex-1">

      {/* SELECT TRIGGER */}
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={() => {
          setOpenDropdown(isOpen ? null : name);
        }}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[9px] border border-[#e3e0ef] bg-white px-3 py-2.5 text-left font-jakarta text-[12px] text-[#100B36] transition-all duration-200 hover:border-[#f04b36] focus:outline-none focus:ring-2 focus:ring-[#f04b36]/20 sm:px-4 sm:text-[13px]"
      >
        <span className="flex min-w-0 items-center gap-2">
          {name === "course" ? (
            <StudyIcon />
          ) : (
            <LocationIcon />
          )}

          <span className="truncate font-medium">
            {selected.length
              ? `${selected.length} selected`
              : label}
          </span>
        </span>

        <ChevronIcon />
      </button>

      {/* SELECTED TAGS */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <span
              key={`${name}-${item.id}`}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#ded9ed] bg-[#f7f6fc] px-2.5 py-1 font-jakarta text-[11px] text-[#24139b]"
            >
              {item.logo && (
                <img
                  src={item.logo}
                  alt=""
                  className="h-4 w-4 shrink-0 object-contain"
                />
              )}

              <span className="max-w-[140px] truncate">
                {item.name}
              </span>

              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => toggleItem(item)}
                className="shrink-0 text-base leading-none transition-colors hover:text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      {/* DROPDOWN PANEL */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-full min-w-0 overflow-hidden rounded-xl border border-[#e3e0ef] bg-white shadow-[0_12px_30px_rgba(16,11,54,0.16)] sm:min-w-[240px]">

          {/* SEARCH INPUT */}
          <div className="border-b border-[#eeeaf5] p-3">
            <input
              ref={searchRef}
              type="text"
              value={search}
              placeholder={
                name === "course"
                  ? "Search course..."
                  : "Search country..."
              }
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#ded9ed] bg-[#f7f6fc] px-3 py-2 font-jakarta text-[12px] text-[#100B36] outline-none focus:border-[#24139b]"
            />
          </div>

          {/* OPTIONS */}
          <ul className="max-h-[245px] list-none overflow-y-auto p-1">

            {loading ? (
              <li className="px-3 py-3 text-[12px] text-[#514b70]">
                Loading options...
              </li>
            ) : filteredOptions.length === 0 ? (
              <li className="px-3 py-3 text-[12px] text-[#514b70]">
                No result found
              </li>
            ) : (
              filteredOptions.map((item, index) => {
                const checked = isSelected(item);

                return (
                  <li key={`${name}-${item.id}`}>
                    <button
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left font-jakarta text-[12px] transition-colors ${
                        activeIndex === index || checked
                          ? "bg-[#eeeafb] text-[#24139b]"
                          : "text-[#514b70] hover:bg-[#f7f6fc]"
                      }`}
                    >

                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt=""
                          className="h-6 w-6 shrink-0 object-contain"
                        />
                      ) : (
                        <span className="h-6 w-6 shrink-0 rounded bg-[#f0eef8]" />
                      )}

                      <span className="min-w-0 flex-1">
                        {item.name}
                      </span>

                      {checked && (
                        <span className="font-bold text-[#24139b]">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}

          </ul>
        </div>
      )}
    </div>
  );
}

// =====================================
// NO RESULT POPUP
// =====================================

function NoResultPopup({ onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cf-no-results-title"
        className="relative grid w-full max-w-[680px] overflow-hidden rounded-[24px] bg-white p-7 shadow-2xl sm:grid-cols-[1.2fr_0.8fr] sm:p-10"
      >

        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-4 text-2xl text-[#514b70] hover:text-[#100B36]"
        >
          &times;
        </button>

        {/* TEXT */}
        <div className="flex flex-col justify-center py-4">
          <h2
            id="cf-no-results-title"
            className="font-jakarta text-3xl font-extrabold text-[#100B36]"
          >
            Oops!
          </h2>

          <p className="mt-4 font-jakarta text-sm leading-relaxed text-[#514b70]">
            Your search hasn&apos;t fetched any results currently.
            Try changing the course or country.
          </p>

          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#24139b] px-5 py-3 font-jakarta text-[12px] font-bold text-white transition hover:bg-[#100B36]"
          >
            Explore on CourseFinder
            <span>→</span>
          </a>
        </div>

        {/* IMAGE */}
        <div className="flex items-center justify-center">
          <img
            src={SEARCH_IMAGE}
            alt="No search results"
            className="max-h-[240px] w-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}

// =====================================
// MAIN COURSEFINDER COMPONENT
// =====================================

export default function CourseFinder() {
  const rootRef = useRef(null);

  const [options, setOptions] = useState({
    course: [],
    country: [],
  });

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);

  // =====================================
  // FETCH DROPDOWN DATA - ORIGINAL API
  // =====================================

  useEffect(() => {
    const controller = new AbortController();

    async function loadDropdowns() {
      try {
        const response = await fetch(
          `${API_BASE}/api/course-finder/dropdown-data`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Dropdown API error: ${response.status}`
          );
        }

        const data = await response.json();

        if (controller.signal.aborted) return;

        setOptions({
          course: Array.isArray(data.studyAreas)
            ? data.studyAreas
            : [],

          country: Array.isArray(data.studyDestinations)
            ? data.studyDestinations
            : [],
        });
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error(
          "CourseFinder dropdown fetch failed:",
          err
        );

        setError(
          "Unable to load course options. Please refresh."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDropdowns();

    return () => controller.abort();
  }, []);

  // =====================================
  // CLOSE DROPDOWNS OUTSIDE
  // =====================================

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =====================================
  // ORIGINAL SEARCH URL PARAMETERS
  // =====================================

  function buildSearchUrl() {
    const countrySlugs = selectedCountry
      .map((item) => item.slug)
      .filter(Boolean);

    const courseSlugs = selectedCourse
      .map((item) => item.slug)
      .filter(Boolean);

    const params = new URLSearchParams();

    if (countrySlugs.length) {
      params.set(
        "country",
        countrySlugs.join(",")
      );
    }

    if (courseSlugs.length) {
      params.set(
        "study",
        courseSlugs.join(",")
      );
    }

    // Original tracking values
    params.set("utm_source", "pfecglobal_id");
    params.set("utm_medium", "referral");
    params.set(
      "utm_campaign",
      "coursefinder_widget"
    );
    params.set("utm_content", "homepage_fold");

    // Preserve campaign parameter
    const currentParams = new URLSearchParams(
      window.location.search
    );

    const cParam = currentParams.get("c");

    if (cParam) {
      params.set("c", cParam);
    }

    return `${PORTAL_URL}/universities?${params.toString()}`;
  }

  // =====================================
  // SEARCH VALIDATION - ORIGINAL API
  // =====================================

  async function handleSearch() {
    if (searching) return;

    setError("");
    setOpenDropdown(null);

    if (
      selectedCourse.length === 0 &&
      selectedCountry.length === 0
    ) {
      setError(
        "Please select at least one Study Area or Study Destination."
      );

      return;
    }

    const url = buildSearchUrl();
    const queryString = url.slice(url.indexOf("?"));

    // Open tab during the user click to avoid
    // browser popup blockers after async fetch.
    const newTab = window.open("about:blank", "_blank");

    if (newTab) {
      newTab.opener = null;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/search-university-check${queryString}`
      );

      if (!response.ok) {
        throw new Error(
          `Search API error: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.exists) {
        if (newTab && !newTab.closed) {
          newTab.close();
        }

        setNoResults(true);
        return;
      }

      if (newTab && !newTab.closed) {
        newTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      if (newTab && !newTab.closed) {
        newTab.close();
      }

      console.error(
        "CourseFinder search failed:",
        err
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setSearching(false);
    }
  }

  // =====================================
  // COMPONENT DESIGN
  // =====================================

  return (
    <>

      <section
        id="coursefinder"
        ref={rootRef}
        className="w-full bg-white px-4 py-8 font-jakarta sm:px-6 sm:py-10 lg:px-8"
      >

        {/* GRADIENT CONTAINER */}
        <div
          className="mx-auto w-full max-w-[1180px] rounded-[20px] bg-[linear-gradient(135deg,#17145f_0%,#1f2aa5_52%,#2f56f0_100%)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
        >

          <div className="mx-auto max-w-[980px]">

            {/* COURSEFINDER LOGO */}
            <div className="mb-6 flex justify-center">
              <img
                src={LOGO_URL}
                alt="CourseFinder"
                className="h-[80px] w-auto max-w-full object-contain"
              />
            </div>

            {/* TRUST BADGES */}
            <div className="mb-7 grid gap-4 md:grid-cols-3 md:gap-5">

              {[
                "Access Key Information about Top Institutions Across 11 Countries",
                "Get Free Expert Assistance to further your study abroad journey",
                "Backed by PFEC Global's Certified Study Abroad Experts",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl bg-transparent px-1 py-2"
                >
                  <CheckIcon />

                  <p className="font-jakarta text-[12px] leading-[1.5] text-white sm:text-[13px]">
                    {item}
                  </p>
                </div>
              ))}

            </div>

            {/* MAIN SEARCH CARD */}
            <div className="rounded-[18px] bg-white px-4 py-6 shadow-[0_12px_35px_rgba(16,11,54,0.18)] sm:px-6 sm:py-7">

              {/* SEARCH HEADING */}
              <p className="mb-6 text-center font-jakarta text-[14px] leading-relaxed text-[#100B36] sm:text-[16px]">

                Search from{" "}
                <strong className="font-bold text-[#f04b36]">
                  550+ Institutions
                </strong>{" "}
                across{" "}
                <strong className="font-bold text-[#f04b36]">
                  13 Study Destinations
                </strong>

              </p>

              {/* SEARCH FILTERS */}
              <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-start">

                {/* STUDY AREA */}
                <Dropdown
                  name="course"
                  label="Study Area"
                  options={options.course}
                  selected={selectedCourse}
                  onChange={setSelectedCourse}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  loading={loading}
                />

                {/* STUDY DESTINATION */}
                <Dropdown
                  name="country"
                  label="Study Destination"
                  options={options.country}
                  selected={selectedCountry}
                  onChange={setSelectedCountry}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  loading={loading}
                />

                {/* SEARCH BUTTON */}
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading || searching}
                  aria-label="Search universities"
                  className="flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-[9px] bg-[#f04b36] px-5 text-white transition-all duration-200 hover:bg-[#d93d29] disabled:cursor-not-allowed disabled:opacity-60 md:w-[56px]"
                >
                  <SearchIcon />

                  <span className="font-jakarta text-[13px] font-bold md:hidden">
                    {searching
                      ? "Searching..."
                      : "Search Courses"}
                  </span>
                </button>

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p
                  role="alert"
                  className="mt-4 text-center font-jakarta text-[12px] text-red-600"
                >
                  {error}
                </p>
              )}

              {/* SEARCH INSTRUCTION */}
              <p className="mt-6 text-center font-jakarta text-[11px] leading-relaxed text-[#7b7694] sm:text-[12px]">

                Type in{" "}
                <strong>any one (or all)</strong>{" "}
                of the fields and press the search button.

              </p>

            </div>

          </div>
        </div>

      </section>

      {/* NO RESULTS POPUP */}
      {noResults && (
        <NoResultPopup
          onClose={() => setNoResults(false)}
        />
      )}

    </>
  );
}
