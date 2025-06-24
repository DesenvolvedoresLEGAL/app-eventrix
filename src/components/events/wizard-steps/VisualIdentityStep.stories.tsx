import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import VisualIdentityStep from './VisualIdentityStep';

const meta = {
  title: 'Events/WizardSteps/VisualIdentityStep',
  component: VisualIdentityStep,
  tags: ['autodocs'],
} satisfies Meta<typeof VisualIdentityStep>;

export default meta;
type Story = StoryObj<typeof meta>;

const emptyState = {
  name: '',
  logo: null,
  banner: null,
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  fontStyle: 'modern',
};

const filledState = {
  name: 'Evento de Exemplo',
  logo: new File([''], 'logo.png', { type: 'image/png' }),
  banner: new File([''], 'banner.png', { type: 'image/png' }),
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  fontStyle: 'modern',
};

export const Empty: Story = {
  render: () => {
    const [data, setData] = useState(emptyState);
    return (
      <VisualIdentityStep
        data={data}
        updateData={(update) => setData((prev) => ({ ...prev, ...update }))}
      />
    );
  },
  args: {
    data: {},
    updateData: () => {}
  }
};

export const Filled: Story = {
  render: () => {
    const [data, setData] = useState(filledState);
    return (
      <VisualIdentityStep
        data={data}
        updateData={(update) => setData((prev) => ({ ...prev, ...update }))}
      />
    );
  },
  args: {
    data: {},
    updateData: () => {}
  }
};