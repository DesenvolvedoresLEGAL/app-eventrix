import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from './alert-dialog';

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal dialog that interrupts the user with important information or actions.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    open: false,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger className="bg-red-600 text-white px-3 py-1 rounded">
        Delete account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 text-white">Continue</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogContent>
        <AlertDialogTitle>Session expired</AlertDialogTitle>
        <AlertDialogDescription>
          Please log in again to continue using Eventrix.
        </AlertDialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogAction>Ok</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
