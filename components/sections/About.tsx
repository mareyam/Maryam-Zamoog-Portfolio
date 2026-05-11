"use client";

import Link from "next/link";
import { industries, toSlug } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-white px-4 pt-10 pb-24 sm:px-10">
      <div>
        <p className="border-b border-black p-4 text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Select your business type
        </p>

        {/* Mobile */}
        <div className="grid grid-cols-1 sm:hidden">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              href={`/industries/${toSlug(industry.title)}`}
              className="border border-black px-5 py-6 text-left transition-all duration-150 bg-white text-black hover:bg-black hover:text-white"
            >
              <h3 className="text-lg font-medium leading-tight">
                {industry.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden sm:grid sm:grid-cols-2">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              href={`/industries/${toSlug(industry.title)}`}
              className="border border-black px-5 py-8 text-left transition-all duration-150 bg-white text-black hover:bg-black hover:text-white"
            >
              <h3 className="text-xl md:text-xl font-medium leading-tight">
                {industry.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
// "use client";

// import Link from "next/link";
// import { industries, toSlug } from "@/lib/data";

// export default function About() {
//   return (
//     <section id="about" className="bg-white px-6 pt-10 pb-24 sm:px-10">
//       <div>
//         <p className="p-4 text-4xl font-bold tracking-tight text-black border-b border-black">
//           Select your business type
//         </p>

//         <div className="grid grid-cols-2">
//           {industries.map((industry) => (
//             <Link
//               key={industry.title}
//               href={`/industries/${toSlug(industry.title)}`}
//               className="border border-black px-5 py-8 text-left transition-all duration-150 bg-white text-black hover:bg-black hover:text-white"
//             >
//               <h3 className="text-xl md:text-xl font-medium leading-tight">
//                 {industry.title}
//               </h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
