import { defineConfig, loadEnv } from 'vite';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import react from '@vitejs/plugin-react';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import dts from 'vite-plugin-dts';
import version from 'vite-plugin-package-version';
import pkg from './package.json';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

// function removeDistFile() {
//   return {
//     name: 'remove-dist-file',
//     writeBundle() {
//       const mediaDir = path.resolve(__dirname, 'dist', 'files');
//       fs.rmdirSync(mediaDir, { recursive: true });
//     }
//   };
// }

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);

  return defineConfig({
    plugins: [
      resolve(),
      commonjs(),
      svgr(),
      react(),
      version(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        insertTypesEntry: true,
        include: ['src/application/**/*.ts'], // 仅包含 application 目录
      }),
      generatePackageJson({
        outputFolder: 'dist',
        baseContents: {
          name: env.VITE_PUBLISH_NAME || pkg.name,
          main: 'index.js',
          license: 'MIT',
          style: 'assets/main.css',
          types: 'index.d.ts',
          private: false,
          version: pkg.version,
          author: pkg.author,
          type: 'module',
          scripts: {
            test: 'yarn link',
            disconnect: 'yarn unlink',
          },
          exports: {
            '.': './index.js',
            './styles.css': './assets/lib_enter.css',
          },
        },
      }),
      copy({
        targets: [{ src: 'NPMREADME.md', dest: 'dist', rename: 'README.md' }],
        hook: 'writeBundle',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      charset: 'ascii',
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/application/lib_enter.ts'),
        formats: ['es'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],

        input: {
          main: path.resolve(__dirname, 'src/application/lib_enter.ts'),
        },
        output: {
          dir: 'dist', // 确保输出在 dist 根目录
          entryFileNames: `index.js`,
          assetFileNames: `assets/[name].[ext]`,
          globals: {
            react: 'React',
            // 'react-dom': 'ReactDOM',
          },
          plugins: [
            terser(), // 压缩代码
          ],
        },
        treeshake: true, // 启用 tree-shaking，减少无用代码
      },
      // cssCodeSplit: true,
      cssMinify: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 480,
      emptyOutDir: true, // 清空 dist 文件夹
    },
    server: {
      host: '0.0.0.0',
      port: 8888,
    },
  });
};
