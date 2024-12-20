import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CpuChartProps {
  load: string;
  history: string[];
}

export function CpuChart({ load, history }: CpuChartProps) {
  const data = history && history.length > 0
    ? history.map((value, index) => ({ time: index, value: parseFloat(value) }))
    : [{ time: 0, value: parseFloat(load) || 0 }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU Load</CardTitle>
        <CardDescription>Current: {load}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cpu: {
              label: "CPU Load",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke="var(--color-cpu)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

