import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { Container } from 'components/common/Container';
import { LimitLine } from 'components/common/LimitLine';
import { mokeBorrowLimitData, mokeLiquidationLimitData } from 'components/common/LimitLine/content';
import { Heading } from 'components/common/Heading';
import { SupplyAssets } from 'components/tables/SupplyAssets';
import { SUPPLY_ASSETS_DATA } from 'components/tables/SupplyAssets/content';
import { BorrowAssets } from 'components/tables/BorrowAssets';
import { BORROW_ASSETS_DATA } from 'components/tables/BorrowAssets/content';
import { TableDropdown } from 'components/common/TableDropdown';
import { YourSupplyAssets } from 'components/tables/YourSupplyAssets';
import { YOUR_SUPPLY_ASSETS_DATA } from 'components/tables/YourSupplyAssets/content';
import { YourBorrowAssets } from 'components/tables/YourBorrowAssets';
import { YOUR_BORROW_ASSETS_DATA } from 'components/tables/YourBorrowAssets/content';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TEZ_TOKEN, WBTC_TOKEN } from 'components/common/CollateralSwitcher/content';
import { SupplyLine } from 'components/common/SupplyLine';
import { mokeSupplyPrimaryData, mokeSupplySecondaryData } from 'components/common/SupplyLine/content';
import { Markets } from 'components/tables/Markets';
import { ALL_MARKETS_DATA } from 'components/tables/Markets/content';

import { ReactComponent as Arrow } from 'svg/Arrow.svg';
import { ReactComponent as Close } from 'svg/Close.svg';
import { ReactComponent as BigClose } from 'svg/BigClose.svg';
import { ReactComponent as Discord } from 'svg/Discord.svg';
import { ReactComponent as Github } from 'svg/Github.svg';
import { ReactComponent as Doc } from 'svg/Doc.svg';
import { ReactComponent as Logo } from 'svg/Logo.svg';
import { ReactComponent as Reddit } from 'svg/Reddit.svg';
import { ReactComponent as Telegram } from 'svg/Telegram.svg';
import { ReactComponent as Twitter } from 'svg/Twitter.svg';
import { ReactComponent as Youtube } from 'svg/Youtube.svg';
import { ReactComponent as Attention } from 'svg/Attention.svg';
import { ReactComponent as Chevron } from 'svg/Chevron.svg';

import s from './UiKit.module.sass';

export const UiKit: React.FC = () => (
  <Container className={s.root}>

    {/* BUTTONS - Supply */}
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

    {/* BUTTONS - Borrow */}
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

    {/* Inputs */}
    <div className={cx(s.block, s.inputs)}>
      <Input
        placeholder="Input..."
        className={s.input}
      />
      <Input
        placeholder="Input..."
        disabled
        className={s.input}
      />
      <Input
        placeholder="Input..."
        error="Some error"
        className={s.input}
      />
    </div>

    {/* Icons */}
    <div className={cx(s.block, s.icons)}>
      <Logo className={s.icon} />
      <div className={s.separator}>
        <Discord className={s.icon} />
        <Github className={s.icon} />
        <Doc className={s.icon} />
        <Reddit className={s.icon} />
        <Telegram className={s.icon} />
        <Twitter className={s.icon} />
        <Youtube className={s.icon} />
      </div>
      <div className={s.separator}>
        <Arrow className={s.icon} />
        <Close className={s.icon} />
        <BigClose className={s.icon} />
        <Attention className={s.icon} />
        <Chevron className={s.icon} />
      </div>
    </div>

    {/* Heading */}
    {/* Limit Line */}
    <LimitLine {...mokeBorrowLimitData} className={s.limit} />
    <LimitLine {...mokeLiquidationLimitData} className={s.limit} />

    {/* Supply Line */}
    <SupplyLine {...mokeSupplyPrimaryData} theme="secondary" className={s.limit} />
    <SupplyLine {...mokeSupplySecondaryData} className={s.limit} />

    {/* Headings */}
    <div className={s.block}>
      <Heading
        title="Your supply assets"
      />
      <Heading
        title="Your borrow assets"
        theme="secondary"
      />
      <Heading
        title="Supply assets"
        link={{
          label: 'Docs: suppling assets',
          link: 'https://www.gogle.com',
          external: true,
        }}
        theme="secondary"
      />
      <Heading
        title="Borrow assets"
        link={{
          label: 'Docs: borrowing assets',
          link: 'https://www.gogle.com',
          external: true,
        }}
      />
    </div>

    {/* Table */}
    <div className={s.block}>
      <div className={s.buttonAction}>
        Supply
      </div>
      <SupplyAssets
        data={SUPPLY_ASSETS_DATA}
        className={s.marginBottom}
      />

      <div className={s.buttonAction}>
        Borrow
      </div>
      <BorrowAssets
        data={BORROW_ASSETS_DATA}
        className={s.marginBottom}
      />

      <div className={s.buttonAction}>
        Your Supply
      </div>
      <YourSupplyAssets
        data={YOUR_SUPPLY_ASSETS_DATA}
        className={s.marginBottom}
      />
      <YourSupplyAssets
        data={[]}
        className={s.marginBottom}
      />

      <div className={s.buttonAction}>
        Your Borrow
      </div>
      <YourBorrowAssets
        data={YOUR_BORROW_ASSETS_DATA}
        className={s.marginBottom}
      />
      <YourBorrowAssets
        data={[]}
        className={s.marginBottom}
      />

      <div className={s.buttonAction}>
        All markets
      </div>
      <Markets data={ALL_MARKETS_DATA} />
    </div>

    {/* Table Dropdown */}
    <TableDropdown className={s.marginBottom} />
    <TableDropdown theme="secondary" />
    {/* Switcher  */}
    <div className={s.block}>
      <CollateralSwitcher token={{ address: TEZ_TOKEN.address }} />
      <CollateralSwitcher token={{ address: WBTC_TOKEN.address, id: WBTC_TOKEN.id }} />
    </div>
  </Container>
);
