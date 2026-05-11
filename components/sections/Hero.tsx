"use client";

import { email } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex flex-col px-4 sm:px-10 pt-32 sm:pt-28 pb-8 overflow-hidden">
      {/* Top */}
      <div className="flex flex-col items-center sm:items-start">
        <h1 className="inline-block border border-black p-3 sm:p-4 text-center sm:text-left uppercase text-black font-black leading-[0.9] tracking-[-0.08em] text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[10rem]">
          ZAMOOG
        </h1>

        <p className="mt-3 self-start border border-black px-3 py-2 text-sm sm:text-base text-black">
          (ours, hamara)
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[80px]" />

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        <a
          href={`mailto:${email}`}
          className="inline-block self-start border border-black px-4 py-4 text-sm sm:text-lg text-black transition hover:bg-black hover:text-white"
        >
          {email}
        </a>

        <a
          href="https://tinyurl.com/maryamlooms"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block self-start border border-black px-4 py-4 text-sm sm:text-lg text-black transition hover:bg-black hover:text-white"
        >
          my work at <span className="underline">tinyurl.com/maryamlooms</span>
        </a>

        <p className="w-full border border-black p-4 text-left leading-[1.35] text-black text-base sm:text-xl md:text-2xl">
          Hello, I&apos;m a freelance AI automation developer and software
          engineer based in Pakistan, helping businesses save time with AI,
          automations and custom systems.
        </p>
      </div>
    </section>
  );
}
// "use client";

// import { email } from "@/lib/data";

// export default function Hero() {
//   return (
//     <section className="min-h-screen bg-white flex flex-col px-4 sm:px-10 pt-32 sm:pt-28 pb-8 overflow-hidden">
//       {/* Top */}
//       <div className="flex flex-col items-center sm:items-start">
//         <h1 className="w-full border border-black p-3 sm:p-4 text-center sm:text-left uppercase text-black font-black leading-[0.9] tracking-[-0.08em] text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[10rem] break-words">
//           ZAMOOG
//         </h1>

//         <p className="mt-3 self-start border border-black px-3 py-2 text-sm sm:text-base text-black">
//           (ours, hamara)
//         </p>
//       </div>

//       {/* Spacer */}
//       <div className="flex-1 min-h-[100px]" />

//       {/* Bottom */}
//       <div className="flex flex-col gap-4">
//         <a
//           href={`mailto:${email}`}
//           className="w-full border border-black px-4 py-4 text-sm sm:text-lg text-black break-all transition hover:bg-black hover:text-white"
//         >
//           {email}
//         </a>
//         <a
//           href="https://tinyurl.com/maryamlooms"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full border border-black px-4 py-4 text-sm sm:text-lg text-black transition hover:bg-black hover:text-white"
//         >
//           my work at <span className="underline">tinyurl.com/maryamlooms</span>
//         </a>
//         <p className="w-full border border-black p-4 text-left leading-[1.35] text-black text-base sm:text-xl md:text-2xl">
//           Hello, I&apos;m a freelance AI automation developer and software
//           engineer based in Pakistan, helping businesses save time with AI,
//           automations and custom systems.
//         </p>
//       </div>
//     </section>
//   );
// }
// // "use client";

// // import Image from "next/image";
// // import { email } from "@/lib/data";

// // export default function Hero() {
// //   return (
// //     <section className="min-h-screen bg-white flex flex-col px-6 sm:px-10 pt-20 pb-10 select-text">
// //       {/* Upper: wordmark left, photo top-right */}
// //       <div className="flex items-start justify-between gap-6">
// //         {/* Wordmark + subtitle */}
// //         <div className="select-text">
// //           <h1 className="select-text p-4 m-4 uppercase text-black font-black leading-none tracking-tighter border text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem]">
// //             ZAMOOG
// //           </h1>

// //           <p className="select-text inline-block mt-2 ml-4 border p-2 text-black text-base md:text-lg lg:text-xl">
// //             (ours, hamara)
// //           </p>
// //         </div>
// //       </div>

// //       {/* Spacer */}
// //       <div className="flex-1" />

// //       <div className="flex items-end justify-between gap-8 m-4">
// //         <a
// //           href={`mailto:${email}`}
// //           className="border p-4 select-text inline-flex items-center gap-2 shrink-0 text-xl md:text-2xl text-black hover:text-black/60 transition-colors"
// //         >
// //           <span>{email}</span>

// //           <svg
// //             width="20"
// //             height="20"
// //             viewBox="0 0 18 18"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="1.5"
// //           >
// //             <path
// //               d="M5 13L13 5M13 5H7M13 5V11"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             />
// //           </svg>
// //         </a>

// //         <p className="border p-4 select-text max-w-[300px] sm:max-w-[420px] lg:max-w-[580px] text-justify leading-[1.4] text-black text-xl md:text-2xl lg:text-3xl">
// //           Hello, I&apos;m a freelance AI-Automation Developer and Pre-AI era
// //           Software Engineer based in Pakistan, working remotely. Let&apos;s
// //           create!
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }
