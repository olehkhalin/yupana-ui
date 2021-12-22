import { OperationBatch, WalletOperationBatch } from '@taquito/taquito';

export type Batch = OperationBatch | WalletOperationBatch;

export const batchify = (
  batch: Batch, transfers: any[],
) => (
  transfers.reduce((b, tParams) => b.withTransfer(tParams), batch)
);
