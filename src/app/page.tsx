"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const [mode, setMode] = useState<"login" | "signup">("signup");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 🔐 SIGN UP
  const onSignUp = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: () => {
          alert("Account created successfully");
        },
        onError: () => {
          alert("Signup failed");
        },
      }
    );
  };

  // 🔐 LOGIN
  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          alert("Login successful");
        },
        onError: () => {
          alert("Invalid credentials");
        },
      }
    );
  };

  // 🚪 LOGOUT
  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  // ⏳ Loading state
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  // ✅ LOGGED IN UI
  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg">
          Logged in as <b>{session.user.name}</b>
        </p>

        <Button onClick={onLogout}>
          Sign Out
        </Button>
      </div>
    );
  }

  // 🔐 AUTH UI (LOGIN / SIGNUP)
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6 shadow">

        {/* TITLE */}
        <h1 className="text-center text-xl font-semibold">
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h1>

        {/* NAME ONLY FOR SIGNUP */}
        {mode === "signup" && (
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* EMAIL */}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ACTION BUTTON */}
        <Button
          className="w-full"
          onClick={mode === "signup" ? onSignUp : onLogin}
        >
          {mode === "signup" ? "Create Account" : "Login"}
        </Button>

        {/* SWITCH MODE */}
        <p className="text-center text-sm text-gray-500">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            className="ml-1 cursor-pointer text-black underline"
            onClick={() =>
              setMode(mode === "signup" ? "login" : "signup")
            }
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}