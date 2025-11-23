# Regras de Código - Spikeflow

## Estrutura de Arquivos

- Prefira arquivos pequenos e componentes com responsabilidade única
- Use kebab-case para nomes de arquivos e pastas
- Use PascalCase para nomes de componentes React
- Nunca crie arquivos maiores que 200 linhas

## Funções e Helpers

- Evite funções longas; extraia helpers para /lib
- Use tipos literais e uniões em vez de strings soltas
- Armazene tipos compartilhados em /lib/types/

## TypeScript

- Prefira `type` em vez de `interface`, a menos que seja necessário estender
- Exporte tipos apenas quando necessário; prefira exports explícitos
- Evite assertions de não-nulo (!); use type narrowing adequado

## React

- Evite estado desnecessário; use useMemo e useCallback quando apropriado
- Prefira componentes de servidor por padrão no Next.js
- Adicione "use client" apenas quando necessário
- Evite prop drilling excessivo; considere context ou hooks

## Imports

- Use aliases de caminho do tsconfig.json (ex.: @/components/...)
- Evite imports relativos longos como ../../../
- Nunca mantenha imports não utilizados
- Mantenha uma ordem consistente de imports:
  1. React
  2. Next
  3. Bibliotecas externas
  4. Imports locais
  5. Styles

## Boas Práticas JavaScript/TypeScript

- Use `const` sempre que possível
- Evite mutações; prefira padrões imutáveis
- Use early returns para reduzir aninhamento de funções
- **NUNCA adicione comentários no código**
- O código deve ser auto-explicativo sem necessidade de comentários

## Tratamento de Erros

- Sempre trate erros, especialmente em chamadas assíncronas
- Prefira async/await em vez de .then()
- Use try/catch apenas quando o tratamento de erro for significativo
- Não oculte erros silenciosamente

## Acessibilidade

- Use elementos HTML semânticos
- Garanta que todos os elementos interativos tenham estados de foco adequados
- Siga as convenções de acessibilidade do shadcn/ui

## Formatação e Lint

- Siga as regras de formatação do Prettier sem exceções
- Siga as regras do ESLint definidas pelo projeto
- Mantenha nomes de variáveis consistentes (isX, hasX, canX para booleanos)

## Git

- As mensagens de commit devem ser concisas e descritivas
- Todas as mensagens de commit devem estar em português

## Documentação

- Não criar arquivos de documentação (README, docs, etc)
- O código deve ser auto-explicativo
- Não adicionar comentários no código

## Idioma

- Todas as telas e mensagens ao usuário devem estar em português
- Código em inglês, sem comentários
