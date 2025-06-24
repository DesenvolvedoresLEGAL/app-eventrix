import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command } from './command';

const meta = {
  title: 'UI/Command',
  component: Command,
  tags: ['autodocs'],
} satisfies Meta<typeof Command>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
