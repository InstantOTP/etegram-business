'use client';

import { chartData } from '@/lib/static-data';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import {
  Bar,
  BarChart,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { dayOfDate, formatDateNumeric, kConverter } from '@/lib/utils';

const fakeData = [
  { _id: '2024-10-12', totalAmount: 10000 },
  { _id: '2024-10-13', totalAmount: 57000 },
  { _id: '2024-10-14', totalAmount: 100000 },
  { _id: '2024-10-15', totalAmount: 20000 },
  { _id: '2024-10-16', totalAmount: 1000 },
  { _id: '2024-10-17', totalAmount: 20000 },
  { _id: '2024-10-18', totalAmount: 25000 },
  { _id: '2024-10-19', totalAmount: 50000 },
];
const chartConfig = {
  amount: {
    label: 'Amount',
    color: '#67b7dc',
  },
} satisfies ChartConfig;

export function TransactionChart({ data }: { data: any[] }) {
  // console.log(data);
  // console.log(dayOfDate(fakeData[0]._id));
  return (
    <ChartContainer
      config={chartConfig}
      className='h-[260px] w-full bg-primary-light rounded-2xl pb-3 pt-9 pr-6'
    >
      <BarChart
        accessibilityLayer
        data={data}
      >
        <XAxis
          dataKey='_id'
          tickLine={false}
          tickMargin={15}
          axisLine={false}
          tickFormatter={(value) => dayOfDate(value)}
        />
        <YAxis
          dataKey='totalAmount'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => kConverter(value)}
          tickCount={7}
        />
        <CartesianGrid
          stroke='#eee'
          strokeDasharray='5 5'
          vertical={false}
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
          radius={[8, 8, 0, 0]}
          barSize={40}
          activeBar={<Rectangle fill='#FFC001' />}
        />
      </BarChart>
    </ChartContainer>
  );
}
