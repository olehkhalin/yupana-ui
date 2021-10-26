import React from 'react';

import { Button } from 'components/ui/Button';
import Container from 'components/common/Container';

import s from './UiKit.module.sass';

export const UiKit: React.FC = () => (
  <Container className={s.root}>
    <div className={s.block}>
      <div className={s.buttonsBlock}>
        <div className={s.buttonAction}>
          Supply
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
          >
            Button text
          </Button>
          <Button
            className={s.button}
            sizeT="medium"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            sizeT="small"
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            sizeT="medium"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            sizeT="small"
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="secondary"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="secondary"
            sizeT="medium"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="secondary"
            sizeT="small"
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="secondary"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="secondary"
            sizeT="medium"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="secondary"
            sizeT="small"
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="tertiary"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="tertiary"
            sizeT="medium"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="tertiary"
            sizeT="small"
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="tertiary"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="tertiary"
            sizeT="medium"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="tertiary"
            sizeT="small"
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="light"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="medium"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="small"
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="light"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="medium"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="small"
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="accent"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="medium"
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="small"
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="accent"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="medium"
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="small"
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="light"
            withArrow
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="medium"
            withArrow
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="small"
            withArrow
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="light"
            withArrow
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="medium"
            withArrow
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="light"
            sizeT="small"
            withArrow
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="accent"
            withArrow
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="medium"
            withArrow
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="small"
            withArrow
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.button}
            theme="accent"
            withArrow
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="medium"
            withArrow
            disabled
          >
            Button text
          </Button>
          <Button
            className={s.button}
            theme="accent"
            sizeT="small"
            withArrow
            disabled
          >
            Button text
          </Button>
        </div>
      </div>
    </div>
    <div className={s.block}>
      <div className={s.buttonsBlock}>
        <div className={s.buttonAction}>
          Borrow
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            sizeT="medium"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            sizeT="small"
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            sizeT="medium"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            sizeT="small"
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="secondary"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="secondary"
            sizeT="medium"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="secondary"
            sizeT="small"
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="secondary"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="secondary"
            sizeT="medium"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="secondary"
            sizeT="small"
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="tertiary"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="tertiary"
            sizeT="medium"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="tertiary"
            sizeT="small"
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="tertiary"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="tertiary"
            sizeT="medium"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="tertiary"
            sizeT="small"
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="light"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="medium"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="small"
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="light"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="medium"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="small"
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="accent"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="medium"
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="small"
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="accent"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="medium"
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="small"
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="light"
            withArrow
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="medium"
            withArrow
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="small"
            withArrow
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="light"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="medium"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="light"
            sizeT="small"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
      <div className={s.buttonsBlock}>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="accent"
            withArrow
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="medium"
            withArrow
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="small"
            withArrow
            className={s.button}
          >
            Button text
          </Button>
        </div>
        <div className={s.buttons}>
          <Button
            action="borrow"
            theme="accent"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="medium"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
          <Button
            action="borrow"
            theme="accent"
            sizeT="small"
            withArrow
            disabled
            className={s.button}
          >
            Button text
          </Button>
        </div>
      </div>
    </div>
  </Container>
);
