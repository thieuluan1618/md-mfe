import { Button } from './button';

export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Icon = {
  args: {
    size: 'icon',
    children: '🚀',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎨</Button>
    </div>
  ),
};