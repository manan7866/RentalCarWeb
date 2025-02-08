"use client"

import * as React from "react"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 17439, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 9478, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 18197, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 12510, fill: "var(--color-edge)" },
  { browser: "other", visitors: 14406, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {

    label: "RentalCars",

    

  },
  chrome: {
    label: "Sport Car",
    color: "#0D3559",
  },
  safari: {
    label: "SUV",
    color: "#175D9C",
  },
  firefox: {
    label: "Coupe",
    color: "#2185DE",
  },
  edge: {
    label: "Hatchback",
    color: "#63A9E8"
  },
  other: {
    label: "MPV",
    color: "#A6CEF2",
  },
} satisfies ChartConfig

export function Chart () {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className=" w-[100%] h-[100%]  border-none px-0 py-0 shadow-none ">
      
      <CardContent className="flex-1 w-[100%] h-[100%] mx-0 my-0 px-0 py-0 pb-0 border-none">
        <ChartContainer
          config={chartConfig}
          className="border-none w-[100%] sm:w-[150%] m2xl:w-[135%] m2xl:pr-[50%] m2xl:h-[135%] xs:w-[160%] xs:pr-[50%] xs:h-[160%] sm:[w-100%] sm:h-[150%] sm:pr-[45%] h-[100%] px-0 py-0 mx-0 my-0 border-white"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie className="w-[100%] h-[100%] mx-0 my-0 "
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Rental Cars
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
