import { InputInterface } from 'components/modals/CreditProcessModal';

export const validateInput = (value: InputInterface, submit?: boolean) => {
  const { amount, metadata } = value;
  if (amount?.gt(metadata.balance)) {
    return 'Insufficient Balance';
  }

  if ((!amount || (amount && +amount === 0)) && submit) {
    return 'This field is required';
  }

  return '';
};
