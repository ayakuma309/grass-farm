import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/content/content.ts'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
    outDir: 'dist', // 出力先ディレクトリを dist に設定
    assetsDir: 'assets', // アセットを assets フォルダに分ける
    emptyOutDir: true, // ビルド前に dist フォルダを空にする
  },
});
