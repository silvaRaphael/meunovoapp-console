import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function ReplyBudgetEmail({
    title,
    name,
    projectDetails,
    projectScope,
    projectStartDate,
    projectEndDate,
    projectPayment,
    projectBenefits,
}: {
    title: string;
    name: string;
    projectDetails: string;
    projectScope: string;
    projectStartDate: string;
    projectEndDate: string;
    projectPayment: string;
    projectBenefits: string;
}) {
    return (
        <EmailBase title={title}>
            <Text style={{ fontSize: 18 }}>{name ? `Olá ${name},` : "Olá,"}</Text>
            <Text>
                Agradecemos por sua paciência enquanto analisávamos sua mensagem. Ficamos felizes em informar que
                revisamos cuidadosamente seus requisitos e estamos prontos para fornecer a melhor solução para atender
                às suas necessidades.
            </Text>
            <Text>
                Com base na análise de suas necessidades, elaboramos uma proposta personalizada que inclui detalhes
                sobre o escopo do projeto, prazos estimados e uma estrutura de preços transparente. Estamos confiantes
                de que nossa abordagem atenderá plenamente às suas expectativas.
            </Text>
            <Text style={{ fontSize: 18 }}>Proposta Personalizada:</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Detalhes do Projeto:</Text>
            <div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{projectDetails}</div>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Escopo do Projeto:</Text>
            <div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{projectScope}</div>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Prazos Estimados:</Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Início do Projeto: </span>
                {projectStartDate}
            </Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Conclusão do Desenvolvimento: </span>
                {projectEndDate}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 0 }}>Estrutura de Preços:</Text>
            <div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{projectPayment}</div>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 0 }}>Benefícios Adicionais:</Text>
            <div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{projectBenefits}</div>
            <Text style={{ fontSize: 18 }}>Próximos Passos:</Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Discussão Detalhada: </span>
                Estamos disponíveis para uma reunião para discutir a proposta em detalhes, esclarecer quaisquer dúvidas
                e ajustar conforme necessário.
            </Text>
            <Text>
                <span style={{ fontWeight: 600 }}>Aprovação da Proposta: </span>
                Após sua revisão, aguardamos sua aprovação para iniciarmos o processo de desenvolvimento.
            </Text>
            <Text>
                Estamos entusiasmados com a possibilidade de colaborar no seu projeto e transformar suas ideias em
                realidade. Aguardamos ansiosamente o seu retorno.
            </Text>
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
