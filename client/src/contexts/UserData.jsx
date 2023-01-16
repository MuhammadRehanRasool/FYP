import React from "react";

const UserData = React.createContext({
    session: {
        access_token: "",
        personal: {
            id: "",
            name: "",
            email: "",
            username: "",
            name: "",
            signedUpAt: "",
        },
        isLoggedIn: false,
    },
    setSession: () => { },
});

export default UserData;
