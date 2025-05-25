import { Link, useLocation } from 'react-router-dom'
import {  User, LogOut } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

export const Navbar = () => {
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuthStore()

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Filim Tapan  App
                    </Link>

                    <div className="flex items-center space-x-4">


                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <User size={20} className="text-gray-600" />
                                    <span className="text-gray-700">{user?.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}