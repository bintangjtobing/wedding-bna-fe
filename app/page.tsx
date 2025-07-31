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

export default function Home() {
  const searchParams = useSearchParams();
  const weInvite = searchParams.get("we-invite");
  const [acknowledgments, setAcknowledgments] = useState<Acknowledgment[]>([]);
  const [guests, setGuests] = useState<{ groom: Guest[]; bride: Guest[] }>({
    groom: [],
    bride: [],
  });
  const [isLoading, setIsLoading] = useState(true);

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
larissasalonstudio,MUA For Bride
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

      window.addEventListener('wheel', handleManualScroll);
      window.addEventListener('touchmove', handleManualScroll);
      window.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
          handleManualScroll();
        }
      });

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener('wheel', handleManualScroll);
        window.removeEventListener('touchmove', handleManualScroll);
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
            Thank You
          </h1>
          <div className="text-lg md:text-xl text-gray-300 animate-fade-in-delay max-w-3xl mx-auto leading-relaxed">
            <p className="mb-4">
              From the depths of our hearts, we express our gratitude.
            </p>
            <p className="mb-4">
              To those who were present, you colored our happy day with warmth and love.
              To those who could not attend, your prayers and wishes still resonate in our hearts.
            </p>
            <p>
              Every support, every good wish, and every prayer you gave
              is the most beautiful gift that we will cherish forever.
              You all have made our wedding perfect.
            </p>
          </div>
        </div>

        {/* Acknowledgments Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Special Thanks To
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
            Our Beloved Guests
          </h2>

          {/* Groom's Side */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-400">
              Groom's Side
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
              Bride's Side
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
            And thank you to friends from Instagram and other platforms, 
            whom we cannot mention one by one, 
            thank you for your prayers and wishes.
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
                Engagement Verse
              </h3>
              <p className="text-lg md:text-xl text-gray-400 italic max-w-2xl mx-auto">
                "See, I have engraved you on the palms of my hands; your walls are ever before me."
              </p>
              <p className="text-base text-gray-500 mt-2">Isaiah 49:16</p>
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-300 mb-3">
                Wedding Verse
              </h3>
              <p className="text-lg md:text-xl text-gray-400 italic max-w-2xl mx-auto">
                "How long shall I take counsel in my soul, having sorrow in my heart daily? How long shall mine enemy be exalted over me?"
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
