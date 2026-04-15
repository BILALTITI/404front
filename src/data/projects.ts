import type { StaticImageData } from "next/image";

import cashtics from "../images/cashtics.com_en.png";
import Sooquk from "../images/sooquk.com_en.png";
import okal from "../images/okalforheroes.com.png";
import Lastonewin from "../images/last_one_win_1920x1440.png";
import LMS from "../images/LMS.png";
import CMS from "../images/clincal.png";
import Breshta from "../images/logo.png";

/** Remote thumbnails for additional case studies (abstract product / workspace imagery). */
const u = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?w=1200&q=80&auto=format&fit=crop`;

export type PortfolioProject = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  result: string;
  image: StaticImageData | string;
  imageAlt: string;
  link?: string;
  accent: string;
  year: string;
  tags: string[];
};

const n = (i: number) => String(i).padStart(2, "0");

export const PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    number: n(1),
    title: "Cashtics",
    subtitle: "Freelance marketplace",
    category: "Web application",
    description:
      "A task marketplace connecting people who want flexible work with businesses posting short jobs—profiles, escrow-style flows, and an operator dashboard for moderation.",
    result: "Growing user base with steady month‑over‑month task volume",
    image: cashtics,
    imageAlt:
      "Cashtics freelance marketplace web app interface preview for 4o4 portfolio",
    link: "https://cashtics.com/",
    accent: "#ff6b00",
    year: "2025",
    tags: ["Laravel", "Vue.js", "AWS"],
  },
  {
    id: 2,
    number: n(2),
    title: "Sooquk",
    subtitle: "Regional e‑commerce",
    category: "Marketplace",
    description:
      "A Jordan‑focused storefront for fashion and lifestyle sellers—catalog, checkout, and vendor tools with performance tuned for mobile shoppers.",
    result: "Live vendors onboarded with stable checkout in production",
    image: Sooquk,
    imageAlt:
      "Sooquk e‑commerce marketplace screenshot for Jordan retailers by 4o4",
    link: "https://sooquk.com/",
    accent: "#ff8c3a",
    year: "2025",
    tags: ["ASP.NET Core", "Next.js", "React Native"],
  },
  {
    id: 3,
    number: n(3),
    title: "Okal for Heroes",
    subtitle: "Kids barber booking",
    category: "Booking system",
    description:
      "Appointment booking and shop operations for a kids’ barber brand—reminders, coupons, ticketing, and a parent‑friendly flow on mobile.",
    result: "Strong early adoption from families in launch neighborhoods",
    image: okal,
    imageAlt: "Okal for Heroes barber booking web experience designed by 4o4",
    link: "https://okalforheroes.com/",
    accent: "#ffa556",
    year: "2026",
    tags: ["ASP.NET MVC", "UX design", "Hosting"],
  },
  {
    id: 4,
    number: n(4),
    title: "Breshta",
    subtitle: "Loyalty & rewards",
    category: "Gamification",
    description:
      "Deals, streaks, and notifications to bring shoppers back—daily rewards, birthdays, and lightweight gamification without brittle one‑off scripts.",
    result: "Engaged returning users through loyalty loops",
    image: Breshta,
    imageAlt: "Breshta loyalty app concept screen from 4o4 client work",
    accent: "#ff6b00",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 5,
    number: n(5),
    title: "LastOneWin",
    subtitle: "Live competition game",
    category: "Real‑time app",
    description:
      "A real‑time “last finger on screen” competition—rooms, sessions, and resilient sync so spikes during promos don’t ruin the experience.",
    result: "Handled live traffic peaks during campaign windows",
    image: Lastonewin,
    imageAlt:
      "LastOneWin real‑time mobile game promotional artwork in 4o4 portfolio",
    accent: "#ff8c3a",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 6,
    number: n(6),
    title: "ILern",
    subtitle: "Learning platform",
    category: "EdTech",
    description:
      "Courses, enrollments, instructor tools, and certificates—one place for admins, teachers, and students with sensible roles and audit‑friendly data.",
    result: "Class operations running on a single consolidated stack",
    image: LMS,
    imageAlt: "ILern LMS dashboard and course view built by 4o4",
    accent: "#ff6b00",
    year: "2025",
    tags: ["ASP.NET MVC", "SQL Server", "LMS"],
  },
  {
    id: 7,
    number: n(7),
    title: "Clinical desktop suite",
    subtitle: "Healthcare back office",
    category: "Desktop application",
    description:
      "Patient records, scheduling, and billing workflows for a clinic team—desktop‑first, keyboard‑friendly screens where accuracy matters more than animation.",
    result: "Day‑to‑day clinic operations on one reliable database",
    image: CMS,
    imageAlt: "Healthcare management desktop UI sample from 4o4 delivery work",
    accent: "#ff8c3a",
    year: "2025",
    tags: [".NET Framework", "SQL Server", "Healthcare"],
  },
];
