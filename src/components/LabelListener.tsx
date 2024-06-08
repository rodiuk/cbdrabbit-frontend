"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocaleStorage";
import { constants } from "@/configs/constants";

export default function LabelListener(): React.JSX.Element {
  const searchParams = useSearchParams();

  const [existedLabels, setLabels] = useLocalStorage(constants.UTM_LABELS, "");

  const utm_campaign = searchParams.get(constants.UTM_CAMPAIGN) || null;
  const utm_content = searchParams.get(constants.UTM_CONTENT) || null;
  const utm_medium = searchParams.get(constants.UTM_MEDIUM) || null;
  const utm_source = searchParams.get(constants.UTM_SOURCE) || null;
  const utm_term = searchParams.get(constants.UTM_TERM) || null;

  const labels = React.useMemo(() => {
    return {
      ...(!!utm_campaign && { utm_campaign }),
      ...(!!utm_content && { utm_content }),
      ...(!!utm_medium && { utm_medium }),
      ...(!!utm_source && { utm_source }),
      ...(!!utm_term && { utm_term }),
    };
  }, [searchParams]);

  React.useEffect(() => {
    if (!Object.values(labels).length) return;

    setLabels({ ...existedLabels, ...labels });
  }, [labels]);

  return <></>;
}
