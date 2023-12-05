import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Fragment } from "react";

export function ReplyMessageEmail({
    title,
    name,
    projectDetails,
    projectScope,
    projectDueDays,
    projectPayment,
    projectBenefits,
}: {
    title: string;
    name: string;
    projectDetails: string;
    projectScope: { title: string; value: string }[];
    projectDueDays: string;
    projectPayment: string;
    projectBenefits: string;
}) {
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
            <Text>
                Com base na análise de suas necessidades, elaboramos uma proposta personalizada que inclui detalhes sobre o escopo do projeto, prazos estimados e uma estrutura de
                preços transparente. Estamos confiantes de que nossa abordagem atenderá plenamente às suas expectativas.
            </Text>
            <Text style={{ fontSize: 18 }}>Proposta Personalizada:</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Detalhes do Projeto:</Text>
            <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html: projectDetails.replace(/\n/g, "<br />"),
                }}
            />
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Escopo do Projeto:</Text>
            {projectScope.map((item, i) => (
                <Fragment key={i}>
                    <Text style={{ fontWeight: 600, marginBottom: 0 }}>{item.title}</Text>
                    <div
                        style={{ fontSize: 14 }}
                        dangerouslySetInnerHTML={{
                            __html: item.value.replace(/\n/g, "<br />"),
                        }}
                    />
                </Fragment>
            ))}
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Prazos Estimados:</Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Início do Projeto: </span>
                {format(addDays(new Date(), 7), "PPP", { locale: ptBR })}
            </Text>
            <Text style={{ marginBottom: -16 }}>
                <span style={{ fontWeight: 600 }}>Conclusão do Desenvolvimento: </span>
            </Text>
            <Text>
                {format(addDays(new Date(), 7 + Number(projectDueDays || 0)), "PPP", {
                    locale: ptBR,
                })}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 0 }}>Estrutura de Preços:</Text>
            <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html: projectPayment.replace(/\n/g, "<br />"),
                }}
            />
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 0 }}>Benefícios Adicionais:</Text>
            <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                    __html: projectBenefits.replace(/\n/g, "<br />"),
                }}
            />
            <Text style={{ fontSize: 18 }}>Próximos Passos:</Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Discussão Detalhada: </span>
                Estamos disponíveis para uma reunião para discutir a proposta em detalhes, esclarecer quaisquer dúvidas e ajustar conforme necessário.
            </Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Aprovação da Proposta: </span>
                Após sua revisão, aguardamos sua aprovação para iniciarmos o processo de desenvolvimento.
            </Text>
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
