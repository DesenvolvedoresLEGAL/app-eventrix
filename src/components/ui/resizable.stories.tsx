import type { Meta, StoryObj } from '@storybook/react-vite';
import { Resizable } from './resizable';

const meta = {
  title: 'UI/Resizable',
  component: Resizable,
  tags: ['autodocs'],
} satisfies Meta<typeof Resizable>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
