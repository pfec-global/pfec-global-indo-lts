"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("pfec-language");

    if (
      savedLanguage === "EN" ||
      savedLanguage === "ID"
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);

    localStorage.setItem(
      "pfec-language",
      lang
    );

    document.documentElement.lang =
      lang === "ID" ? "id" : "en";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}