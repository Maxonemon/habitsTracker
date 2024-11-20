"use client";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HabitCard from "./HabitCard";

export interface Habit {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
  completedDates: string[];
  userId: string;
  createdAt: Date;
}

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const habitList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Habit[];
      setHabits(habitList);
    });

    return () => unsubscribe();
  }, [user]);

  const completeHabit = async (habit: Habit) => {
    if (!user) return;
    try {
      const habitRef = doc(db, "habits", habit.id);
      await updateDoc(habitRef, {
        completedDates: [...habit.completedDates, new Date().toISOString()],
      });
      toast.success("Progress updated");
      revalidatePath("/habits");
    } catch (error) {
      console.error("Error completing habit:", error);
      toast.error("Failed to update progress");
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "habits", habitId));
      toast.success("Habit deleted");
    } catch (error) {
      console.error("Error deleting habit:", error);
      toast.error("Failed to delete habit");
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onComplete={() => completeHabit(habit)}
          onDelete={() => deleteHabit(habit.id)}
        />
      ))}
    </div>
  );
}
