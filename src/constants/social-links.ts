import { FC } from "react";

import { ReactComponent as Discord } from "svg/Discord.svg";
import { ReactComponent as Github } from "svg/Github.svg";
import { ReactComponent as Doc } from "svg/Doc.svg";
import { ReactComponent as Reddit } from "svg/Reddit.svg";
import { ReactComponent as Telegram } from "svg/Telegram.svg";
import { ReactComponent as Twitter } from "svg/Twitter.svg";

type SocialProps = {
  id: number;
  href: string;
  Icon: FC<{ className?: string }>;
};

export const SOCIAL_LIST: SocialProps[] = [
  {
    id: 1,
    href: "https://mobile.twitter.com/yupanafinance",
    Icon: Twitter,
  },
  {
    id: 2,
    // TODO: Add later
    href: "/",
    Icon: Telegram,
  },
  {
    id: 3,
    href: "https://www.reddit.com/r/MadFishCommunity",
    Icon: Reddit,
  },
  {
    id: 4,
    href: "https://discord.com/invite/qFRZ8kVzkv",
    Icon: Discord,
  },
  {
    id: 5,
    href: "https://github.com/quipucords/yupana",
    Icon: Github,
  },
  {
    id: 6,
    href: "https://yupana-finance.gitbook.io/yupana-document-portal/introduction/what-is-yupana.finance",
    Icon: Doc,
  },
];
