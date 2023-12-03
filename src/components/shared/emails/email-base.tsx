import { Button, Column, Container, Head, Heading, Html, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import { ReactNode } from "react";

export function EmailBase({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <Html
            style={{
                backgroundColor: "hsl(240 4.8% 95.9%)",
            }}
        >
            <Head>
                <Preview>{title}</Preview>
            </Head>
            <Section
                style={{
                    color: "hsl(240 5.9% 10%)",
                }}
            >
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Row>
                        <Column>
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                    width: "min-content",
                                }}
                            >
                                Meu
                            </Text>
                        </Column>
                        <Column>
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                    width: "min-content",
                                    color: "rgb(239 68 68)",
                                }}
                            >
                                Novo
                            </Text>
                        </Column>
                        <Column>
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                    width: "min-content",
                                }}
                            >
                                App
                            </Text>
                        </Column>
                    </Row>
                </Container>
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "hsl(240 5.9% 10%)",
                        color: "hsl(240 4.8% 95.9%)",
                        padding: 32,
                    }}
                >
                    <Heading
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        {title}
                    </Heading>
                </Container>
                <Container
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: 32,
                        backgroundColor: "hsl(var(240 5.9% 10%) / 0.5)",
                    }}
                >
                    {children}
                </Container>
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 16,
                        backgroundColor: "hsl(240 5.9% 10%)",
                        color: "hsl(240 4.8% 95.9%)",
                    }}
                >
                    <Button
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                        href="https://meunovoapp.com.br"
                    >
                        Ir para o site
                    </Button>
                </Container>
            </Section>
        </Html>
    );
}
