import { Body, Head, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export function EmailTemplate() {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
        <Text className="text-sm">
            You can view your payments and a variety of other information about
            your account right from your dashboard.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
}