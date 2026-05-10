"use client";

import Link from "next/link";
import { industries, toSlug } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 pt-10 pb-24 sm:px-10">
      <div>
        <p className="p-4 text-4xl font-bold tracking-tight text-black border-b border-black">
          Select your business type
        </p>

        <div className="grid grid-cols-2">
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

// import { useState } from "react";
// import { industries } from "@/lib/data";

// export default function About() {
//   const [selected, setSelected] = useState<string | null>(null);

//   function toggle(item: string) {
//     setSelected((prev) => (prev === item ? null : item));
//   }

//   return (
//     <section id="about" className="bg-white px-6 pt-10 pb-24 sm:px-10">
//       <div>
//         <p className="p-4 text-2xl font-bold tracking-tight text-black border-b border-black">
//           Select your business type
//         </p>

//         <div className="grid grid-cols-2">
//           {industries.map((industry) => {
//             const active = selected === industry.title;

//             return (
//               <button
//                 key={industry.title}
//                 onClick={() => toggle(industry.title)}
//                 className={`border border-black px-5 py-8 text-left transition-all duration-150 ${
//                   active
//                     ? "bg-black text-white"
//                     : "bg-white text-black hover:bg-black hover:text-white"
//                 }`}
//               >
//                 <h3 className="text-xl md:text-2xl font-medium leading-tight">
//                   {industry.title}
//                 </h3>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { industries, toSlug } from "@/lib/data";

// // export default function About() {
// //   return (
// //     <section id="about" className="bg-white px-6 pt-10 pb-24 sm:px-10">
// //       <div>
// //         <p className="p-4 text-2xl font-bold tracking-tight text-black border-b border-black">
// //           Select your business type
// //         </p>

// //         <div className="grid grid-cols-2">
// //           {industries.map((item) => (
// //             <Link
// //               key={item}
// //               href={`/industries/${toSlug(item)}`}
// //               className="border border-black px-5 py-8 text-left text-xl md:text-2xl font-medium leading-tight transition-all duration-150 bg-white text-black hover:bg-black hover:text-white"
// //             >
// //               {item}
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
