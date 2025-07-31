"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Acknowledgment {
  name: string;
  role: string;
}

interface Guest {
  id: number;
  name: string;
  username: string;
  phone_number: string;
  country: string;
  country_code: string;
  greeting: string;
  invitation_status: string;
  side: "groom" | "bride";
}

const translations = {
  en: {
    thankYou: "Thank You",
    thankYouMessage: {
      line1: "From the depths of our hearts, we express our gratitude.",
      line2:
        "To those who were present, you colored our happy day with warmth and love. To those who could not attend, your prayers and wishes still resonate in our hearts.",
      line3:
        "Every support, every good wish, and every prayer you gave is the most beautiful gift that we will cherish forever. You all have made our wedding perfect.",
    },
    specialThanks: "Special Thanks To",
    belovedGuests: "Our Beloved Guests",
    groomSide: "Groom's Side",
    brideSide: "Bride's Side",
    additionalThanks:
      "And thank you to friends from Instagram and other platforms, whom we cannot mention one by one, thank you for your prayers and wishes.",
    engagementVerse: "Engagement Verse",
    weddingVerse: "Wedding Verse",
  },
  id: {
    thankYou: "Terima Kasih",
    thankYouMessage: {
      line1: "Dari lubuk hati yang terdalam, kami mengucapkan terima kasih.",
      line2:
        "Bagi yang hadir, kalian telah mewarnai hari bahagia kami dengan kehangatan dan cinta. Bagi yang berhalangan hadir, doa dan ucapan kalian tetap kami rasakan dalam hati.",
      line3:
        "Setiap dukungan, setiap harapan baik, dan setiap doa yang kalian berikan adalah hadiah terindah yang akan kami kenang selamanya. Kalian semua telah membuat pernikahan kami menjadi sempurna.",
    },
    specialThanks: "Ucapan Terima Kasih Khusus Kepada",
    belovedGuests: "Para Tamu Tercinta",
    groomSide: "Dari Pihak Mempelai Pria",
    brideSide: "Dari Pihak Mempelai Wanita",
    additionalThanks:
      "Dan terima kasih untuk teman-teman dari Instagram dan platform lainnya, yang tidak dapat kami sebutkan satu persatu, terima kasih untuk doa dan harapannya.",
    engagementVerse: "Ayat Tunangan",
    weddingVerse: "Ayat Pernikahan",
  },
};

