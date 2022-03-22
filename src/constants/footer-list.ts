import { AppRoutes } from "routes/main-routes";

export const FOOTER_LIST = [
  {
    id: 1,
    text: "Markets",
    to: AppRoutes.MARKETS,
  },
  {
    id: 2,
    text: "FAQs",
    to: "https://yupana-finance.gitbook.io/yupana-document-portal/introduction/faq",
    external: true,
  },
  {
    id: 3,
    text: "Docs",
    to: "https://yupana-finance.gitbook.io/yupana-document-portal/introduction/what-is-yupana.finance",
    external: true,
  },
  {
    id: 4,
    text: "Terms of Use",
    to: "/",
  },
  {
    id: 5,
    text: "Privacy Policy",
    to: "/",
  },
  {
    id: 6,
    text: "Cookie Policy",
    to: "/",
  },
];
