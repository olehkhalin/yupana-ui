import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NetworkType as BeaconNetworkType } from '@airgap/beacon-sdk';
import { TempleWallet } from '@temple-wallet/dapp';
import {
  MichelCodecPacker,
  TezosToolkit,
  WalletOperation,
  Extension,
} from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { Tzip12Module } from '@taquito/tzip12';
import {
  MetadataProvider,
  Tzip16Module,
  HttpHandler,
  TezosStorageHandler,
  IpfsHttpHandler,
} from '@taquito/tzip16';
import constate from 'constate';
import memoizee from 'memoizee';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { ReadOnlySigner } from 'utils/ReadOnlySigner';
// import { FastRpcClient } from 'utils/taquito-fast-rpc';

import {
  APP_NAME,
  BASE_URL,
  LAST_USED_ACCOUNT_KEY,
  LAST_USED_CONNECTION_KEY,
  NETWORK,
  NetworkType,
  NETWORK_RPC,
} from 'constants/default';

const defaultRpcClient = NETWORK_RPC;

const metadataProvider = new MetadataProvider(
  // @ts-ignore
  new Map([
    ['http', new HttpHandler()],
    ['https', new HttpHandler()],
    ['tezos-storage', new TezosStorageHandler()],
    ['ipfs', new IpfsHttpHandler('cloudflare-ipfs.com')],
  ]),
);

export const michelEncoder = new MichelCodecPacker();
const beaconWallet = typeof window === 'undefined' ? undefined : new BeaconWallet({
  name: APP_NAME,
  iconUrl: `${BASE_URL}favicon.ico`,
});

const beaconNetworkTypes: Record<NetworkType, BeaconNetworkType> = {
  mainnet: BeaconNetworkType.MAINNET,
  edo2net: BeaconNetworkType.EDONET,
  florencenet: BeaconNetworkType.FLORENCENET,
  granadanet: BeaconNetworkType.GRANADANET,
  hangzhounet: BeaconNetworkType.HANGZHOUNET,
  sandbox: BeaconNetworkType.CUSTOM,
};

export const TEMPLE_WALLET_NOT_INSTALLED_MESSAGE = 'Temple wallet not installed';
const tzip16Module = new Tzip16Module(metadataProvider) as unknown as Extension;
const tzip12Module = new Tzip12Module(metadataProvider) as unknown as Extension;

async function connectWalletTemple(forcePermission: boolean) {
  const available = await TempleWallet.isAvailable();
  if (!available) {
    throw new Error(TEMPLE_WALLET_NOT_INSTALLED_MESSAGE);
  }

  let perm;
  if (!forcePermission) {
    perm = await TempleWallet.getCurrentPermission();
  }

  const wallet = new TempleWallet(APP_NAME, perm);

  if (!wallet.connected) {
    await wallet.connect(
      { name: NETWORK, rpc: NETWORK_RPC },
      { forcePermission: true },
    );
  }

  const tezos = new TezosToolkit(defaultRpcClient as any);
  tezos.setWalletProvider(wallet);
  tezos.setPackerProvider(michelEncoder);
  // @ts-ignore
  tezos.setRpcProvider(defaultRpcClient);
  const { pkh, publicKey } = wallet.permission!;
  tezos.setSignerProvider(new ReadOnlySigner(pkh, publicKey));
  tezos.addExtension(tzip16Module);
  tezos.addExtension(tzip12Module);
  localStorage.setItem(LAST_USED_CONNECTION_KEY, 'temple');
  return { pkh, toolkit: tezos, wallet };
}

async function connectWalletBeacon(forcePermission: boolean) {
  if (!beaconWallet) {
    throw new Error('Cannot use beacon out of window');
  }

  const activeAccount = await beaconWallet.client.getActiveAccount();
  if (forcePermission || !activeAccount) {
    if (activeAccount) {
      await beaconWallet.clearActiveAccount();
    }
    await beaconWallet.requestPermissions({
      network: { type: beaconNetworkTypes[NETWORK] },
    });
  }

  // @ts-ignore
  const tezos = new TezosToolkit(defaultRpcClient);
  tezos.setPackerProvider(michelEncoder);
  tezos.setWalletProvider(beaconWallet);
  tezos.addExtension(tzip16Module);
  tezos.addExtension(tzip12Module);
  const activeAcc = await beaconWallet.client.getActiveAccount();
  if (!activeAcc) {
    throw new Error('Not connected');
  }

  tezos.setSignerProvider(
    new ReadOnlySigner(activeAcc.address, activeAcc.publicKey),
  );
  localStorage.setItem(LAST_USED_CONNECTION_KEY, 'beacon');
  localStorage.setItem(LAST_USED_ACCOUNT_KEY, activeAcc.accountIdentifier);
  return { pkh: activeAcc.address, toolkit: tezos };
}

