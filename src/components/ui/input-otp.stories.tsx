import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOtp } from './input-otp';

const meta = {
  title: 'UI/InputOtp',
  component: InputOtp,
  tags: ['autodocs'],
} satisfies Meta<typeof InputOtp>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
