"use client";

import Image from "next/image";
import { useState } from "react";

const fieldClass =
  "h-11 w-full rounded-lg bg-[#f1f4f7] px-3 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-2 focus:outline-brand xl:h-[2.7rem] xl:text-[1.05rem]";

function SelectArrow() {
  return (
    <svg
      viewBox="0 0 20 12"
      className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-3.5 -translate-y-1/2 text-neutral-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 2l8 8 8-8" />
    </svg>
  );
}

export default function Consultation() {
  const [formData, setFormData] = useState({
    SingleLine: "",
    Email: "",
    PhoneNumber_countrycodeval: "+62", // Indonesia Country Code Fixed
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Digits-only restriction for phone number field
    if (name === "PhoneNumber_countrycode") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      const fieldValue = type === "checkbox" ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Prevent non-numeric key strokes on phone input
  const handlePhoneKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    const newErrors = {};

    // Basic Details Validation
    if (!formData.SingleLine.trim()) {
      newErrors.SingleLine = "Student's Name is required.";
    }

    if (!formData.Email.trim()) {
      newErrors.Email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email address.";
    }

    if (!formData.PhoneNumber_countrycode.trim()) {
      newErrors.PhoneNumber_countrycode = "Phone number is required.";
    } else if (formData.PhoneNumber_countrycode.trim().length < 7) {
      newErrors.PhoneNumber_countrycode = "Please enter a valid phone number.";
    }

    if (!formData.Dropdown1) {
      newErrors.Dropdown1 = "Preferred destination is required.";
    }

    // Other Information Validation
    if (!formData.Dropdown6) {
      newErrors.Dropdown6 = "Highest qualification is required.";
    }

    if (!formData.Dropdown2) {
      newErrors.Dropdown2 = "Preferred study level is required.";
    }

    if (!formData.Dropdown) {
      newErrors.Dropdown = "Preferred study year is required.";
    }

    if (!formData.Dropdown4) {
      newErrors.Dropdown4 = "Preferred intake is required.";
    }

    if (!formData.Dropdown10) {
      newErrors.Dropdown10 = "Latest education score is required.";
    }

    if (!formData.Dropdown3) {
      newErrors.Dropdown3 = "English test status is required.";
    }

    if (!formData.Dropdown7) {
      newErrors.Dropdown7 = "Education budget is required.";
    }

    if (!formData.Dropdown5) {
      newErrors.Dropdown5 = "Education fund source is required.";
    }

    // Checkbox Validation
    if (!formData.agree) {
      newErrors.agree = "You must accept the terms and privacy policy.";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    }
  };

  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#050768] to-[#0e0a10]">
      <div className="mx-auto max-w-[105rem] px-4 py-12 text-center sm:px-8 lg:px-12 xl:py-[4.3rem]">
        <p className="mt-3 font-poppins text-lg text-[#b9b5e8] xl:text-[1.45rem]">
          What are you Waiting For?
        </p>
        <h2 className="mt-1 font-poppins text-2xl font-bold text-white sm:text-3xl xl:text-[2.5rem] xl:leading-[3.2rem]">
          Book a Free Consultation with Us
        </h2>

        <div className="relative mx-auto mt-7 w-full max-w-[42rem]">
          <Image
            src="/images/pfec_logo_line.png"
            alt=""
            width={344}
            height={157}
            className="absolute right-full top-1/2 mr-[3rem] hidden h-auto w-[11.6rem] max-w-none -translate-y-1/2 lg:block"
          />
          <Image
            src="/images/pfec_logo_line.png"
            alt=""
            width={344}
            height={157}
            className="absolute left-full top-1/2 ml-[3rem] hidden h-auto w-[11.6rem] max-w-none -translate-y-1/2 lg:block"
          />

          <form
            action="https://forms.zohopublic.in/pfecglobal/form/LeadScoringIndonesia/formperma/AJgNhFcZrtsB6hsVKwGIDyJOwPhYSrXaoo441w9SmJM/htmlRecords/submit"
            name="form"
            id="form"
            method="POST"
            acceptCharset="UTF-8"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl bg-white p-5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:p-6"
          >
            {/* Zoho hidden fields */}
            <input type="hidden" name="zf_referrer_name" value="" />
            <input type="hidden" name="zf_redirect_url" value="" />
            <input type="hidden" name="zc_gad" value="" />
            <input type="hidden" name="utm_source" value="" />
            <input type="hidden" name="utm_medium" value="" />
            <input type="hidden" name="utm_campaign" value="" />
            <input type="hidden" name="utm_term" value="" />
            <input type="hidden" name="utm_content" value="" />
            <input type="hidden" name="utm_details" value="" />
            <input type="hidden" name="referrername" value="" />

            {/* BASIC DETAILS */}
            <div className="rounded-xl bg-[#fff0ee] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
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
                    name="SingleLine"
                    maxLength={255}
                    placeholder="Student's Name *"
                    aria-label="Student's Name"
                    autoComplete="name"
                    value={formData.SingleLine}
                    onChange={handleChange}
                    className={`${fieldClass} ${
                      errors.SingleLine ? "border border-red-500" : ""
                    }`}
                  />
                  {errors.SingleLine && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.SingleLine}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="Email"
                    maxLength={255}
                    placeholder="Student's Email ID *"
                    aria-label="Student's Email ID"
                    autoComplete="email"
                    value={formData.Email}
                    onChange={handleChange}
                    className={`${fieldClass} ${
                      errors.Email ? "border border-red-500" : ""
                    }`}
                  />
                  {errors.Email && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Email}
                    </p>
                  )}
                </div>

                {/* Phone Field with Indonesia Country Code */}
                <div>
                  <div className="flex gap-2">
                    {/* Fixed Country Code for Indonesia (+62) */}
                    <div className="w-20 shrink-0">
                      <input
                        type="text"
                        compname="PhoneNumber_countrycodeval"
                        name="PhoneNumber_countrycodeval"
                        phoneformat="1"
                        maxLength={10}
                        id="international_PhoneNumber_countrycodeval"
                        value={formData.PhoneNumber_countrycodeval}
                        readOnly
                        aria-label="Country Code"
                        className={`${fieldClass} cursor-not-allowed bg-neutral-200 text-center font-semibold text-neutral-600`}
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="w-full">
                      <input
                        type="tel"
                        compname="PhoneNumber"
                        name="PhoneNumber_countrycode"
                        phoneformat="1"
                        iscountrycodeenabled="true"
                        maxLength={20}
                        fieldtype="11"
                        id="international_PhoneNumber_countrycode"
                        inputMode="numeric"
                        placeholder="Phone Number *"
                        aria-label="Student's Phone Number"
                        autoComplete="tel"
                        value={formData.PhoneNumber_countrycode}
                        onChange={handleChange}
                        onKeyDown={handlePhoneKeyDown}
                        className={`${fieldClass} ${
                          errors.PhoneNumber_countrycode ? "border border-red-500" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {errors.PhoneNumber_countrycode && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.PhoneNumber_countrycode}
                    </p>
                  )}
                </div>

                {/* Preferred Destination */}
                <div className="sm:col-span-2">
                  <div className="relative">
                    <select
                      name="Dropdown1"
                      aria-label="Preferred Study Destination"
                      value={formData.Dropdown1}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown1 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown1 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Preferred Study Destination *
                      </option>
                      <option value="Australia">Australia</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Japan">Japan</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Finland">Finland</option>
                      <option value="Norway">Norway</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Austria">Austria</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Poland">Poland</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Romania">Romania</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Greece">Greece</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Malta">Malta</option>
                      <option value="Help me decide">Help me decide</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown1 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown1}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* OTHER INFORMATION */}
            <div className="rounded-xl bg-[#fff0ee] p-4 sm:p-5">
              <h3 className="mb-4 text-sm font-semibold text-[#111827]">
                Other Information
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Highest Completed Qualification */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown6"
                      aria-label="Highest Completed Qualification"
                      value={formData.Dropdown6}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown6 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown6 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Highest Completed Qualification *
                      </option>
                      <option value="High School / 10th">High School / 10th</option>
                      <option value="Higher Secondary / 12th">Higher Secondary / 12th</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                      <option value="Master’s Degree">Master’s Degree</option>
                      <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                      <option value="Professional Certification">Professional Certification</option>
                      <option value="Other">Other</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown6 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown6}
                    </p>
                  )}
                </div>

                {/* Preferred Study Level */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown2"
                      aria-label="Preferred Study Level"
                      value={formData.Dropdown2}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown2 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown2 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Preferred Study Level *
                      </option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="PhD">PhD</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="English">English</option>
                      <option value="School">School</option>
                      <option value="Vocational Studies">Vocational Studies</option>
                      <option value="Professional Year">Professional Year</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Foundation">Foundation</option>
                      <option value="International Year 1">International Year 1</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown2 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown2}
                    </p>
                  )}
                </div>

                {/* Preferred Study Year */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown"
                      aria-label="Preferred Study Year"
                      value={formData.Dropdown}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Preferred Study Year *
                      </option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown}
                    </p>
                  )}
                </div>

                {/* Preferred Intake */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown4"
                      aria-label="Preferred Study Intake"
                      value={formData.Dropdown4}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown4 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown4 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Preferred Intake *
                      </option>
                      <option value="Not Yet Decided">Not Yet Decided</option>
                      <option value="Q1 (Jan - Mar)">Q1 (Jan - Mar)</option>
                      <option value="Q2 (Apr - Jun)">Q2 (Apr - Jun)</option>
                      <option value="Q3 (Jul - Sep)">Q3 (Jul - Sep)</option>
                      <option value="Q4 (Oct - Dec)">Q4 (Oct - Dec)</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown4 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown4}
                    </p>
                  )}
                </div>

                {/* Latest Education Score */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown10"
                      aria-label="Latest Education Score"
                      value={formData.Dropdown10}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown10 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown10 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Latest Education Score *
                      </option>
                      <option value="Above Overall 75% (or) CGPA 3.7 - 4.0">
                        Above Overall 75% (or) CGPA 3.7 - 4.0
                      </option>
                      <option value="Overall 60-75% (or) CGPA 3.0 - 3.6">
                        Overall 60-75% (or) CGPA 3.0 - 3.6
                      </option>
                      <option value="Overall 50-59% (or) CGPA 2.5 - 2.9">
                        Overall 50-59% (or) CGPA 2.5 - 2.9
                      </option>
                      <option value="Overall below 50% (or) below CGPA 2.5">
                        Overall below 50% (or) below CGPA 2.5
                      </option>
                      <option value="Awaiting results">Awaiting results</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown10 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown10}
                    </p>
                  )}
                </div>

                {/* English Test Status */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown3"
                      aria-label="English Test Status"
                      value={formData.Dropdown3}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown3 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown3 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        English Test Status *
                      </option>
                      <option value="I have the score available">I have the score available</option>
                      <option value="My exams are scheduled or waiting for result">
                        My exams are scheduled or waiting for result
                      </option>
                      <option value="I have not appeared for any exams">
                        I have not appeared for any exams
                      </option>
                      <option value="I am planning to reappear soon">
                        I am planning to reappear soon
                      </option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown3 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown3}
                    </p>
                  )}
                </div>

                {/* Education Budget */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown7"
                      aria-label="Education Budget"
                      value={formData.Dropdown7}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown7 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown7 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Education Budget *
                      </option>
                      <option value="Above Rp 600 Juta">Above Rp 600 Juta</option>
                      <option value="Rp 400 – 600 Juta">Rp 400 – 600 Juta</option>
                      <option value="Rp 300 – 400 Juta">Rp 300 – 400 Juta</option>
                      <option value="Rp 200 – 300 Juta">Rp 200 – 300 Juta</option>
                      <option value="Less than Rp 200 Juta">Less than Rp 200 Juta</option>
                      <option value="Need Counselling">Need Counselling</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown7 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown7}
                    </p>
                  )}
                </div>

                {/* Education Funding */}
                <div>
                  <div className="relative">
                    <select
                      name="Dropdown5"
                      aria-label="Education Funding"
                      value={formData.Dropdown5}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                        !formData.Dropdown5 ? "text-neutral-400" : "text-neutral-800"
                      } ${errors.Dropdown5 ? "border border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Education Fund Source *
                      </option>
                      <option value="I have my own funds">I have my own funds</option>
                      <option value="I am looking for Education Loans">I am looking for Education Loans</option>
                      <option value="I am looking for Scholarships">I am looking for Scholarships</option>
                      <option value="I don't have Source of funds">I don't have Source of funds</option>
                      <option value="My parents will fund my studies">My parents will fund my studies</option>
                      <option value="My siblings will fund my studies">My siblings will fund my studies</option>
                      <option value="I don't have any fund">I don't have any fund</option>
                    </select>
                    <SelectArrow />
                  </div>
                  {errors.Dropdown5 && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.Dropdown5}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* PRIVACY POLICY */}
            <div>
              <label className="flex items-start gap-2 text-xs leading-5 text-neutral-800">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border-2 border-[#f4513b] checked:bg-[#f4513b]"
                />
                <span>
                  I agree to{" "}
                  <a href="#" className="text-[#f4513b] underline">
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#f4513b] underline">
                    Terms of Use
                  </a>
                </span>
              </label>
              {errors.agree && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.agree}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="mt-2 h-11 w-full cursor-pointer rounded-lg bg-[#f4513b] px-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e84430] hover:shadow-lg sm:text-base"
            >
              Submit Student Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}