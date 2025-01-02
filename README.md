# HotForm Builder for React

A powerful and flexible form builder component for React applications that allows you to create dynamic forms using a simple configuration object.

## Installation

```bash
npm install @hotformbuilder/react
```

## Usage

```tsx
import { HotForm } from '@hotformbuilder/react';

const formConfig = {
  components: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email Address',
      required: true,
      validation: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      }
    }
  ]
};

function App() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <HotForm
      src={{ components: formConfig }}
      onSubmit={handleSubmit}
    />
  );
}
```

## Supported Components

### Basic Components
- TextField (`text`)
- Checkbox (`checkbox`)
- Radio (`radio`)
- Select (`select`)
- Button (`button`)

### Advanced Components
- DateTime (`datetime`)
- FileUpload (`fileupload`)
- Signature (`signature`)
- OTP (`otp`)
- Tags (`tags`)

### Premium Components
- Wizard (`wizard`)
- Language (`language`)

### Layout Components
- Container (`container`)
- Table (`table`)
- Tabs (`tabs`)
- Collapse (`collapse`)

### Chart Components
- PieChart (`pie-chart`)
- DoughnutChart (`doughnut-chart`)
- BarChart (`bar-chart`)
- LineChart (`line-chart`)

### API Components
- RestAPITrigger (`rest-api`)

## Props

| Prop | Type | Description |
|------|------|-------------|
| src | `{ components: FormComponent[] }` | Configuration object for the form |
| onSubmit | `(data: Record<string, any>) => void` | Callback function called when the form is submitted |
| onChange | `(data: Record<string, any>) => void` | Callback function called when any form value changes |

## License

MIT