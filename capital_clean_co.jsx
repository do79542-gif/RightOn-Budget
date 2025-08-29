import { useState, useMemo } from "react";

// One‑page commercial cleaning website
// TailwindCSS utility classes are available in this preview.
// Replace the placeholders (company, phone, email) with your real details.

export default function Website() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  // Simple nav items
  const nav = useMemo(
    () => [
      { href: "#services", label: "Services" },
      { href: "#industries", label: "Industries" },
      { href: "#pricing", label: "Pricing" },
      { href: "#about", label: "About" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  const company = {
    name: "Capital Clean Co.",
    tagline: "Reliable, insured, and spotless — every time.",
    phone: "(613) 555‑0123",
    email: "hello@capitalcleanco.ca",
    region: "Ottawa–Gatineau",
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 scroll-smooth">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold">CC</div>
              <div className="font-semibold tracking-tight">{company.name}</div>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm font-medium hover:text-emerald-600">
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Get a quote
              </a>
            </nav>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200">
            <div className="px-4 py-3 flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                  {n.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Get a quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">
                Serving {company.region}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Commercial cleaning you can set & forget
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                {company.tagline} We specialize in offices, clinics, retail spaces, and industrial sites with flexible schedules: nightly, weekly, or on‑demand.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="rounded-2xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700">
                  Get a fast quote
                </a>
                <a href="#services" className="rounded-2xl border px-5 py-3 font-semibold hover:bg-slate-50">
                  Explore services
                </a>
              </div>
              <div className="mt-6 text-sm text-slate-500">
                Fully insured • WHMIS compliant • Background‑checked staff • Satisfaction guaranteed
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl border shadow-sm overflow-hidden">
                  {/* Placeholder image */}
                  <svg viewBox="0 0 400 300" className="h-full w-full">
                    <defs>
                      <linearGradient id="grad" x1="0" x2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="300" fill="url(#grad)" />
                    <g fill="#ffffff" fillOpacity="0.9">
                      <circle cx="60" cy="60" r="10" />
                      <circle cx="100" cy="140" r="6" />
                      <circle cx="250" cy="80" r="8" />
                      <circle cx="320" cy="200" r="10" />
                    </g>
                    <text x="24" y="270" fill="#ffffff" fontSize="22" fontWeight="700">Professional • Dependable • Thorough</text>
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Call us at <a className="font-semibold text-slate-900" href={`tel:${company.phone}`}>{company.phone}</a> or email <a className="font-semibold text-emerald-700" href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / social proof */}
      <section className="py-10 border-y bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold">Trusted by local businesses</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-80">
            {["Clinic", "Office", "Retail", "Warehouse", "School", "Condo"].map((t) => (
              <div key={t} className="px-4 py-3 rounded-xl bg-white border shadow-sm text-sm font-semibold">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Services</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">Custom scopes and checklists tailored to your site, with clear SLAs and QA inspections.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Office Cleaning",
                desc: "Nightly/daytime service, waste removal, restrooms, kitchens, desks, glass, floors.",
              },
              {
                title: "Floor Care",
                desc: "Machine scrub, strip & wax (VCT), burnish, auto‑scrub, carpet extraction.",
              },
              {
                title: "Disinfection",
                desc: "High‑touch disinfection, electrostatic spraying, infection‑control protocols.",
              },
              { title: "Post‑Construction", desc: "Debris removal, detailed dusting, interior glass, first‑impression ready." },
              { title: "Move‑In/Out", desc: "Deep clean for turnovers, kitchens, appliances, washrooms, interiors." },
              { title: "Day Porter", desc: "On‑site attendant for restocking, spills, lobby, washroom upkeep." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border shadow-sm p-6 bg-white">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</div>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-20 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold tracking-tight">Industries We Serve</h2>
              <p className="mt-3 text-slate-600 max-w-2xl">From small offices to multi‑site portfolios, we build consistent, audit‑ready programs.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Medical & Dental Clinics", "Corporate Offices", "Retail & Showrooms", "Industrial & Warehouse", "Education & Daycare", "Residential/Condo Common Areas"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border shadow-sm p-6 bg-white">
                <h3 className="text-xl font-bold">Why choose {company.name}?</h3>
                <ul className="mt-4 space-y-3 text-slate-700">
                  <li>• Uniformed, background‑checked staff</li>
                  <li>• Supervisor inspections & digital checklists</li>
                  <li>• Eco‑friendly products available on request</li>
                  <li>• Clear SLAs and responsive communication</li>
                  <li>• Competitive, transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Simple Pricing</h2>
              <p className="mt-2 text-slate-600">Hourly, per‑visit, or monthly retainer. Most clients choose a fixed monthly plan.</p>
            </div>
            <a href="#contact" className="rounded-2xl border px-4 py-2 font-semibold hover:bg-slate-50">Need custom scope?</a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$399/mo",
                note: "Up to 3,000 sq ft",
                features: ["2x/week service", "Restrooms & kitchens", "Floors & waste", "Basic supplies"],
                cta: "Choose Starter",
              },
              {
                name: "Standard",
                price: "$699/mo",
                note: "Up to 6,000 sq ft",
                features: ["Nightly service (M–F)", "QA inspections", "Glass & touchpoints", "All supplies included"],
                cta: "Choose Standard",
                highlight: true,
              },
              {
                name: "Premium",
                price: "Custom",
                note: "Multi‑site / special",
                features: ["Day porter", "Floor care program", "Disinfection add‑ons", "Priority support"],
                cta: "Get custom quote",
              },
            ].map((p) => (
              <div
                key={p.name}
                className={
                  "rounded-2xl border shadow-sm p-6 bg-white flex flex-col" +
                  (p.highlight ? " ring-2 ring-emerald-500" : "")
                }
              >
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
                <div className="text-sm text-slate-500">{p.note}</div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#contact" className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 w-full">
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold tracking-tight">About Us</h2>
              <p className="mt-3 text-slate-600">We’re a locally owned cleaning company serving {company.region}. Our mission is to keep your spaces immaculate so you can focus on your business. We invest in training, supervision, and technology to deliver consistent results you can measure.</p>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                {[{k: "Years", v: "7+"}, {k: "Sites", v: "80+"}, {k: "Retention", v: "96%"}].map((stat) => (
                  <div key={stat.k} className="rounded-2xl border shadow-sm p-4 bg-white text-center">
                    <div className="text-2xl font-extrabold">{stat.v}</div>
                    <div className="text-xs text-slate-500">{stat.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border shadow-sm p-6 bg-white">
                <h3 className="text-xl font-bold">Testimonials</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { q: "Impeccable service. Our clinic has never looked better.", a: "— Dr. Singh, Family Clinic" },
                    { q: "Responsive team and consistent results.", a: "— Maya, Office Manager" },
                  ].map((t, i) => (
                    <blockquote key={i} className="rounded-xl border p-4 bg-slate-50 text-sm">
                      <p className="text-slate-700">“{t.q}”</p>
                      <footer className="mt-2 text-slate-500">{t.a}</footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {[
              {
                q: "Are you insured and bonded?",
                a: "Yes. We carry commercial liability insurance and our staff are bonded. Certificates available on request.",
              },
              {
                q: "Do you bring your own supplies and equipment?",
                a: "Yes. We provide all standard supplies and equipment. Eco‑friendly options are available.",
              },
              {
                q: "How do you ensure quality?",
                a: "We use site‑specific checklists, supervisor inspections, and track issues through a simple ticketing system.",
              },
              {
                q: "What areas do you serve?",
                a: `Primarily ${company.region}, with special arrangements possible for surrounding areas.`,
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border bg-white">
                <button
                  onClick={() => setFaqOpen((v) => (v === idx ? null : idx))}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold">{item.q}</span>
                  <svg className={`h-5 w-5 transition-transform ${faqOpen === idx ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-5 text-slate-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold tracking-tight">Get Your Free Quote</h2>
              <p className="mt-3 text-slate-600">Tell us about your space and schedule. We’ll respond within one business day.</p>
              <form className="mt-8 grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className="rounded-2xl border px-4 py-3" placeholder="Full name" required />
                  <input className="rounded-2xl border px-4 py-3" placeholder="Company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="email" className="rounded-2xl border px-4 py-3" placeholder="Email" required />
                  <input type="tel" className="rounded-2xl border px-4 py-3" placeholder="Phone" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className="rounded-2xl border px-4 py-3" placeholder="City / Neighbourhood" />
                  <select className="rounded-2xl border px-4 py-3">
                    <option>Schedule preference</option>
                    <option>Nightly (M–F)</option>
                    <option>3x per week</option>
                    <option>Weekly</option>
                    <option>One‑time / Deep clean</option>
                  </select>
                </div>
                <textarea className="rounded-2xl border px-4 py-3" rows={4} placeholder="Square footage, floors, special requirements…" />
                <button type="button" className="rounded-2xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 w-full sm:w-auto">
                  Submit request
                </button>
                <p className="text-xs text-slate-500">Or email us directly: <a className="font-semibold text-emerald-700" href={`mailto:${company.email}`}>{company.email}</a></p>
              </form>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border shadow-sm p-6 bg-white">
                <h3 className="text-xl font-bold">Contact</h3>
                <div className="mt-3 text-slate-700">
                  <p><span className="font-semibold">Phone:</span> <a href={`tel:${company.phone}`}>{company.phone}</a></p>
                  <p><span className="font-semibold">Email:</span> <a href={`mailto:${company.email}`}>{company.email}</a></p>
                  <p><span className="font-semibold">Service area:</span> {company.region}</p>
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 border p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Janitorial Checklist (sample)</p>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                    {[
                      "Dust & high‑touch disinfection",
                      "Waste & recycling removal",
                      "Kitchen & breakroom clean",
                      "Restroom sanitize & restock",
                      "Glass & mirrors",
                      "Vacuum & mop floors",
                    ].map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">CC</div>
              <div className="text-sm">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-4">
              <a href="#services" className="hover:text-emerald-700">Services</a>
              <a href="#about" className="hover:text-emerald-700">About</a>
              <a href="#contact" className="hover:text-emerald-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
