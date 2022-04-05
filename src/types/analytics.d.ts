import { events } from "constants/analytics";

export type SliderPercentButtonType =
  keyof typeof events.credit_process_modal.slider;

export type TooltipsKeyType = keyof typeof events.tooltips;

export type FooterLinksType = keyof typeof events.footer.links;

export type FooterSocialsType = keyof typeof events.footer.socials;

export type HeaderNavType = keyof typeof events.header.links;

export type DocsType = keyof typeof events.docs;

export type TableNameType = keyof typeof events.lending.click_arrow;
