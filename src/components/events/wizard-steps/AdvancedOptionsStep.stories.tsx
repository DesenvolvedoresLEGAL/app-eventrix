import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import AdvancedOptionsStep from './AdvancedOptionsStep';

const meta = {
  title: 'Events/WizardSteps/AdvancedOptionsStep',
  component: AdvancedOptionsStep,
  tags: ['autodocs'],
} satisfies Meta<typeof AdvancedOptionsStep>;

export default meta;

type Story = StoryObj<typeof meta>;

interface AdvancedOptionsData {
  publicRegistration: boolean;
  isHybrid: boolean;
  streamingPlatform: string;
  specialRequirements: string;
  lgpdAccepted: boolean;
  termsAccepted: boolean;
}

const createTemplate = (
  initialData: AdvancedOptionsData,
): Story['render'] => {
  return function Render() {
    const [data, setData] = useState<AdvancedOptionsData>(initialData);

    const updateData = (newData: Partial<AdvancedOptionsData>) =>
      setData(prev => ({ ...prev, ...newData }));

    return <AdvancedOptionsStep data={data} updateData={updateData} />;
  };
};

export const Empty: Story = {
  render: createTemplate({
    publicRegistration: false,
    isHybrid: false,
    streamingPlatform: '',
    specialRequirements: '',
    lgpdAccepted: false,
    termsAccepted: false,
  }),
  args: {
    data: {},
    updateData: () => {}
  }
};

export const Prefilled: Story = {
  render: createTemplate({
    publicRegistration: true,
    isHybrid: true,
    streamingPlatform: 'YouTube Live',
    specialRequirements: 'Tradução simultânea requerida',
    lgpdAccepted: true,
    termsAccepted: true,
  }),
  args: {
    data: {},
    updateData: () => {}
  }
};