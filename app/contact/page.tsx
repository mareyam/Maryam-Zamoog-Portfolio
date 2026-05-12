"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/Header";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    timeTaking: "",
    frustrations: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(`${name}:`, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", formData);

    try {
      const response = await fetch(
        "https://n8n.softxlogic.com/webhook/5b287c7b-5cb0-4608-9f3e-63b4d4daf922",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Webhook response status:", response.status);

      if (response.ok) {
        console.log("Form submitted successfully");
        setShowThankYou(true);
        setFormData({
          name: "",
          email: "",
          business: "",
          timeTaking: "",
          frustrations: "",
          additionalInfo: "",
        });
      } else {
        console.error("Webhook error:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = () => {
    console.log("Navigating to home");
    router.push("/");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Contact
          </p>
          <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
            Lets Solve
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-black/60">
            Tell me about your business, the niche, the problems you&apos;re
            facing, anything you think could save your time? or just leave it to
            us. Fill in whatever detail you think could help me understand. Will
            reach out to you within 4 hours.
          </p>

          <form className="mt-16 border-2 border-black" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b  md:border-r border-black p-6">
                <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
                />
              </div>

              <div className="border-b border-black p-6">
                <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                What does your business do?
              </label>

              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Real Estate, Dental Clinic, Gym, Agency..."
                required
                className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                What&apos;s taking too much time?
              </label>

              <textarea
                name="timeTaking"
                value={formData.timeTaking}
                onChange={handleChange}
                rows={4}
                placeholder="Replying to customers, follow-ups, scheduling, reporting, admin work..."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                Anything frustrating in your business?
              </label>

              <textarea
                name="frustrations"
                value={formData.frustrations}
                onChange={handleChange}
                rows={4}
                placeholder="Missed leads, no-shows, repetitive work, slow processes, too many tools..."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                Anything else you&apos;d like me to know?
              </label>

              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                placeholder="You can keep this simple. Just explain your business in your own words."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-6 py-7 text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry →"}
            </button>
            <div className="flex flex-col">
              <a
                href="mailto:maryam@zamoog.com"
                className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
              >
                OR Reach Out Via Email →
              </a>

              <a
                href="https://calendly.com/maryamnaveed/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
              >
                OR Reach Out Via Meeting →
              </a>
            </div>
          </form>
        </div>
      </main>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white max-w-md w-full p-12 border-2 border-black text-center">
            <h2 className="text-4xl font-black uppercase mb-4">Thank You!</h2>
            <p className="text-lg text-black/60 mb-8 leading-relaxed">
              We'll reach out to you within 4 hours.
            </p>
            <button
              onClick={handleExplore}
              className="w-full bg-black text-white px-6 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-all duration-200"
            >
              Explore →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
// "use client";

// import { useState } from "react";
// import Header from "@/components/sections/Header";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     business: "",
//     timeTaking: "",
//     frustrations: "",
//     additionalInfo: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "https://n8n.softxlogic.com/webhook/5b287c7b-5cb0-4608-9f3e-63b4d4daf922",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         setSubmitted(true);
//         setFormData({
//           name: "",
//           email: "",
//           business: "",
//           timeTaking: "",
//           frustrations: "",
//           additionalInfo: "",
//         });
//         setTimeout(() => setSubmitted(false), 3000);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />

//       <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
//         <div className="max-w-6xl">
//           <p className="text-sm uppercase tracking-[0.2em] text-black/50">
//             Contact
//           </p>
//           <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
//             Lets Solve
//           </h1>
//           <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-black/60">
//             Tell me about your business, the niche, the problems you&apos;re
//             facing, anything you think could save your time? or just leave it to
//             us. Fill in whatever detail you think could help me understand. Will
//             reach out to you within 4 hours.
//           </p>

//           <form className="mt-16 border-2 border-black" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2">
//               <div className="border-b  md:border-r border-black p-6">
//                 <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                   Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   required
//                   className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
//                 />
//               </div>

//               <div className="border-b border-black p-6">
//                 <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@company.com"
//                   required
//                   className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
//                 />
//               </div>
//             </div>

//             <div className="border-b border-black p-6">
//               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                 What does your business do?
//               </label>

//               <input
//                 type="text"
//                 name="business"
//                 value={formData.business}
//                 onChange={handleChange}
//                 placeholder="Real Estate, Dental Clinic, Gym, Agency..."
//                 required
//                 className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
//               />
//             </div>

//             <div className="border-b border-black p-6">
//               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                 What&apos;s taking too much time?
//               </label>

//               <textarea
//                 name="timeTaking"
//                 value={formData.timeTaking}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Replying to customers, follow-ups, scheduling, reporting, admin work..."
//                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
//               />
//             </div>

//             <div className="border-b border-black p-6">
//               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                 Anything frustrating in your business?
//               </label>

//               <textarea
//                 name="frustrations"
//                 value={formData.frustrations}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Missed leads, no-shows, repetitive work, slow processes, too many tools..."
//                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
//               />
//             </div>

//             <div className="border-b border-black p-6">
//               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
//                 Anything else you&apos;d like me to know?
//               </label>

//               <textarea
//                 name="additionalInfo"
//                 value={formData.additionalInfo}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="You can keep this simple. Just explain your business in your own words."
//                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black text-white px-6 py-7 text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-50"
//             >
//               {loading ? "Sending..." : submitted ? "Sent ✓" : "Send Inquiry →"}
//             </button>
//             <div className="flex flex-col">
//               <a
//                 href="mailto:maryam@zamoog.com"
//                 className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
//               >
//                 OR Reach Out Via Email →
//               </a>

//               <a
//                 href="https://calendly.com/maryamnaveed/new-meeting"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
//               >
//                 OR Reach Out Via Meeting →
//               </a>
//             </div>
//           </form>
//         </div>
//       </main>
//     </>
//   );
// }
// // "use client";

// // import Header from "@/components/sections/Header";

// // export default function ContactPage() {
// //   return (
// //     <>
// //       <Header />

// //       <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
// //         <div className="max-w-6xl">
// //           <p className="text-sm uppercase tracking-[0.2em] text-black/50">
// //             Contact
// //           </p>
// //           <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
// //             Lets Solve
// //           </h1>
// //           <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-black/60">
// //             Tell me about your business, the niche, the problems you&apos;re
// //             facing, anything you think could save your time? or just leave it to
// //             us. Fill in whatever detail you think could help me understand. Will
// //             reach out to you within 4 hours.
// //           </p>

// //           <form className="mt-16 border-2 border-black">
// //             <div className="grid grid-cols-1 md:grid-cols-2">
// //               <div className="border-b  md:border-r border-black p-6">
// //                 <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                   Name
// //                 </label>

// //                 <input
// //                   type="text"
// //                   placeholder="John Doe"
// //                   className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
// //                 />
// //               </div>

// //               <div className="border-b border-black p-6">
// //                 <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                   Email
// //                 </label>

// //                 <input
// //                   type="email"
// //                   placeholder="john@company.com"
// //                   className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
// //                 />
// //               </div>
// //             </div>

// //             <div className="border-b border-black p-6">
// //               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                 What does your business do?
// //               </label>

// //               <input
// //                 type="text"
// //                 placeholder="Real Estate, Dental Clinic, Gym, Agency..."
// //                 className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
// //               />
// //             </div>

// //             <div className="border-b border-black p-6">
// //               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                 What&apos;s taking too much time?
// //               </label>

// //               <textarea
// //                 rows={4}
// //                 placeholder="Replying to customers, follow-ups, scheduling, reporting, admin work..."
// //                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
// //               />
// //             </div>

// //             <div className="border-b border-black p-6">
// //               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                 Anything frustrating in your business?
// //               </label>

// //               <textarea
// //                 rows={4}
// //                 placeholder="Missed leads, no-shows, repetitive work, slow processes, too many tools..."
// //                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
// //               />
// //             </div>

// //             <div className="border-b border-black p-6">
// //               <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
// //                 Anything else you&apos;d like me to know?
// //               </label>

// //               <textarea
// //                 rows={4}
// //                 placeholder="You can keep this simple. Just explain your business in your own words."
// //                 className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full bg-black text-white px-6 py-7 text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-200 hover:bg-white hover:text-black"
// //             >
// //               Send Inquiry →
// //             </button>
// //             <div className="flex flex-col">
// //               <a
// //                 href="mailto:maryam@zamoog.com"
// //                 className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
// //               >
// //                 OR Reach Out Via Email →
// //               </a>

// //               <a
// //                 href="https://calendly.com/maryamnaveed/new-meeting"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="w-full border border-black bg-black px-6 py-7 text-center text-2xl md:text-3xl font-black tracking-tight uppercase text-white transition-all duration-200 hover:bg-white hover:text-black"
// //               >
// //                 OR Reach Out Via Meeting →
// //               </a>
// //             </div>
// //           </form>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }


// // https://n8n.softxlogic.com/webhook/5b287c7b-5cb0-4608-9f3e-63b4d4daf922