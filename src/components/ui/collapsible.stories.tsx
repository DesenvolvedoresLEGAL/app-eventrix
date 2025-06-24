import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from './collapsible';

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
