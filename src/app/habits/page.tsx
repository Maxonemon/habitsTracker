"use client";

import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HabitsPage() {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      toast.success("Signed out successfully");
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // No need for loading state as we redirect immediately
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Habits</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isLoading}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitForm />
          </CardContent>
        </Card>

        <HabitList />
      </div>
    </div>
  );
}
