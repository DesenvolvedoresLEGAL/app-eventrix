import type { Meta, StoryObj } from '@storybook/react-vite';

import KpiCard from './KpiCard';
import { Activity, Users, Calendar } from 'lucide-react';

const iconOptions = {
  Activity: <Activity />,
  Users: <Users />,
  Calendar: <Calendar />,
};

const meta = {
  title: 'UI-CUSTOM/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays a key performance indicator with optional trend information.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    icon: { options: Object.keys(iconOptions), mapping: iconOptions, control: 'select' },
    trend: { control: 'object' },
  },
  args: {
    title: 'Total de Visitantes',
    value: '1.200',
    icon: 'Activity',
    trend: { value: 10, isPositive: true },
  },
} satisfies Meta<typeof KpiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveTrend: Story = {};

export const NegativeTrend: Story = {
  args: {
    trend: { value: 5, isPositive: false },
  },
};

export const NoTrend: Story = {
  args: {
    trend: undefined,
  },
};
