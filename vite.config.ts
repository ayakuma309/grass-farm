import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ を src フォルダにマッピング
    },
  },
  build: {
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/content/grassColor.ts'),
        cow: path.resolve(__dirname, 'src/content/cow.ts'),
        effects: path.resolve(__dirname, 'src/content/effects.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    outDir: 'dist',
  },
});
