
"use client";

import { useRef, useState } from "react";

const ZOHO_FORM_URL =
  "https://forms.zohopublic.in/pfecglobal/form/LeadScoringIndonesia/formperma/AJgNhFcZrtsB6hsVKwGIDyJOwPhYSrXaoo441w9SmJM/htmlRecords/submit";

const fieldClass =
  "h-11 w-full rounded-lg border border-[#e5d5d1] bg-white px-3 text-sm text-neutral-800 outline-none transition focus:border-[#f4513b] focus:ring-1 focus:ring-[#f4513b]/20 placeholder:text-neutral-400";

const destinationOptions = [
  "Australia",
  "USA",
  "UK",
  "Canada",
  "Germany",
  "Ireland",
  "Dubai",
  "Malaysia",
  "New Zealand",
  "Indonesia",
  "Japan",
  "France",
  "Netherlands",
  "Italy",
  "Spain",
  "Sweden",
  "Finland",
  "Norway",
  "Denmark",
  "Switzerland",
  "Austria",
  "Belgium",
  "Poland",
  "Hungary",
  "Czech Republic",
  "Portugal",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Croatia",
  "Bulgaria",
  "Greece",
  "Cyprus",
  "Malta",
  "Help me decide",
];

const selectFields = [
  {
    name: "Dropdown6",
    label: "Highest Completed Qualification",
    options: [
      "High School / 10th",
      "Higher Secondary / 12th",
      "Diploma",
      "Bachelor’s Degree",
      "Master’s Degree",
      "Doctorate (PhD)",
      "Professional Certification",
      "Other",
    ],
  },
  {
    name: "Dropdown2",
    label: "Preferred Study Level",
    options: [
      "Undergraduate",
      "Postgraduate",
      "PhD",
      "Doctorate",
      "English",
      "School",
      "Vocational Studies",
      "Professional Year",
      "Diploma",
      "Foundation",
      "International Year 1",
    ],
  },
  {
    name: "Dropdown",
    label: "Preferred Study Year",
    options: ["2027", "2028", "2029", "2030"],
  },
  {
    name: "Dropdown4",
    label: "Preferred Intake",
    options: [
      "Not Yet Decided",
      "Q1 (Jan - Mar)",
      "Q2 (Apr - Jun)",
      "Q3 (Jul - Sep)",
      "Q4 (Oct - Dec)",
    ],
  },
  {
    name: "Dropdown10",
    label: "Latest Education Score",
    options: [
      "Above Overall 75% (or) CGPA 3.7 - 4.0",
      "Overall 60-75% (or) CGPA 3.0 - 3.6",
      "Overall 50-59% (or) CGPA 2.5 - 2.9",
      "Overall below 50% (or) below CGPA 2.5",
      "Awaiting results",
    ],
  },
  {
    name: "Dropdown3",
    label: "English Test Status",
    options: [
      "I have the score available",
      "My exams are scheduled or waiting for result",
      "I have not appeared for any exams",
      "I am planning to reappear soon",
    ],
  },
  {
    name: "Dropdown7",
    label: "Education Budget",
    options: [
      "Above Rp 600 Juta",
      "Rp 400 – 600 Juta",
      "Rp 300 – 400 Juta",
      "Rp 200 – 300 Juta",
      "Less than Rp 200 Juta",
      "Need Counselling",
    ],
  },
  {
    name: "Dropdown5",
    label: "Education Fund Source",
    options: [
      "I have my own funds",
      "I am looking for Education Loans",
      "I am looking for Scholarships",
      "I don't have Source of funds",
      "My parents will fund my studies",
      "My siblings will fund my studies",
      "I don't have any fund",
    ],
  },
];

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

const requiredSelectMessages = {
  Dropdown1: "Please select your preferred study destination.",
  Dropdown6: "Please select your highest qualification.",
  Dropdown2: "Please select your preferred study level.",
  Dropdown: "Please select your preferred study year.",
  Dropdown4: "Please select your preferred intake.",
  Dropdown10: "Please select your latest education score.",
  Dropdown3: "Please select your English test status.",
  Dropdown7: "Please select your education budget.",
  Dropdown5: "Please select your education funding source.",
};

// Validate an individual field.
function validateField(name, value) {
  if (name === "SingleLine") {
    if (!value.trim()) {
      return "Please enter the student's name.";
    }
    if (value.trim().length < 2) {
      return "Student's name must contain at least 2 characters.";
    }
    return "";
  }

  if (name === "Email") {
    if (!value.trim()) {
      return "Please enter your email address.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  if (name === "PhoneNumber_countrycode") {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      return "Please enter your phone number.";
    }

    if (digits.length < 7 || digits.length > 15) {
      return "Please enter a valid phone number (7–15 digits).";
    }

    return "";
  }

  if (name === "agree") {
    return value
      ? ""
      : "Please accept the Privacy Policy and Terms of Use.";
  }

  if (Object.prototype.hasOwnProperty.call(
    requiredSelectMessages,
    name
  )) {
    return value ? "" : requiredSelectMessages[name];
  }

  return "";
}

function SelectArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function ErrorMessage({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1 text-xs font-medium leading-4 text-red-600"
    >
      <svg
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v6M12 17h.01" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

export default function ObligationForm() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Show error only after interaction or submit.
  const getError = (name) => {
    if (!submitted && !touched[name]) return "";
    return errors[name] || "";
  };

  // Update value and validation.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const nextValue = type === "checkbox" ? checked : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    // Revalidate already touched fields or after form submit.
    if (touched[name] || submitted) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, nextValue),
      }));
    }
  };

  // Validate a field when user leaves it.
  const handleBlur = (event) => {
    const { name, value, type, checked } = event.target;

    const nextValue = type === "checkbox" ? checked : value;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, nextValue),
    }));
  };

  // Restrict invalid phone characters.
  const handlePhoneKeyDown = (event) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "Enter",
    ];

    if (
      allowedKeys.includes(event.key) ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (!/^[0-9+\-() ]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  // Validate entire form.
  const validateForm = () => {
    const nextErrors = {};

    Object.keys(initialFormData).forEach((name) => {
      if (name === "PhoneNumber_countrycodeval") return;

      const message = validateField(name, formData[name]);

      if (message) {
        nextErrors[name] = message;
      }
    });

    setErrors(nextErrors);

    return nextErrors;
  };

  // Submit form.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitted(true);

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      // Focus the first invalid field after React updates.
      const firstInvalidName = Object.keys(nextErrors)[0];

      requestAnimationFrame(() => {
        const firstInvalid = Array.from(
          formRef.current?.elements || []
        ).find((element) => element.name === firstInvalidName);

        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });

      return;
    }

    setSubmitting(true);

    // Native Zoho submission using original field names.
    formRef.current?.submit();
  };

  // Render dropdown and error under it.
  const renderSelect = (field) => {
    const error = getError(field.name);

    return (
      <div key={field.name} className="min-w-0">
        <div className="relative">
          <select
            id={field.name}
            name={field.name}
            aria-label={field.label}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${field.name}-error` : undefined
            }
            value={formData[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
              !formData[field.name] ? "text-neutral-400" : ""
            } ${
              error
                ? "!border-red-500 !ring-1 !ring-red-100"
                : ""
            }`}
          >
            <option value="" disabled>
              {field.label} *
            </option>

            {field.options.map((option) => (
              <option
                key={option}
                value={option}
                className="text-neutral-800"
              >
                {option}
              </option>
            ))}
          </select>

          <SelectArrow />
        </div>

        <ErrorMessage id={`${field.name}-error`}>
          {error}
        </ErrorMessage>
      </div>
    );
  };

  return (
    <section
      id="consultation"
      className="bg-[#F7F6FC] px-4 py-10 font-poppins sm:px-8 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 rounded-[24px] bg-[#24139B] p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-[38px]">

        {/* ==================================== */}
        {/* LEFT CONTENT */}
        {/* ==================================== */}

        <div className="pt-1 text-white">
          <span className="inline-flex rounded-full bg-[#FFCC36] px-3 py-1 text-base font-semibold text-[#100B36]">
            Free, no obligation
          </span>

          <h2 className="mt-5 font-neue-reman text-[26px] font-bold leading-[1.15] sm:text-[30px]">
            Ready? Book your free
            <br className="hidden sm:block" /> consultation.
          </h2>

          <p className="mt-4 max-w-[350px] text-[12px] leading-[1.65] text-white/90">
            Tell us a little about you. A counsellor will
            contact you on WhatsApp to set a time that suits
            you and your family.
          </p>

          <ul className="mt-5 space-y-3 text-[12px] text-white/90">
            {[
              "Takes under a minute",
              "Parents are welcome to join",
              "Online or at our Jakarta office",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[#FFCC00]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ==================================== */}
        {/* ZOHO FORM */}
        {/* ==================================== */}

        <form
          ref={formRef}
          action={ZOHO_FORM_URL}
          name="form"
          id="form"
          method="POST"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl bg-white p-5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:p-6"
        >

          {/* Zoho hidden fields */}
          <input
            type="hidden"
            name="zf_referrer_name"
            value=""
          />
          <input
            type="hidden"
            name="zf_redirect_url"
            value=""
          />
          <input
            type="hidden"
            name="zc_gad"
            value=""
          />
          <input
            type="hidden"
            name="utm_source"
            value=""
          />
          <input
            type="hidden"
            name="utm_medium"
            value=""
          />
          <input
            type="hidden"
            name="utm_campaign"
            value=""
          />
          <input
            type="hidden"
            name="utm_term"
            value=""
          />
          <input
            type="hidden"
            name="utm_content"
            value=""
          />
          <input
            type="hidden"
            name="utm_details"
            value=""
          />
          <input
            type="hidden"
            name="referrername"
            value=""
          />

          {/* ==================================== */}
          {/* BASIC DETAILS */}
          {/* ==================================== */}

          <div className="rounded-xl bg-[#fff0ee] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#111827]">
                Basic Details
              </h3>

              <span className="text-[10px] font-medium text-[#f4513b] sm:text-xs">
                *Mandatory Fields
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Student Name */}
              <div className="sm:col-span-2">
                <input
                  type="text"
                  id="SingleLine"
                  name="SingleLine"
                  maxLength={255}
                  placeholder="Student's Name *"
                  aria-label="Student's Name"
                  aria-invalid={Boolean(
                    getError("SingleLine")
                  )}
                  aria-describedby={
                    getError("SingleLine")
                      ? "SingleLine-error"
                      : undefined
                  }
                  autoComplete="name"
                  value={formData.SingleLine}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${fieldClass} ${
                    getError("SingleLine")
                      ? "!border-red-500 !ring-1 !ring-red-100"
                      : ""
                  }`}
                />

                <ErrorMessage id="SingleLine-error">
                  {getError("SingleLine")}
                </ErrorMessage>
              </div>

              {/* Student Email */}
              <div>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  maxLength={255}
                  placeholder="Student's Email ID *"
                  aria-label="Student's Email ID"
                  aria-invalid={Boolean(getError("Email"))}
                  aria-describedby={
                    getError("Email")
                      ? "Email-error"
                      : undefined
                  }
                  autoComplete="email"
                  value={formData.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${fieldClass} ${
                    getError("Email")
                      ? "!border-red-500 !ring-1 !ring-red-100"
                      : ""
                  }`}
                />

                <ErrorMessage id="Email-error">
                  {getError("Email")}
                </ErrorMessage>
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex gap-2">

                  {/* Country code */}
                  <div className="w-[76px] shrink-0">
                    <input
                      type="text"
                      name="PhoneNumber_countrycodeval"
                      compname="PhoneNumber_countrycodeval"
                      phoneformat="1"
                      id="international_PhoneNumber_countrycodeval"
                      value={
                        formData.PhoneNumber_countrycodeval
                      }
                      readOnly
                      aria-label="Country code"
                      className={`${fieldClass} cursor-not-allowed bg-neutral-100 px-2 text-center font-semibold text-neutral-600`}
                    />
                  </div>

                  {/* Phone input */}
                  <div className="min-w-0 flex-1">
                    <input
                      type="tel"
                      id="international_PhoneNumber_countrycode"
                      name="PhoneNumber_countrycode"
                      compname="PhoneNumber"
                      phoneformat="1"
                      iscountrycodeenabled="true"
                      fieldtype="11"
                      maxLength={20}
                      inputMode="tel"
                      placeholder="Phone Number *"
                      aria-label="Student's Phone Number"
                      aria-invalid={Boolean(
                        getError("PhoneNumber_countrycode")
                      )}
                      aria-describedby={
                        getError("PhoneNumber_countrycode")
                          ? "PhoneNumber_countrycode-error"
                          : undefined
                      }
                      autoComplete="tel-national"
                      value={
                        formData.PhoneNumber_countrycode
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={handlePhoneKeyDown}
                      className={`${fieldClass} ${
                        getError("PhoneNumber_countrycode")
                          ? "!border-red-500 !ring-1 !ring-red-100"
                          : ""
                      }`}
                    />
                  </div>
                </div>

                <ErrorMessage id="PhoneNumber_countrycode-error">
                  {getError("PhoneNumber_countrycode")}
                </ErrorMessage>
              </div>

              {/* Destination */}
              <div className="sm:col-span-2">
                {renderSelect({
                  name: "Dropdown1",
                  label: "Preferred Study Destination",
                  options: destinationOptions,
                })}
              </div>
            </div>
          </div>

          {/* ==================================== */}
          {/* OTHER INFORMATION */}
          {/* ==================================== */}

          <div className="rounded-xl bg-[#fff0ee] p-4 sm:p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#111827]">
              Other Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {selectFields.map(renderSelect)}
            </div>
          </div>

          {/* ==================================== */}
          {/* PRIVACY POLICY */}
          {/* ==================================== */}

          <div>
            <label className="flex items-start gap-2 text-xs leading-5 text-neutral-800">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(getError("agree"))}
                aria-describedby={
                  getError("agree")
                    ? "agree-error"
                    : undefined
                }
                className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#f4513b] ${
                  getError("agree")
                    ? "outline outline-1 outline-red-500"
                    : ""
                }`}
              />

              <span>
                I agree to{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f4513b] underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f4513b] underline"
                >
                  Terms of Use
                </a>
                .
              </span>
            </label>

            <ErrorMessage id="agree-error">
              {getError("agree")}
            </ErrorMessage>
          </div>

          {/* ==================================== */}
          {/* SUBMIT BUTTON */}
          {/* ==================================== */}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-11 w-full cursor-pointer rounded-lg bg-[#f4513b] px-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e84430] hover:shadow-lg disabled:cursor-wait disabled:opacity-70 sm:text-base"
          >
            {submitting
              ? "Submitting..."
              : "Submit Student Details"}
          </button>
        </form>
      </div>
    </section>
  );
}
