"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import StatsPanel from "./StatsPanel";

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                My Habits
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Track your daily progress and build better habits
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={isLoading}
              className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <StatsPanel />
          <HabitForm />
          <HabitList />
        </div>
      </div>
    </div>
  );
}
