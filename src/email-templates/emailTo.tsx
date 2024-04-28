import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Text,
  } from "@react-email/components";
  import { Tailwind } from "@react-email/tailwind";
  import * as React from "react";
  
  const baseUrl = process.env.APP_URL
    ? `http://${process.env.APP_URL}`
    : "";
  
  export const NewEmailTemplate = () => {
  
    return (
      <Html>
        <Head />
        {/* <Preview>{previewText}</Preview> */}
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-3xl">
              <Text className="text-black text-[14px] leading-[24px]">
                Olá Prezado(a),
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Agradeço por entrar em contato e seu interesse no meu trabalho.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Se você tiver perguntas específicas ou se houver algum projeto em meu portfólio que chamou sua atenção, por favor me avise, e terei prazer em fornecer mais informações detalhadas.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Estou ansioso para nos conectarmos e discutirmos como posso contribuir para o seu projeto ou equipe. Responderei o mais breve possível.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Atenciosamente,
              </Text>
              <Text className="text-black font-bold text-[14px] leading-[24px] my-[3px]">              
                  Marouane Pondikpa
              </Text>
              <Text className="text-black font-bold text-[14px] leading-[24px] my-[3px] flex gap-6 w-16">
              <Img
                  src="https://i.imgur.com/yC4n9nP.png"
                //   {`${baseUrl}/linkedin3.png`}
                  width="25"
                  height="20"
                  alt="Vercel"
                  className="my-0 mx-auto mr-2"
                />
              <Link
                style={anchor}
                href="https://www.linkedin.com/in/marouane-pondikpa"
              >
                Linkedin
              </Link>{" "}
              </Text>
              <Text className="text-black font-bold text-[14px] leading-[24px] my-[3px] flex gap-6 w-16">
              <Img
                  src="https://i.imgur.com/g6ArwuY.png"
                //   {`${baseUrl}/github3.png`}
                  width="24"
                  height="20"
                  alt="Vercel"
                  className="my-0 mx-auto mr-2"
                />
              <Link
                style={anchor}
                href="https://github.com/maxfortune93"
              >
                Github
              </Link>{" "}
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
    
  export default NewEmailTemplate;
  
  const anchor = {
    color: "#3b82f6",
  };