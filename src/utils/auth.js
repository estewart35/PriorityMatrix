import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase';

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user; // Contains user details
    } catch (error) {
        throw new Error("Error signing in.");
    }
};

// Sign out
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error("Error signing out.");
    }
};