export type DAppType = {
  connectionType: 'beacon' | 'temple' | null;
  tezos: TezosToolkit | null;
  accountPkh: string | null;
  templeWallet: TempleWallet | null;
};

// @ts-ignore
export const fallbackToolkit = new TezosToolkit(defaultRpcClient);
fallbackToolkit.setPackerProvider(michelEncoder);
fallbackToolkit.addExtension(tzip16Module);
fallbackToolkit.addExtension(tzip12Module);

function useDApp() {
  const [{
    connectionType, tezos, accountPkh, templeWallet,
  }, setState] = useState<DAppType>({
    connectionType: null,
    tezos: null,
    accountPkh: null,
    templeWallet: null,
  });

  const setFallbackState = useCallback(
    () => setState((prevState) => ({
      ...prevState,
      connectionType: null,
      tezos: prevState.tezos ?? fallbackToolkit,
    })),
    [],
  );

  const getTempleInitialAvailable = useCallback(() => TempleWallet.isAvailable(), []);
  const {
    data: templeInitialAvailable,
  } = useSWR(
    ['temple-initial-available'],
    getTempleInitialAvailable,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const ready = Boolean(tezos) || (templeInitialAvailable === false);

  useEffect(() => {
    TempleWallet.onAvailabilityChange(async (available) => {
      const lastUsedConnection = localStorage.getItem(LAST_USED_CONNECTION_KEY);
      if (available) {
        try {
          let perm;
          try {
            perm = await TempleWallet.getCurrentPermission();
          } catch (error) {
            console.log(error);
          }

          const wlt = new TempleWallet(
            APP_NAME,
            lastUsedConnection === 'temple' ? perm : null,
          );

          if (lastUsedConnection === 'temple') {
            const newToolkit = wlt.connected
              ? new TezosToolkit(defaultRpcClient as any)
              : fallbackToolkit;
            newToolkit.setWalletProvider(wlt);
            // @ts-ignore
            // newToolkit.setRpcProvider(defaultRpcClient);
            newToolkit.addExtension(tzip16Module);
            newToolkit.addExtension(tzip12Module);
            setState({
              templeWallet: wlt,
              tezos: newToolkit,
              accountPkh: wlt.connected ? await wlt.getPKH() : null,
              connectionType: wlt.connected ? 'temple' : null,
            });
          } else {
            setState((prevState) => ({
              ...prevState,
              tezos: prevState.tezos ?? fallbackToolkit,
              templeWallet: wlt,
            }));
          }

          return;
        } catch (e) {
          console.error(e);
        }
      }

      if (lastUsedConnection !== 'beacon') {
        setFallbackState();
      }
    });
    const lastUsedAccount = localStorage.getItem(LAST_USED_ACCOUNT_KEY);
    if (localStorage.getItem(LAST_USED_CONNECTION_KEY) === 'beacon' && lastUsedAccount) {
      if (!beaconWallet) {
        return;
      }
      beaconWallet.client.getAccount(lastUsedAccount).then((value) => {
        if (!value) {
          localStorage.removeItem(LAST_USED_ACCOUNT_KEY);
          localStorage.removeItem(LAST_USED_CONNECTION_KEY);
          setFallbackState();
          return;
        }

        // @ts-ignore
        const toolkit = new TezosToolkit(defaultRpcClient);
        toolkit.setPackerProvider(michelEncoder);
        toolkit.setWalletProvider(beaconWallet);
        toolkit.addExtension(tzip16Module);
        toolkit.addExtension(tzip12Module);
        setState({
          templeWallet: null,
          accountPkh: value.address,
          connectionType: 'beacon',
          tezos: toolkit,
        });
      }).catch((e) => {
        console.error(e);
        setFallbackState();
      });
    }
  }, [setFallbackState]);

  useEffect(() => {
    if (templeInitialAvailable === false && localStorage.getItem(LAST_USED_CONNECTION_KEY) === 'temple') {
      setFallbackState();
    }
  }, [setFallbackState, templeInitialAvailable]);

  useEffect(() => {
    if (templeWallet && templeWallet.connected) {
      TempleWallet.onPermissionChange((perm) => {
        if (!perm) {
          setState({
            templeWallet: new TempleWallet(APP_NAME),
            tezos: fallbackToolkit,
            accountPkh: null,
            connectionType: null,
          });
        }
      });
    }
  }, [templeWallet]);

  const connectWithTemple = useCallback(
    async (forcePermission: boolean) => {
      const { pkh, toolkit, wallet } = await connectWalletTemple(forcePermission);
      setState({
        connectionType: 'temple',
        tezos: toolkit,
        accountPkh: pkh,
        templeWallet: wallet,
      });
    },
    [],
  );

  const connectWithBeacon = useCallback(
    async (forcePermission: boolean) => {
      const { pkh, toolkit } = await connectWalletBeacon(forcePermission);
      setState({
        connectionType: 'beacon',
        tezos: toolkit,
        accountPkh: pkh,
        templeWallet: null,
      });
    },
    [],
  );

  const disconnect = useCallback(
    async () => {
      setState((prevState) => ({
        ...prevState,
        tezos: fallbackToolkit,
        accountPkh: null,
        connectionType: null,
      }));
      localStorage.removeItem(LAST_USED_CONNECTION_KEY);
    },
    [],
  );

  return {
    connectionType,
    tezos,
    accountPkh,
    templeWallet,
    ready,
    connectWithBeacon,
    connectWithTemple,
    disconnect,
  };
}

export const [
  DAppProvider,
  useConnectionType,
  useTezos,
  useAccountPkh,
  useTempleWallet,
  useReady,
  useConnectWithBeacon,
  useConnectWithTemple,
  useDisconnect,
] = constate(
  useDApp,
  (v) => v.connectionType,
  (v) => v.tezos,
  (v) => v.accountPkh,
  (v) => v.templeWallet,
  (v) => v.ready,
  (v) => v.connectWithBeacon,
  (v) => v.connectWithTemple,
  (v) => v.disconnect,
);

/**
 * Block update
 */
export const useOnBlock = (tezos: TezosToolkit | null, callback: (hash: string) => void) => {
  const blockHashRef = useRef<string | undefined>();

  useEffect(() => {
    let sub: any; // Which type do I have to set here?

    if (!tezos) {
      return () => undefined;
    }

    const spawnSub = () => {
      sub = tezos.stream.subscribe('head');

      sub.on('data', (hash: string) => {
        if (blockHashRef.current && blockHashRef.current !== hash) {
          callback(hash);
        }
        blockHashRef.current = hash;
      });
      sub.on('error', (err: Error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
        sub.close();
        spawnSub();
      });
    };

    spawnSub();
    return () => sub.close();
  }, [tezos, callback]);
};
/**
 * Block update
 */

/**
 * Storage
 */
const getContractPure = (tezos: TezosToolkit, address: string) => tezos.contract.at(address);

export const getContract = memoizee(getContractPure);

const getStoragePure = async (tezos: TezosToolkit, contractAddress: string) => {
  const contract = await getContract(tezos, contractAddress);
  return contract?.storage<any>();
};

export const getStorageInfo = memoizee(getStoragePure, { maxAge: 30000 });

export const waitForConfirmation = async (operation: WalletOperation) => {
  try {
    const { completed } = await operation.confirmation();
    if (!completed) {
      throw new Error('Transaction processing failed');
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Get QP-token
export const getStorage = async (
  tezos: TezosToolkit,
  contract: string,
  accountPkh: string,
) => {
  const storage = await getStorageInfo(tezos, contract);
  const ledger = storage.account_info;
  const val = await ledger.get(accountPkh);
  if (!val) return null;

  const amount = new BigNumber(val.amount);
  const former = new BigNumber(val.former);
  const { permit } = val;
  const reward = new BigNumber(val.reward);

  return {
    amount,
    former,
    permit,
    reward,
  };
};
