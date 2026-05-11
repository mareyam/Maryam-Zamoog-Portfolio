import { socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-black px-6 pb-10 pt-0 sm:px-10">
      <div className="border-t border-white/10 pt-8">
        <div className="flex flex-col gap-6 text-xs text-white/40 sm:flex-row sm:items-start sm:justify-between">
          {/* Phone + email */}
          <div className="flex flex-col gap-1">
            <span>+92 322 0140611</span>
            <span>maryam@zamoog.com</span>
          </div>

          {/* Credit */}
          <div className="flex flex-col gap-1">
            <span>Designed &amp; Developed</span>
            <span>by Zamoog</span>
          </div>

          {/* Socials */}
          <nav className="flex flex-col gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div>
            <span>All rights reserved.</span>
            <br />
            <span>ZAMOOG &copy;{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
