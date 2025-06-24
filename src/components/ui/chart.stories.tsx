import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from './chart';

const meta = {
  title: 'UI/Chart',
  component: Chart,
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
