"use client";

import { useEffect, useState } from "react";

const initialFormData = {
  SingleLine: "",
  Email: "",
  PhoneNumber_countrycodeval: "+62",
  PhoneNumber_countrycode: "",
  Dropdown1: "",
  Dropdown6: "",
  Dropdown2: "",
  Dropdown: "",
  Dropdown4: "",
  Dropdown10: "",
  Dropdown3: "",
  Dropdown7: "",
  Dropdown5: "",
  agree: false,
};

const destinations = [
  "Australia", "USA", "UK", "Canada", "Germany", "Ireland", "Dubai", "Malaysia",
  "New Zealand", "Indonesia", "Japan", "France", "Netherlands", "Italy", "Spain",
  "Sweden", "Finland", "Norway", "Denmark", "Switzerland", "Austria", "Belgium",
  "Poland", "Hungary", "Czech Republic", "Portugal", "Lithuania", "Latvia",
  "Estonia", "Romania", "Slovakia", "Slovenia", "Croatia", "Bulgaria", "Greece",
  "Cyprus", "Malta", "Help me decide",
];

const studyLevels = [
  "Undergraduate", "Postgraduate", "PhD", "Doctorate", "English", "School",
  "Vocational Studies", "Professional Year", "Diploma", "Foundation",
  "International Year 1",
];

const englishStatuses = [
  "I have the score available",
  "My exams are scheduled or waiting for result",
  "I have not appeared for any exams",
  "I am planning to reappear soon",
];

const studyYears = ["2027", "2028", "2029", "2030"];

const intakes = [
  "Not Yet Decided", "Q1 (Jan - Mar)", "Q2 (Apr - Jun)", "Q3 (Jul - Sep)", "Q4 (Oct - Dec)",
];

const educationScores = [
  "Above Overall 75% (or) CGPA 3.7 - 4.0",
  "Overall 60-75% (or) CGPA 3.0 - 3.6",
  "Overall 50-59% (or) CGPA 2.5 - 2.9",
  "Overall below 50% (or) below CGPA 2.5",
  "Awaiting results",
];

const educationBudgets = [
  "Above Rp 600 Juta", "Rp 400 – 600 Juta", "Rp 300 – 400 Juta",
  "Rp 200 – 300 Juta", "Less than Rp 200 Juta", "Need Counselling",
];

const fundingOptions = [
  "I have my own funds", "I am looking for Education Loans",
  "I am looking for Scholarships", "I don't have Source of funds",
  "My parents will fund my studies", "My siblings will fund my studies",
  "I don't have any fund",
];

const qualifications = [
  "High School / 10th", "Higher Secondary / 12th", "Diploma",
  "Bachelor’s Degree", "Master’s Degree", "Doctorate (PhD)",
  "Professional Certification", "Other",
];

const fieldClass =
  "h-11 w-full rounded-lg bg-[#f1f4f7] px-3 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-2 focus:outline-brand xl:h-[2.7rem] xl:text-[1.05rem]";

