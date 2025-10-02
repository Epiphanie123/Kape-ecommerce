import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Login function
    const login = async (email: string, password: string): Promise<User> => {
        const res = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to login");
        }

        const data = await res.json();

        const loggedInUser: User = {
            id: data.user.id,
            fullname: data.user.fullname,
            email: data.user.email,
            role: data.user.userRole?.toLowerCase() || "user", // ✅ map userRole
        };

        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", data.token);

        return loggedInUser;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Register function
    const register = async (fullname: string, email: string, password: string) => {
        const res = await fetch("http://localhost:8000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to register");
        }

        const data = await res.json();

        const newUser: User = {
            id: data.user.id,
            fullname: data.user.fullname,
            email: data.user.email,
            role: data.user.userRole?.toLowerCase() || "user", // ✅ map userRole
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", data.token);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
