# SEO / GEO — Checklist Universal de Conferência

Checklist de auditoria aplicável a qualquer projeto web. Organizado por categoria, com impacto e esforço estimados. Marque com `[x]` conforme implementado.

---

## Metadata & Head

- [ ] `robots` definido como propriedade de nível superior do objeto de metadata (não aninhado dentro de `openGraph`)
- [ ] `title` configurado com `default` e `template` no layout raiz (ex: `{ default: 'Nome do Site', template: '%s — Nome do Site' }`) — rotas filhas definem apenas o título da página
- [ ] `description` única e descritiva em cada rota (160 caracteres max)
- [ ] `canonical` definido em todas as rotas públicas
- [ ] **URL base de metadata configurada** (ex: `metadataBase` no Next.js ou base URL equivalente no framework) com a URL de produção em variável de ambiente — garante que OG images, canonical e URLs de preview sejam sempre absolutas; sem isso, compartilhamentos sociais não exibem imagem
- [ ] **Metadata dinâmico por item de conteúdo** — rotas dinâmicas (post de blog, produto, perfil) devem computar title, description e og:image a partir dos dados do item específico, não apenas um título genérico da categoria; dados podem ser cacheados para evitar dupla requisição entre geração de metadata e renderização da página
- [ ] Rotas de funil/conversão (quiz, checkout, obrigado) com `robots: { index: false, follow: false }` + `Disallow` no `robots.txt`
- [ ] Meta tags de localidade configuradas: `language` e `country` (ex: `pt-BR`, `BRA`)
- [ ] `meta name="currency"` configurado com a moeda principal do mercado (ex: `BRL`) — sinal de relevância regional para e-commerce
- [ ] `meta name="copyright"` com o nome da empresa — proteção de marca e sinal de autoria
- [ ] `meta http-equiv="x-dns-prefetch-control" content="on"` — habilita DNS prefetch globalmente no documento
- [ ] `meta name="format-detection" content="telephone=no"` — impede que browsers convertam automaticamente números em links de telefone (evita alterações involuntárias no DOM que afetam CLS)
- [ ] `meta name="apple-mobile-web-app-capable" content="yes"` — indica ao iOS que o site pode rodar como web app standalone (reforça sinal PWA no Safari)
- [ ] `meta name="viewport"` com `maximum-scale=5` — permite zoom até 5× (acessibilidade e score mobile)
- [ ] `meta name="robots" content="max-snippet:-1, max-video-preview:-1, max-image-preview:large"` — combinação completa: permite extração de snippet longo por IA, preview de vídeo completo, e imagem grande no Google; omitir qualquer valor limita a visibilidade nos resultados
- [ ] `meta name="generator"` com versão do CMS **removido** ou ofuscado — expor versão do WordPress/Elementor é vetor de ataque e não traz benefício SEO
- [ ] `<link rel='dns-prefetch' href='//dominio.com'>` para domínios de terceiros não-críticos (CDNs, tracking) — mais leve que `preconnect`, não abre socket TCP mas resolve DNS antecipadamente
- [ ] **Open Graph completo** em todas as rotas:
  - [ ] `og:locale` (ex: `pt_BR`) — indica o idioma/região do conteúdo para plataformas sociais
  - [ ] `og:site_name` — nome canônico do site exibido em cards sociais
  - [ ] `og:type` — `website` para a home, `article` para posts de blog
  - [ ] `og:title`, `og:description`, `og:url`
  - [ ] `og:image` com URL absoluta e dimensão mínima de 1200×630px
  - [ ] `og:image:secure_url` (HTTPS), `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt` — propriedades estendidas que eliminam layout shift nos previews e adicionam acessibilidade à imagem compartilhada
- [ ] **Open Graph de artigo** em posts de blog:
  - [ ] `article:published_time` com datetime ISO 8601 — sinal de frescor para Google e IAs
  - [ ] `article:modified_time` — Google usa para recrawl prioritário quando o conteúdo é atualizado
  - [ ] `article:section` — categoria do artigo (ex: "Saúde e Cuidados")
