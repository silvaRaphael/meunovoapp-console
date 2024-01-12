import { Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function NotificationMessageEmail({
  title,
  name,
  projectName,
  description,
}: {
  title: string;
  name: string;
  projectName: string;
  description: string;
}) {
  return (
    <EmailBase title={title}>
      <Text style={{ fontSize: 18 }}>{name ? `Olá ${name},` : "Olá,"}</Text>
      <Text>
        Gostaríamos de informar que houve recentes atualizações no projeto {projectName}. Estamos comprometidos em
        manter você sempre informado sobre o progresso e as novas tarefas.
      </Text>
      <Text style={{ fontSize: 18 }}>Resumo das Atualizações</Text>
      <div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{description}</div>
      <Text style={{ fontSize: 18 }}>Próximos Passos:</Text>
      <Text>
        <span style={{ fontWeight: 600 }}>Acessar as Atualizações: </span>
        <br />
        Faça login com sua conta na plataforma
        <br />
        Navegue até a seção do projeto {projectName}
        <br />
        Explore as novas tarefas, marcos alcançados e quaisquer outras atualizações disponíveis.
      </Text>
      <Text>
        <span style={{ fontWeight: 600 }}>Feedback e Comentários: </span>
        <br />
        Convidamos você a compartilhar seu feedback sobre as novas tarefas e o progresso atual.
        <br />
        Se houver perguntas ou sugestões, por favor, não hesite em nos contatar.
      </Text>
      <Text>
        Agradecemos pelo seu contínuo envolvimento e colaboração neste projeto. Estamos aqui para garantir que cada
        etapa seja transparente e alinhada aos seus objetivos.
      </Text>
      <Text>
        Se precisar de mais informações ou assistência, sinta-se à vontade para responder a este e-mail ou entrar em
        contato diretamente através da plataforma.
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
