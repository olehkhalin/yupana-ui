export interface PaginationInterface {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageCount: number;
  setOffset?: (arg: number) => void;
  gotoPage: (arg: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}
