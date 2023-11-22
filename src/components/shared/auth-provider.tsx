import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { addMinutes } from "date-fns";
import { Role } from "config/roles";

export interface Auth {
    name: string;
    email: string;
    role: Role;
    token: string;
}

type AuthProviderProps = {
    children: React.ReactNode;
    storageKey?: string;
};

type AuthProviderState = {
    auth: Auth | null;
    setAuth: (auth: Auth) => void;
    removeAuth: () => void;
};

const initialState: AuthProviderState = {
    auth: null,
    setAuth: () => null,
    removeAuth: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, storageKey = "meunovoapp-auth", ...props }: AuthProviderProps) {
    const [auth, setAuth] = useState<Auth | null>(() => JSON.parse(Cookies.get(storageKey) || "{}") as Auth);

    const value = {
        auth,
        setAuth: (auth: Auth) => {
            Cookies.set(storageKey, JSON.stringify(auth), {
                expires: addMinutes(new Date(), 90),
            });
            setAuth(auth);
        },
        removeAuth: () => {
            Cookies.remove(storageKey);
            setAuth(null);
        },
    };

    return (
        <AuthProviderContext.Provider {...props} value={value}>
            {children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");

    return context;
};
