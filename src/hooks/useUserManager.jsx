import { useState } from "react";
import { signInWithGoogle, logout } from "../utils/auth";

const useUserManager = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const login = async () => {
        try {
            const loggedInUser = await signInWithGoogle();
            setUser(loggedInUser);
            setSuccess("You logged in successfully!");
            setError("");
        } catch (error) {
            setError(error.message || "Login failed.");
        }
    };

    const signOut = async () => {
        try {
            await logout();
            setUser(null);
            setSuccess("You logged out successfully!");
            setError("");
        } catch (error) {
            setError(error.message || "Logout failed.");
        }
    };

    const clearMessages = () => {
        setError("");
        setSuccess("");
    }

    return { user, error, success, login, signOut, clearMessages };
};

export default useUserManager;
