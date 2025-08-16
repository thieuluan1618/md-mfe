import { AngularMFELoader, SvelteMFELoader } from './MFELoader';

export default {
  title: 'Components/MFELoader',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const AngularMFE = {
  render: () => <AngularMFELoader />,
  parameters: {
    docs: {
      description: {
        story: 'Angular MFE loader component that handles loading, error states, and demo mode for the Angular micro-frontend.',
      },
    },
  },
};

export const SvelteMFE = {
  render: () => <SvelteMFELoader />,
  parameters: {
    docs: {
      description: {
        story: 'Svelte MFE loader component that handles loading, error states, and demo mode for the Svelte micro-frontend.',
      },
    },
  },
};

export const BothMFEs = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Angular Micro-Frontend</h3>
        <AngularMFELoader />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Svelte Micro-Frontend</h3>
        <SvelteMFELoader />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Both MFE loaders displayed together showing the micro-frontend architecture in action.',
      },
    },
  },
};