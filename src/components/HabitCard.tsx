"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle2, Target, Trash2 } from "lucide-react";
import type { Habit } from "./HabitList";

interface HabitCardProps {
  habit: Habit;
  onComplete: () => void;
  onDelete: () => void;
}

export default function HabitCard({
  habit,
  onComplete,
  onDelete,
}: HabitCardProps) {
  const calculateProgress = () => {
    const total = habit.completedDates.length;
    const goal = habit.goal || 1;
    return Math.min((total / goal) * 100, 100);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 dark:bg-gray-900/10">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{habit.title}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {habit.frequency.charAt(0).toUpperCase() +
                habit.frequency.slice(1)}
            </span>
            <Target className="w-4 h-4 ml-2" />
            <span>
              {habit.completedDates.length} / {habit.goal}
            </span>
          </div>

          <Progress value={calculateProgress()} className="h-2" />

          <Button
            onClick={onComplete}
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600/90 dark:hover:bg-purple-700/90"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
