import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { useYapperDialog, YapperDialogContentProps } from '../src';

const root = ReactDOM.createRoot(document.getElementById('root')!);

type Table = {name: string; chairCount: number;};
const TestDialog: React.FC<YapperDialogContentProps<Table>> = ({
    resolve
}) => {
    return <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData);
        console.log([...formData.entries()]);
        resolve([...formData.keys()].reduce((acc, key) => {
            acc[key] = formData.get(key);
            return acc;
        }, {}) as Table);
    }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'steel',
    }}>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' placeholder='table name...' required/>
        <label htmlFor='chairCount'>Chair Count:</label>
        <input type='number' name='chairCount' min={1} defaultValue={1}/>
        <button type="submit">submit</button>
    </form>
}


const App = () => {
    const dialogApi = useYapperDialog();
    return <div>
        <div>hello world</div>
        <button onClick={async () => {
            dialogApi.showDialog({
                content: TestDialog,
            })
        }}>TEST</button>
        <dialogApi.renderer/>
    </div>;
}

root.render(<App/>)