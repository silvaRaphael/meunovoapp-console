import { Button, Link, Text } from "@react-email/components";
import { EmailBase } from "./email-base";

export function InviteUserEmail({ userId }: { userId: string }) {
    return (
        <EmailBase title="Agradecemos pelo seu Contato">
            <Text className="text-lg">Olá</Text>
            <Text>
                É com grande prazer que o recebemos na MeuNovoApp! Estamos entusiasmados por tê-lo(a) como parte da nossa comunidade e estamos ansiosos para ajudá-lo(a) a explorar
                todas as possibilidades que oferecemos.
            </Text>
            <Text className="text-lg">O que você encontrará em nossa plataforma:</Text>
            <Text>
                <span className="font-semibold">Recursos Personalizados: </span>
                Oferecemos uma variedade de recursos projetados para atender às suas necessidades específicas. Estamos aqui para simplificar sua experiência.
            </Text>
            <Text>
                <span className="font-semibold">Acompanhamento de Projeto: </span>
                Na plataforma você poderá acompanhar o andamento do seu projeto.
            </Text>

            <Button href={`https://console.meunovoapp.com.br/comecar?key=${userId}`}>Criar Conta</Button>

            <Text className="text-lg">Próximos Passos:</Text>
            <Text>
                <span className="font-semibold">Configuração do Perfil: </span>
                Personalize o seu perfil.
            </Text>
            <Text>
                <span className="font-semibold">Explorando a Plataforma: </span>
                <Link href="https://console.meunovoapp.com.br" target="_blank">
                    Acesse
                </Link>{" "}
                e comece a explorar os recursos disponíveis.
            </Text>

            <Text>Agradecemos por escolher a MeuNovoApp. Seja bem-vindo(a) e esperamos que sua experiência conosco seja excepcional.</Text>
            <Text>Se precisar de assistência ou tiver alguma dúvida, não hesite em entrar em contato. Estamos aqui para ajudar!</Text>
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
