"use client";
import { Card, CardContent } from "@/components/ui/card";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Award, Calendar, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsPanel() {
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    totalCompletions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const habitsQuery = query(
        collection(db, "habits"),
        where("userId", "==", user.uid)
      );

      try {
        const snapshot = await getDocs(habitsQuery);
        const today = new Date().toISOString().split("T")[0];

        let totalCompletions = 0;
        let completedToday = 0;

        snapshot.docs.forEach((doc) => {
          const habit = doc.data();
          totalCompletions += habit.completedDates?.length || 0;
          if (habit.completedDates?.includes(today)) {
            completedToday++;
          }
        });

        setStats({
          totalHabits: snapshot.size,
          completedToday,
          currentStreak: calculateStreak(), // You'll need to implement this
          totalCompletions,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const calculateStreak = () => {
    // Implement streak calculation logic here
    return 0;
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard
        title="Total Habits"
        value={stats.totalHabits}
        icon={<Target className="w-4 h-4 text-purple-500" />}
      />
      <StatsCard
        title="Completed Today"
        value={stats.completedToday}
        icon={<Calendar className="w-4 h-4 text-blue-500" />}
      />
      <StatsCard
        title="Current Streak"
        value={`${stats.currentStreak} days`}
        icon={<TrendingUp className="w-4 h-4 text-green-500" />}
      />
      <StatsCard
        title="Total Completions"
        value={stats.totalCompletions}
        icon={<Award className="w-4 h-4 text-yellow-500" />}
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-full dark:bg-gray-800">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
