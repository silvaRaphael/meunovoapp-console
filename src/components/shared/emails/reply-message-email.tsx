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
			<Text className="text-lg">
				Olá {name}
				{name && ","}
			</Text>
			<Text>
				Agradecemos por sua paciência enquanto analisávamos sua
				mensagem. Ficamos felizes em informar que revisamos
				cuidadosamente seus requisitos e estamos prontos para fornecer a
				melhor solução para atender às suas necessidades.
			</Text>
			<Text>
				Com base na análise de suas necessidades, elaboramos uma
				proposta personalizada que inclui detalhes sobre o escopo do
				projeto, prazos estimados e uma estrutura de preços
				transparente. Estamos confiantes de que nossa abordagem atenderá
				plenamente às suas expectativas.
			</Text>
			<Text className="text-lg">Proposta Personalizada:</Text>
			<Text className="text-md font-semibold">Detalhes do Projeto:</Text>
			<div
				className="text-sm"
				dangerouslySetInnerHTML={{
					__html: projectDetails.replace(/\n/g, "<br />"),
				}}
			/>
			<Text className="text-md font-semibold">Escopo do Projeto:</Text>
			{projectScope.map((item, i) => (
				<Fragment key={i}>
					<Text className="text-md">{item.title}</Text>
					<div
						className="text-sm"
						dangerouslySetInnerHTML={{
							__html: item.value.replace(/\n/g, "<br />"),
						}}
					/>
				</Fragment>
			))}
			<Text className="text-md font-semibold">Prazos Estimados:</Text>
			<Text>
				<span className="font-semibold">Início do Projeto: </span>
				{format(addDays(new Date(), 7), "PPP", { locale: ptBR })}
			</Text>
			<Text>
				<span className="font-semibold">
					Conclusão do Desenvolvimento:{" "}
				</span>
			</Text>
			<Text>
				{format(
					addDays(new Date(), 7 + Number(projectDueDays || 0)),
					"PPP",
					{
						locale: ptBR,
					}
				)}
			</Text>
			<Text className="text-md font-semibold">Estrutura de Preços:</Text>
			<div
				className="text-sm"
				dangerouslySetInnerHTML={{
					__html: projectPayment.replace(/\n/g, "<br />"),
				}}
			/>
			<br />
			<Text className="text-md font-semibold">
				Benefícios Adicionais:
			</Text>
			<div
				className="text-sm"
				dangerouslySetInnerHTML={{
					__html: projectBenefits.replace(/\n/g, "<br />"),
				}}
			/>
			<Text className="text-lg">Próximos Passos:</Text>
			<Text>
				<span className="font-semibold">Discussão Detalhada: </span>
				Estamos disponíveis para uma reunião para discutir a proposta em
				detalhes, esclarecer quaisquer dúvidas e ajustar conforme
				necessário.
			</Text>
			<Text>
				<span className="font-semibold">Aprovação da Proposta: </span>
				Após sua revisão, aguardamos sua aprovação para iniciarmos o
				processo de desenvolvimento.
			</Text>
			<Text>
				Estamos entusiasmados com a possibilidade de colaborar no seu
				projeto e transformar suas ideias em realidade. Aguardamos
				ansiosamente o seu retorno.
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
