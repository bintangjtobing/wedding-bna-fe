import Image from "next/image";

export default function Home() {
  return (
    <>
      <section
        style={{
          backgroundImage: "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1733230578/alvaro-cvg-mW8IZdX7n8E-unsplash_mzxhg4.jpg')",
          backgroundSize: 'cover',  // Optional: Makes the image cover the section
          backgroundPosition: 'center',  // Optional: Centers the image
          height: '100vh',  // Optional: Makes the section take the full viewport height
        }}
        className="relative"
      >
         <div
              className=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparency
                zIndex: 1,
              }}
            ></div>
        <nav className="max-w-screen-xl mx-auto py-5 px-3">
          <Image
            className="absolute z-20"
            src={'https://res.cloudinary.com/du0tz73ma/image/upload/v1733230643/image_1_toske2.png'}
            width={120}
            height={120}
            alt="logo"
          />
        </nav>

        <div className="mx-auto pl-32 absolute bottom-40 w-full z-20">
          <Image
            src={'https://res.cloudinary.com/du0tz73ma/image/upload/v1733231582/image_3_gkyqke.png'}
            width={100}
            height={100}
            alt="nikahfix-series"
          />
          <div className="text-white mt-5">
            <h1 className="text-5xl font-extrabold mb-5">Bintang & Ayu <br /> Sebelum hari H</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <button className="bg-white text-gray-950 py-4 px-9 rounded-md text-2xl font-semibold">
                  Coming soon
                </button>
                <button
                  className="text-white py-4 px-9 rounded-md text-2xl font-semibold flex gap-1 items-center"
                  style={{
                    backgroundColor: 'rgba(249, 250, 251, 0.3)' // rgba for gray-50 with 50% transparency
                  }}
                >
                  <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
                  </svg>

                  Buka detail
                </button>
              </div>
              <div className="relative">
                <div style={{backgroundColor: 'rgba(2, 6, 23, 0.7)'}} className="border-l-4 border-white px-4 py-2 absolute w-max right-0 bottom-0">
                  <p className="text-white">11 Juli 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}