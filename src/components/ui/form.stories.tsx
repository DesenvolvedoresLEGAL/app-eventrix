import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './form';

const meta = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
