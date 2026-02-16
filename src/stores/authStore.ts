import { create } from "zustand"
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    UserCredential,
} from "firebase/auth"

import { auth } from "../lib/firebase"
import { toast } from "sonner";

interface AuthState {
    User: User | null
    loading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    SignIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (
        email: string,
        password: string,
        disaplayName: string
    ) => Promise<UserCredential>
    signInWithGoogle: () => Promise<UserCredential>;
    signInWithGithub: () => Promise<UserCredential>;
    sendEmailLink: (email: string) => Promise<void>;
    completeEmailLinkSignIn: (email: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    initializeAuth: () => () => void;
}

export const useAuthStore = create<AuthState>((set, get)
    => ({
        user: null,
        loading: true,
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ loading }),
        signIn: async (email: string, password: string) => {
            try {
                const result = await signInWithEmailAndPassword(auth, email, password);
                // Sync will happen in onAuthStateChanged
                toast.success("Successfully signed in!");
                return result;
            } catch (error: any) {
                toast.error(error.message || "Failed to sign");
                throw error;
            }
        },
    }));