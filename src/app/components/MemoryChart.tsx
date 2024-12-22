import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MemoryChartProps {
  total: string;
  used: string;
  usage: string;
}

export function MemoryChart({ total, used, usage }: MemoryChartProps) {
  const usedValue = parseFloat(used) || 0;
  const freeValue = parseFloat(total) - usedValue;

  const data = [
    { name: "Used", value: usedValue },
    { name: "Free", value: freeValue },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Memory Usage</CardTitle>
        <CardDescription>
          {used} / {total} ({usage} used)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            used: {
              label: "Used",
              color: "hsl(var(--chart-1))",
            },
            free: {
              label: "Free",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell key="used" fill="var(--color-used)" />
                <Cell key="free" fill="var(--color-free)" />
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