export default function Home() {
  const searchParams = useSearchParams();
  const weInvite = searchParams.get("we-invite");
  const urlLang = searchParams.get("lang");
  const [detectedLang, setDetectedLang] = useState<"en" | "id">("en");
  const lang = (urlLang || detectedLang) as "en" | "id";
  const t = translations[lang];

  const [acknowledgments, setAcknowledgments] = useState<Acknowledgment[]>([]);
  const [guests, setGuests] = useState<{ groom: Guest[]; bride: Guest[] }>({
    groom: [],
    bride: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Detect user location and set language
  useEffect(() => {
    if (!urlLang) {
      fetch(
        "https://api.ipgeolocation.io/ipgeo?apiKey=6980c4c2ec9d45039a0b241b7382e7fe"
      )
        .then((res) => res.json())
        .then((data) => {
          const countryCode = data.location?.country_code2;
          if (countryCode === "ID") {
            setDetectedLang("id");
          } else {
            setDetectedLang("en");
          }
        })
        .catch((err) => {
          console.error("Error detecting location:", err);
          setDetectedLang("en");
        });
    }
  }, [urlLang]);

  useEffect(() => {
    // Parse CSV data
    const csvData = `Ny. B. Lumban Tobing-St. H. Br. Simanjuntak (Op. Bintang),Opung Suhut
R.L. Manalu/ Br. Simanjuntak (Op. Ni Si Israel),Opungna
St. B.H. Lumban Tobing, ST/ D. Br. Siahaan, ST (A. Callysthene),Amangudana
R. Panjaitan, SE/ Ch. Br. Lumban Tobing, MKep (A. Bona),Amangboruna
K. Marbun, SE/ B.E. Br. Lumban Tobing (A. Rogan),Amangboruna
E. Simorangkir/ D.S. Br. Lumban Tobing (A. Niko),Amangboruna
S. Sihombing/ V. Br. Lumbantobing(A. Valeri),Amangboruna
Drs. J.M.P. Silalahi/ Dra. T.Br. Lumban Tobing,Amangboruna
M.Hum Ny. M. Lumbantobing br. Gultom (Op. Revan),Inangtuana
M.A. Lumbantobing/ br. Sitinjak (Op. Ni Si Atalia),Amangtuana
H. Lumbantobing/ br. Simanjuntak (A. Gabriel),Amangtuana
R. Lumbantobing/ br. Pardede (A. Septi),Amangtuana
B. Hutapea/ br. Lumbantobing ( Op. Dheo Natan),Amangboruna
P. M. Lumban Tobing, SPd/ K.D. Br. Sinaga, SPd,Abangna
Ny. S. L. Tobing br. Sipahutar (Op. David),Opungna
Ny. K. L. Tobing/ br. Harahap (A. Feri),Inangtuana
K. Lumban Tobing, SE/ Br. Siregar, SE (A. Cia),Abangna
Drs. H. Lumban Tobing, MSi/ Br. Siregar (A. Simon),Abangna
Ny. B. Simanjuntak br. Silaen(Op. Mathew),Opungbao
R. Simanjuntak/ br. Simbolon (A. Mathew),Tulangna
Ch. Simanjuntak/ br. Siregar (A. Juli),Tulangna
Saut Simanjuntak/ br. Nadapdap,Tulangna
Aiptu. L.P. Lubis/ M. Br. Simanjuntak, AMF (A. Gwyen),Tulangna
dr. J.S. Simanjuntak/ drg. Br. Hutauruk,Amangtuana
B. Nadeak/ K. Br. Simanjuntak (A.Berkat),Amangtuana
A. Naibaho/ H. Br. Simanjuntak, SPAK (A. Alka),Amangudana
Ny. Max Pattypelohy-Dessy Pasman,Tantena
Ny. Silalahi br. L. Tobing (Op. Putri),Itona Mangulahi
T. Pakpahan, SE/ St. Br.Marpaung, SPd,Amangboruna
Drs. T. Simorangkir/ Dra. Br. Pakpahan,Amangboruna
P. Silaban/ br. Banjarnahor,Amangboruna
A. Pakpahan, SE/ br. L. Tobing,Amangboruna
J. Silalahi/ br. Simorangkir,Amangboruna
Niko Simorangkir, SE/ Br. Gultom, SE,Laena
Sude Pomparan /Punguan Op.Panangkap Lumbantobing Kota Medan,
Punguan Op. Somuntul Lumbantobing,
PPSRB Medan Timur/Perjuangan,
Punguan Datudolok Simanjuntak Kota Medan,
Punguan Simanjuntak Sitolu Sada Ina Sektor 19 Medan Timur,
STM Punguan Saulaon,
godbless.production,Documentation
Solu Photoworks,Documentation
larissasalonstudio,MUA For Bride
JaksaMakeUp,MUA For Bride
Management Wisma Mahinna,Venue
Management Gereja HKBP Glugur,Church Venue
ferrygunawandecor,Decoration
Wahyu Roma,Rental Mobil`;

    const parsedData = csvData
      .split("\n")
      .map((line) => {
        const lastCommaIndex = line.lastIndexOf(",");
        if (lastCommaIndex === -1) return null;

        const name = line.substring(0, lastCommaIndex).trim();
        const role = line.substring(lastCommaIndex + 1).trim();

        return { name, role };
      })
      .filter((item) => item && item.name);

    setAcknowledgments(parsedData);

    // Fetch guests data
    fetch("https://wedding-api.bintangtobing.com/api/invitation/guests/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setGuests(data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching guests:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Auto-scroll effect - scroll down like movie credits
    const startScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const duration = totalHeight * 12; // Adjust speed here (faster scrolling)

      // Start from top
      window.scrollTo(0, 0);

      // Smooth scroll to bottom
      let startTime: number | null = null;
      let animationId: number | null = null;

      const scrollAnimation = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentScroll = totalHeight * progress;
        window.scrollTo(0, currentScroll);

        if (progress < 1) {
          animationId = requestAnimationFrame(scrollAnimation);
        }
      };

      // Start auto-scroll after delay
      setTimeout(() => {
        animationId = requestAnimationFrame(scrollAnimation);
      }, 2000); // Start after 2 seconds

      // Allow manual scroll to override auto-scroll
      const handleManualScroll = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      };

      window.addEventListener("wheel", handleManualScroll);
      window.addEventListener("touchmove", handleManualScroll);
      window.addEventListener("keydown", (e) => {
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
          ].includes(e.key)
        ) {
          handleManualScroll();
        }
      });

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener("wheel", handleManualScroll);
        window.removeEventListener("touchmove", handleManualScroll);
      };
    };

    if (!isLoading) {
      startScroll();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Opening Section */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
            {t.thankYou}
          </h1>
          <div className="text-lg md:text-xl text-gray-300 animate-fade-in-delay max-w-3xl mx-auto leading-relaxed">
            <p className="mb-4">{t.thankYouMessage.line1}</p>
            <p className="mb-4">{t.thankYouMessage.line2}</p>
            <p>{t.thankYouMessage.line3}</p>
          </div>
        </div>

        {/* Acknowledgments Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.specialThanks}
          </h2>
          <div className="space-y-6">
            {acknowledgments.map((ack, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xl md:text-2xl font-semibold">
                  {ack.name}
                </div>
                {ack.role && (
                  <div className="text-lg md:text-xl text-gray-400 mt-1">
                    {ack.role}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guests Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.belovedGuests}
          </h2>

          {/* Groom's Side */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-400">
              {t.groomSide}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guests.groom.map((guest, index) => (
                <div
                  key={guest.id}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-lg font-medium">{guest.name}</div>
                  {guest.greeting && (
                    <div className="text-sm text-gray-400">
                      ({guest.greeting})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bride's Side */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-pink-400">
              {t.brideSide}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guests.bride.map((guest, index) => (
                <div
                  key={guest.id}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-lg font-medium">{guest.name}</div>
                  {guest.greeting && (
                    <div className="text-sm text-gray-400">
                      ({guest.greeting})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Thanks */}
        <div className="mb-32 text-center">
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.additionalThanks}
          </p>
        </div>

        {/* Closing */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Bintang Cato Jeremia L Tobing
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">&</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ayu Stevani Sinaga, S.Ak
          </h2>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-300 mb-3">
                {t.engagementVerse}
              </h3>
              <p className="text-lg md:text-xl text-gray-400 italic max-w-2xl mx-auto">
                "See, I have engraved you on the palms of my hands; your walls
                are ever before me."
              </p>
              <p className="text-base text-gray-500 mt-2">Isaiah 49:16</p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-300 mb-3">
                {t.weddingVerse}
              </h3>
              <p className="text-lg md:text-xl text-gray-400 italic max-w-2xl mx-auto">
                "How long shall I take counsel in my soul, having sorrow in my
                heart daily? How long shall mine enemy be exalted over me?"
              </p>
              <p className="text-base text-gray-500 mt-2">Psalm 13:2</p>
            </div>
          </div>

          <p className="text-lg text-gray-400 mt-12">2025</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
