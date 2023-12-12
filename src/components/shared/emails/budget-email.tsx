import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function BudgetEmail({
    name,
    email,
    phone,
    company,
    role,
    description,
    projectType,
    budget,
    due,
}: {
    name: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    description: string;
    projectType: string;
    budget: string;
    due: string;
}) {
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
            <Text>
                {description && <>Descrição: {description}</>}
                <br />
                {projectType && (
                    <>
                        Serviço: {projectType}
                        <br />
                    </>
                )}
                {budget && (
                    <>
                        Orçamento: {budget}
                        <br />
                    </>
                )}
                {due && (
                    <>
                        Prazo: {due}
                        <br />
                    </>
                )}
                {company && (
                    <>
                        Empresa: {company}
                        <br />
                    </>
                )}
                {role && (
                    <>
                        Cargo: {role}
                        <br />
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
