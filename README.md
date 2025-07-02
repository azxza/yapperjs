# YapperJS

[![npm version](https://img.shields.io/npm/v/yapperjs.svg)](https://www.npmjs.com/package/yapperjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern and declarative API for managing dialogs in React applications.

## Introduction

YapperJS revolutionizes how you handle dialogs in React by treating them as what they truly are: requests for user input. Instead of breaking your code flow with imperative dialog rendering, YapperJS lets you simply `await` dialogs and continue your logic naturally.

```tsx
// Instead of callbacks and state management...
// Just await your dialog's result!
const userConfirmed = await yapperApi.showDialog({ content: ConfirmationDialog });
if (userConfirmed) {
  // Continue your flow here!
}
```

## Installation

```bash
npm install yapperjs
# or
yarn add yapperjs
# or
pnpm add yapperjs
# or
bun add yapperjs
```

**Important**: Don't forget to import the CSS styles in your application:
```tsx
import 'yapperjs/dist/index.css';
```
This import is required for the dialogs to display properly.

## Key Benefits

- **Promise-based API**: Treat dialogs as awaitable operations
- **Flow-preserving**: Keep your logic flowing naturally without callbacks
- **Type-safe**: Full TypeScript support for dialog responses
- **Flexible**: Easily customize the appearance and behavior of dialogs
- **Composable**: Create nested dialogs simply by using the API recursively

## Basic Usage

Here's a simple example of how to use YapperJS:

```tsx
import { useYapperDialog } from 'yapperjs';

function MyComponent({ submitData }) {
  const yapperApi = useYapperDialog();
  
  const handleSubmit = async () => {
    // Show a confirmation dialog and await its result
    if (!await yapperApi.showDialog({ content: ConfirmationDialog })) {
      return; // User declined
    }
    
    // Continue with submission if user confirmed
    await submitData();
  };
  
  return (
    <>
      <button onClick={handleSubmit}>Submit</button>
      {/* This renders your dialogs when they're active */}
      <yapperApi.renderer />
    </>
  );
}
```

## API Reference

### `useYapperDialog()`

A React hook that creates and returns a YapperAPI instance.

### `YapperApi`

| Method | Description |
|--------|-------------|
| `showDialog<TData, TArgs>(dialog)` | Shows a dialog and returns a promise that resolves with the dialog's result |
| `cancelActiveDialog()` | Cancels the currently active dialog |
| `renderer` | React component that renders the active dialog |

### Dialog Definition

The `showDialog` method accepts a dialog definition object:

```tsx
type YapperDialogDefinition<TData, TArgs> = {
  // Required: Component to render as dialog content
  content: FC<YapperDialogContentProps<TData> & TArgs>;
  
  // Optional: Args passed to the content component
  args?: TArgs;
  
  // Optional: Styling and behavior customization
  backdropClassname?: string;
  backdropStyle?: CSSProperties;
  backdrop?: ReactNode;
  positionerClassname?: string;
  postionerStyle?: CSSProperties;
  wrapper?: FC<PropsWithChildren>;
};
```

### Creating Dialog Components

To create a dialog component, define a React component that accepts `YapperDialogContentProps<T>`:

```tsx
import { YapperDialogContentProps } from 'yapperjs';

type MyDialogProps = YapperDialogContentProps<string> & {
  initialValue?: string;
};

function MyDialog({ resolve, reject, cancel, api, initialValue = '' }: MyDialogProps) {
  const [value, setValue] = useState(initialValue);
  
  return (
    <div className="dialog">
      <h2>Enter a value</h2>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
      <div className="actions">
        <button onClick={() => cancel()}>Cancel</button>
        <button onClick={() => resolve(value)}>Submit</button>
      </div>
    </div>
  );
}
```

## Advanced Usage

### Using Dialog Content Props

Each dialog content component receives these props:

| Prop | Type | Description |
|------|------|-------------|
| `resolve` | `(value: T) => void` | Call to resolve the dialog with a value |
| `reject` | `(error: Error) => void` | Call to reject the dialog with an error |
| `cancel` | `() => void` | Call to cancel the dialog (same as resolving with `undefined`) |
| `api` | `YapperApi` | The YapperApi instance that created this dialog |

### Passing Arguments to Dialogs

You can pass additional props to your dialog components:

```tsx
const result = await yapperApi.showDialog({
  content: UserFormDialog,
  args: {
    userId: '123',
    initialName: 'John Doe',
  }
});
```

### Nested Dialogs

You can easily create nested dialogs by using the `api` prop:

```tsx
function ConfirmDeleteDialog({ resolve, api, itemName }) {
  const handleDelete = async () => {
    // Show another dialog within this dialog
    const password = await api.showDialog({
      content: PasswordDialog,
      args: { prompt: 'Enter your password to confirm deletion' }
    });
    
    if (!password) {
      return;
    }
    
    // Continue with deletion
    resolve(true);
  };
  
  return (
    <div className="dialog">
      <h2>Delete {itemName}?</h2>
      <p>This action cannot be undone.</p>
      <div className="actions">
        <button onClick={() => resolve(false)}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
```

### Custom Dialog Styling

YapperJS provides several options for styling:

```tsx
const result = await yapperApi.showDialog({
  content: MyDialog,
  backdropClassname: 'custom-backdrop',
  backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  positionerClassname: 'dialog-positioner',
  wrapper: ({ children }) => (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
});
```

For global styling, YapperJS provides these CSS classes that you can override:

- `.yapper__dialog_backdrop` - The backdrop/overlay behind the dialog
- `.yapper__dialog_positioner` - The container that positions the dialog content

Note: These classes already have default styles applied by YapperJS. To override them, ensure your CSS has higher specificity or is loaded after the YapperJS styles:

```css
/* Example: Override default dialog styling */
/* Option 1: Use higher specificity */
body .yapper__dialog_backdrop {
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(2px);
}

/* Option 2: Ensure your CSS loads after YapperJS styles */
.yapper__dialog_backdrop {
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(2px);
}

.yapper__dialog_positioner {
  padding: 2rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
```
## TypeScript Support

YapperJS is built with TypeScript and provides full type safety:

```tsx
// Define the return type of your dialog
type UserFormData = {
  name: string;
  email: string;
};

// The showDialog call will be properly typed
const userData = await yapperApi.showDialog<UserFormData, { initialEmail: string }>({
  content: UserFormDialog,
  args: { initialEmail: 'user@example.com' }
});

// userData will be typed as UserFormData | undefined
```

## License

MIT