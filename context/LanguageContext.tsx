// context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Import translation files
import enTranslations from '@/lang/en.json';
import idTranslations from '@/lang/id.json';

// Define available languages
type Language = 'en' | 'id';

// Define nested translations type
type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: NestedTranslations;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: {},
});

// Map of all translations
const translationsMap = {
  en: enTranslations,
  id: idTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English, will be updated on mount
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<NestedTranslations>(enTranslations);

  useEffect(() => {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;
    
    // Then check cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const cookieLang = getCookie('NEXT_LOCALE') as Language;
    
    // Determine which language to use (URL param > cookie > browser language > default)
    let detectedLang: Language = 'en';
    
    if (langParam && (langParam === 'en' || langParam === 'id')) {
      detectedLang = langParam;
    } else if (cookieLang && (cookieLang === 'en' || cookieLang === 'id')) {
      detectedLang = cookieLang;
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'id') {
        detectedLang = 'id';
      }
    }
    
    // Set the language and translations
    setLanguage(detectedLang);
    setTranslations(translationsMap[detectedLang]);
    
    // Set cookie for future visits if not already set
    if (!cookieLang) {
      document.cookie = `NEXT_LOCALE=${detectedLang}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }
  }, []);

  // Update translations when language changes
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setTranslations(translationsMap[newLang]);
    
    // Update cookie
    document.cookie = `NEXT_LOCALE=${newLang}; max-age=${60 * 60 * 24 * 7}; path=/`;
    
    // Update URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleLanguageChange, 
        translations 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Utility function to translate text
export const useTranslate = () => {
  const { translations } = useLanguage();
  
  return (key: string, replacements: Record<string, string> = {}) => {
    // Support for nested keys like 'intro.undangan'
    const keys = key.split('.');
    let value: any = translations;
    
    // Traverse the nested structure
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found, return the original key
        return key;
      }
    }
    
    // If we got a string, apply replacements and return
    if (typeof value === 'string') {
      let text = value;
      
      // Replace any placeholders with values
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        text = text.replace(`{${placeholder}}`, replacement);
      });
      
      return text;
    }
    
    // If we didn't get a string (e.g., we got another object), return the original key
    return key;
  };
};