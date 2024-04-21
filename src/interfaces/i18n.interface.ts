export interface ICheckoutDict {
  contactTitle: string;
  deliveryTitle: string;
  npDelivery: string;
  npCostLabel: string;
  userLabelPhone: string;
  userLabelLastName: string;
  userLabelFirstName: string;
  userLabelPlaceholderLastName: string;
  userLabelPlaceholderFirstName: string;
  payTitle: string;
  payLabelFirst: string;
  payLabelSecond: string;
  orderTitle: string;
  formError: string;
  totalAmountTitle: string;
  discountTitle: string;
  personalDiscount: string;
  deliveryDisclaimer: string;
  totalCheckout: string;
  checkoutDisclaimer: string;
  checkoutButton: string;
}

export interface IProfileDict {
  userPasswordTitle: string;
  passwordExist: string;
  passwordNotExist: string;
  deliveryTitle: string;
  deliveryDisclaimer: string;
  npLabel: string;
  deleteAccount: string;
  deleteAccountBtn: string;
  changeEmailTitle: string;
  changeEmailSubtitle: string;
  changeEmailSecondSubtitle: string;
  changeEmailInputLabel: string;
  changeEmailInputPlaceholder: string;
  changeEmailInputError: string;
  changeEmailBtn: string;
  changePasswordLabel: string;
  changePasswordOldInputLabel: string;
  changePasswordOldInputPlaceholder: string;
  changePasswordOldInputError: string;
  changePasswordNewFirstLabel: string;
  changePasswordNewFirstPlaceholder: string;
  changePasswordNewSecondLabel: string;
  changePasswordNewInputError: string;
  changePasswordBtn: string;
  changeDeliveryLabel: string;
  changeDeliveryButtonReset: string;
  changeDeliveryButtonCancel: string;
  changeDeliveryButtonSave: string;
  personalDiscountTitle: string;
  personalDiscountLabel: string;
  totalAmountTitle: string;
  totalAmountOrders: string;
  amountDisclaimer: string;
  registerLabel: string;
  discountLabel: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}

export interface IHeaderDict {
  titles: {
    signIn: string;
    signUp: string;
    checkout: string;
    success: string;
    profile: string;
    orders: string;
    contacts: string;
    cooperation: string;
    blog: string;
    post: string;
    about: string;
    whereToBuy: string;
  };
  links: {
    signIn: string;
    profile: string;
    orders: string;
    signOut: string;
    main: string;
    checkout: string;
    socials: string;
  };
}

export interface IOrderDict {
  noOrdersTitle: string;
  choiceCandy: string;
  amountLabel: string;
  orderAgainBtn: string;
}