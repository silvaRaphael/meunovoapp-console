import { Body, Button, Column, Container, Head, Heading, Html, Preview, Row, Section, Text } from "@react-email/components";
import { ReactNode } from "react";

export function EmailBase({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <Html
            style={{
                backgroundColor: "#f4f4f5",
            }}
        >
            <Head>
                <Preview>{title}</Preview>
            </Head>
            <Body>
                <Section
                    style={{
                        color: "#18181b",
                        backgroundColor: "#f4f4f5",
                    }}
                >
                    <Container
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <Row
                            style={{
                                width: "min-content",
                            }}
                        >
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
                                        color: "rgb(239, 68, 68)",
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
                            textAlign: "center",
                            height: 80,
                            backgroundColor: "#18181b",
                        }}
                    >
                        <Row>
                            <Heading
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    margin: 20,
                                    color: "#f4f4f5",
                                }}
                            >
                                {title}
                            </Heading>
                        </Row>
                    </Container>
                    <Container
                        style={{
                            display: "block",
                            padding: 20,
                            backgroundColor: "#fff",
                        }}
                    >
                        {children}
                    </Container>
                    <Container
                        style={{
                            textAlign: "center",
                            backgroundColor: "#18181b",
                        }}
                    >
                        <Button
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                margin: 16,
                                color: "#f4f4f5",
                            }}
                            href="https://meunovoapp.com.br"
                        >
                            {new Date().getFullYear()} © MeuNovoApp
                        </Button>
                    </Container>
                </Section>
            </Body>
        </Html>
    );
}
