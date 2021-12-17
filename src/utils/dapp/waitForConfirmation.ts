import { WalletOperation } from '@taquito/taquito';

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
