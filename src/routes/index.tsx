import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Zap, Phone, MessageCircle, Fan, Lightbulb, ToggleRight, Cable, ShieldCheck, Wrench, Plug, Search,
  Flame, AlertTriangle, Hand, Thermometer, Activity, Volume2, MapPin, Clock, BadgeCheck, Languages,
  IndianRupee, Menu, X, ChevronDown, ArrowUp, CheckCircle2, Home,
} from "lucide-react";
import hero from "@/assets/hero.jpg";

const PHONE = "9010367110";
const TEL = `tel:+91${PHONE}`;
const WA = `https://wa.me/91${PHONE}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krishna Electrician | Home Electrical Repairs in Nellore & Kovur" },
      { name: "description", content: "Home-visit electrician in Nellore & Kovur: fans, lights, switches, sockets, MCBs, wiring and fault finding. Call or WhatsApp 9010367110." },
      { property: "og:title", content: "Krishna Electrician | Nellore & Kovur" },
      { property: "og:description", content: "Home electrical repairs. Estimate before work. Call or WhatsApp to arrange a visit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Electrician", name: "Krishna Electrician",
        telephone: "+919010367110", areaServed: ["Nellore", "Kovur, Andhra Pradesh"],
        availableLanguage: ["English", "Telugu"],
      }),
    }],
  }),
  component: Index,
});

type L = "en" | "te";
const t = (l: L, en: string, te: string) => (l === "te" ? te : en);

const services = [
  { i: Fan, en: "Fan repair", te: "ఫ్యాన్ మరమ్మత్తు", d: "Slow, noisy, wobbling or not starting — ceiling, wall & exhaust fans." },
  { i: Lightbulb, en: "Lights & LED", te: "లైట్లు, LED", d: "Tube lights, LED panels, holders and complete lighting circuits." },
  { i: ToggleRight, en: "Switches & sockets", te: "స్విచ్‌లు, సాకెట్లు", d: "Loose, hot, sparking or dead switches, plugs and boards." },
  { i: Cable, en: "Household wiring", te: "ఇంటి వైరింగ్", d: "Faulty connections, extensions and new points for any room." },
  { i: ShieldCheck, en: "MCB & DB board", te: "MCB, డిస్ట్రిబ్యూషన్ బోర్డ్", d: "Frequent tripping, dead circuits, board upgrades and labelling." },
  { i: Wrench, en: "Fittings & replacements", te: "ఫిట్టింగ్స్, రీప్లేస్‌మెంట్", d: "Holders, plates, regulators, doorbells and small fittings." },
  { i: Plug, en: "Appliance points", te: "అప్లయన్స్ పాయింట్లు", d: "Safe power points for geysers, ACs, motors, pumps & kitchens." },
  { i: Search, en: "Fault finding", te: "లోపం కనుగొనడం", d: "Short circuits, burning smells or power loss in part of the house." },
];

const signs = [
  { i: Flame, s: "Sparks or burning smell" },
  { i: Activity, s: "MCB keeps tripping" },
  { i: Hand, s: "Tingling when touching metal" },
  { i: Thermometer, s: "Hot or discoloured switch/plug" },
  { i: Lightbulb, s: "Lights flicker or dim" },
  { i: Volume2, s: "Buzzing from the board" },
];

const faqs = [
  ["Which areas do you cover?", "Nellore and Kovur. Nearby localities depend on the address and the day's schedule, so please ask first."],
  ["How much will it cost?", "It depends on the fault, labour, parts and travel. There is no fixed price list — you'll get the visit charge and estimate before any work is approved."],
  ["Can I book a time online?", "There is no online calendar. Call or WhatsApp to agree a time; a visit is confirmed only after you speak with us directly."],
  ["Can I send a photo of the problem?", "Yes — attach it in WhatsApp, only if it's safe. Never approach exposed wires or open a panel to take a picture."],
  ["Do you bring parts?", "Common parts can usually be arranged. Tell us the problem first so the right items can be discussed with your estimate."],
  ["Does this website save my details?", "No. The form only prepares a WhatsApp message that you review and send yourself."],
];

function Index() {
  const [lang, setLang] = useState<L>("en");
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const nav = [
    ["services", "Services", "సేవలు"], ["safety", "Safety", "భద్రత"], ["process", "Process", "విధానం"],
    ["area", "Area", "ప్రాంతం"], ["faq", "FAQ", "ప్రశ్నలు"], ["contact", "Contact", "సంప్రదించండి"],
  ] as const;

  return (
    <div className="relative min-h-screen pb-24 md:pb-0">
      <div className="circuit-bg pointer-events-none fixed inset-0 -z-10" />

      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[72px] sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-primary glow-primary">
              <Zap className="size-5 fill-primary-foreground text-primary-foreground" />
            </span>
            <span className="font-display text-base font-extrabold uppercase tracking-wider sm:text-lg">
              Krishna <span className="text-primary">Electrician</span>
            </span>
          </a>
          <nav className="ml-auto hidden gap-7 text-sm font-semibold lg:flex">
            {nav.map(([id, en, te]) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">{t(lang, en, te)}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-6">
            <button onClick={() => setLang(lang === "en" ? "te" : "en")} className="flex h-11 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-sm font-semibold" aria-label="Switch language">
              <Languages className="size-4 text-accent" />{lang === "en" ? "తెలుగు" : "EN"}
            </button>
            <a href={TEL} className="hidden h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground glow-primary sm:flex">
              <Phone className="size-4" /> Call
            </a>
            <button onClick={() => setMenu(!menu)} className="grid size-11 place-items-center rounded-xl border border-border bg-card lg:hidden" aria-label="Menu" aria-expanded={menu}>
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
            {nav.map(([id, en, te]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block rounded-lg px-3 py-3 font-semibold hover:bg-card">{t(lang, en, te)}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-primary">
              <span className="size-2 rounded-full bg-primary animate-pulse-dot" />
              {t(lang, "Home visits · Nellore & Kovur", "ఇంటి సందర్శన · నెల్లూరు & కోవూరు")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t(lang, "Electrical trouble at home?", "ఇంట్లో కరెంట్ సమస్యా?")}
              <span className="mt-1 block text-volt animate-flicker">{t(lang, "Get it fixed right.", "సరిగ్గా సరిచేయిద్దాం.")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t(lang, "Fans, lights, switches, sockets, MCBs and wiring. Call or WhatsApp, agree the estimate — then the repair begins.", "ఫ్యాన్లు, లైట్లు, స్విచ్‌లు, MCB, వైరింగ్. కాల్ లేదా వాట్సాప్ చేయండి, అంచనా ఒప్పుకున్నాకే పని.")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={TEL} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-bold text-primary-foreground glow-primary transition-transform hover:-translate-y-0.5">
                <Phone className="size-5" /> Call {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-7 text-base font-bold text-whatsapp-foreground transition-transform hover:-translate-y-0.5">
                <MessageCircle className="size-5" /> WhatsApp us
              </a>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {[[Home, "Home visits"], [IndianRupee, "Estimate first"], [Languages, "Telugu & English"], [ShieldCheck, "Safety-first work"]].map(([I, s]) => {
                const Ic = I as typeof Home;
                return (
                  <li key={s as string} className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-muted-foreground">
                    <Ic className="size-4 text-accent" />{s as string}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border">
              <img src={hero} alt="Electrician repairing a home distribution board" width={1280} height={1280} className="aspect-square w-full object-cover sm:aspect-[4/3] md:aspect-[4/5]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-md">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/15"><Zap className="size-5 text-accent" /></span>
                  <div>
                    <p className="font-display font-bold">Power back on, safely.</p>
                    <p className="text-sm text-muted-foreground">Diagnosis · Estimate · Repair</p>
                  </div>
                </div>
              </div>
            </div>
            <svg className="pointer-events-none absolute -left-10 top-10 hidden h-40 w-20 text-primary md:block" viewBox="0 0 80 160" fill="none">
              <path d="M70 0 V60 H10 V160" stroke="currentColor" strokeWidth="2" className="animate-current" />
            </svg>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-border bg-card/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
            {[["8+", "Repair services"], ["2", "Towns served"], ["0", "Work before approval"], ["2", "Languages spoken"]].map(([n, l]) => (
              <div key={l} className="py-7 text-center">
                <p className="font-display text-3xl font-extrabold text-volt sm:text-4xl">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <Section id="services" tag={t(lang, "Services", "సేవలు")} title={t(lang, "Everyday electrical fixes, done at home", "ఇంటి వద్దే రోజువారీ ఎలక్ట్రికల్ మరమ్మత్తులు")} lead="Pick the problem closest to yours. Not sure? Choose “Fault finding” and describe the symptoms.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ i: I, en, te, d }) => (
              <a key={en} href={`${WA}?text=${encodeURIComponent(`Hello Krishna Electrician, I need help with: ${en}`)}`} target="_blank" rel="noreferrer" className="card-volt group flex flex-col p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <I className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t(lang, en, te)}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
                <span className="mt-5 text-sm font-semibold text-accent">Ask about this →</span>
              </a>
            ))}
          </div>
        </Section>

        {/* Why */}
        <Section id="why" tag="Why choose us" title={t(lang, "Honest, careful, local", "నిజాయితీ, జాగ్రత్త, స్థానికం")}>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [IndianRupee, "Estimate before work", "You know the visit charge and estimate before anything starts. No surprise bills."],
              [ShieldCheck, "Safety-first approach", "Power isolated, connections checked and the area left safe before we leave."],
              [Clock, "Clear communication", "Timings agreed directly by phone or WhatsApp — in Telugu or English."],
            ].map(([I, h, d]) => {
              const Ic = I as typeof Home;
              return (
                <div key={h as string} className="card-volt p-7">
                  <Ic className="size-8 text-accent" />
                  <h3 className="mt-4 text-xl font-bold">{h as string}</h3>
                  <p className="mt-2 text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Safety */}
        <Section id="safety" tag={t(lang, "Safety first", "భద్రత ముందు")} title={t(lang, "Don't ignore these warning signs", "ఈ సంకేతాలను నిర్లక్ష్యం చేయవద్దు")} lead="If you notice any of these, stop using that point and get it checked.">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {signs.map(({ i: I, s }) => (
              <div key={s} className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4">
                <I className="size-5 shrink-0 text-primary" />
                <span className="text-sm font-semibold sm:text-base">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-destructive/40 bg-destructive/10 p-6 sm:flex-row sm:items-center">
            <AlertTriangle className="size-9 shrink-0 text-destructive" />
            <div className="flex-1">
              <h3 className="text-lg font-bold">Fire, smoke or contact with live wires?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Move away, switch off at the mains only if safe, and call 112 (fire: 101). This is an enquiry service, not emergency dispatch.</p>
            </div>
            <a href="tel:112" className="flex h-12 items-center justify-center rounded-xl bg-destructive px-6 font-bold text-destructive-foreground">Call 112</a>
          </div>
        </Section>

        {/* Process */}
        <Section id="process" tag={t(lang, "How it works", "ఎలా పనిచేస్తుంది")} title={t(lang, "Three steps, no guesswork", "మూడు సులభమైన దశలు")}>
          <ol className="relative grid gap-4 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-primary via-accent to-primary md:block" />
            {[["Call or message", "Tell us the problem and your locality."], ["Confirm the visit", "Agree the time, visit charge and estimate."], ["Repair after you agree", "Work starts only once you're happy with the plan."]].map(([h, d], n) => (
              <li key={h} className="card-volt relative p-7">
                <span className="relative grid size-12 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-primary-foreground glow-primary">{n + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{h}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Area */}
        <Section id="area" tag="Service area" title={t(lang, "Nellore & Kovur", "నెల్లూరు & కోవూరు")} lead="Coverage depends on your exact locality and the schedule. Ask before assuming.">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-3">
              {["Nellore", "Kovur"].map((c) => (
                <div key={c} className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5">
                  <MapPin className="size-6 text-primary" />
                  <div><p className="font-display text-lg font-bold">{c}</p><p className="text-sm text-muted-foreground">Andhra Pradesh</p></div>
                  <BadgeCheck className="ml-auto size-5 text-accent" />
                </div>
              ))}
              <a href={`${WA}?text=${encodeURIComponent("Hello, do you cover my area? My locality is: ")}`} target="_blank" rel="noreferrer" className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl border border-accent/50 bg-accent/10 font-semibold text-accent">
                Ask about your area
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe title="Map of Nellore and Kovur" src="https://www.google.com/maps?q=Kovur,Nellore,Andhra+Pradesh&z=11&output=embed" className="h-72 w-full md:h-full md:min-h-80" loading="lazy" />
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" tag="FAQ" title={t(lang, "Questions before you book?", "బుక్ చేసే ముందు ప్రశ్నలా?")}>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl border border-border bg-card/60 open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-5 font-semibold">
                  {q}<ChevronDown className="ml-auto size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" tag="Contact" title={t(lang, "Need an electrician? Let's talk.", "ఎలక్ట్రీషియన్ కావాలా? మాట్లాడండి.")} lead="Share the repair you need and your locality. We'll confirm whether a home visit can be arranged.">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col gap-4">
              <a href={TEL} className="card-volt flex items-center gap-4 p-6">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground glow-primary"><Phone className="size-6" /></span>
                <div><p className="text-sm text-muted-foreground">Call directly</p><p className="font-display text-2xl font-bold">{PHONE}</p></div>
              </a>
              <a href={WA} target="_blank" rel="noreferrer" className="card-volt flex items-center gap-4 p-6">
                <span className="grid size-14 place-items-center rounded-2xl bg-whatsapp text-whatsapp-foreground"><MessageCircle className="size-6" /></span>
                <div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-display text-2xl font-bold">Send a message</p></div>
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4 text-accent" /> Call to check current availability and visit timings.</p>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 font-display font-extrabold uppercase tracking-wider"><Zap className="size-4 fill-primary text-primary" /> Krishna Electrician</p>
            <p className="mt-1 text-sm text-muted-foreground">Home electrical repairs · Nellore & Kovur, Andhra Pradesh</p>
            <p className="mt-1 text-xs text-muted-foreground">Never touch exposed wires or attempt live electrical work.</p>
          </div>
          <a href="#top" className="flex items-center gap-1 text-sm font-semibold text-accent md:ml-auto"><ArrowUp className="size-4" /> Back to top</a>
        </div>
        <p className="pb-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Krishna Electrician</p>
      </footer>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <a href={TEL} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground"><Phone className="size-5" /> Call</a>
        <a href={WA} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-whatsapp-foreground"><MessageCircle className="size-5" /> WhatsApp</a>
      </div>
    </div>
  );
}

function Section({ id, tag, title, lead, children }: { id: string; tag: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">{tag}</span>
      <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {lead && <p className="mt-4 max-w-2xl text-muted-foreground">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hello Krishna Electrician,\nName: ${f.get("name") || "-"}\nService: ${f.get("service")}\nArea: ${f.get("area")}\nProblem: ${f.get("problem")}`;
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };
  const field = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-ring/40";
  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your name (optional)<input name="name" className={`${field} mt-2`} autoComplete="name" /></label>
        <label className="text-sm font-semibold">Area or landmark<input name="area" required className={`${field} mt-2`} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Service needed
          <select name="service" className={`${field} mt-2`}>
            {services.map((s) => <option key={s.en}>{s.en}</option>)}
            <option>Other electrical issue</option>
          </select>
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Describe the problem<textarea name="problem" required rows={4} className={`${field} mt-2 resize-y`} /></label>
      </div>
      <button className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp text-base font-bold text-whatsapp-foreground transition-transform hover:-translate-y-0.5">
        <MessageCircle className="size-5" /> Send on WhatsApp
      </button>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        {sent ? <><CheckCircle2 className="size-4 text-whatsapp" /> WhatsApp opened — review and press send.</> : "Nothing is stored on this site. Review the message in WhatsApp before sending."}
      </p>
    </form>
  );
}
