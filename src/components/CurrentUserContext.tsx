import * as React from 'react';

export type UserType = {
    email: string;
    password: string;
};
export type UserContextType = {
    currentUser?: UserType | null;
    setCurrentUser: (user: UserType) => void;
    checkLogin: () => void;
    setAuthLoading: (isLoading: boolean) => void;
    authLoading: boolean;
    handleLogout: () => void;
    testData: string;
};
export const CurrentUserContext = React.createContext<UserContextType | null>(null);

type ProviderProps = {
    children: React.ReactNode;
};
export const CurrentUserProvider = ({ children }: ProviderProps) => {
    const [currentUser, setCurrentUser] = React.useState<UserType | null>();
    const [authLoading, setAuthLoading] = React.useState(false);

    React.useEffect(() => {
        checkLogin();
    }, [])

    const checkLogin = () => {
        console.log("checkLogin")
    }

    const handleLogout = () => {
        setCurrentUser(null);
    }

    const testData = "test data";

    const stateValues:UserContextType = {
        currentUser,
        setCurrentUser,
        checkLogin,
        setAuthLoading,
        authLoading,
        handleLogout,
        testData
    }

    return <CurrentUserContext.Provider value={stateValues}>{children}</CurrentUserContext.Provider>
}