- [ ] **Twitter Card completo**:
  - [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
  - [ ] `twitter:site` com o @handle da empresa (ex: `@every`) — vincula o card à conta verificada do X/Twitter, aumentando o reach orgânico do conteúdo compartilhado
  - [ ] `twitter:label1` / `twitter:data1` (ex: "Escrito por" / nome do autor) — dados extras exibidos no card
  - [ ] `twitter:label2` / `twitter:data2` (ex: "Tempo de leitura" / "4 minutos") — aumenta CTR mostrando expectativa de consumo
- [ ] `meta name="facebook-domain-verification"` com token do Meta Business Manager — valida o domínio no Facebook, aumenta confiança do pixel e habilita recursos avançados de rastreamento de conversão
- [ ] **Conformidade com GPC (Global Privacy Control)** — verificar `navigator.globalPrivacyControl === true` e desativar tracking de advertising quando ativo; sinal de conformidade que alguns crawlers registram
- [ ] `<link rel="amphtml">` para páginas de blog com versão AMP — acelera indexação mobile e aparece no carrossel AMP do Google

---

## Schema Markup (Structured Data)

- [ ] Todos os schemas consolidados em um único bloco `@graph` (um único `<script type="application/ld+json">`)
- [ ] Cada objeto dentro do `@graph` não repete `@context` (herdado do pai)
- [ ] `JSON.stringify` dos schemas com `.replace(/</g, '\\u003c')` para prevenção de XSS
- [ ] **`Organization`** implementado com:
  - [ ] `name`, `url`, `logo`, `description`
  - [ ] `foundingDate`
  - [ ] `telephone` com número real — sinal E-E-A-T e local SEO
  - [ ] `address` com `PostalAddress` (streetAddress, addressLocality, addressRegion, postalCode, addressCountry)
  - [ ] `sameAs` com URLs reais de todas as redes sociais E plataformas de podcast (Apple Podcasts, Spotify) — cada plataforma adicional reforça a entidade no Knowledge Graph
  - [ ] `founder` com `Person` inline — vincula o fundador diretamente à organização no grafo sem depender de schema `Person` separado
  - [ ] `description` no schema com **social proof explícito** (ex: "Cited by The New York Times and The New Yorker") — IAs e o Knowledge Graph priorizam organizações com descrições que demonstram autoridade reconhecida por terceiros
  - [ ] `contactPoint` se aplicável
  - [ ] `subOrganization` com cada marca/subsidiária da empresa (se multi-brand) — fortalece o grafo de entidades
- [ ] **`WebSite`** com `SearchAction` implementado (habilita Sitelinks Search Box) — ativo apenas se houver busca funcional no site
- [ ] **`WebSite`** com `sameAs` listando todas as redes sociais (além do `sameAs` do `Organization`) — reforço redundante das entidades
- [ ] **`WebSite`** com `alternateName` declarado (ex: slogan ou nome alternativo da marca) — sinal adicional de entidade no Knowledge Graph
- [ ] **`WebPage`** ou `WebApplication` / `SoftwareApplication` conforme o tipo de produto com:
  - [ ] `primaryImageOfPage` linkando para o `ImageObject` da imagem principal — facilita extração da imagem pelo Google
  - [ ] `breadcrumb` linkando para o `BreadcrumbList` da página — conecta o grafo de entidades explicitamente
  - [ ] `inLanguage` (ex: `"pt-BR"`) — declara o idioma do conteúdo da página para crawlers multilíngues
- [ ] **`ImageObject`** como nó standalone no `@graph` com `url`, `width`, `height`, `caption` e `inLanguage` — permite que o Google indexe a imagem com contexto semântico rico; o `caption` é exibido no Google Imagens
- [ ] **`BreadcrumbList`** com `itemListElement` para cada nível de navegação — habilita rich result de breadcrumb nos resultados de busca, reduz bounce rate
- [ ] **`Person`** para fundador / autor principal com `jobTitle`, `sameAs`, credenciais, `worksFor` linkando para `Organization`
- [ ] **`Service`** para cada funcionalidade/serviço principal (permite recomendações por IAs)
- [ ] **`FAQPage`** se a página contém perguntas e respostas
- [ ] **`HowTo`** se a página descreve um processo passo a passo
- [ ] **`Product`** em páginas de detalhe de produto (e-commerce / SaaS com plano/preço) com:
  - [ ] `name`, `description`, `brand` (`Brand` com `name`)
  - [ ] `offers` com `price`, `priceCurrency` (ex: `"BRL"`) e `availability` (ex: `InStock`) — habilita rich result de preço diretamente no Google; sem isso, o produto não recebe destaque visual nos resultados
  - [ ] `aggregateRating` com `ratingValue` e `ratingCount` — habilita as estrelas de avaliação (star rating) no resultado do Google; é um dos rich results com maior impacto em CTR
  - [ ] `image` com URL absoluta da imagem principal do produto
- [ ] **`ItemList`** em páginas de listagem/catálogo com:
  - [ ] `name`, `description`, `url` da página de listagem
  - [ ] `numberOfItems` com a contagem dinâmica de itens da lista
  - [ ] `itemListElement[]` — array de objetos com `@type: "ListItem"`, `position` (inteiro sequencial), `name`, `description` e `url` de cada item — habilita list rich results e permite que IAs entendam a estrutura do catálogo
- [ ] **`Article`** / **`BlogPosting`** em cada post de blog com:
  - [ ] `headline`, `author`, `publisher`, `datePublished`, `dateModified`, `image`
  - [ ] `keywords` com as palavras-chave primárias do artigo — lidas por IAs para categorização tópica
  - [ ] `mainEntityOfPage` linkando para o `WebPage` — conecta artigo à página no grafo
  - [ ] `inLanguage` declarado
- [ ] **Microdata inline** (`itemscope`, `itemtype`, `itemprop`) nos elementos estruturais principais — complementa o JSON-LD para crawlers que processam HTML semântico diretamente (ex: `<header itemtype="https://schema.org/WPHeader">`, `<article itemtype="https://schema.org/Article">`)
- [ ] Schemas validados no [Rich Results Test](https://search.google.com/test/rich-results)

---

## Sitemap & Robots

- [ ] `sitemap.xml` gerado dinamicamente (não arquivo estático manual) — evita desatualização
- [ ] Sitemap inclui todas as rotas públicas com `lastmod` e `changefreq`
- [ ] **`priority` diferenciado por importância da página** — homepage: `1.0`; seções principais (produtos, blog, contato): `0.8`; páginas secundárias: `0.7`; não definir `priority: 1.0` para todas as páginas — quando todas têm a mesma prioridade, os crawlers ignoram o campo por completo e determinam a ordem de crawl por conta própria
- [ ] Rotas noindex ausentes do sitemap
- [ ] `robots.txt` com `Sitemap:` apontando para a URL absoluta do sitemap
- [ ] `robots.txt` com `Disallow` para rotas de funil, admin e APIs internas

---

## Performance & Core Web Vitals

- [ ] **Fontes críticas self-hosted** com URLs estáveis e conhecidas (não hashes de build)
- [ ] `@font-face` com `font-display: swap` para todas as fontes
- [ ] `@font-face src:` com `local("Font Name")` antes da URL — evita requisição de rede se a fonte já estiver instalada no sistema do usuário
- [ ] `@font-face` com `unicode-range` declarado — carrega apenas o subconjunto de caracteres necessário (ex: `U+0000-00FF` para Latin), reduzindo o tamanho do arquivo transferido
- [ ] `<link rel="preload" as="font" fetchPriority="high">` para as 1–2 fontes do LCP (acima da dobra)
- [ ] Fontes secundárias (não LCP) com `fetchPriority="low"` no preload — evita competição com recursos críticos
- [ ] Scripts de terceiros (GTM, analytics) preloadados com `fetchpriority="low"` e `referrerpolicy="no-referrer"` — carregam sem disputar banda com o LCP
- [ ] `<style>` inline no `<head>` com os `@font-face` críticos (elimina FOUT antes do CSS externo carregar)
- [ ] CSS do body com `text-rendering: optimizeLegibility` e `-webkit-font-smoothing: antialiased` — melhora qualidade visual percebida e estabilidade de layout
- [ ] Imagens acima da dobra com `fetchPriority="high"` e sem lazy loading
- [ ] Imagens abaixo da dobra com `loading="lazy"` e `decoding="async"` — decodificação assíncrona não bloqueia a thread principal
- [ ] Atributo `srcset` com múltiplas resoluções em todas as imagens (ex: `300w, 768w, 1200w`) — browser serve o tamanho correto por viewport
- [ ] Atributo `sizes` correto por contexto (ex: `sizes="(max-width: 768px) 100vw, 50vw"`) — evita download de imagem maior que o necessário
- [ ] `contain-intrinsic-size` definido via CSS para imagens com `sizes="auto"` — reserva espaço antes do carregamento e evita CLS
- [ ] CSS background images de seções abaixo da dobra removidas no carregamento inicial e aplicadas via IntersectionObserver ou classe JS — evita download de imagens que o usuário nunca verá
- [ ] Imagens em formato moderno (WebP ou AVIF) com fallback
- [ ] `<link rel="preconnect">` para todos os domínios externos críticos (analytics, CDNs, APIs)
- [ ] Scripts de analytics com lazy loading (dispara na primeira interação ou após timeout)
- [ ] `window.dataLayer = window.dataLayer || []` inicializado inline antes do GTM carregar — evita race condition onde eventos são enviados antes do GTM estar pronto
- [ ] **Imagens servidas via CDN** (Cloudflare, Cloudfront, Fastly) com domínio dedicado — reduz TTFB das imagens, habilita edge caching global e serve imagens do ponto de presença mais próximo do usuário
- [ ] LCP < 2.5s | CLS < 0.1 | TBT < 200ms (verificar no Lighthouse e PageSpeed Insights)

---

## Renderização & Indexabilidade

- [ ] **HTML semântico** — usar `<nav>`, `<header>`, `<main>`, `<article>`, `<section>`, `<button>` em vez de `<div>` genérico para todos os elementos estruturais e interativos — cada tag semântica é um sinal de significado que o Googlebot usa para entender a hierarquia e função do conteúdo sem depender de CSS ou JS
- [ ] Conteúdo crítico (H1, texto principal, CTAs) renderizado no servidor (SSR/SSG) — não depende de JS para ser lido pelo Googlebot
- [ ] Componentes interativos isolados com `'use client'` granular — não propaga a fronteira client para toda a árvore
- [ ] Componentes sem estado (header, footer, seções de conteúdo) permanecem como Server Components
- [ ] Nenhum conteúdo essencial para SEO carregado apenas via `useEffect` ou fetch client-side
- [ ] **SSG para rotas dinâmicas com conteúdo conhecido** — pré-renderizar no build time todas as páginas dinâmicas cujo conjunto de URLs é conhecido (ex: posts de blog, páginas de produto) — o Googlebot recebe HTML estático instantaneamente em vez de aguardar render do servidor a cada visita; usar `generateStaticParams` (Next.js) ou equivalente no framework

---

## PWA & Mobile Signals

- [ ] `manifest.json` com `name`, `short_name`, `description`, `start_url`, `display`, `theme_color`, `background_color`, `lang`, array `icons`
- [ ] `<link rel="manifest">` no `<head>` (ou via metadata do framework)
- [ ] **Favicon SVG** (`<link rel="icon" href="/favicon.svg">`) — escala perfeitamente em qualquer densidade de tela; suporta `@media (prefers-color-scheme)` inline para dark mode automático
- [ ] **Favicons dark mode** via `media="(prefers-color-scheme: dark)"` — versões separadas dos favicons PNG/SVG para modo escuro (ex: `favicon-32x32-dark.png`)
- [ ] `meta name="mobile-web-app-capable" content="yes"` — equivalente Android/Chrome do `apple-mobile-web-app-capable`; habilita comportamento de web app no Android
- [ ] **Favicon padrão** em `.ico` (`/favicon.ico`) — fallback universal para todos os browsers e agregadores
- [ ] **Favicon PNG** nos tamanhos 16×16 e 32×32 — usado em abas do browser e bookmarks
- [ ] Touch icons Apple configurados nos tamanhos completos: 180×180, 167×167, 152×152, 144×144, 120×120, 114×114, 76×76, 72×72, 60×60, 57×57 — cobre todos os modelos iPhone e iPad
- [ ] Ícones Android/Chrome configurados: 48×48, 72×72, 144×144, 192×192 — cobre todos os densities de tela Android
- [ ] `meta name="msapplication-TileImage"` com ícone 270×270px — imagem exibida quando o usuário pina o site no menu Iniciar do Windows
- [ ] Ícones gerados nas dimensões exatas (não esticados via CSS)
- [ ] `theme-color` meta tag presente

---

## Alt Texts & Acessibilidade Semântica

- [ ] Nenhuma imagem com `alt=""` exceto imagens puramente decorativas
- [ ] Nenhuma imagem com `alt` genérico ("logo", "imagem", nome da empresa sem contexto)
- [ ] Alt texts descrevem o contexto visual + função da imagem (ex: "Tela do app aberta no celular — scanner de saúde")
- [ ] Imagens de pessoas: nome + cargo/contexto + credenciais relevantes
- [ ] Imagens de produto: produto + contexto de uso + benefício
- [ ] H1 único por página, descreve o tema principal
- [ ] Hierarquia H1 → H2 → H3 sem pular níveis

---

## Analytics & Monitoramento

- [ ] **Google Analytics 4** configurado com ID de medição em variável de ambiente
- [ ] GA4 com lazy loading (não bloqueia LCP)
- [ ] Eventos de conversão definidos e marcados no GA4 (ex: clique em CTA principal, conclusão de funil, download)
- [ ] **UTM parameters em todos os CTAs internos** (ex: `?utm_source=hero&utm_content=subscribe`) — permite identificar qual seção da página converte melhor; sem UTMs, GA4 agrupa todas as origens como "direct"
- [ ] **Google Search Console** — domínio verificado, sitemap submetido
- [ ] GA4 vinculado ao Search Console (habilita relatório de queries orgânicas)
- [ ] **Bing Webmaster Tools** — sitemap submetido (indexação no Bing/Copilot/Edge)
- [ ] Microsoft Clarity ou Hotjar configurado (análise de comportamento / heatmaps)
- [ ] Core Web Vitals monitorados no Search Console e GA4
- [ ] **Real User Monitoring (RUM)** implementado (ex: mPulse, web-vitals.js, SpeedCurve) — coleta LCP, CLS, TBT de usuários reais em produção, diferente do Lighthouse que é laboratório; dados RUM são o que o Google de fato mede no CrUX

---

## Conteúdo & Arquitetura de Informação

- [ ] **Arquitetura mínima de páginas institucionais** — ter URLs dedicadas para Home, Sobre/Quem Somos, Serviços/Produtos, Contato e FAQ aumenta o número de entry points para crawlers, permite que cada página ranqueie para keywords distintas e distribui autoridade interna via links entre elas; sites de uma única landing page têm drasticamente menos chances de indexação ampla
- [ ] Cada feature/serviço principal tem sua própria URL com conteúdo diferenciado (não tudo em uma única landing page)
- [ ] Cada rota com `export const metadata` próprio (title, description, canonical)
- [ ] Conteúdo diferenciado em pelo menos 50% entre páginas irmãs (title tag, meta description, H1, H2s, abertura do texto, schema) — evita canibalização e bundling pelo Google
- [ ] **Arquitetura local (Programmatic SEO)** para negócios com múltiplas localizações:
  - [ ] Página pai "Áreas atendidas" listando todas as cidades/regiões
  - [ ] Uma página por localização (ex: `/plumber-rollingwood/`)
  - [ ] Uma página por serviço × localização (ex: `/emergency-plumbing-rollingwood/`) — conteúdo diferenciado 50% entre cidades irmãs
  - [ ] Schema `Service` com `areaServed` específico por página de localização
- [ ] **Estratégia de cluster tópico** — um artigo pilar por tema + 8–15 artigos satélite respondendo perguntas específicas do mesmo tópico; todos linkam de volta ao pilar; sinaliza autoridade tópica para crawlers e IAs
- [ ] **Blog / Hub de conteúdo** com artigos de autoridade tópica no nicho
- [ ] Artigos no formato capsule content: cada H2 é uma pergunta, respondida diretamente na primeira frase (sem introdução)
- [ ] Links internos entre artigos relacionados e para a página principal
- [ ] Schema `Article` em cada post com autor real, datas e imagem
- [ ] **Breadcrumb visual** no HTML correspondente ao `BreadcrumbList` schema — ajuda crawlers a entender a hierarquia do site; o texto visível e o schema devem ser consistentes
- [ ] **Tempo de leitura** exibido no artigo (ex: "4 minutos") — aumenta CTR no Twitter card (`twitter:data2`) e reduz bounce rate ao definir expectativa de consumo
- [ ] **Taxonomias de categoria** com páginas de listagem próprias e URLs semânticas (ex: `/blog/cuidados/doencas/`) — estrutura de silos tópicos que concentra autoridade por tema
- [ ] **RSS Feed exposto** via `<link rel="alternate" type="application/rss+xml">` — descoberta por agregadores, leitores de feed e rastreadores de IA que indexam feeds
- [ ] **oEmbed endpoint** declarado via `<link rel="alternate" type="application/json+oembed">` — habilita previews ricos ao compartilhar conteúdo em plataformas que suportam oEmbed (Slack, Discord, WordPress, Notion)
- [ ] **Página de imprensa / mídia** (`/press` ou `/na-midia`) com cobertura jornalística real — sinal E-E-A-T para IAs e Google; páginas de press são citadas com maior frequência em AI Overviews

---

## AEO — Answer Engine Optimization

Otimizações para aparecer nas respostas diretas do Google (Featured Snippets, People Also Ask, AI Overviews) sem depender de clique.

> **Por que importa:** 80%+ das buscas no Google terminam em zero cliques (93% no AI Mode). Estar na resposta é mais valioso do que estar no resultado.

- [ ] **Featured Snippets** — primeira frase de cada H2 responde diretamente a pergunta do título do bloco, sem preâmbulo (mesmo formato do capsule content — reforço intencional)
- [ ] **People Also Ask (PAA)** — identificar as perguntas do PAA para cada keyword alvo e criar seções H2 com respostas de 2–4 linhas que possam ser extraídas diretamente; usar ferramentas como AlsoAsked ou AnswerThePublic para mapear
- [ ] **Paragraphs snippet** — resposta de até 300 caracteres logo abaixo do H2 alvo; o Google extrai o primeiro parágrafo após o heading para featured snippet
- [ ] **Table snippets** — tabelas HTML comparativas (preços, especificações, comparações) otimizadas para aparecer como rich snippet tabular
- [ ] **List snippets** — listas `<ol>` ou `<ul>` para processos step-by-step; o Google frequentemente extrai listas numeradas para featured snippet de processo
- [ ] **SEO → AEO → GEO hierarquia** validada: 76% das citações nos AI Overviews do Google vêm das top 10 posições orgânicas — sem SEO base, AEO e GEO não funcionam

---

## GEO — Generative Engine Optimization

Otimizações para aparecer em respostas de IAs (ChatGPT, Perplexity, Copilot, Gemini, Claude).

- [ ] Schemas `Service` descrevem cada funcionalidade com `name`, `description`, `serviceType`, `areaServed`, `provider`
- [ ] Autor / fundador com credenciais explícitas no schema `Person` (formação, cargo, registro profissional se aplicável)
- [ ] Conteúdo de blog responde perguntas diretas sem introdução — facilita extração por IAs
- [ ] Entidade da organização forte no Knowledge Graph: `sameAs` com perfis verificados, `foundingDate`, `address`
- [ ] `FAQPage` schema com perguntas que espelham as queries que IAs recebem sobre o nicho
- [ ] Presença em fontes citadas por IAs: Wikipedia, Wikidata, portais de autoridade do nicho, press coverage
- [ ] E-E-A-T demonstrado: Experience, Expertise, Authoritativeness, Trustworthiness — autor real, credenciais, data de publicação, fontes
- [ ] Schema `HowTo` para processos passo a passo — formato preferido por IAs para tutoriais

---

## Off-site & Autoridade de Domínio

- [ ] Perfis em todas as redes sociais relevantes criados e linkados no `sameAs`
- [ ] Google Business Profile criado e completo (se negócio local) — aparece no Map Pack, sinal de E-E-A-T local
- [ ] App Store / Google Play com reviews reais (solicitar após onboarding)
- [ ] Guest posts ou menções em portais de autoridade do nicho
- [ ] **Canal YouTube** com conteúdo alinhado aos artigos do blog — YouTube é a 2ª maior plataforma de busca; IAs citam vídeos do YouTube diretamente nas respostas
- [ ] Perfil do fundador/autor com artigos no LinkedIn
- [ ] Backlinks de domínios relevantes e com DA > 30
- [ ] **Brand mentions** monitoradas (ex: Google Alerts, Mention.com) — menções sem link ainda são sinal de autoridade; converter menções não-linkadas em backlinks quando possível
- [ ] **Repurposing de conteúdo entre plataformas** — cada artigo de blog vira: 1 vídeo YouTube, 1 short/Reels, 1 post LinkedIn, 1 thread X/Twitter; expande o footprint digital sem criar conteúdo do zero
- [ ] **Platform SEO** — otimizar também para busca interna de YouTube (title, description, tags, chapters), TikTok (caption + keywords faladas), Instagram (alt text, caption keywords), Pinterest (board names, pin descriptions) — IAs citam conteúdo dessas plataformas diretamente

---

## Checklist Pré-Launch

- [ ] Lighthouse score ≥ 90 em Performance, Acessibilidade, Best Practices, SEO (mobile e desktop)
- [ ] Rich Results Test sem erros em todos os schemas
- [ ] Sitemap acessível em `/sitemap.ts` e sem URLs 404
- [ ] `robots.txt` acessível em `/robots.txt`
- [ ] Nenhum link interno quebrado (404)
- [ ] Redirecionamentos 301 configurados para URLs antigas (se for migração)
- [ ] `https://` forçado — sem conteúdo misto (mixed content)
- [ ] Open Graph preview validado no [opengraph.xyz](https://www.opengraph.xyz)
- [ ] **Solicitar indexação manual via GSC URL Inspection** — após o deploy, usar a ferramenta "Inspecionar URL" no Google Search Console e clicar em "Solicitar indexação" para as páginas principais (home, serviços, artigos estratégicos) — agiliza visibilidade no Google em horas em vez de dias ou semanas de espera pelo crawl espontâneo
- [ ] **Verificar `site:seudominio.com`** no Google — confirma quais páginas estão indexadas e revela URLs inesperadas (admin, staging, páginas de erro) que não deveriam ser públicas
- [ ] Search Console sem erros de cobertura ou Core Web Vitals após indexação

---

## Resumo de Prioridade

> Ordenado por **sequência de implementação** — cada fase depende da anterior. Fazer fora de ordem gera retrabalho (ex: adicionar metadata antes de definir as páginas, ou criar schema antes de ter SSR).

| Fase | O que implementar | Esforço | Impacto | Por que agora |
|---|---|---|---|---|
| **1 — Arquitetura base** | HTML semântico (`<nav>`, `<main>`, `<article>`, `<section>`) | Baixo | Alto | Refatorar componentes depois é caro; estrutura que afeta tudo |
| **1 — Arquitetura base** | Renderização SSR/SSG + `use client` granular | Baixo | Alto | Mudar de CSR para SSR depois = reconstruir árvore de componentes |
| **1 — Arquitetura base** | Arquitetura mínima de páginas (Home + Sobre + Serviços + Contato + FAQ) | Médio | Alto | Definir URLs antes de metadata ou sitemap; criar depois = refazer tudo |
| **2 — Infra de metadata** | `metadataBase` com URL de produção em variável de ambiente | Baixo | Alto | Deve existir antes de qualquer OG image ou canonical — URLs relativas quebram sem isso |
| **2 — Infra de metadata** | Layout raiz: `title` com `default`+`template`, OG genérico, Twitter genérico | Baixo | Alto | Template herdado por todas as páginas; mudar depois exige revisar cada rota |
| **2 — Infra de metadata** | `robots.ts` + `sitemap.ts` dinâmico com `priority` diferenciado | Baixo | Alto | Infra que auto-cresce com novas páginas; configurar uma vez |
| **3 — Metadata por página** | `title`, `description`, `canonical`, `robots` por rota estática | Baixo | Alto | Fazer ao criar cada página; acumular para depois = lista enorme de dívida |
| **3 — Metadata por página** | Metadata dinâmico (`generateMetadata`) para rotas dinâmicas | Baixo | Alto | Produto/post deve ter metadata próprio desde o início; sem isso Google vê títulos genéricos |
| **3 — Metadata por página** | Open Graph completo + `og:image` 1200×630 + article tags | Baixo | Médio | Compartilhamentos sem OG = link sem preview; configurar junto do metadata |
| **3 — Metadata por página** | Twitter Card completo + labels (autor + tempo de leitura) | Baixo | Baixo | Mesma iteração do OG; custo zero se feito junto |
| **3 — Metadata por página** | `max-snippet:-1` + `max-video-preview:-1` + `max-image-preview:large` | Baixo | Médio | Adicionar junto das demais metas; zero custo extra |
| **3 — Metadata por página** | Meta tags de localidade + `currency` + `copyright` | Baixo | Baixo | Completar o head de uma vez enquanto já está editando |
| **4 — Performance crítica** | Fontes self-hosted + `font-display: swap` + `local()` + `unicode-range` + preload | Médio | Alto | Afeta LCP diretamente; mudar depois causa CLS e regressões visuais |
| **4 — Performance crítica** | Imagens: `srcset` + `sizes` + `fetchPriority` + `loading="lazy"` + WebP/AVIF | Baixo | Alto | Padrão de componente de imagem; definir uma vez e aplicar globalmente |
| **4 — Performance crítica** | SSG para rotas dinâmicas com conteúdo conhecido | Baixo | Alto | Mais fácil configurar antes de ter centenas de páginas |
| **4 — Performance crítica** | CDN para imagens + `preconnect` para domínios externos | Baixo | Médio | Mudar URLs de imagem depois = busca/substituição global |
| **5 — Schema Markup** | `Organization` + `WebSite` + `Person` (fundador) — nó global no `@graph` | Baixo | Alto | Schema global; definir uma vez antes dos schemas de página |
| **5 — Schema Markup** | `WebPage` + `BreadcrumbList` + `ImageObject` por rota | Baixo | Médio | Complementa o metadata; fazer junto ao criar cada página |
| **5 — Schema Markup** | `Service` por funcionalidade/serviço + `telephone` + `subOrganization` | Baixo | Médio | Após páginas de serviço existirem |
| **5 — Schema Markup** | `Product` + `AggregateRating` em páginas de produto | Baixo | Muito Alto | E-commerce: habilita preço e estrelas nos resultados; fazer junto da página |
| **5 — Schema Markup** | `ItemList` em páginas de catálogo/listagem | Baixo | Alto | Complemento do `Product`; mesma iteração |
| **5 — Schema Markup** | `FAQPage` + `HowTo` onde aplicável | Baixo | Médio | Após conteúdo de FAQ/tutorial existir |
| **5 — Schema Markup** | `Article`/`BlogPosting` com `keywords` + `inLanguage` + `mainEntityOfPage` | Baixo | Médio | Fazer ao criar cada post de blog |
| **6 — PWA & mobile** | `manifest.json` + favicons (SVG, ICO, PNG, dark mode) + touch icons | Baixo | Médio | Independente; fazer antes do launch para não esquecer |
| **6 — PWA & mobile** | `apple-mobile-web-app-capable` + `mobile-web-app-capable` + `theme-color` | Baixo | Baixo | Mesma iteração do manifest; adicionar de uma vez |
| **7 — Analytics** | GA4 com lazy loading + variável de ambiente | Baixo | Alto | Antes do launch; dados retroativos não existem |
| **7 — Analytics** | GSC verificado + sitemap submetido + Bing Webmaster Tools | Baixo | Alto | Antes do launch; GSC precisa de tempo para coletar dados |
| **7 — Analytics** | UTM em CTAs internos + RUM (web-vitals.js) | Baixo | Alto | Configurar antes do launch para capturar desde o dia 1 |
| **8 — Alt texts** | Alt texts semânticos em todas as imagens | Baixo | Médio | Fazer ao criar/adicionar cada imagem; acumular é dívida |
| **8 — Alt texts** | Hierarquia H1 → H2 → H3 sem pular níveis | Baixo | Médio | Revisar templates antes de gerar conteúdo em escala |
| **9 — Pré-launch** | Lighthouse ≥ 90 + Rich Results Test + Open Graph preview | Baixo | Alto | Verificação final antes de publicar |
| **9 — Pré-launch** | `site:dominio.com` + solicitar indexação via GSC URL Inspection | Baixo | Alto | Primeiros minutos após deploy; agiliza indexação em horas |
| **10 — Conteúdo (contínuo)** | Blog com capsule content + cluster tópico (pilar + satélites) | Alto | Muito Alto | Após launch; processo contínuo de autoridade tópica |
| **10 — Conteúdo (contínuo)** | Páginas individuais por feature + taxonomias de categoria | Alto | Alto | Expandir arquitetura conforme produto cresce |
| **10 — Conteúdo (contínuo)** | Programmatic SEO: matriz serviço × localização | Alto | Alto | Quando houver volume de cidades/serviços para justificar |
| **10 — Conteúdo (contínuo)** | RSS feed + oEmbed + Página de imprensa | Baixo | Médio | Adicionar junto ao blog/hub de conteúdo |
| **11 — AEO** | Featured Snippets + People Also Ask + snippets formatados | Baixo | Alto | Só funciona com conteúdo existente e ranqueado |
| **12 — GEO** | Knowledge Graph + E-E-A-T + FAQPage para IAs | Baixo | Alto | Construído sobre autoridade tópica já estabelecida |
| **13 — Off-site (contínuo)** | Perfis sociais + Google Business Profile + backlinks + YouTube + brand mentions | Variado | Muito Alto | Paralelo ao conteúdo; nunca termina |
| **13 — Off-site (contínuo)** | Repurposing cross-platform + Platform SEO | Médio | Alto | Após ter conteúdo de blog para reaproveitar |
