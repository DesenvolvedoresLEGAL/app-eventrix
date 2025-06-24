import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Allows the user to expand and collapse content areas. Built on top of Radix UI Accordion.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: { control: 'boolean' },
  },
  args: {
    type: 'single',
    collapsible: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Eventrix?</AccordionTrigger>
        <AccordionContent>
          Eventrix is a fictional event management platform.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I invite friends?</AccordionTrigger>
        <AccordionContent>
          Yes, you can invite anyone once you create an event.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="a">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>Some details about the first item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>More information for the second item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
