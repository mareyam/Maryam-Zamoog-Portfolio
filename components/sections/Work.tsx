export default function Work() {
  return (
    <section id="work" className="px-4 sm:px-6 py-16 sm:py-24">
      {/* Proof / case study */}
      <div className="border-2 sm:border-4 border-black p-5 sm:p-10 mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-black/60 mb-3">
          Case study
        </p>
        <h2 className="text-xl sm:text-3xl font-black leading-snug sm:leading-tight text-black">
          I built the AI front desk for a multi-location aesthetic clinic —
          it generated{" "}
          <span className="bg-black text-white px-2">$124K</span> in
          revenue.
        </h2>
        <p className="mt-4 text-sm sm:text-lg text-black/80 max-w-2xl">
          It answers every enquiry, books the consultation, reminds the
          patient, and follows up with the ones who went quiet — in seconds,
          day or night.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://aesthetic-clinics-demo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-black bg-black px-5 py-3 text-sm sm:text-base text-white transition hover:bg-white hover:text-black"
          >
            See the system →
          </a>
          <a
            href="https://www.loom.com/share/42eee2302a6e49039e74959739a9c63f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-black px-5 py-3 text-sm sm:text-base text-black transition hover:bg-black hover:text-white"
          >
            Watch how it works ▶
          </a>
        </div>
      </div>

      <div className="border-2 sm:border-4 border-pink-500 p-5 sm:p-10">
        <h2 className="text-lg sm:text-2xl font-bold leading-snug sm:leading-tight text-black">
          Also handles:
          <br />
          <br />
          <span className="font-normal block space-y-2 text-base sm:text-2xl">
            <span className="block">1. customer queries</span>
            <span className="block">
              2. receiving calls after work hours/taking orders
            </span>
            <span className="block">3. handling admin tasks</span>
            <span className="block">4. calculating estimates</span>
            <span className="block">5. managing your CRM</span>
            <span className="block">6. building SaaS products</span>
            <span className="block">7. organizing data</span>
            <span className="block">
              8. connecting apps and your team together
            </span>
            <span className="block">
              9. business cold outreach, find potential leads and booking
              appointments
            </span>
          </span>
          <br />
          Is your usecase not mentioned above?
          <br />
          <br />
          <a
            href="/contact"
            className="inline-block border border-black bg-black px-5 py-3 text-sm sm:text-base text-white transition hover:bg-white hover:text-black"
          >
            Give us a text
          </a>
          <br />
          <br />
          <span className="block text-base sm:text-2xl">
            Simple ideas become real products — without the usual tech
            headaches.
          </span>
        </h2>
      </div>
    </section>
  );
}
// export default function Work() {
//   return (
//     <section id="work" className="px-6 py-24">
//       <div className="border-4 border-pink-500 p-10">
//         <h2 className="text-2xl font-bold leading-tight text-black">
//           We help founders use AI products without technical knowledge. We help
//           with
//           <br />
//           <br />
//           <span className="font-normal">
//             1. customer queries,
//             <br />
//             2. receiving calls after work hours,
//             <br />
//             3. handling admin tasks,
//             <br />
//             4. calculating estimates,
//             <br />
//             5. managing your CRM,
//             <br />
//             6. building SaaS products,
//             <br />
//             7. organizing data,
//             <br />
//             8. connecting apps and your team together,
//             <br />
//             9. booking appointments and qualifying leads
//           </span>
//           <br />
//           <br />
//           If your use case is not mentioned above?
//           <a
//             href="/contact"
//             className="inline-block border border-black bg-black px-6 py-3 text-base text-white transition hover:bg-white hover:text-black"
//           >
//             Give us a text
//           </a>
//           <br />
//           <br />
//           Simple ideas become real products — without the usual tech headaches.
//         </h2>
//       </div>
//     </section>
//   );
// }
