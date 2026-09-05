import type { StaticImageData } from "next/image";

import cashtics from "../images/cashtics-freelance-marketplace-watad-solutions.png";
import Sooquk from "../images/sooquk-ecommerce-marketplace-watad-solutions.png";
import okal from "../images/okal-for-heroes-booking-app-watad-solutions.png";
import Lastonewin from "../images/lastonewin-realtime-game-app-watad-solutions.png";
import LMS from "../images/ilern-learning-platform-watad-solutions.png";
import CMS from "../images/clinical-desktop-suite-watad-solutions.png";
import Breshta from "../images/breshta-loyalty-app-watad-solutions.png";

/** Non-translatable portfolio metadata; copy lives in messages/{locale}.json under projects.items.<key> */
export type PortfolioProjectMeta = {
  id: number;
  /** Key for messages: projects.items.<key> */
  messageKey: string;
  number: string;
  image: StaticImageData | string;
  link?: string;
  accent: string;
  year: string;
  tags: string[];
};

const n = (i: number) => String(i).padStart(2, "0");

export const PROJECT_META: PortfolioProjectMeta[] = [
  {
    id: 1,
    messageKey: "cashtics",
    number: n(1),
    image: cashtics,
    link: "https://cashtics.com/",
    accent: "#22B8DE",
    year: "2025",
    tags: ["Laravel", "Vue.js", "AWS"],
  },
  {
    id: 2,
    messageKey: "sooquk",
    number: n(2),
    image: Sooquk,
    link: "https://sooquk.com/",
    accent: "#3ED2F0",
    year: "2025",
    tags: ["ASP.NET Core", "Next.js", "React Native"],
  },
  {
    id: 3,
    messageKey: "okal",
    number: n(3),
    image: okal,
    link: "https://okalforheroes.com/",
    accent: "#1B6491",
    year: "2026",
    tags: ["ASP.NET MVC", "UX design", "Hosting"],
  },
  {
    id: 4,
    messageKey: "breshta",
    number: n(4),
    image: Breshta,
    accent: "#22B8DE",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 5,
    messageKey: "lastonewin",
    number: n(5),
    image: Lastonewin,
    accent: "#3ED2F0",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 6,
    messageKey: "ilern",
    number: n(6),
    image: LMS,
    accent: "#22B8DE",
    year: "2025",
    tags: ["ASP.NET MVC", "SQL Server", "LMS"],
  },
  {
    id: 7,
    messageKey: "clinical",
    number: n(7),
    image: CMS,
    accent: "#3ED2F0",
    year: "2025",
    tags: [".NET Framework", "SQL Server", "Healthcare"],
  },
];
