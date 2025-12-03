import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Plugin para carregar CSS de forma assíncrona (não-bloqueante)
function asyncCssPlugin() {
  return {
    name: 'async-css',
    transformIndexHtml(html: string) {
      // Transforma <link rel="stylesheet"> em preload + onload para CSS não-bloqueante
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss(), asyncCssPlugin()],
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
        // Não fazer modulepreload de chunks lazy
        modulePreload: {
          resolveDependencies: (filename, deps) => {
            // Não preload vendor-motion - ele é lazy loaded
            return deps.filter(dep => !dep.includes('vendor-motion'));
          }
        },
        rollupOptions: {
          output: {
            // Separar chunks para melhor caching e lazy loading
            manualChunks: {
              // React core - carregado sempre
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              // Framer motion - lazy loaded apenas com páginas que usam
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
