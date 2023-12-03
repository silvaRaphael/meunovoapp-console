import { Auth, useAuth } from "components/shared/auth-provider";

export const HandlePermission = (callback?: any) => {
    const { auth } = useAuth();

    if (!auth || auth.role !== "master") return <></>;
    return callback;
};

export const hasPermission = (auth: Auth | null) => {
    return auth?.role === "master";
};
