
import {create} from "zustand/index";

interface User {
    id: string
    email: string
    name: string
}

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
}

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    login: (credentials: LoginCredentials) => Promise<void>
    register: (userData: RegisterData) => Promise<void>
    logout: () => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
}

export const useAuthStore = create<AuthStore>((set, ) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    isLoading: false,
    error: null,

    login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const user = {
                id: '1',
                email: credentials.email,
                name: credentials.email.split('@')[0],
            }

            localStorage.setItem('user', JSON.stringify(user))
            set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: 'Login failed', isLoading: false })
        }
    },

    register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const user = {
                id: '1',
                email: userData.email,
                name: userData.name,
            }

            localStorage.setItem('user', JSON.stringify(user))
            set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: 'Registration failed', isLoading: false })
        }
    },

    logout: () => {
        localStorage.removeItem('user')
        set({ user: null, isAuthenticated: false, error: null })
    },

    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}))

