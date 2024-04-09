import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = React.useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider
