import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import LocationStep from './LocationStep';

interface LocationData {
  address: string;
  city: string;
  state: string;
  country: string;
  venueName: string;
  totalArea: string;
  capacity: string;
  accessibility: boolean;
  accessibilityInfo: string;
}

const emptyData: LocationData = {
  address: '',
  city: '',
  state: '',
  country: 'Brasil',
  venueName: '',
  totalArea: '',
  capacity: '',
  accessibility: false,
  accessibilityInfo: '',
};

const filledData: LocationData = {
  address: 'Av. Paulista, 1578, Bela Vista',
  city: 'São Paulo',
  state: 'São Paulo',
  country: 'Brasil',
  venueName: 'Centro de Convenções',
  totalArea: '1200',
  capacity: '500',
  accessibility: true,
  accessibilityInfo: 'Rampas de acesso e banheiros adaptados',
};

const meta = {
  title: 'Events/WizardSteps/LocationStep',
  component: LocationStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationStep>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: { data: LocationData }) => {
  const [formData, setFormData] = React.useState<LocationData>(args.data);
  const updateData = (newData: Partial<LocationData>) =>
    setFormData((prev) => ({ ...prev, ...newData }));
  return <LocationStep data={formData} updateData={updateData} />;
};

export const Empty: Story = {
  render: Template,
  args: { data: emptyData, updateData: () => {} },
};

export const Prefilled: Story = {
  render: Template,
  args: { data: filledData, updateData: () => {} },
};