export interface ICheckoutDict {
  contactTitle: string;
  deliveryTitle: string;
  npDelivery: string;
  npCostLabel: string;
  userLabelPhone: string;
  userLabelEmail: string;
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
  commentTitle: string;
  commentLabel: string;
  promocodePlaceholder: string;
  promocodeError: string;
  promocodeApply: string;
  promocodeChecking: string;
  phoneHelp: string;
  emailHelp: string;
  createAccountLabel: string;
  greeting: string;
  novaPoshta: {
    deliveryMethodLabel: string;
    branch: string;
    parcelLocker: string;
    courier: string;
    cityTitle: string;
    cityPlaceholder: string;
    cityHint: string;
    popularCitiesTitle: string;
    addressTitle: string;
    addressPlaceholder: string;
    branchTitle: string;
    branchPlaceholder: string;
    parcelLockerTitle: string;
    parcelLockerPlaceholder: string;
    noResultsTitle: string;
    noResultsDescription: string;
    popularCities: string[];
  };
}

export interface IAuthActivate {
  title: string;
  subTitle: string;
  button: string;
}

export interface IProfileDict {
  userPasswordTitle: string;
  passwordExist: string;
  passwordNotExist: string;
  deliveryTitle: string;
  deliveryDisclaimer: string;
  askDeleteAccount: string;
  cancelDeleteAccount: string;
  confirmDeleteAccount: string;
  askDeleteDelivery: string;
  cancelDeleteDelivery: string;
  confirmDeleteDelivery: string;
  deleteDeliveryTitle: string;
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
  emailFieldTitle: string;
  phoneFieldTitle: string;
  lastNameFieldTitle: string;
  firstNameFiledTitle: string;
  deliveryFieldTitle: string;
  noInfo: string;
  maxDiscountTitle: string;
  maxDiscountSubtitle: string;
  deliveryBranchLabel: string;
  deliveryParcelLockerLabel: string;
  deliveryCourierLabel: string;
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
    checkoutInfo: string;
    aboutCbd: string;
    policy: string;
    privacy: string;
    buy: string;
    cabinet: string;
    candies: string;
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
  orderSuccess: string;
  buttonLabel: string;
  statusCreated: string;
  statusCanceled: string;
  statusPaid: string;
  statusCompleted: string;
  statusSended: string;
  statusDelivered: string;
  statusSuccess: string;
  trackingNumber: string;
  promocodeDiscount: string;
  candyPrice: string;
  deliveryTitle: string;
  deliveryCarrierRate: string;
  totalPaid: string;
  detailsTitle: string;
  commentTitle: string;
  noComment: string;
  statusTitle: string;
  customerTitle: string;
  closeButton: string;
  canceledWarning: string;
}

export interface IRecoveryPasswordDict {
  titleAsk: string;
  titleAskNew: string;
  messageAsk: string;
  buttonAsk: string;
  titleSuccess: string;
  titleSuccessEmail: string;
  messageSuccess: string;
  messageSuccessBase: string;
  labelSuccess: string;
  buttonSuccess: string;
}

export interface IAuthGeneral {
  successPassUpdateMessage: string;
  successPassUpdateBtn: string;
}

export interface IRecoveryPasswordDict {
  titleAsk: string;
  messageAsk: string;
  buttonAsk: string;
  titleSuccess: string;
  titleSuccessEmail: string;
  messageSuccess: string;
  messageSuccessBase: string;
  labelSuccess: string;
  buttonSuccess: string;
}

export interface IAuthGeneral {
  successPassUpdateMessage: string;
  successPassUpdateBtn: string;
}
