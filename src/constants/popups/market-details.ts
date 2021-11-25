export const MARKET_DETAILS = {
  utilizationRate: {
    title: 'Utilisation rate',
    description: 'The amount of loan that has been taken by the user of the lending protocol, divided by the total amount of loan available.',
  },
  collateralFactor: {
    title: 'Collateral Factor',
    description: 'The available loan amount is limited by the amount of provided collateral. The Collateral Factor value may differ for each supplied asset. For example, if the user’s collateral is 100 XTZ, and the posted collateral factor for XTZ is 75%, then the user can borrow another asset, the value of which at the time of the transaction does not exceed 75 XTZ.',
  },
  liquidationThreshold: {
    title: 'Liquidation threshold',
    description: 'The threshold value at which the debt position is considered insufficiently collateralized and is subject to liquidation. For example, if the liquidation threshold for an asset is 75% when the debt value reaches 75% of the collateral and above, the loan will be liquidated.',
  },
  liquidationBonus: {
    title: 'Liquidation bonus',
    description: 'During liquidation, another user can repay part of the outstanding amount instead of the borrower and buy his collateral at a discount, receiving a bonus equal to the difference between the liquidation threshold for a specific debt position and the actual debt value at the time of liquidation',
  },
  exchangeRate: {
    title: 'Exchange Rate',
  },
};
