import { Body, Container, Head, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  userEmail?: string;
  userMessage?: string
}
export function EmailTemplate({
  userEmail,
  userMessage
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-4xl">
              <Text className="text-black text-[14px] leading-[24px]">
                Olá Marouane,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Alguém entrou em contato com.
              </Text>
              <Text className="text-black text-[14px] leading-[24px] ">
                  <Text className="font-bold my-[2px]">EMAIL:</Text>
                  <Text className="my-[2px]">{userEmail}</Text>
              </Text>
              <Text className="text-black text-[14px] leading-[24px] flex flex-col">
                <Text className="font-bold my-[2px]">A mensagem da pessoa</Text>
                <Text className="my-[2px]">{userMessage}</Text>
              </Text>
            </Container>
          </Body>
        </Tailwind>
    </Html>
  );
}