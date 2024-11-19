"use client";
import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface HabitFormData {
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
}

const initialHabit: HabitFormData = {
  title: "",
  frequency: "daily",
  goal: 1,
};

export default function HabitForm() {
  const [habit, setHabit] = useState<HabitFormData>(initialHabit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please sign in to add habits");
      return;
    }

    if (!habit.title?.trim()) {
      toast.error("Please enter a habit title");
      return;
    }

    setIsSubmitting(true);

    try {
      const habitData = {
        ...habit,
        title: habit.title.trim(),
        userId: user.uid,
        createdAt: new Date(),
        completedDates: [],
      };

      await addDoc(collection(db, "habits"), habitData);
      toast.success("Habit added successfully");
      setHabit(initialHabit);
    } catch (error) {
      console.error("Error adding habit:", error);
      toast.error("Failed to add habit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-purple-500" />
          Add New Habit
        </CardTitle>
        <CardDescription>
          Create a new habit to track your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="What habit would you like to build?"
                value={habit.title}
                onChange={(e) => setHabit({ ...habit, title: e.target.value })}
                className="h-11 bg-gray-50 dark:bg-gray-800"
                disabled={isSubmitting}
                required
              />
            </div>
            <Select
              value={habit.frequency}
              onValueChange={(value: "daily" | "weekly" | "monthly") =>
                setHabit({ ...habit, frequency: value })
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
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
      </CardContent>
    </Card>
  );
}
