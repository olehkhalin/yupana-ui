import { FieldErrors } from 'react-hook-form/dist/types/errors';

export function getAdvancedErrorMessage<T>(
  formError: FieldErrors<T> | undefined,
): string | undefined {
  if (formError) {
    // @ts-ignore
    return formError.message;
  }
  return undefined;
}
