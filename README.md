# Dashboard NR 12 - Drenagem Urbana RS

> **Repositório**: [github.com/AdaoGum/diagnostico-nr12-rs](https://github.com/AdaoGum/diagnostico-nr12-rs)  
> **Web App**: [Dashboard em Produção](https://script.google.com/macros/s/AKfycbylnPGi8mc-98VcKeoNm5iqTxTLMl2JuRAWgmF3Kb4IEspzWdtYq6NFI5g-uoawyWUmAA/exec)

## 📋 Sobre o Projeto

**Produto Técnico** desenvolvido como parte do **Mestrado Profissional em Engenharia Ambiental (ProfÁgua - UFRGS)**, focado na avaliação da adequação dos 497 municípios do Rio Grande do Sul à **Norma de Referência 12 (NR 12) da ANA**, que estabelece diretrizes sobre drenagem urbana e manejo de águas pluviais.

### Objetivo

Criar um **dashboard interativo na web** que permite aos gestores públicos e técnicos municipais:
- Visualizar a malha municipal do Rio Grande do Sul em mapa interativo
- Avaliar o nível de adequação de cada município à NR 12 da ANA
- Registrar respostas a um checklist técnico estruturado
- Armazenar e analisar dados de forma centralizada

---

## 🚀 Tech Stack

### Frontend
- **HTML5**: Estrutura semântica da SPA (Single Page Application)
- **CSS3**: Estilização responsiva com Flexbox (CSS puro, sem frameworks)
- **Vanilla JavaScript**: Lógica de aplicação, manipulação do DOM e comunicação assíncrona

### Visualização de Dados
- **Apache ECharts**: Renderização do mapa interativo
- **GeoJSON (IBGE)**: Malha municipal do Rio Grande do Sul (código UF 43)

### Backend & Persistência
- **Google Apps Script**: Servidor serverless para receber dados
- **Google Sheets**: Banco de dados para armazenamento das respostas
- **Fetch API**: Requisições POST assíncronas (JSON)

### Hospedagem
- **GitHub Pages**: Deploy do site estático

---

## 📂 Estrutura do Projeto

```
projeto_mestrado/
├── index.html          # Página principal (SPA)
│   ├── #page1         # Tela inicial: contexto + mapa interativo
│   └── #page2         # Formulário: checklist NR 12
├── css/
│   └── style.css      # Estilização responsiva e modal
├── js/
│   └── script.js      # Lógica: ECharts, navegação, POST para backend
└── README.md          # Este arquivo
```

---

## 🎯 Fluxo da Aplicação

1. **Seleção de Município**
   - Usuário acessa a página inicial com informações sobre a NR 12
   - Visualiza mapa interativo do Rio Grande do Sul
   - Seleciona município via dropdown `<select>` ou clique direto no polígono

2. **Identificação do Usuário**
   - Modal (`#userModal`) solicita:
     - Nome completo
     - E-mail institucional
     - Cargo/função

3. **Preenchimento do Checklist**
   - Sistema exibe formulário técnico (`#page2`)
   - Cabeçalho personalizado com nome do município e do usuário
   - Perguntas de múltipla escolha organizadas por eixos:
     - **Planejamento**: Planos diretores, diagnósticos, normativas
     - **Gestão Econômica**: Orçamento, taxas, investimentos
     - **Eventos Extremos/Resiliência**: Monitoramento, resposta a emergências

4. **Envio e Armazenamento**
   - Validação dos campos obrigatórios
   - POST assíncrono para Google Apps Script
   - Confirmação de envio e reload da página

---

## 💻 Como Executar Localmente

### Opção 1: Abrir diretamente no navegador
```bash
# Navegue até a pasta do projeto e abra o arquivo
start index.html  # Windows
# ou
open index.html   # macOS/Linux
```

### Opção 2: Servidor HTTP local (recomendado para testes completos)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx http-server)
npx http-server -p 8000

# Acesse: http://localhost:8000
```

> **Nota**: O servidor local é necessário para testar completamente a integração com o Google Apps Script e evitar problemas de CORS em alguns navegadores.

---

## 🔧 Configuração do Backend

### Google Apps Script

O backend está configurado e hospedado no Google Apps Script.

**URL do Web App**:
```
https://script.google.com/macros/s/AKfycbylnPGi8mc-98VcKeoNm5iqTxTLMl2JuRAWgmF3Kb4IEspzWdtYq6NFI5g-uoawyWUmAA/exec
```

**Deployment ID**: `AKfycbylnPGi8mc-98VcKeoNm5iqTxTLMl2JuRAWgmF3Kb4IEspzWdtYq6NFI5g-uoawyWUmAA`

Para fazer alterações no backend:
1. Acesse o [Google Apps Script](https://script.google.com/)
2. Abra o projeto vinculado à planilha do projeto
3. Faça as modificações necessárias
4. Crie um novo deployment para atualizar a Web App
5. Se a URL mudar, atualize em `js/script.js`:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbylnPGi8mc-98VcKeoNm5iqTxTLMl2JuRAWgmF3Kb4IEspzWdtYq6NFI5g-uoawyWUmAA/exec';
```

---

## 🛠️ Próximos Desenvolvimentos

- [ ] Expandir formulário para 20-30 perguntas técnicas
- [ ] Implementar validação robusta de campos
- [ ] Melhorar tratamento de erros de rede (CORS, timeout)
- [ ] Otimizar responsividade para dispositivos móveis
- [ ] Adicionar indicadores visuais de progresso no checklist
- [ ] Implementar sistema de retorno/edição de respostas

---

## 📊 Dados e Privacidade

- Os dados coletados são utilizados exclusivamente para fins acadêmicos e de pesquisa
- Informações pessoais são tratadas conforme LGPD
- Planilha de respostas acessível apenas aos pesquisadores autorizados

---

## 👥 Equipe

**Mestranda**: Édina  
**Desenvolvedor**: AdaoJr  
**Orientação**: ProfÁgua - UFRGS  
**Programa**: Mestrado Profissional em Engenharia Ambiental  

---

## 📝 Licença

Este projeto faz parte de uma pesquisa acadêmica. Entre em contato para informações sobre uso e redistribuição.

---

## 📧 Contato

Para dúvidas sobre o projeto ou colaborações:
- E-mail: [adaojmsantos@gmail.com]
- Instituição: UFRGS - Universidade Federal do Rio Grande do Sul

---

**Última atualização**: Maio de 2026

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit: Dashboard NR 12 - Drenagem Urbana RS"

# Conectar ao GitHub (se já tiver criado o repositório remoto)
git remote add origin https://github.com/seu-usuario/projeto_mestrado.git
git branch -M main
git push -u origin main