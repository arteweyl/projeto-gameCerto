# GameCerto 🎮

O **GameCerto** é uma plataforma inteligente e responsiva de recomendação de jogos eletrônicos. O sistema analisa as preferências de gênero do usuário, sua plataforma (PC, PlayStation, Xbox, Switch ou Navegador), limite de hardware (memória RAM) e descrições textuais abertas para encontrar o jogo ideal sob medida.

---

## 🚀 Arquitetura Geral do Sistema

A arquitetura do GameCerto une a praticidade e leveza de uma aplicação executada inteiramente no lado do cliente (**Client-Side**) à inteligência de processamento de dados offline em pipelines automatizados de CI/CD (**GitHub Actions**).

```mermaid
graph TD
    subgraph 1. Pipeline de Ingestão & NLP (Python + CI/CD)
        A[CheapShark API] --> D[ingest.py]
        B[FreeToGame API] --> D
        C[GamerPower API] --> D
        D -->|Busca em Lote & Fuzzy| E[Twitch / IGDB API]
        E -->|Capas, Descrições, Desenvolvedoras| D
        D -->|Games Database| F[data/games.js]
        D -->|TF-IDF + SVD Latent Spaces| G[data/semantic_model.js]
    end

    subgraph 2. Interface do Recomendador (Navegador do Usuário)
        F & G -->|Carregados via Script| H[Recomendador Frontend]
        I[Inputs: Texto + Tags + RAM] --> H
        H -->|Busca Híbrida Léxico-Semântica| J[Similaridade de Cosseno + Exatos]
        J --> K[Recomendação Ideal + 3 Alternativas]
    end
```

---

## 🧠 Inteligência do Recomendador (Busca Híbrida)

Diferente de buscadores comuns baseados apenas em filtros estáticos, o GameCerto utiliza um **Mecanismo de Busca Híbrido** profissional (combinando técnicas de NLP léxicas e semânticas):

### 1. Expansão de Consulta (Query Expansion)

Ao digitar termos de busca, o sistema utiliza um dicionário bilíngue de sinônimos (PT/EN) para enriquecer a busca.

- _Exemplo:_ Buscar por `"space"` expande automaticamente para pesquisar também por `["nave", "naves", "espacial", "alien", "aliens", "sci-fi", "galaxy"]`.

### 2. Pontuação Léxica Direta (Casamento Exato)

Jogos que possuem correspondência direta com as palavras digitadas no catálogo recebem um peso alto, evitando falsos positivos conceituais:

- Palavra exata no **Título**: `+120 pontos`
- Palavra exata no **Gênero**: `+60 pontos`
- Palavra exata nas **Tags**: `+50 pontos`
- Palavra exata na **Descrição**: `+30 pontos`

### 3. Análise Semântica Latente (LSA - NLP Vetorial)

Durante a ingestão, o Python treina um modelo vetorial **LSA** (TF-IDF + TruncatedSVD) reduzindo a descrição dos jogos a 30 dimensões latentes conceituais.

- No navegador, a busca do usuário é projetada nesse mesmo espaço, gerando um vetor conceitual.
- A **Similaridade de Cosseno** (produto escalar) entre o vetor da busca e o vetor pré-calculado de cada jogo calcula o nível de compatibilidade semântica (somando até `+50 pontos` adicionais).

---

## 🛠️ Pipeline de Dados & APIs Utilizadas

O pipeline de ingestão (`scripts/ingest.py`) roda diariamente ou a cada deploy via GitHub Actions. Ele consome dados de:

- **CheapShark API**: Ofertas ativas de PC com bônus de pontuação por custo-benefício.
- **FreeToGame API**: Banco de dados centralizado de jogos gratuitos de PC e browser.
- **GamerPower API**: Jogos premium em promoção temporária de resgate gratuito para consoles.
- **Twitch / IGDB API (Enriquecimento)**: Cruza os títulos das outras APIs em lote ou busca difusa para injetar capas verticais em alta definição (`t_cover_big`), gêneros oficiais, desenvolvedoras corretas, classificação de avaliação (_rating_) e datas de lançamento.

---

## 💻 Tecnologias

- **Frontend**: Vanilla HTML5, Vanilla CSS3 (com design moderno em vidro, gradientes HSL e animações fluidas) e Vanilla Javascript (ES6+).
- **Backend / Ingestão**: Python 3 com `scikit-learn` (treinamento do modelo LSA/SVD) e `numpy`.
- **CI/CD**: GitHub Actions automatizado para compilação semântica, validação com linters e deploy no GitHub Pages.
- **Qualidade de Código**: Validadores automatizados via `npm run test`:
  - **Prettier**: Padronização estética do código.
  - **HTMLHint**: Linter de estrutura HTML.
  - **Stylelint**: Linter de folha de estilo CSS.
  - **ESLint**: Linter de boas práticas e sintaxe JS.

---

## 🏃 Como Rodar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/projeto-gameCerto.git
cd -projeto-gameCerto
```

### 2. Instalar dependências de formatação e linters

```bash
npm install
```

### 3. Rodar a Ingestão de Dados (Python)

Para atualizar o catálogo e recompilar o modelo de busca semântica localmente, defina as credenciais Twitch/IGDB e execute:

```bash
export IGBD_ID="seu_client_id"
export IGDB_SECRET="seu_client_secret"
python scripts/ingest.py
```

### 4. Executar os testes locais

```bash
npm run test
```

### 5. Abrir a Aplicação

Inicie seu servidor local favorito (ex: Live Server do VS Code) ou abra o arquivo `index.html` diretamente no navegador.
