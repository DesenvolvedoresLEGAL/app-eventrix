import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import BasicInfoStep from './BasicInfoStep';

const meta = {
  title: 'Events/WizardSteps/BasicInfoStep',
  component: BasicInfoStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicInfoStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => {
    const [data, setData] = React.useState({
      name: '',
      description: '',
      category: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
      startTime: '',
      endTime: '',
      website: '',
    });

    const updateData = (update: any) => setData({ ...data, ...update });

    return <BasicInfoStep {...args} data={data} updateData={updateData} />;
  },
  args: { data: {}, updateData: () => {} },
};

export const Prefilled: Story = {
  render: (args) => {
    const [data, setData] = React.useState({
      name: 'Tech Summit',
      description: 'Um grande evento de tecnologia.',
      category: 'Workshop',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '09:00',
      endTime: '17:00',
      website: 'https://exemplo.com',
    });

    const updateData = (update: any) => setData({ ...data, ...update });

    return <BasicInfoStep {...args} data={data} updateData={updateData} />;
  },
  args: { data: {}, updateData: () => {} },
};
