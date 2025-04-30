# YAPPERJS

A moden and proper api for consuming dialogs in react.

# What is Yapperjs?

yapper js is a library that provides a simple, intuitive api for working with dialogs as what dialogs are supposed to be: a request from the software for user input. instead of breaking the flow of the code to render the dialog, and then have a function inside the dialog call another function that continues your logic, you can simply await the dialog and continue your function.

# Usage
a very basic use case:

```tsx
function App() {
  const yapperApi = useYapperDialog();

  return <>
    <button onClick={() => {
      const myUserProvidedData = await yapperApi.showDialog({
        /*my cool and super awesome dialog definition*/
        ...
      });
      ...// doing cool shit with the data
    }}>Click to show dialog</button>
    <yapperApi.renderer/>
  </>
}
```
simple right? now, lets get a bit deeper into that showDialog function:
## showDialog

the showDialog function is the main function of yapper, it tells the yapper renderer (```<yapperApi.renderer/>```) to render a dialog for your code, and returns a function that either resolves or rejects according to the user's interaction with the dialog.
it receives a ```DialogDefinition<T, U extends object>``` object which defines the dialog its going to show.

a normal dialog definition would look something like that:
```ts
{
  content: DialogFormFunctionComponent
}
```
the DialogFormFunctionComponent is a function component that has a prop type that extends ```DialogContentProps<T>``` with T being the return type of the dialog (for example, a user confirmation dialog will have T be boolean).
the DialogContentProps\<T> type:

| key | type | description |
|-|-|-|
|resolve|(value: T) => void|the resolve function of the dialog, call this to resolve the promise returned by showDialog|
|reject<U extends Error>|(error: U) => void|the reject function of the dialog, call this to reject the promise returned by showDialog|
|cancel|() => void|cancels the dialog, equivelent to resolve(undefined)|
|api|DialogApi|the api object used to invoke this dialog|

now, what if we want to use a dialog form that gets some external arguments? easy!
all you need to do is add them to the prop type of the component:
```ts
type Props = DialogContentProps<something> & {
  someOtherCoolArg: string;
}
```
and then the showDialog function will request them in the the arg field:
```tsx
type MyDialogFormProps = DialogContentProps<string> & {
  id: string;
  factor: number;
}
const MyDialogForm: FC<MyDialogFormProps> = (props) => {/*imagine a cool dialog form implemented here*/};

// then somewhere else in your code:
<button onClick={async function() {
  await yapperApi.showDialog({
    content: MyDialogForm,
    args: {
      id: 'my id',
      factor: 2
    }
  });
}}>Test</button>
```