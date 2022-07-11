export const events = {
  header: {
    links: {
      logotype: "CLICK_LOGOTYPE",
      lending: "CLICK_LENDING_BUTTON",
      markets: "CLICK_MARKETS_BUTTON",
      liquidate: "CLICK_LIQUIDATE_BUTTON",
    },
    currency: {
      xtz: "CLICK_XTZ_SWITCHER_BUTTON",
      usd: "CLICK_USD_SWITCHER_BUTTON",
    },
    wallet: {
      connect_wallet_popup: "CLICK_Connect_wallet_BUTTON",
      account_popup: "CLICK_Account_BUTTON",
    },
  },
  account_popup: {
    logout: "CLICK_LOG_OUT_BUTTON",
    explorer: "CLICK_VIEW_ON_EXPLORER_BUTTON",
    copy_address: "CLICK_COPY_ADDRESS_BUTTON",
    clear_transactions: "CLICK_DELETE_HISTORY_BUTTON",
    close_account_popup: "CLICK_CLOSE_ACCOUNT_POP-UP_BUTTON",
  },
  connect_wallet: {
    temple: "CLICK_CONNECT_TEMPLE_WALLET_BUTTON",
    beacon: "CLICK_CONNECT_BEACON_WALLET_BUTTON",
    close_connect_wallet_popup: "CLICK_CLOSE_CONNECT_TO_A_WALLET_POP-UP_BUTTON",
  },
  install_wallet: "CLICK_INSTALL_TEMPLE_WALLET_BUTTON",
  footer: {
    socials: {
      telegram: "CLICK_TELEGRAM_IMAGE_BUTTON",
      twitter: "CLICK_TWITTER_ICON_BUTTON",
      discord: "CLICK_DISCORD_ICON_BUTTON",
      reddit: "CLICK_REDDIT_ICON_BUTTON",
      github: "CLICK_GITHUB_ICON_BUTTON",
      docs: "CLICK_DOCS_ICON_BUTTON",
    },
    links: {
      markets: "CLICK_MARKETS_BUTTON",
      faqs: "CLICK_FAQS_BUTTON",
      docs: "CLICK_DOCS_BUTTON",
      terms_of_use: "CLICK_TERMS_OF_USE_BUTTON",
      privacy_policy: "CLICK_PRIVACY_POLICY_BUTTON",
      cookie_policy: "CLICK_COOKIE_POLICY_BUTTON",
      madfish: "CLICK_MADE_WITH_LOVE_BY_MAD_FISH_BUTTON",
    },
  },
  docs: {
    supplying: "CLICK_DOCS_SUPPLYING_ASSETS_BUTTON",
    borrowing: "CLICK_DOCS_BORROWING_ASSETS_BUTTON",
    irm: "CLICK_IRM_IN_DOCS_BUTTON",
  },
  tooltips: {
    your_borrow_limit: "CALLING_YOUR_BORROW_LIMIT_POP_UP",
    your_liquidation_limit: "CALLING_YOUR_LIQUIDATION_LIMIT_POP_UP",
    utilization_rate: "CALLING_UTILISATION_RATE_POP_UP",
    collateral_factor: "CALLING_COLLATERAL_FACTOR_POP_UP",
    liquidation_threshold: "CALLING_LIQUIDATION_THRESHOLD_POP_UP",
    liquidation_bonus: "CALLING_LIQUIDATION_BONUS_POP_UP",
    exchange_rate: "CALLING_EXCHANGE_RATE_POP_UP",
    base_rate_per_year: "CALLING_BASE_RATE_PER_YEAR_POP_UP",
    kink: "CALLING_KINK_POP_UP",
    health_factor: "CALLING_HEALTH_FACTOR_POP_UP",
  },
  credit_process_modal: {
    name: {
      supply: "Supply",
      withdraw: "Withdraw",
      borrow: "Borrow",
      repay: "Repay",
    },
    input: {
      focus: "CLICK_INPUT_BOX",
      max_value: "CLICK_MAX_BUTTON",
    },
    slider: {
      0: "CLICK_0%_SLIDER",
      25: "CLICK_25%_SLIDER",
      50: "CLICK_50%_SLIDER",
      75: "CLICK_75%_SLIDER",
      100: "CLICK_100%_SLIDER",
    },
    submit: "CLICK_SUBMIT_FORM",
    close_popup: "CLICK_CLOSE_POP-UP",
    close_popup_type: {
      supply: "CLICK_CLOSE_SUPPLY_POP-UP_BUTTON",
      withdraw: "CLICK_CLOSE_WITHDRAW_POP-UP_BUTTON",
      borrow: "CLICK_CLOSE_BORROW_POP-UP_BUTTON",
      repay: "CLICK_CLOSE_REPAY_POP-UP_BUTTON",
    },
  },
  lending: {
    click_arrow: {
      supply: "CLICK_ARROW_TO_OPEN_SUPPLY_ASSETS_TABLE",
      borrow: "CLICK_ARROW_TO_OPEN_BORRROW_ASSETS_TABLE",
      your_supply: "CLICK_ARROW_TO_OPEN_YOUR_SUPPLY_ASSETS_TABLE",
      your_borrow: "CLICK_ARROW_TO_OPEN_YOUR_BORROW_ASSETS_TABLE",
    },
    market_details: "CLICK_MARKET_DETAILS",
    open_modal: {
      supply: {
        supply_button: "CLICK_SUPPLY_ON_SUPPLY_ASSETS_TABLE",
        withdraw_button: "CLICK_WITHDRAW_ON_SUPPLY_ASSETS_TABLE",
      },
      borrow: {
        borrow_button: "CLICK_BORROW_ON_BORROW_ASSETS_TABLE",
        repay_button: "CLICK_REPAY_ON_BORROW_ASSETS_TABLE",
      },
      your_supply: {
        supply_button: "CLICK_SUPPLY_ON_YOUR_SUPPLY_ASSETS_TABLE",
        withdraw_button: "CLICK_WITHDRAW_ON_YOUR_SUPPLY_ASSETS_TABLE",
      },
      your_borrow: {
        borrow_button: "CLICK_BORROW_ON_YOUR_BORROW_ASSETS_TABLE",
        repay_button: "CLICK_REPAY_ON_YOUR_BORROW_ASSETS_TABLE",
      },
    },
    collateral: {
      enable: "CLICK_ENABLE_COLLATERAL_ON_YOUR_SUPPLY_ASSETS_TABLE",
      disable: "CLICK_DISABLE_COLLATERAL_ON_YOUR_SUPPLY_ASSETS_TABLE",
    },
  },
  markets: {
    details: "CLICK_DETAILS_BUTTON",
  },
  liquidate: {
    details: "CLICK_DETAILS_BUTTON",
  },
};
