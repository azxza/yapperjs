import Bun from 'bun';

await Bun.build({
    entrypoints: ['src/index.tsx'],
    outdir: 'dist',
    packages: 'external',
    target: 'node',
});
