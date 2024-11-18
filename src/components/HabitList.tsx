"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useState } from "react";

import { CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
  completedDates: Date[];
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
      const habitList = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Habit)
      );
      setHabits(habitList);
    });

    return () => unsubscribe();
  }, [user]);

  const completeHabit = async (habit: Habit) => {
    if (!user) return;

    try {
      const habitRef = doc(db, "habits", habit.id);
      await updateDoc(habitRef, {
        completedDates: [...habit.completedDates, new Date()],
      });

      toast.success("Habit completed");
    } catch (error) {
      console.error("Error completing habit:", error);
      toast.error("Error completing habit");
    }
  };

  const removeHabit = async (habitId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "habits", habitId));
      toast.success("Habit removed");
    } catch (error) {
      console.error("Error removing habit:", error);
      toast.error("Error removing habit");
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader>
            <CardTitle>{habit.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Frequency:{" "}
              {habit.frequency.charAt(0).toUpperCase() +
                habit.frequency.slice(1)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Completed: {habit.completedDates.length} times
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => completeHabit(habit)}
                className="flex-1"
                variant="default"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete
              </Button>
              <Button
                onClick={() => removeHabit(habit.id)}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
