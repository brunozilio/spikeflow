#!/bin/bash
set -e

echo "🚀 Configurando Spikeflow no Codespaces..."

echo "📦 Instalando pnpm..."
npm install -g pnpm

echo "📥 Instalando dependências..."
pnpm install

if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env a partir do .env.example..."
    cp .env.example .env
fi

echo "🗄️  Rodando migrations do banco de dados..."
pnpm db:generate || true
pnpm db:migrate || true
