import { Link, Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function ResetPasswordEmail({ resetPasswordKey, name }: { resetPasswordKey: string; name: string }) {
  return (
    <EmailBase title="Recuperar sua senha">
      <Text style={{ fontSize: 18 }}>{name ? `Olá ${name},` : "Olá,"}</Text>
      <Text>
        Recebemos uma solicitação para recuperação de senha associada à sua conta na MeuNovoApp. Estamos aqui para
        ajudar a restabelecer seu acesso.
      </Text>

      <Text style={{ fontSize: 18 }}>Instruções para Recuperação de Senha:</Text>
      <Text style={{ marginTop: -8 }}>
        <span style={{ fontWeight: 600 }}>1. </span>
        <span>Clique no link a seguir para redefinir sua senha: </span>
        <Link href={`https://console.meunovoapp.com.br/recuperar-senha?p=${resetPasswordKey}`} target="_blank">
          Redefinir senha
        </Link>
        .
      </Text>
      <Text style={{ marginTop: -16 }}>
        <span style={{ fontWeight: 600 }}>2. </span>
        <span>Você será redirecionado(a) para uma página segura de redefinição de senha.</span>
      </Text>
      <Text style={{ marginTop: -16 }}>
        <span style={{ fontWeight: 600 }}>3. </span>
        <span>Insira uma nova senha segura e confirme-a.</span>
      </Text>

      <Text style={{ fontSize: 18 }}>Dicas para uma Senha Segura:</Text>
      <Text style={{ marginTop: -8 }}>
        <span style={{ fontWeight: 600 }}>⦁ </span>
        <span>Use uma combinação de letras maiúsculas e minúsculas.</span>
      </Text>
      <Text style={{ marginTop: -16 }}>
        <span style={{ fontWeight: 600 }}>⦁ </span>
        <span>Inclua números e caracteres especiais.</span>
      </Text>
      <Text style={{ marginTop: -16 }}>
        <span style={{ fontWeight: 600 }}>⦁ </span>
        <span>Evite usar informações pessoais óbvias.</span>
      </Text>

      <Text style={{ fontSize: 18 }}>Problemas ou Dúvidas?</Text>
      <Text>
        Se você enfrentar qualquer problema durante o processo ou tiver dúvidas, por favor, responda a este e-mail ou
        entre em contato conosco através de{" "}
        <Link href="https://meunovoapp.com.br" target="_blank">
          MeuNovoApp
        </Link>
        .
      </Text>

      <Text style={{ fontSize: 18 }}>Mantenha sua Conta Segura:</Text>
      <Text style={{ marginTop: -8 }}>
        <span style={{ fontWeight: 600 }}>⦁ </span>
        <span>Não compartilhe sua senha com ninguém.</span>
      </Text>
      <Text style={{ marginTop: -16 }}>
        <span style={{ fontWeight: 600 }}>⦁ </span>
        <span>Atualize sua senha regularmente para garantir a segurança da sua conta.</span>
      </Text>

      <Text>
        Agradecemos por escolher a MeuNovoApp. Estamos aqui para garantir que você tenha a melhor experiência possível.
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
