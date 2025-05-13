import Bun from 'bun';

await Bun.build({
    entrypoints: ['src/index.tsx'],
    outdir: 'dist',
    packages: 'external',
    target: 'node',
    banner: "'use client';",
    sourcemap: "linked",
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "import.meta.env.MODE": JSON.stringify("production")
    },
    external: ["react", "react-dom"],
    format: 'esm',
});
