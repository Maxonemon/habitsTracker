"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.push("/habits");
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/habits");
      }
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            Sign in to start tracking your habits and achieve your goals.
          </p>
          <Button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
