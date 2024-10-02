'use client';

import { chartData } from '@/lib/static-data';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { Bar, BarChart, Rectangle, XAxis, YAxis } from 'recharts';
import { formatDateNumeric, kConverter } from '@/lib/utils';

const chartConfig = {
  amount: {
    label: 'Amount',
    color: '#ffffff',
  },
} satisfies ChartConfig;

export function TransactionChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[200px] w-full bg-primary-light rounded-2xl py-5'
    >
      <BarChart
        accessibilityLayer
        data={data}
      >
        <XAxis
          dataKey='_id'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => formatDateNumeric(value)}
        />
        <YAxis
          dataKey='totalAmount'
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
          dataKey={'totalAmount'}
          fill='var(--color-amount)'
          radius={4}
          barSize={40}
          activeBar={<Rectangle fill='#FFC001' />}
        />
      </BarChart>
    </ChartContainer>
  );
}
