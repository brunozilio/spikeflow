import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  url: string;
}

export function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Acesse sua conta Spikeflow</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Acesse sua conta Spikeflow</Heading>

          <Text style={text}>Olá!</Text>

          <Text style={text}>
            Clique no botão abaixo para acessar sua conta Spikeflow:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Acessar Spikeflow
            </Button>
          </Section>

          <Text style={text}>Ou copie e cole este link no seu navegador:</Text>

          <Text style={link}>{url}</Text>

          <Section style={footer}>
            <Text style={footerText}>Este link expira em 5 minutos.</Text>
            <Text style={footerText}>
              Se você não solicitou este email, pode ignorá-lo com segurança.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const h1 = {
  color: "#000",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const buttonContainer = {
  margin: "24px 0",
};

const button = {
  backgroundColor: "#000",
  background: "linear-gradient(135deg, #FCD34D 0%, #FBBF24 50%, #F59E0B 100%)",
  borderRadius: "6px",
  color: "#000",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const link = {
  color: "#666",
  fontSize: "14px",
  wordBreak: "break-all" as const,
  margin: "16px 0",
};

const footer = {
  marginTop: "40px",
};

const footerText = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "8px 0",
};
