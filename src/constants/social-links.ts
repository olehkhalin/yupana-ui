import { FC } from "react";

import { ReactComponent as Discord } from "svg/Discord.svg";
import { ReactComponent as Github } from "svg/Github.svg";
import { ReactComponent as Doc } from "svg/Doc.svg";
import { ReactComponent as Reddit } from "svg/Reddit.svg";
import { ReactComponent as Telegram } from "svg/Telegram.svg";
import { ReactComponent as Twitter } from "svg/Twitter.svg";
import { ReactComponent as Youtube } from "svg/Youtube.svg";

type SocialProps = {
  id: number;
  href: string;
  Icon: FC<{ className?: string }>;
};

export const SOCIAL_LIST: SocialProps[] = [
  {
    id: 1,
    href: "/",
    Icon: Twitter,
  },
  {
    id: 2,
    href: "/",
    Icon: Telegram,
  },
  {
    id: 3,
    href: "/",
    Icon: Reddit,
  },
  {
    id: 4,
    href: "/",
    Icon: Discord,
  },
  {
    id: 5,
    href: "/",
    Icon: Github,
  },
  {
    id: 6,
    href: "/",
    Icon: Doc,
  },
  {
    id: 7,
    href: "/",
    Icon: Youtube,
  },
];
