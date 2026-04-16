import type { StaticImageData } from "next/image";

import cashtics from "../images/cashtics.com_en.png";
import Sooquk from "../images/sooquk.com_en.png";
import okal from "../images/okalforheroes.com.png";
import Lastonewin from "../images/last_one_win_1920x1440.png";
import LMS from "../images/LMS.png";
import CMS from "../images/clincal.png";
import Breshta from "../images/logo.png";

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
    accent: "#ff6b00",
    year: "2025",
    tags: ["Laravel", "Vue.js", "AWS"],
  },
  {
    id: 2,
    messageKey: "sooquk",
    number: n(2),
    image: Sooquk,
    link: "https://sooquk.com/",
    accent: "#ff8c3a",
    year: "2025",
    tags: ["ASP.NET Core", "Next.js", "React Native"],
  },
  {
    id: 3,
    messageKey: "okal",
    number: n(3),
    image: okal,
    link: "https://okalforheroes.com/",
    accent: "#ffa556",
    year: "2026",
    tags: ["ASP.NET MVC", "UX design", "Hosting"],
  },
  {
    id: 4,
    messageKey: "breshta",
    number: n(4),
    image: Breshta,
    accent: "#ff6b00",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 5,
    messageKey: "lastonewin",
    number: n(5),
    image: Lastonewin,
    accent: "#ff8c3a",
    year: "2026",
    tags: ["ASP.NET Core", "React Native", "Azure"],
  },
  {
    id: 6,
    messageKey: "ilern",
    number: n(6),
    image: LMS,
    accent: "#ff6b00",
    year: "2025",
    tags: ["ASP.NET MVC", "SQL Server", "LMS"],
  },
  {
    id: 7,
    messageKey: "clinical",
    number: n(7),
    image: CMS,
    accent: "#ff8c3a",
    year: "2025",
    tags: [".NET Framework", "SQL Server", "Healthcare"],
  },
];
