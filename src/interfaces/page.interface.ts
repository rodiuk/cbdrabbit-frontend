import { ReactNode } from "react";
import { Locale } from "../../i18n.config";

export interface IMainPageProps {
  params: IPageParams;
  searchParams: ISearchParams;
}

export interface IPageProps extends IMainPageProps {
  children: ReactNode;
}

export interface IPageParams {
  lang: Locale;
  postId: string;
  landId: string;
  [key: string]: string;
}

export interface ISearchParams {
  [key: string]: string;
}