function SelectArrow() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormSelect({ name, value, onChange, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${fieldClass} appearance-none pr-10 ${
          error ? "border border-red-500" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <SelectArrow />
    </div>
  );
}

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // 1. Register global handlers & custom event triggers immediately on window
  useEffect(() => {
    window.openConsultationPopup = () => setIsOpen(true);
    window.closeConsultationPopup = () => setIsOpen(false);

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("open-consultation-popup", handleCustomOpen);

    return () => {
      delete window.openConsultationPopup;
      delete window.closeConsultationPopup;
      window.removeEventListener("open-consultation-popup", handleCustomOpen);
    };
  }, []);

  // 2. Click listener for .pop-up elements (Bubble & Capture phase fallback)
  useEffect(() => {
    const handleGlobalClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest(".pop-up");
      if (!trigger) return;

      event.preventDefault();
      setIsOpen(true);
    };

    // Attach to document and window to handle static HTML and dynamic elements
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  // 3. Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // 4. Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, PhoneNumber_countrycode: value }));
    if (errors.PhoneNumber_countrycode) {
      setErrors((prev) => ({ ...prev, PhoneNumber_countrycode: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.SingleLine.trim()) newErrors.SingleLine = "Name is required.";
    if (!formData.Email.trim()) {
      newErrors.Email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email.";
    }

    if (!formData.PhoneNumber_countrycode.trim()) {
      newErrors.PhoneNumber_countrycode = "Phone number is required.";
    } else if (!/^\d+$/.test(formData.PhoneNumber_countrycode)) {
      newErrors.PhoneNumber_countrycode = "Please enter numbers only.";
    }

    if (!formData.Dropdown1) newErrors.Dropdown1 = "Please select a destination.";
    if (!formData.Dropdown6) newErrors.Dropdown6 = "Please select your qualification.";
    if (!formData.Dropdown2) newErrors.Dropdown2 = "Please select your study level.";
    if (!formData.Dropdown) newErrors.Dropdown = "Please select your study year.";
    if (!formData.Dropdown4) newErrors.Dropdown4 = "Please select your intake.";
    if (!formData.Dropdown10) newErrors.Dropdown10 = "Please select your education score.";
    if (!formData.Dropdown3) newErrors.Dropdown3 = "Please select your English test status.";
    if (!formData.Dropdown7) newErrors.Dropdown7 = "Please select your education budget.";
    if (!formData.Dropdown5) newErrors.Dropdown5 = "Please select your funding option.";
    if (!formData.agree) newErrors.agree = "Please accept the privacy policy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    if (!validateForm()) {
      event.preventDefault();
      return;
    }
  };

  const closePopup = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black text-xl text-white transition hover:bg-neutral-700"
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#050768] to-[#0e0a10] px-6 py-7 text-center text-white md:px-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Book a Free Consultation
          </h2>
          <p className="mt-2 text-sm text-white/80 md:text-base">
            Tell us about your study plans and our counsellors will help you.
          </p>
        </div>

        <form
          id="consultation-popup-form"
          name="popupForm"
          method="POST"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          action="https://forms.zohopublic.in/pfecglobal/form/LeadScoringIndonesia/formperma/AJgNhFcZrtsB6hsVKwGIDyJOwPhYSrXaoo441w9SmJM/htmlRecords/submit"
          onSubmit={handleSubmit}
          className="p-5 md:p-8"
        >
          <input type="hidden" name="zf_referrer_name" value="" />
          <input type="hidden" name="zf_redirect_url" value="" />
          <input type="hidden" name="zc_gad" value="" />
          <input type="hidden" name="utm_source" value="" />
          <input type="hidden" name="utm_medium" value="" />
          <input type="hidden" name="utm_campaign" value="" />
          <input type="hidden" name="utm_term" value="" />
          <input type="hidden" name="utm_content" value="" />

          {/* BASIC DETAILS */}
          <div className="rounded-xl bg-[#fff4ed] p-5 md:p-7">
            <h3 className="mb-5 text-xl font-bold text-[#050768]">Basic Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="SingleLine"
                  placeholder="Name *"
                  value={formData.SingleLine}
                  onChange={handleChange}
                  className={`${fieldClass} ${errors.SingleLine ? "border border-red-500" : ""}`}
                />
                {errors.SingleLine && (
                  <p className="mt-1 text-xs text-red-500">{errors.SingleLine}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="Email"
                  placeholder="Email *"
                  value={formData.Email}
                  onChange={handleChange}
                  className={`${fieldClass} ${errors.Email ? "border border-red-500" : ""}`}
                />
                {errors.Email && (
                  <p className="mt-1 text-xs text-red-500">{errors.Email}</p>
                )}
              </div>

              <div>
                <div className="flex">
                  <input
                    type="text"
                    name="PhoneNumber_countrycodeval"
                    value="+62"
                    readOnly
                    aria-label="Country Code"
                    className="h-11 w-[70px] shrink-0 rounded-l-lg border-r border-[#d9d9d9] bg-[#f1f4f7] px-3 text-sm font-medium text-neutral-700 focus:outline-none xl:h-[2.7rem]"
                  />
                  <input
                    type="text"
                    name="PhoneNumber_countrycode"
                    maxLength={15}
                    placeholder="Phone Number *"
                    aria-label="Student's Phone Number"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.PhoneNumber_countrycode}
                    onChange={handlePhoneChange}
                    className={`h-11 min-w-0 flex-1 rounded-r-lg bg-[#f1f4f7] px-3 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-2 focus:outline-brand xl:h-[2.7rem] xl:text-[1.05rem] ${
                      errors.PhoneNumber_countrycode ? "border border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.PhoneNumber_countrycode && (
                  <p className="mt-1 text-xs text-red-500">{errors.PhoneNumber_countrycode}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown"
                  value={formData.Dropdown}
                  onChange={handleChange}
                  options={studyYears}
                  placeholder="Preferred Study Year *"
                  error={errors.Dropdown}
                />
                {errors.Dropdown && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown}</p>
                )}
              </div>
            </div>
          </div>

          {/* OTHER INFORMATION */}
          <div className="mt-5 rounded-xl bg-[#fff4ed] p-5 md:p-7">
            <h3 className="mb-5 text-xl font-bold text-[#050768]">Other Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FormSelect
                  name="Dropdown1"
                  value={formData.Dropdown1}
                  onChange={handleChange}
                  options={destinations}
                  placeholder="Preferred Destination *"
                  error={errors.Dropdown1}
                />
                {errors.Dropdown1 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown1}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown2"
                  value={formData.Dropdown2}
                  onChange={handleChange}
                  options={studyLevels}
                  placeholder="Preferred Study Level *"
                  error={errors.Dropdown2}
                />
                {errors.Dropdown2 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown2}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown3"
                  value={formData.Dropdown3}
                  onChange={handleChange}
                  options={englishStatuses}
                  placeholder="English Language Test Status *"
                  error={errors.Dropdown3}
                />
                {errors.Dropdown3 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown3}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown4"
                  value={formData.Dropdown4}
                  onChange={handleChange}
                  options={intakes}
                  placeholder="Preferred Study Intake *"
                  error={errors.Dropdown4}
                />
                {errors.Dropdown4 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown4}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown5"
                  value={formData.Dropdown5}
                  onChange={handleChange}
                  options={fundingOptions}
                  placeholder="Education Funding *"
                  error={errors.Dropdown5}
                />
                {errors.Dropdown5 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown5}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown6"
                  value={formData.Dropdown6}
                  onChange={handleChange}
                  options={qualifications}
                  placeholder="Highest Completed Qualification *"
                  error={errors.Dropdown6}
                />
                {errors.Dropdown6 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown6}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown10"
                  value={formData.Dropdown10}
                  onChange={handleChange}
                  options={educationScores}
                  placeholder="Latest Education Score *"
                  error={errors.Dropdown10}
                />
                {errors.Dropdown10 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown10}</p>
                )}
              </div>

              <div>
                <FormSelect
                  name="Dropdown7"
                  value={formData.Dropdown7}
                  onChange={handleChange}
                  options={educationBudgets}
                  placeholder="Education Budget *"
                  error={errors.Dropdown7}
                />
                {errors.Dropdown7 && (
                  <p className="mt-1 text-xs text-red-500">{errors.Dropdown7}</p>
                )}
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="mt-6">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, agree: e.target.checked }));
                  if (e.target.checked) {
                    setErrors((prev) => ({ ...prev, agree: "" }));
                  }
                }}
                className="mt-1 h-4 w-4"
              />
              <span>
                I agree to be contacted by PFEC Global regarding my study abroad enquiry.
              </span>
            </label>
            {errors.agree && (
              <p className="mt-1 text-xs text-red-500">{errors.agree}</p>
            )}
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-[#050768] px-8 py-3 font-semibold text-white transition hover:bg-[#0b0c8d]"
            >
              Submit Student Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}