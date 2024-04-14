export interface ISignInEmailDict {
  title: string;
  inputPlaceholder: string;
  inputLabel: string;
  button: string;
  buttonDividerLabel: string;
  buttonGoogle: string;
}

export interface IActivateDict {
  title: string;
  subTitle: string;
  button: string;
}

export interface ISuccessSignUpDict {
  title: string;
  subTitle: string;
  description: string;
  button: string;
}

export interface ISignInPasswordDict {
  title: string;
  inputLabel: string;
  inputPlaceholder: string;
  error: string;
  errorNotActivated: string;
  buttonSignIn: string;
  buttonBack: string;
}

export interface ISignUpPasswordDict {
  title: string;
  firstInputPlaceholder: string;
  secondInputPlaceholder: string;
  buttonSignUp: string;
  error: string;
}

export interface ISignInNotExistDict {
  title: string;
  description: string;
  buttonSignUp: string;
  buttonBack: string;
}

export interface ILastChanceDict {
  title: string;
  description: string;
  button: string;
}
