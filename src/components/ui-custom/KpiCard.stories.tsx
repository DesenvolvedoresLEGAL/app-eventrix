import type { Meta, StoryObj } from '@storybook/react-vite';

import KpiCard from './KpiCard';

const meta = {
  title: 'UI-CUSTOM/KpiCard',
  component: KpiCard,
} satisfies Meta<typeof KpiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};