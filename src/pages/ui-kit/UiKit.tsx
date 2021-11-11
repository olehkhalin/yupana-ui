import React, { useState } from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { Modal } from 'components/ui/Modal';
import { LimitLine } from 'components/common/LimitLine';
import {
  mokeBorrowLimitData,
  mokeLiquidationLimitData,
} from 'components/common/LimitLine/content';
import { Heading } from 'components/common/Heading';
import { TableDropdown } from 'components/common/TableDropdown';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TEZ_TOKEN, WBTC_TOKEN } from 'components/common/CollateralSwitcher/content';
import { AssetsSwitcher } from 'components/common/AssetsSwitcher';
import { SupplyLine } from 'components/common/SupplyLine';
import {
  mokeSupplyPrimaryData,
  mokeSupplySecondaryData,
} from 'components/common/SupplyLine/content';
import { CurrencySwitcher } from 'components/common/CurrencySwitcher';
import { BorrowAssets } from 'components/tables/containers/BorrowAssets';
import { SupplyAssets } from 'components/tables/containers/SupplyAssets';
import { YourSupplyAssets } from 'components/tables/containers/YourSupplyAssets';
import { YourBorrowAssets } from 'components/tables/containers/YourBorrowAssets';
import { Markets } from 'components/tables/containers/Markets';
import { Liquidate } from 'components/tables/containers/Liquidate';
import { REPAY_BORROW_DATA } from 'components/temp-data/tables/repay-borrow';
import { RECEIVE_COLLATERAL_DATA } from 'components/temp-data/tables/receive-collateral';
import {
  BorrowAssetsCard,
  MarketsCard,
  SupplyAssetsCard,
  YourBorrowAssetsCard,
  YourSupplyAssetsCard,
} from 'components/tables/components/mobile';
import { MarketCard } from 'components/common/MarketCard';
import {
  LiquidationPositions,
  ReceiveCollateral,
  RepayBorrow,
} from 'components/tables/components/desktop';
import { LIQUIDATE_DATA } from 'components/temp-data/tables/liquidate';
import { SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/supply';
import { BORROW_ASSETS_DATA } from 'components/temp-data/tables/borrow';
import { YOUR_SUPPLY_ASSETS_DATA } from 'components/temp-data/tables/your-supply';
import { YOUR_BORROW_ASSETS_DATA } from 'components/temp-data/tables/your-borrow';
import { ALL_MARKETS_DATA } from 'components/temp-data/tables/markets';
import { LIQUIDATION_POSITIONS_DATA } from 'components/temp-data/tables/liquidation-positions';
import {
  MARKET_CARDS_SUPPLY,
  MARKET_CARDS_BORROW,
} from 'components/temp-data/market-card';

import { ReactComponent as Chevron } from 'svg/Chevron.svg';
import { ReactComponent as Arrow } from 'svg/Arrow.svg';
import { ReactComponent as Close } from 'svg/Close.svg';
import { ReactComponent as BigClose } from 'svg/BigClose.svg';
import { ReactComponent as Discord } from 'svg/Discord.svg';
import { ReactComponent as Github } from 'svg/Github.svg';
import { ReactComponent as Doc } from 'svg/Doc.svg';
import { ReactComponent as Logo } from 'svg/Logo.svg';
import { ReactComponent as LogoMobile } from 'svg/LogoMobile.svg';
import { ReactComponent as Reddit } from 'svg/Reddit.svg';
import { ReactComponent as Telegram } from 'svg/Telegram.svg';
import { ReactComponent as Twitter } from 'svg/Twitter.svg';
import { ReactComponent as Youtube } from 'svg/Youtube.svg';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './UiKit.module.sass';

export const UiKit: React.FC = () => {
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);

  // Modals
  const [modalBaseIsOpen, setModalBaseIsOpen] = useState(false);

  return (
    <>
      {/* BUTTONS - Supply */}
      <div className={s.block}>
        <div className={s.title}>
          Buttons
        </div>
        <div className={s.buttonsBlock}>
          <div className={s.subTitle}>
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
          <div className={s.subTitle}>
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
        <div className={s.title}>
          Inputs
        </div>
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
        <div className={s.title}>
          Icons
        </div>
        <Logo className={s.icon} />
        <LogoMobile className={s.icon} />
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

      {/* Limit Line */}
      <div className={s.block}>
        <div className={s.title}>
          Limit Lines
        </div>
        <LimitLine {...mokeBorrowLimitData} className={s.limit} />
        <LimitLine {...mokeLiquidationLimitData} className={s.limit} />

        {/* Supply Line */}
        <SupplyLine {...mokeSupplyPrimaryData} theme="secondary" className={s.limit} />
        <SupplyLine {...mokeSupplySecondaryData} className={s.limit} />
      </div>

      {/* Headings */}
      <div className={s.block}>
        <div className={s.title}>
          Headings
        </div>
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

      {/* Switchers  */}
      <div className={cx(s.block, s.flexColumn)}>
        <div className={s.title}>
          Collateral switcher
        </div>
        <CollateralSwitcher token={{ address: TEZ_TOKEN.address }} className={s.marginBottom} />
        <CollateralSwitcher token={{ address: WBTC_TOKEN.address, id: WBTC_TOKEN.id }} />
      </div>

      <div className={s.block}>
        <div className={s.title}>
          Currency Switcher
        </div>
        <CurrencySwitcher />
      </div>

      <div className={s.block}>
        <div className={s.title}>
          Modals
        </div>
        <div className={s.modalsButtons}>
          <Button
            className={s.modalsButton}
            onClick={() => setModalBaseIsOpen(true)}
          >
            Base
          </Button>
          <Modal
            isOpen={modalBaseIsOpen}
            onRequestClose={() => setModalBaseIsOpen(false)}
          >
            <h2>Base modal</h2>
          </Modal>
        </div>
      </div>

      {/* Table */}
      <div className={s.block}>
        <div className={s.subTitle}>
          Supply
        </div>
        <SupplyAssets
          data={SUPPLY_ASSETS_DATA}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />

        <div className={s.subTitle}>
          Borrow
        </div>
        <BorrowAssets
          data={BORROW_ASSETS_DATA}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />

        <div className={s.subTitle}>
          Your Supply
        </div>
        <YourSupplyAssets
          data={YOUR_SUPPLY_ASSETS_DATA}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />
        <YourSupplyAssets
          data={[]}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />

        <div className={s.subTitle}>
          Your Borrow
        </div>
        <YourBorrowAssets
          data={YOUR_BORROW_ASSETS_DATA}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />
        <YourBorrowAssets
          data={[]}
          className={cx(s.marginBottomLarge, s.halfTable)}
        />

        <div className={s.subTitle}>
          All markets
        </div>
        <Markets data={ALL_MARKETS_DATA} className={s.marginBottomLarge} />

        <div className={s.subTitle}>
          Liquidation positions
        </div>
        <LiquidationPositions data={LIQUIDATION_POSITIONS_DATA} className={s.marginBottomLarge} />

        <div className={s.subTitle}>
          Liquidate
        </div>
        <Liquidate data={LIQUIDATE_DATA} className={s.marginBottomLarge} />

        <div className={s.subTitle}>
          Repay Borrow - Supp
        </div>
        <RepayBorrow data={REPAY_BORROW_DATA} className={s.marginBottomLarge} />

        <div className={s.subTitle}>
          Receive Collateral
        </div>
        <ReceiveCollateral data={RECEIVE_COLLATERAL_DATA} className={s.marginBottomLarge} />
      </div>

      {/* Table Dropdown */}
      <div className={s.title}>
        Table Dropdown
      </div>
      <TableDropdown className={s.marginBottom} />
      <TableDropdown theme="secondary" className={s.marginBottomLarge} />

      {/* Assets Switcher */}
      <div className={s.block}>
        <div className={s.title}>
          Assets Switcher
        </div>
        <AssetsSwitcher
          active={isAssetSwitcherActive}
          setActive={setIsAssetSwitcherActive}
        />
      </div>

      {/* Supply-Borrow switch */}
      <div className={cx(s.block, s.marginBottomLarge)}>
        <div className={s.title}>
          Supply-Borrow switch
        </div>
        <AssetsSwitcher
          active={isAssetSwitcherActive}
          setActive={setIsAssetSwitcherActive}
          className={cx(s.center, s.marginBottom)}
        />
        <div className={s.wrapper}>
          <SupplyAssets
            data={SUPPLY_ASSETS_DATA}
            className={cx(s.halfTable, s.switchTable, { [s.show]: isAssetSwitcherActive })}
          />
          <BorrowAssets
            data={BORROW_ASSETS_DATA}
            className={cx(s.halfTable, s.switchTable, { [s.show]: !isAssetSwitcherActive })}
          />
        </div>
      </div>

      {/* Table Dropdown */}
      <div className={s.block}>
        <div className={s.title}>
          Table Dropdown
        </div>
        <TableDropdown className={s.marginBottom} />
        <TableDropdown theme="secondary" />
      </div>

      {/* Table Card */}
      <div className={s.block}>
        <div className={s.title}>
          Table Card
        </div>

        <div className={s.subTitle}>
          Supply Assets
        </div>
        <div className={s.marginBottomLarge}>
          {SUPPLY_ASSETS_DATA.map(({
            asset: {
              id, address, name, symbol, thumbnailUri,
            }, ...rest
          }) => (
            <SupplyAssetsCard
              key={getUniqueKey()}
              id={id}
              address={address}
              name={name}
              symbol={symbol}
              thumbnailUri={thumbnailUri}
              {...rest}
            />
          ))}
        </div>

        <div className={s.subTitle}>
          Borrow Assets
        </div>
        <div className={s.marginBottomLarge}>
          {BORROW_ASSETS_DATA.map(({
            asset: {
              id, address, name, symbol, thumbnailUri,
            }, ...rest
          }) => (
            <BorrowAssetsCard
              key={getUniqueKey()}
              id={id}
              address={address}
              name={name}
              symbol={symbol}
              thumbnailUri={thumbnailUri}
              {...rest}
            />
          ))}
        </div>

        <div className={s.subTitle}>
          Your Supply Assets
        </div>
        <div className={s.marginBottomLarge}>
          {YOUR_SUPPLY_ASSETS_DATA.map(({
            asset: {
              id, address, name, symbol, thumbnailUri,
            }, ...rest
          }) => (
            <YourSupplyAssetsCard
              key={getUniqueKey()}
              id={id}
              address={address}
              name={name}
              symbol={symbol}
              thumbnailUri={thumbnailUri}
              {...rest}
            />
          ))}
        </div>

        <div className={s.subTitle}>
          Your Borrow Assets
        </div>
        <div className={s.marginBottomLarge}>
          {YOUR_BORROW_ASSETS_DATA.map(({
            asset: {
              id, address, name, symbol, thumbnailUri,
            }, ...rest
          }) => (
            <YourBorrowAssetsCard
              key={getUniqueKey()}
              id={id}
              address={address}
              name={name}
              symbol={symbol}
              thumbnailUri={thumbnailUri}
              {...rest}
            />
          ))}
        </div>

        <div className={s.subTitle}>
          Markets
        </div>
        <div className={s.marginBottomLarge}>
          {ALL_MARKETS_DATA.map(({
            market: {
              id, address, name, symbol, thumbnailUri,
            }, ...rest
          }) => (
            <MarketsCard
              key={getUniqueKey()}
              id={id}
              address={address}
              name={name}
              symbol={symbol}
              thumbnailUri={thumbnailUri}
              {...rest}
            />
          ))}
        </div>
      </div>

      {/* Market Cards  */}
      <div className={s.block}>
        <div className={s.title}>
          Market Cards
        </div>
        <MarketCard
          {...MARKET_CARDS_SUPPLY}
          className={s.marginBottom}
        />
        <MarketCard
          {...MARKET_CARDS_BORROW}
          theme="secondary"
        />
      </div>
    </>
  );
};
