import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Otimizações de bundle
        target: 'es2020',
        // Usa esbuild (padrão) - mais rápido que terser
        minify: 'esbuild',
        // Gerar CSS separado para permitir carregamento assíncrono
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            // Separar chunks para melhor caching e lazy loading
            manualChunks: {
              // React core - carregado sempre
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              // Framer motion - pesado, lazy loaded com páginas
              'vendor-motion': ['framer-motion'],
              // Ícones - carregados sob demanda
              'vendor-icons': ['lucide-react'],
            },
          },
        },
        // Aumentar limite de warning para chunks esperados
        chunkSizeWarningLimit: 200,
      },
    };
});
