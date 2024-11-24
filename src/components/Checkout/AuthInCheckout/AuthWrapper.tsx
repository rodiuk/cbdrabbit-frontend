import React from "react";
import { useSearchParams } from "next/navigation";
import { SignInPassword } from "@/components/forms/auth/SignInPassword";
import { SignInEmailForm } from "@/components/forms/auth/SignInEmailForm";

interface AuthWrapperProps {
  dict: any;
}

export const AuthModalContent = (
  props: AuthWrapperProps
): React.JSX.Element => {
  const { dict } = props;

  const searchParams = useSearchParams();

  const { signInEmail, signInPassword } = dict?.auth;

  const email = searchParams?.get("email");

  const renderedContent = React.useMemo(() => {
    switch (true) {
      case email && email?.length > 0:
        return (
          <SignInPassword dict={signInPassword} externalPath="/checkout" />
        );
      default:
        return (
          <SignInEmailForm
            dict={signInEmail}
            hideTitle
            externalPath="/checkout"
            externalUse
          />
        );
    }
  }, [searchParams]);

  return <>{renderedContent}</>;
};
