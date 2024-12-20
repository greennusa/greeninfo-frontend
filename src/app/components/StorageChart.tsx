import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StorageItem {
  filesystem: string;
  size: string;
  used: string;
  usage: string;
}

interface StorageChartProps {
  storage: StorageItem[];
}

export function StorageChart({ storage }: StorageChartProps) {
  const data = storage && storage.length > 0
    ? storage.map(item => ({
        name: item.filesystem,
        used: parseFloat(item.usage) || 0,
        free: 100 - (parseFloat(item.usage) || 0),
      }))
    : [{ name: 'No Data', used: 0, free: 100 }];

  const total = storage.reduce((acc, item) => acc + parseFloat(item.size), 0);
  const used = storage.reduce((acc, item) => acc + parseFloat(item.used), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Usage</CardTitle>
        <CardDescription>
          {used.toFixed(2)} GB / {total.toFixed(2)} GB ({((used / total) * 100).toFixed(2)}% used)
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
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="used" stackId="a" fill="var(--color-used)" />
              <Bar dataKey="free" stackId="a" fill="var(--color-free)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

