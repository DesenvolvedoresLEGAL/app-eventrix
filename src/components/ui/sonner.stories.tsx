import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sonner } from './sonner';

const meta = {
  title: 'UI/Sonner',
  component: Sonner,
  tags: ['autodocs'],
} satisfies Meta<typeof Sonner>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
