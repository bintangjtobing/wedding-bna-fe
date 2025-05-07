import { useTranslate } from "@/context/LanguageContext";

export const Footer = () => {
  const t = useTranslate();

  return (
    <footer className="pt-64 text-left">
      <p
        className="text-gray-100 font-light text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Copyright ©{new Date().getFullYear()} Bintang Tobing & Ayu Sinaga.
        <br />
        {t("footer.content1").replace("Bahari", "")}
        <a
          href="https://www.instagram.com/bahar.iii1/"
          className="underline hover:text-gray-200"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.875rem",
          }}
        >
          Bahari{" "}
        </a>
        <br />
        <br />
        {t("footer.content2").replace("Solu Photoworks", "")}
        <a
          href="https://www.instagram.com/soluphotoworks/"
          className="underline hover:text-gray-200"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.875rem",
          }}
        >
          Solu Photoworks
        </a>
        .
        <br />
        <br />
        Support by <abbr title="PT Boxity Central Indonesia">BoxityID</abbr>,{" "}
        <abbr title="PatunganYuk IDN">PatunganYukIDN</abbr>, and{" "}
        <abbr title="Level Up Gaming Market">Level Up Game Hub</abbr>. All
        rights reserved by PT Boxity Central Indonesia.
      </p>
    </footer>
  );
};
