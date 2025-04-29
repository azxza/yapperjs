import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { useYapperDialog } from '../src';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const App = () => {
    const dialogApi = useYapperDialog({});
    return <div>
        <div>hello world</div>
        <button onClick={async () => {
            const confirmResult = await dialogApi.confirm('confirm dialog');
            alert(confirmResult);
            const promptResult = await dialogApi.prompt('this is a prompt', 'with title');
            alert(promptResult);
        }}>TEST</button>
        <dialogApi.renderer/>
    </div>;
}

root.render(<App/>)