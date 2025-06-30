import type { Meta, StoryObj } from '@storybook/react-vite';

import ChartCard from './ChartCard';

const meta = {
  title: 'UI-CUSTOM/ChartCard',
  component: ChartCard,
} satisfies Meta<typeof ChartCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};