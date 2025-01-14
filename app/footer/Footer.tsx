export const Footer = () => {
  return (
    <>
      <footer className="pt-64 text-left">
        <p
          className="text-gray-100 font-light text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Copyright ©{new Date().getFullYear()} Bintang Tobing & Ayu Sinaga.
          <br />
          {`Terima kasih kepada orang tua, keluarga saya dan dari Ayu Sinaga, `}
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
            {`Bahari `}
          </a>
          dan seluruh tim Boxity untuk terwujudnya acara pranikah, pemberkatan
          nikah dan juga aplikasi web undangan ini.
          <br />
          <br />
          Serta rasa sangat bersyukur untuk tim media dan dokumentasi dari{" "}
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
          , serta tim akomodasi tempat, makanan, acara, dan musik atas
          kontribusi mereka terhadap suksesnya acara ini.
          <br />
          <br />
          Support by <abbr title="PT Boxity Central Indonesia">BoxityID</abbr>,{" "}
          <abbr title="PatunganYuk IDN">PatunganYukIDN</abbr>, dan{" "}
          <abbr title="Level Up Gaming Market">Level Up Game Hub</abbr>. All
          right reserved by PT Boxity Central Indonesia.
        </p>
      </footer>
    </>
  );
};
