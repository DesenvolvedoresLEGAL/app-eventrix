import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from './menubar';

const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
