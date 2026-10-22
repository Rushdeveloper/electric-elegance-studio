import { useEffect, useState, type FormEvent } from "react";
import {
  Zap, Phone, MessageCircle, Fan, Lightbulb, ToggleRight, Cable, ShieldCheck, Wrench, Plug, Search,
  Flame, AlertTriangle, Hand, Thermometer, Activity, Volume2, MapPin, Clock, Languages,
  IndianRupee, Menu, X, ChevronDown, ArrowUp, CheckCircle2, Home, ArrowRight, Mouse, Star,
  Users, Award, ClipboardCheck, HardHat, BadgeIndianRupee, Play,
} from "lucide-react";
import { HeroScene } from "./HeroScene";
import { Reveal } from "./circuit";
import heroImg from "@/assets/hero-3d.jpg";
import svcResidential from "@/assets/svc-residential.jpg";
import svcCommercial from "@/assets/svc-commercial.jpg";
import svcIndustrial from "@/assets/svc-industrial.jpg";
import svcSolar from "@/assets/svc-solar.jpg";

const PHONE = "9010367110";
const TEL = `tel:+91${PHONE}`;
const WA = `https://wa.me/91${PHONE}`;

type L = "en" | "te";
const t = (l: L, en: string, te: string) => (l === "te" ? te : en);

const photoServices = [
  { img: svcResidential, i: Lightbulb, en: "Residential Electrical Services", te: "గృహ ఎలక్ట్రికల్ సేవలు", d: "Safe and modern electrical solutions for your home." },
  { img: svcCommercial, i: ClipboardCheck, en: "Commercial Electrical Services", te: "వాణిజ్య ఎలక్ట్రికల్ సేవలు", d: "Reliable electrical systems for offices and businesses." },
  { img: svcIndustrial, i: Zap, en: "Industrial Electrical Services", te: "పారిశ్రామిక ఎలక్ట్రికల్ సేవలు", d: "High-quality solutions for industrial needs." },
  { img: svcSolar, i: Sun, en: "Solar & Energy Solutions", te: "సోలార్ & ఎనర్జీ సొల్యూషన్స్", d: "Sustainable and efficient energy systems." },
];

// Sun icon isn't in the import list above; map it here to keep the data table tidy.
import { Sun } from "lucide-react";

