import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import OrganizersStep from './OrganizersStep';
import { Toaster } from '@/components/ui/toaster';

const meta = {
  title: 'Events/WizardSteps/OrganizersStep',
  component: OrganizersStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OrganizersStep>;

export default meta;

type Story = StoryObj<typeof meta>;

interface OrganizersData {
  organizerName: string;
  primaryEmail: string;
  phone: string;
  company: string;
  teamMembers: Array<{ name: string; email: string; role: string }>;
}

const Template = ({ initialData }: { initialData?: OrganizersData }) => {
  const [data, setData] = React.useState<OrganizersData>(
    initialData ?? {
      organizerName: '',
      primaryEmail: '',
      phone: '',
      company: '',
      teamMembers: [],
    },
  );

  const updateData = (partial: Partial<OrganizersData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  return (
    <div className="max-w-2xl p-4">
      <OrganizersStep data={data} updateData={updateData} />
      <Toaster />
    </div>
  );
};

export const EmptyFields: Story = {
  render: () => <Template />,
  args: {
    data: {},
    updateData: () => {}
  }
};

export const FilledFields: Story = {
  render: () => (
    <Template
      initialData={{
        organizerName: 'Carlos Silva',
        primaryEmail: 'carlos@example.com',
        phone: '(11) 91234-5678',
        company: 'ACME Corp',
        teamMembers: [
          { name: 'Ana Souza', email: 'ana@example.com', role: 'Comunicação' },
          { name: 'Rafael Lima', email: 'rafael@example.com', role: 'Logística' },
        ],
      }}
    />
  ),
  args: {
    data: {},
    updateData: () => {}
  }
};