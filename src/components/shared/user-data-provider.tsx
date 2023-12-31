import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { addMinutes } from "date-fns";
import { Role } from "config/roles";

export interface UserData {
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

type UserDataProviderProps = {
    children: React.ReactNode;
    storageKey?: string;
};

type UserDataProviderState = {
    userData: UserData | null;
    setUserData: (userData: UserData) => void;
    removeUserData: () => void;
};

const initialState: UserDataProviderState = {
    userData: null,
    setUserData: () => null,
    removeUserData: () => null,
};

const UserDataProviderContext = createContext<UserDataProviderState>(initialState);

export function UserDataProvider({ children, storageKey = "meunovoapp-user-data", ...props }: UserDataProviderProps) {
    const [userData, setUserData] = useState<UserData | null>(
        () => JSON.parse(Cookies.get(storageKey) || "{}") as UserData,
    );

    const value = {
        userData,
        setUserData: (userData: UserData) => {
            Cookies.set(storageKey, JSON.stringify(userData), {
                expires: addMinutes(new Date(), 90),
            });
            setUserData(userData);
        },
        removeUserData: async () => {
            Cookies.remove(storageKey);
            setUserData(null);
        },
    };

    return (
        <UserDataProviderContext.Provider {...props} value={value}>
            {children}
        </UserDataProviderContext.Provider>
    );
}

export const useUserData = () => {
    const context = useContext(UserDataProviderContext);

    if (context === undefined) throw new Error("useUserData must be used within a UserDataProvider");

    return context;
};