const repairServices = [
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

const stats = [
  { i: Users, n: "500+", l: "Happy Customers" },
  { i: Award, n: "5+", l: "Years Experience" },
  { i: Star, n: "4.9", l: "Customer Rating" },
  { i: ClipboardCheck, n: "50+", l: "Projects Completed" },
];

const heroFeatures = [
  { i: ShieldCheck, en: "Safe Installation", te: "సురక్షిత ఇన్‌స్టాలేషన్" },
  { i: HardHat, en: "Expert Technicians", te: "నిపుణ టెక్నీషియన్లు" },
  { i: Zap, en: "24/7 Support", te: "24/7 సపోర్ట్" },
  { i: BadgeIndianRupee, en: "Affordable Pricing", te: "తక్కువ ధరలు" },
];

export default function HomePage() {
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
    ["top", "Home", "హోమ్"], ["about", "About", "గురించి"], ["services", "Services", "సేవలు"],
    ["why", "Why Us", "ఎందుకు మేమే"], ["testimonials", "Testimonials", "అభిప్రాయాలు"], ["contact", "Contact", "సంప్రదించండి"],
  ] as const;

  return (
    <div className="relative min-h-screen pb-24 md:pb-0">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[76px] sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative grid size-10 place-items-center rounded-xl bg-primary glow-primary">
              <Zap className="size-5 fill-primary-foreground text-primary-foreground" />
            </span>
            <span className="font-display text-sm font-extrabold uppercase leading-tight tracking-wider sm:text-base">
              Krishna<br className="sm:hidden" /> <span className="text-primary">Electrician</span>
            </span>
          </a>
          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-1.5 backdrop-blur-md lg:flex">
            {nav.map(([id, en, te], idx) => (
              <a key={id} href={`#${id}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${idx === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"}`}>
                {t(lang, en, te)}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button onClick={() => setLang(lang === "en" ? "te" : "en")} className="flex h-11 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-semibold" aria-label="Switch language">
              <Languages className="size-4 text-accent" />{lang === "en" ? "తెలుగు" : "EN"}
            </button>
            <a href={TEL} className="hidden h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-bold md:flex">
              <Phone className="size-4 text-primary" /> +91 {PHONE}
            </a>
            <a href="#contact" className="hidden h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground glow-primary transition-transform hover:-translate-y-0.5 sm:flex">
              {t(lang, "Get a Free Quote", "ఉచిత కోట్ పొందండి")} <ArrowRight className="size-4" />
            </a>
            <button onClick={() => setMenu(!menu)} className="grid size-11 place-items-center rounded-full border border-border bg-card lg:hidden" aria-label="Menu" aria-expanded={menu}>
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
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden">
          <img src={heroImg} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
          {/* Live 3D cable scene layered over the photo */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
            <HeroScene />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-32 sm:px-6 md:pb-36">
            <div className="max-w-2xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-primary backdrop-blur-sm">
                  {t(lang, "Safe · Reliable · Professional", "సురక్షితం · నమ్మదగినది · ప్రొఫెషనల్")}
                </span>
              </Reveal>
              <Reveal i={1}>
                <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                  {t(lang, "POWERING", "పవరింగ్")}
                  <span className="block text-volt animate-flicker">{t(lang, "A BRIGHTER", "మరింత ప్రకాశవంతమైన")}</span>
                  {t(lang, "TOMORROW", "రేపు")}
                </h1>
              </Reveal>
              <Reveal i={2}>
                <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
                  {t(lang, "Expert electrical solutions for homes, offices and industries. Safe, reliable and affordable services by certified electricians.", "ఇళ్లు, ఆఫీసులు మరియు పరిశ్రమల కోసం నిపుణుల ఎలక్ట్రికల్ సొల్యూషన్లు. సర్టిఫైడ్ ఎలక్ట్రీషియన్ల సురక్షిత, నమ్మదగిన మరియు సరైన ధరల సేవలు.")}
                </p>
              </Reveal>
              <Reveal i={3}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#contact" className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground glow-primary transition-transform hover:-translate-y-0.5">
                    <Wrench className="size-5" /> {t(lang, "Get a Free Quote", "ఉచిత కోట్ పొందండి")} <ArrowRight className="size-4" />
                  </a>
                  <a href={WA} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-8 text-base font-bold backdrop-blur-md transition-transform hover:-translate-y-0.5">
                    <Play className="size-5 fill-primary text-primary" /> WhatsApp us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right-side feature list (desktop, like the reference) */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
            {heroFeatures.map(({ i: I, en, te }) => (
              <a key={en} href="#why" className="group flex w-56 items-center gap-3 rounded-2xl border border-border bg-card/50 p-3.5 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card/80">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <I className="size-5" />
                </span>
                <span className="text-sm font-bold leading-tight">{t(lang, en, te)}</span>
                <ChevronDown className="ml-auto size-4 -rotate-90 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>

          {/* Scroll down */}
          <a href="#stats" className="absolute bottom-24 right-6 hidden items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-md md:flex">
            <Mouse className="size-4 animate-bounce text-primary" /> Scroll Down
          </a>

          {/* Stats bar overlapping the hero bottom */}
          <div id="stats" className="absolute inset-x-4 bottom-6 sm:inset-x-6">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-5 rounded-3xl border border-border bg-card/70 px-6 py-6 backdrop-blur-xl md:grid-cols-4">
              {stats.map(({ i: I, n, l }) => (
                <div key={l} className="flex items-center justify-center gap-3">
                  <I className="size-8 shrink-0 text-primary" />
                  <div>
                    <p className="font-display text-2xl font-extrabold sm:text-3xl">{n}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <Section id="services" tag={t(lang, "Our Services", "మా సేవలు")} title={<>Complete <span className="text-volt">Electrical Solutions</span></>} lead="From small repairs to complete installations, we provide reliable and professional electrical services for all your needs.">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {photoServices.map(({ img, i: I, en, te, d }, idx) => (
              <Reveal key={en} i={idx}>
                <a href={`${WA}?text=${encodeURIComponent(`Hello Krishna Electrician, I need help with: ${en}`)}`} target="_blank" rel="noreferrer" className="card-volt group block overflow-hidden !rounded-3xl">
                  <div className="relative h-44 overflow-hidden">
                    <img src={img} alt={en} width={944} height={704} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-5">
                    <I className="size-6 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug">{t(lang, en, te)}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                    <span className="mt-4 grid size-9 place-items-center rounded-full border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repairServices.map(({ i: I, en, te, d }, idx) => (
              <Reveal key={en} i={idx}>
                <a href={`${WA}?text=${encodeURIComponent(`Hello Krishna Electrician, I need help with: ${en}`)}`} target="_blank" rel="noreferrer" className="card-volt group flex h-full flex-col p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <I className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{t(lang, en, te)}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
                  <span className="mt-5 text-sm font-semibold text-accent">Ask about this →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===== About ===== */}
        <Section id="about" tag={t(lang, "About Us", "మా గురించి")} title={t(lang, "Your local electrician in Nellore & Kovur", "నెల్లూరు & కోవూరులో మీ స్థానిక ఎలక్ట్రీషియన్")}>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border">
                <img src={heroImg} alt="Electric cables being joined with a crimp connector" width={1920} height={1088} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-md">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/15"><Zap className="size-5 text-accent" /></span>
                  <div>
                    <p className="font-display font-bold">Power back on, safely.</p>
                    <p className="text-sm text-muted-foreground">Diagnosis · Estimate · Repair</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal i={1}>
              <p className="text-lg text-muted-foreground">
                {t(lang, "We handle everyday electrical problems at your home or workplace — fans, lights, switches, sockets, MCBs and wiring. You call or message, we agree the visit charge and estimate first, and only then the work begins.", "మీ ఇంట్లో లేదా పనిచోట రోజువారీ ఎలక్ట్రికల్ సమస్యలను మేము చూసుకుంటాం — ఫ్యాన్లు, లైట్లు, స్విచ్‌లు, సాకెట్లు, MCBలు మరియు వైరింగ్. మీరు కాల్ లేదా మెసేజ్ చేస్తారు, ముందుగా విజిట్ ఛార్జీ మరియు అంచనా ఒప్పుకుంటాం, అప్పుడే పని మొదలవుతుంది.")}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[[Home, "Home visits"], [IndianRupee, "Estimate first"], [Languages, "Telugu & English"], [ShieldCheck, "Safety-first work"]].map(([I, s]) => {
                  const Ic = I as typeof Home;
                  return (
                    <li key={s as string} className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm font-semibold">
                      <Ic className="size-5 text-primary" />{s as string}
                    </li>
                  );
                })}
              </ul>
              <a href={TEL} className="mt-7 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground glow-primary transition-transform hover:-translate-y-0.5">
                <Phone className="size-5" /> Call {PHONE}
              </a>
            </Reveal>
          </div>
        </Section>

        {/* ===== Why Us ===== */}
        <Section id="why" tag={t(lang, "Why Choose Us", "ఎందుకు మమ్మల్ని")} title={t(lang, "Honest, careful, local", "నిజాయితీ, జాగ్రత్త, స్థానికం")}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              [ShieldCheck, "Safe Installation", "Power isolated, connections checked and the area left safe before we leave."],
              [HardHat, "Expert Technicians", "Experienced with home, shop and small-industry electrical systems."],
              [Zap, "24/7 Support", "Call or WhatsApp any time — we'll tell you honestly when a visit can be arranged."],
              [BadgeIndianRupee, "Affordable Pricing", "You know the visit charge and estimate before anything starts. No surprise bills."],
            ].map(([I, h, d], idx) => {
              const Ic = I as typeof Home;
              return (
                <Reveal key={h as string} i={idx}>
                  <div className="card-volt h-full p-7">
                    <span className="grid size-13 place-items-center rounded-2xl bg-primary/12 p-3 text-primary"><Ic className="size-7" /></span>
                    <h3 className="mt-4 text-xl font-bold">{h as string}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ===== Safety ===== */}
        <Section id="safety" tag={t(lang, "Safety First", "భద్రత ముందు")} title={t(lang, "Don't ignore these warning signs", "ఈ సంకేతాలను నిర్లక్ష్యం చేయవద్దు")} lead="If you notice any of these, stop using that point and get it checked.">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {signs.map(({ i: I, s }, idx) => (
              <Reveal key={s} i={idx}>
                <div className="flex h-full items-center gap-3 rounded-2xl border border-border bg-card/60 p-4">
                  <I className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-semibold sm:text-base">{s}</span>
                </div>
              </Reveal>
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

        {/* ===== Testimonials ===== */}
        <Section id="testimonials" tag={t(lang, "Testimonials", "అభిప్రాయాలు")} title={t(lang, "What customers say", "కస్టమర్ల అభిప్రాయాలు")}>
          <div className="card-volt mx-auto max-w-2xl p-8 text-center">
            <Star className="mx-auto size-8 fill-primary text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">
              {t(lang, "We don't publish made-up reviews. After your repair, send us your honest feedback on WhatsApp and it can appear here.", "మేము కల్పిత రివ్యూలను ప్రచురించము. మీ మరమ్మత్తు తర్వాత, వాట్సాప్‌లో మీ నిజాయితీ అభిప్రాయాన్ని పంపండి — అది ఇక్కడ కనిపిస్తుంది.")}
            </p>
            <a href={`${WA}?text=${encodeURIComponent("Hello Krishna Electrician, here is my feedback: ")}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 font-semibold text-primary">
              <MessageCircle className="size-4" /> {t(lang, "Share your feedback", "మీ అభిప్రాయం పంచుకోండి")}
            </a>
          </div>
        </Section>

        {/* ===== Area ===== */}
        <Section id="area" tag={t(lang, "Service Area", "సేవా ప్రాంతం")} title={t(lang, "Nellore & Kovur", "నెల్లూరు & కోవూరు")} lead="Coverage depends on your exact locality and the schedule. Ask before assuming.">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-3">
              {["Nellore", "Kovur"].map((c) => (
                <div key={c} className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5">
                  <MapPin className="size-6 text-primary" />
                  <div><p className="font-display text-lg font-bold">{c}</p><p className="text-sm text-muted-foreground">Andhra Pradesh</p></div>
                  <CheckCircle2 className="ml-auto size-5 text-accent" />
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

        {/* ===== FAQ ===== */}
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

        {/* ===== Contact ===== */}
        <Section id="contact" tag={t(lang, "Contact", "సంప్రదించండి")} title={t(lang, "Need an electrician? Let's talk.", "ఎలక్ట్రీషియన్ కావాలా? మాట్లాడండి.")} lead="Share the repair you need and your locality. We'll confirm whether a home visit can be arranged.">
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
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 font-display font-extrabold uppercase tracking-wider"><Zap className="size-4 fill-primary text-primary" /> Krishna Electrician</p>
            <p className="mt-1 text-sm text-muted-foreground">Electrical services · Nellore & Kovur, Andhra Pradesh</p>
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

function Section({ id, tag, title, lead, children }: { id: string; tag: string; title: React.ReactNode; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
      <Reveal>
        <span className="font-display text-xs font-bold uppercase tracking-[0.28em] text-primary">{tag}</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-muted-foreground">{lead}</p>}
      </Reveal>
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
            {photoServices.map((s) => <option key={s.en}>{s.en}</option>)}
            {repairServices.map((s) => <option key={s.en}>{s.en}</option>)}
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
