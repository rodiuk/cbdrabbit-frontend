export interface Localization {
  header: HeaderLocales;
  footer: FooterLocales;
  currency: string;
  cartBanner: CartBannerLocales;
  recoveryPassword: RecoveryPasswordLocales;
  auth: AuthLocales;
  checkout: CheckoutLocales;
  profile: ProfileLocales;
  orders: OrdersLocales;
  home: HomeLocales;
  meta: MetaLocales;
  landings: LandingsLocales;
}

export interface HeaderLocales {
  titles: HeaderTitlesLocales;
  links: HeaderLinksLocales;
}

export interface HeaderTitlesLocales {
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
}

export interface HeaderLinksLocales {
  signIn: string;
  profile: string;
  orders: string;
  signOut: string;
  main: string;
  checkout: string;
  socials: string;
}

export interface FooterLocales {
  texts: {
    text1: string;
    text2: string;
    logIn: string;
  };
}

export interface CartBannerLocales {
  checkoutLabel: string;
  checkoutButton: string;
}

export interface RecoveryPasswordLocales {
  titleAskNew: string;
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

export interface AuthLocales {
  general: {
    successPassUpdateMessage: string;
    successEmailUpdateMessage: string;
    successPassUpdateBtn: string;
    updatePassTitle: string;
    updatePassButton: string;
    signUpProcess: string;
  };
  activate: {
    title: string;
    subTitle: string;
    button: string;
  };
  successSignUp: {
    title: string;
    subTitle: string;
    description: string;
    button: string;
  };
  signInEmail: {
    title: string;
    inputLabel: string;
    inputPlaceholder: string;
    button: string;
    buttonGoogle: string;
    buttonDividerLabel: string;
  };
  signInPassword: {
    title: string;
    inputLabel: string;
    inputPlaceholder: string;
    error: string;
    errorNotActivated: string;
    buttonSignIn: string;
    buttonBack: string;
  };
  signUpPassword: {
    title: string;
    firstInputPlaceholder: string;
    secondInputPlaceholder: string;
    buttonSignUp: string;
    error: string;
  };
  signInNotExist: {
    title: string;
    description: string;
    buttonSignUp: string;
    buttonBack: string;
  };
  lastChance: {
    title: string;
    description: string;
    button: string;
  };
}

export interface CheckoutLocales {
  existedClient: string;
  divider: string;
  contactTitle: string;
  deliveryTitle: string;
  npDelivery: string;
  userLabelPhone: string;
  userLabelLastName: string;
  userLabelEmail: string;
  userLabelPlaceholderLastName: string;
  userLabelFirstName: string;
  userLabelPlaceholderFirstName: string;
  npCostLabel: string;
  payTitle: string;
  payLabelFirst: string;
  payLabelSecond: string;
  orderTitle: string;
  formError: string;
  totalAmountTitle: string;
  personalDiscount: string;
  discountTitle: string;
  deliveryDisclaimer: string;
  totalCheckout: string;
  checkoutDisclaimer: string;
  checkoutButton: string;
  commentTitle: string;
  commentLabel: string;
}

export interface ProfileLocales {
  userPasswordTitle: string;
  passwordExist: string;
  passwordNotExist: string;
  deliveryTitle: string;
  deliveryDisclaimer: string;
  npLabel: string;
  deleteAccount: string;
  deleteAccountBtn: string;
  askDeleteAccount: string;
  cancelDeleteAccount: string;
  confirmDeleteAccount: string;
  deleteDeliveryTitle: string;
  askDeleteDelivery: string;
  cancelDeleteDelivery: string;
  confirmDeleteDelivery: string;
  emailFieldTitle: string;
  phoneFieldTitle: string;
  lastNameFieldTitle: string;
  firstNameFiledTitle: string;
  deliveryFieldTitle: string;
  noInfo: string;
  changeEmailTitle: string;
  changeEmailSubtitle: string;
  changeEmailSecondSubtitle: string;
  changeEmailInputLabel: string;
  changeEmailInputError: string;
  changeEmailInputPlaceholder: string;
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

export interface OrdersLocales {
  successPayed: string;
  successOrderNumber: string;
  successOrderLabel: string;
  successOrderButton: string;
  noOrdersTitle: string;
  choiceCandy: string;
  amountLabel: string;
  orderAgainBtn: string;
  orderSuccess: string;
  buttonLabel: string;
  statusCreated: string;
  statusPaid: string;
  statusSended: string;
  statusDelivered: string;
  statusCanceled: string;
  statusCompleted: string;
  statusSuccess: string;
  notVerifiedAccount: string;
  openEmail: string;
}

export interface HomeLocales {
  title: string;
  product: {
    firstOrder: string;
    notAvailable: string;
    discountLabel: string;
    discountList: string[];
  };
}

export interface MetaLocales {
  title: string;
  description: string;
}

export interface LandingsLocales {
  landing: LandingItemLocales[];
  about: AboutItemLocales[];
  firstButton: string;
  secondButton: string;
}

export interface LandingItemLocales {
  id: string;
  title1: string;
  title2: string;
  title3: string;
  description: {
    id: number;
    descr: string;
  }[];
  weightCandy: string;
  accordeon: {
    id: string;
    title: string;
    text: string;
  }[];
}

export interface AboutItemLocales {
  id: string;
  text1: string;
  text2: string;
}
