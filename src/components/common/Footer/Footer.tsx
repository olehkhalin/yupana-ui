import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { FOOTER_LIST } from 'constants/footer-list';
import { Container } from 'components/common/Container';
import { SocialLinks } from 'components/common/SocialLinks';

import s from './Footer.module.sass';

type FooterProps = {
  className?: string
};

export const Footer: React.FC<FooterProps> = ({
  className,
}) => (
  <footer className={cx(s.root, className)}>
    <Container className={s.container}>
      <div>
        <SocialLinks />
        <div className={s.copyright}>
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Yupana.finance
        </div>
      </div>
      <div className={s.links}>
        <div className={s.column}>
          {FOOTER_LIST.slice(0, 3).map(
            ({ id, text, to }) => (
              <Link
                key={id}
                to={to}
                className={s.link}
              >
                {text}
              </Link>
            ),
          )}
        </div>
        <div className={s.column}>
          {FOOTER_LIST.slice(3, 6).map(
            ({ id, text, to }) => (
              <Link
                key={id}
                to={to}
                className={s.link}
              >
                {text}
              </Link>
            ),
          )}
        </div>
      </div>
    </Container>
  </footer>
);
