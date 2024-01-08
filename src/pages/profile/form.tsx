import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { Separator } from "../../components/ui/separator";
import { errorToast } from "components/shared/error-toast";
import { useLanguage } from "components/shared/language-provider";
import { useUserData } from "components/shared/user-data-provider";
import { BASE_FILES } from "config/constants";
import { useState } from "react";
import { Button } from "components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { UpdateUserSchema, updateUserSchema } from "adapters/user";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { convertToBase64 } from "lib/helper";
import { User } from "pages/users/data/user";
import { PasswordInput } from "components/shared/password-input";

let emailTimeout: any;

export function ProfileForm({ user }: { user: User }) {
    const { userData, setUserData } = useUserData();
    const { language, writeLang } = useLanguage();

    const [passwordVisible, setPasswordVisible] = useState<boolean[]>([false, false]);

    const [avatar, setAvatar] = useState<string | null>(user.avatar ? `${BASE_FILES}/${user.avatar}` : null);
    const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

    const form = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
        mode: "onChange",
    });

    async function checkEmailAvailability(e: React.ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;

        if (!email.length) return;

        const request = await new HandleRequest({ email }).post(`/users/can-use-email`, { language });

        request.onError(() => {
            form.setError("email", {
                type: "validate",
                message: writeLang([
                    ["en", "Email not available"],
                    ["pt", "E-mail não disponível"],
                ]) as string,
            });
        });
    }

    async function onSubmit(data: UpdateUserSchema) {
        if (!userData) return;

        const request = await new HandleRequest({
            ...data,
            avatarName: avatar ? userData.avatar || "" : "",
            avatar: avatarBase64 || "",
        }).put(`/users`, { language });

        request.onDone((reponse) => {
            setUserData({
                name: data.name,
                email: data.email,
                role: userData?.role,
                avatar: reponse.avatar,
            });

            toast({
                title: writeLang([
                    ["en", "Profile updated successfully!"],
                    ["pt", "Perfil atualizado com sucesso!"],
                ]) as string,
            });

            form.reset({
                name: data.name,
                email: data.email,
                old_password: "",
                password: "",
            });
        });

        request.onError((error) => errorToast(error));
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-3 mb-4 sm:m-0">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Name"],
                                ["pt", "Nome"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your name"],
                                ["pt", "Altere seu nome"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter your name"],
                                            ["pt", "Digite seu nome"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Your name"],
                                                    ["pt", "Seu nome"],
                                                ]) as string
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-3 mb-4 sm:m-0">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Info"],
                                ["pt", "Informações"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your informations"],
                                ["pt", "Altere suas informações"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter your email"],
                                            ["pt", "Digite seu e-mail"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Your email"],
                                                    ["pt", "Seu e-mail"],
                                                ]) as string
                                            }
                                            onChange={(e) => {
                                                if (e.target.value.includes(" "))
                                                    e.target.value = e.target.value.replaceAll(" ", "");
                                                field.onChange(e);
                                                clearTimeout(emailTimeout);
                                                emailTimeout = setTimeout(() => checkEmailAvailability(e), 1000);
                                            }}
                                            name={field.name}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-3 mb-4 sm:m-0">
                        <h3 className="font-semibold leading-4">Avatar</h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your avatar"],
                                ["pt", "Altere o seu avatar"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 space-y-4">
                        <div className="flex flex-col items-center space-y-3">
                            <label htmlFor="avatar-input">
                                <Avatar className="w-32 h-32 p-0 aspect-square border cursor-pointer">
                                    <AvatarImage
                                        src={avatarBase64 ? avatarBase64 : avatar || undefined}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-muted/50 hover:bg-accent/60 group">
                                        <UploadCloudIcon className="text-muted-foreground/50 group-hover:text-primary/40" />
                                    </AvatarFallback>
                                </Avatar>
                            </label>
                            <FormDescription>
                                {writeLang([
                                    ["en", "Upload your avatar"],
                                    ["pt", "Envie o seu avatar"],
                                ])}
                            </FormDescription>
                            {(avatar || avatarBase64) && (
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setAvatar(null);
                                        setAvatarBase64(null);
                                    }}
                                >
                                    {writeLang([
                                        ["en", "Remove Image"],
                                        ["pt", "Excluir Imagem"],
                                    ])}
                                </Button>
                            )}
                            <FormItem className="flex flex-col">
                                <FormControl>
                                    <Input
                                        id="avatar-input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .gif"
                                        onChange={(event) => {
                                            if (!event.target) return;
                                            const { target } = event;

                                            if (!target.files?.length) return;

                                            const maxSizeInBytes = 1024 * 1024 * 1; // 1MB
                                            const fileSize = target.files[0].size;

                                            if (fileSize > maxSizeInBytes) {
                                                toast({
                                                    title: "Erro ao subir arquivo!",
                                                    description: "O tamanho do arquivo é maior que o limite (1MB).",
                                                    variant: "destructive",
                                                });
                                                target.value = "";

                                                return;
                                            }

                                            convertToBase64(target.files[0], (result) =>
                                                setAvatarBase64(result?.toString() || null),
                                            );
                                        }}
                                        className="hidden"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-3 mb-4 sm:m-0">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Password"],
                                ["pt", "Senha"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your password"],
                                ["pt", "Altere sua senha"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="old_password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <PasswordInput
                                            passwordVisible={passwordVisible[0]}
                                            setPasswordVisible={() =>
                                                setPasswordVisible([!passwordVisible[0], passwordVisible[1]])
                                            }
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            placeholder={
                                                writeLang([
                                                    ["en", "Old password"],
                                                    ["pt", "Senha antiga"],
                                                ]) as string
                                            }
                                        />
                                    </FormControl>
                                    <div className="flex">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <PasswordInput
                                            passwordVisible={passwordVisible[1]}
                                            setPasswordVisible={() =>
                                                setPasswordVisible([passwordVisible[0], !passwordVisible[1]])
                                            }
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            placeholder={
                                                writeLang([
                                                    ["en", "New password"],
                                                    ["pt", "Nova senha"],
                                                ]) as string
                                            }
                                        />
                                    </FormControl>
                                    <div className="flex">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton
                    label={
                        writeLang([
                            ["en", "Update Profile"],
                            ["pt", "Atualizar Perfil"],
                        ]) as string
                    }
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                    disabled={form.formState.errors.email != null}
                />
            </form>
        </Form>
    );
}
