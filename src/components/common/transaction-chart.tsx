'use client';

import { chartData } from '@/lib/static-data';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { Bar, BarChart, Rectangle, XAxis, YAxis } from 'recharts';
import { kConverter } from '@/lib/utils';

const chartConfig = {
  amount: {
    label: 'Amount',
    color: '#ffffff',
  },
} satisfies ChartConfig;

export function TransactionChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[200px] w-full bg-primary-light rounded-2xl py-5'
    >
      <BarChart
        accessibilityLayer
        data={chartData}
      >
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey='amount'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => kConverter(value)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideIndicator
              className='bg-primary'
              labelClassName='text-white'
              color='text-white'
            />
          }
        />
        <Bar
          dataKey={'amount'}
          fill='var(--color-amount)'
          radius={4}
          barSize={40}
          activeBar={<Rectangle fill='#FFC001' />}
        />
      </BarChart>
    </ChartContainer>
  );
}
