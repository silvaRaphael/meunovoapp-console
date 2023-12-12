import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function ContactEmail({ name, email, phone, message }: { name: string; email: string; phone: string; message: string }) {
    return (
        <EmailBase title="Agradecemos pelo seu Contato">
            <Text style={{ fontSize: 18 }}>
                Olá {name}
                {name && ","}
            </Text>
            <Text>
                Agradecemos por entrar em contato conosco! Sua mensagem foi recebida com sucesso e estamos empolgados em saber mais sobre suas necessidades e como podemos ajudar.
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 18 }}>Detalhes da Sua Mensagem:</Text>
            <Text style={{ marginBottom: -4 }}>
                {message && (
                    <>
                        Mensagem:{" "}
                        <div
                            style={{ fontSize: 14 }}
                            dangerouslySetInnerHTML={{
                                __html: message.replace(/\n/g, "<br />"),
                            }}
                        />
                    </>
                )}
                Nome: {name}
                <br />
                E-mail: {email}
                <br />
                Telefone: {phone}
                <br />
            </Text>
            <Text>
                Nossa equipe está revisando cuidadosamente a sua mensagem e se dedicará a oferecer a melhor resposta possível. Comprometemo-nos em fornecer uma resposta o mais
                breve possível.
            </Text>
            <Text>
                Enquanto isso, sinta-se à vontade para explorar mais sobre a MeuNovoApp em nosso site ou entrar em contato diretamente caso surjam informações adicionais que você
                gostaria de compartilhar.
            </Text>
            <Text>Agradecemos novamente por escolher a MeuNovoApp. Estamos ansiosos para a oportunidade de colaborar e fornecer a você a melhor solução possível.</Text>
            <Text>
                Atenciosamente,
                <br />
                Raphael Silva
                <br />
                MeuNovoApp
            </Text>
        </EmailBase>
    );
}
