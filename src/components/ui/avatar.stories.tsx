import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a user profile picture with optional fallback text.',
      },
    },
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User avatar',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage {...args} />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const NoImage: Story = {
  args: { src: '' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage {...args} />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
