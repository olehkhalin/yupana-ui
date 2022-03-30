import { AppRoutes } from "routes/main-routes";

export const FOOTER_LIST = [
  {
    id: 1,
    text: "Markets",
    name: "markets",
    to: AppRoutes.MARKETS,
  },
  {
    id: 2,
    text: "FAQs",
    name: "faqs",
    to: "https://yupana-finance.gitbook.io/yupana-document-portal/introduction/faq",
    external: true,
  },
  {
    id: 3,
    text: "Docs",
    name: "docs",
    to: "https://yupana-finance.gitbook.io/yupana-document-portal/introduction/what-is-yupana.finance",
    external: true,
  },
  {
    id: 4,
    text: "Terms of Use",
    name: "terms_of_use",
    to: "/",
  },
  {
    id: 5,
    text: "Privacy Policy",
    name: "privacy_policy",
    to: "/",
  },
  {
    id: 6,
    text: "Cookie Policy",
    name: "cookie_policy",
    to: "/",
  },
];
