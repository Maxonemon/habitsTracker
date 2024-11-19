import { Card, CardContent } from "./ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
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
          <div className="p-3 rounded-full bg-gray-50 dark:bg-gray-900/50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
