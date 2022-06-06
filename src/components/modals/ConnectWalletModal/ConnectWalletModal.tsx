import React, { FC, ReactNode, useCallback, useState } from "react";

import {
  TEMPLE_WALLET_NOT_INSTALLED_MESSAGE,
  useConnectWithBeacon,
  useConnectWithTemple,
} from "utils/dapp";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { events } from "constants/analytics";
import { useConnectWalletModal } from "hooks/useConnectModal";
import { useAnalytics } from "hooks/useAnalytics";
import { useUpdateToast } from "hooks/useUpdateToast";
import { Modal, ModalType } from "components/ui/Modal";
import { Button } from "components/ui/Button";
import { ModalHeader } from "components/ui/Modal/ModalHeader";
import { ReactComponent as TempleWallet } from "svg/TempleWallet.svg";
import { ReactComponent as Beacon } from "svg/Beacon.svg";
import { ReactComponent as ConnectTerms } from "svg/ConnectTerms.svg";
import { ReactComponent as ConnectWallet } from "svg/ConnectWallet.svg";

import s from "./ConnectWalletModal.module.sass";
import classNames from "classnames";

enum WalletType {
  BEACON = "beacon",
  TEMPLE = "temple",
}

export const ConnectWalletModal: FC = () => {
  const {
    connectModalIsOpen,
    handleConnectModal,
    handleInstallTempleWalletModal,
  } = useConnectWalletModal();
  const connectWithBeacon = useConnectWithBeacon();
  const connectWithTemple = useConnectWithTemple();
  const { updateToast } = useUpdateToast();
  const { trackEvent } = useAnalytics();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleConnectClick = useCallback(
    async (walletType: WalletType) => {
      try {
        if (walletType === WalletType.BEACON) {
          await connectWithBeacon(true);
          handleConnectModal();

          // Analytics track
          trackEvent(
            events.connect_wallet.beacon,
            AnalyticsEventCategory.CONNECT_WALLET_POPUP
          );
        } else {
          await connectWithTemple(true);
          handleConnectModal();

          // Analytics track
          trackEvent(
            events.connect_wallet.temple,
            AnalyticsEventCategory.CONNECT_WALLET_POPUP
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === TEMPLE_WALLET_NOT_INSTALLED_MESSAGE) {
            handleConnectModal();
            handleInstallTempleWalletModal();
          } else {
            updateToast({
              type: "error",
              render: `Error while connecting with ${
                walletType === WalletType.BEACON ? "Beacon" : "Temple Wallet"
              }: ${e.message}`,
            });
          }
        } else {
          updateToast({
            type: "error",
            render: `Error while connecting with ${
              walletType === WalletType.BEACON ? "Beacon" : "Temple Wallet"
            }`,
          });
        }
      }
    },
    [
      connectWithBeacon,
      connectWithTemple,
      handleConnectModal,
      handleInstallTempleWalletModal,
      trackEvent,
      updateToast,
    ]
  );

  return (
    <Modal
      type={ModalType.CONNECT_WALLET}
      isOpen={connectModalIsOpen}
      onRequestClose={handleConnectModal}
      innerClassName={s.inner}
    >
      <ModalHeader title="Connect to a wallet" className={s.root} />
      <Item
        Icon={ConnectTerms}
        title={
          <>
            Accept{" "}
            <a
              href="https://yupana-finance.gitbook.io/yupana-document-portal/agreements/terms-of-use"
              target="_blank"
              rel="noreferrer noopener"
              className={s.link}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://yupana-finance.gitbook.io/yupana-document-portal/agreements/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
              className={s.link}
            >
              Privacy Policy
            </a>
          </>
        }
        className={s.firstItem}
      >
        <div className={s.agreementWrapper}>
          <button
            onClick={() => setTermsAccepted((prevState) => !prevState)}
            className={s.agreement}
          >
            <span
              className={classNames(s.checkbox, {
                [s.checkboxActive]: termsAccepted,
              })}
            >
              <span className={s.checkboxInner} />
            </span>
            I read and accept
          </button>
        </div>
      </Item>
      <Item
        Icon={ConnectWallet}
        title="Please select a wallet to connect to this dapp:"
      >
        <div className={s.wallets}>
          <Button
            theme="clear"
            onClick={() => handleConnectClick(WalletType.TEMPLE)}
            disabled={!termsAccepted}
            className={s.button}
          >
            <TempleWallet className={s.icon} />
            Temple wallet
          </Button>

          <Button
            theme="clear"
            onClick={() => handleConnectClick(WalletType.BEACON)}
            disabled={!termsAccepted}
            className={s.button}
          >
            <Beacon className={s.icon} />
            Beacon
          </Button>
        </div>
      </Item>
    </Modal>
  );
};

type ItemProps = {
  Icon: FC<{ className?: string }>;
  title: ReactNode;
  className?: string;
};

const Item: FC<ItemProps> = ({ Icon, title, children, className }) => (
  <div className={classNames(s.item, className)}>
    <div className={s.title}>
      <Icon className={s.itemIcon} />
      <span className={s.titleContent}>{title}</span>
    </div>
    {children}
  </div>
);
