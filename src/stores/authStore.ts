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
import { error } from "console";

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

export const useAuthStore = create<AuthState>((set, get) => ({
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

    signUp: async (email: string, password: string, displayName?: string) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (displayName && result.user) {
                await updateProfile(result.user, { displayName });
            }
            // Sync will happen in onAuthStateChanged
            toast.success("Account created successfully")
            return result;
        } catch (error: any) {
            toast.error(error.message || "Failed to create accakmaofikmae")
            throw error;
        }
    },
    //gooogle facebook


    signInWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // Sync will happen in onAuthStateChanged
        } catch (error: any) {
            console.error("Google sign in error", error)
            toast.error(error.message || "failed to sign in with google")
            throw error
        }
    },


    signInWithGithub: async () => {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // Sync will happen in onAuthStateChanged
            // Don't show success toast here - let the calling component handle it after Sanity check
            return result;
        } catch (error: any) {
            console.error("Github sign-in error:", error)
            toast.error(error.message || "failed to sign in Github");
            throw error;
        }
    },

    sendEmailLink: async (email: string) => {
        try {
            const actionCodeSettings = {
                url: '${window. location. origin}/sign-in/email- link',
                handleCodeInApp: true,
            };

            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // Save email to localStorage for email link
            window.localStorage.setItem("emailForSignIn", email)
            toast.success("Sign-in link sent to your email")
        } catch (error: any) {
            toast.error(error.message || "failed to send email link")
            throw error
        }
    },

    completeEmailLinkSignIn: async (email: string) => {
        try {
            if (!isSignInWithEmailLink(auth, window.location.
                href)) {
                throw new Error("Invalid sign-in link");
            }
            const result = await signInWithEmailLink(
                auth,
                email,
                window.location.href
            );
            // Clear email from localStorage

            window.localStorage.removeItem("emailForSignIn")
            toast.success("Successfully signed in!")
            return result
        } catch (error: any) {
            toast.error(error.message || "Failed to complete sign-in")
            throw error
        }
    }
}));