import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function ReplyMessageEmail({ title, name, receivedMessage, message }: { title: string; name: string; receivedMessage: string; message: string }) {
    return (
        <EmailBase title={title}>
            <Text style={{ fontSize: 18 }}>
                Olá {name}
                {name && ","}
            </Text>
            <Text>
                Agradecemos por sua paciência enquanto analisávamos sua mensagem. Ficamos felizes em informar que revisamos cuidadosamente seus requisitos e estamos prontos para
                fornecer a melhor solução para atender às suas necessidades.
            </Text>
            <Text style={{ fontSize: 18 }}>Sua Mensagem:</Text>
            <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html: receivedMessage.replace(/\n/g, "<br />"),
                }}
            />
            <Text style={{ fontSize: 18 }}>Nossa Resposta:</Text>
            <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html: message.replace(/\n/g, "<br />"),
                }}
            />
            <Text>Estamos entusiasmados com a possibilidade de colaborar no seu projeto e transformar suas ideias em realidade. Aguardamos ansiosamente o seu retorno.</Text>
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
