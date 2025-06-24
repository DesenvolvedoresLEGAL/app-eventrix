import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
