import type { Meta, StoryObj } from '@storybook/react-vite';

import ChartCard from './ChartCard';

const sampleData = [
  { name: 'Jan', value: 12 },
  { name: 'Fev', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Abr', value: 25 },
  { name: 'Mai', value: 32 },
  { name: 'Jun', value: 28 },
  { name: 'Jul', value: 30 },
];

const meta = {
  title: 'UI-CUSTOM/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card component that renders a simple bar or line chart using Recharts.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    type: { control: 'select', options: ['bar', 'line'] },
    height: { control: { type: 'number', min: 100, step: 10 } },
    data: { control: 'object' },
  },
  args: {
    title: 'Crescimento de Eventos',
    subtitle: 'Últimos 7 meses',
    type: 'line' as const,
    height: 300,
    data: sampleData,
  },
} satisfies Meta<typeof ChartCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LineChart: Story = {};

export const BarChart: Story = {
  args: {
    type: 'bar',
  },
};
