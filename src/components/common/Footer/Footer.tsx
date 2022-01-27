import React, { FC } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import { FOOTER_LIST } from "constants/footer-list";
import { Container } from "components/common/Container";

import { SocialLinks } from "./SocialLinks";
import s from "./Footer.module.sass";

type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer className={cx(s.root, className)}>
    <Container className={s.container}>
      <div className={s.row}>
        <SocialLinks />
        <div className={s.links}>
          <div className={s.column}>
            {FOOTER_LIST.slice(0, 3).map(({ id, text, to }) => (
              <Link key={id} to={to} className={s.link}>
                {text}
              </Link>
            ))}
          </div>
          <div className={s.column}>
            {FOOTER_LIST.slice(3, 6).map(({ id, text, to }) => (
              <Link key={id} to={to} className={s.link}>
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.copyright}>
          Copyright © {new Date().getFullYear()} Yupana.finance
        </div>
        <div className={s.company}>
          <div className={s.withLove}>Made with 💙</div>
          <div>
            <span className={s.marginRight}>by</span>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a
              href="https://www.madfish.solutions/"
              target="_blank"
              className={s.owner}
            >
              mad.fish
            </a>
          </div>
        </div>
      </div>
    </Container>
  </footer>
);
