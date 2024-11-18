"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
  completedDates: Date[];
  userId: string;
  createdAt: Date;
}

const initialHabit: Partial<Habit> = {
  title: "",
  frequency: "daily",
  goal: 1,
  completedDates: [],
};

export default function HabitForm() {
  const [habit, setHabit] = useState<Partial<Habit>>(initialHabit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !habit.title?.trim()) return;

    setIsSubmitting(true);
    setHabit(initialHabit);

    try {
      await addDoc(collection(db, "habits"), {
        ...habit,
        title: habit.title.trim(),
        userId: user.uid,
        createdAt: new Date(),
      });

      toast.success("Habit added");
    } catch (error) {
      console.error("Error adding habit:", error);
      toast.error("Error adding habit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Habit Title"
          value={habit.title}
          onChange={(e) => setHabit({ ...habit, title: e.target.value })}
          className="flex-grow"
          disabled={isSubmitting}
          required
        />
        <Select
          value={habit.frequency}
          onValueChange={(value) =>
            setHabit({ ...habit, frequency: value as Habit["frequency"] })
          }
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          {isSubmitting ? "Adding..." : "Add Habit"}
        </Button>
      </div>
    </form>
  );
}
