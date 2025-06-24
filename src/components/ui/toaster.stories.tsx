import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from './toaster';

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
