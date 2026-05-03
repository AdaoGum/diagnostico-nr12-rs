# Diagnóstico NR 12 - Drenagem Urbana (RS)

**Dashboard interativo para avaliação de adequação municipal à Norma de Referência 12 (ANA) em municípios do Rio Grande do Sul.**

🌐 **Acesso**: [https://adaogum.github.io/diagnostico-nr12-rs/](https://adaogum.github.io/diagnostico-nr12-rs/)

---

## 📋 Sobre o Projeto

Este projeto é um **dashboard web** desenvolvido como parte da dissertação de mestrado de **Édina** no programa **ProfÁgua (UFRGS)**.

### Objetivo
- Avaliar a compliance de municípios do RS com a **Norma de Referência 12 da ANA** (diretrizes para drenagem urbana)
- Mapear desafios e capacidades institucionais relacionados à gestão de águas pluviais
- Gerar diagnósticos preliminares sobre governance, gestão econômico-financeira, resiliência climática e infraestrutura verde

**Contexto:** O Rio Grande do Sul enfrenta desafios históricos de eventos climáticos extremos e gestão homem-água. A NR 12 estabelece diretrizes para serviços de drenagem e manejo de águas pluviais urbanas nos municípios brasileiros.

---

## 🎯 Funcionalidades

### Página 1: Seleção Municipal
- ✅ Mapa interativo com 497 municípios do RS
- ✅ Seleção por clique direto no polígono ou dropdown
- ✅ GeoJSON em tempo real (fonte: IBGE)

### Página 2: Checklist Técnico
- ✅ **10 perguntas** estruturadas em **4 eixos temáticos**
- ✅ Opções de resposta nuançadas (Sim/Não/Parcialmente/Em elaboração)
- ✅ Coleta de dados: Nome, E-mail, Cargo, Município
- ✅ Envio automático para Google Sheets via Google Apps Script

#### Eixos Temáticos:
1. **Planejamento e Governança** (3 perguntas)
2. **Gestão Econômico-Financeira** (3 perguntas)
3. **Eventos Extremos e Resiliência Climática** (3 perguntas)
4. **Infraestrutura Verde e Socio-hidrologia** (1 pergunta)

---

## 🛠️ Stack Tecnológico

| Componente | Tecnologia |
|---|---|
| **Frontend** | HTML5 + CSS3 + JavaScript (vanilla) |
| **Mapa Interativo** | Apache ECharts 5.5.0 |
| **Geodados** | GeoJSON (IBGE - código 43: RS) |
| **Backend** | Google Apps Script |
| **Armazenamento** | Google Sheets |
| **Hospedagem** | GitHub Pages |

---

## 📁 Estrutura do Projeto

```
diagnostico-nr12-rs/
├── index.html                     # SPA única (HTML + CSS + JS inline)
├── assets/
│   └── logo-ufrgs.svg            # Logo UFRGS
├── README.md                      # Este arquivo
├── .gitignore                     # Padrões de ignore
└── GAS_REDEPLOY_INSTRUCOES.txt   # Guia para atualizar Google Apps Script
```

**Nota:** O projeto utiliza arquitetura simplificada com todo o código inline em `index.html` para máxima compatibilidade e facilidade de deploy.

---

## 🚀 Como Acessar

### Online (recomendado)
Acesse diretamente: **[https://adaogum.github.io/diagnostico-nr12-rs/](https://adaogum.github.io/diagnostico-nr12-rs/)**

### Localmente (para desenvolvimento)

#### Opção 1: Abrir direto no navegador
```bash
git clone https://github.com/AdaoGum/diagnostico-nr12-rs.git
cd diagnostico-nr12-rs
# Abra o index.html no seu navegador
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

#### Opção 2: Servidor HTTP local
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Acesse: http://localhost:8000
```

---

## 📊 Dados Coletados

A aplicação armazena em **Google Sheets**:

| Campo | Descrição |
|---|---|
| Data | Timestamp do envio (server-side) |
| Nome | Nome completo do respondente |
| Email | E-mail profissional |
| Cargo | Cargo/função no município |
| Município | Município selecionado |
| q1-q10 | Respostas do checklist |

**Documentação:** [Google Sheets do Projeto](https://docs.google.com/spreadsheets/d/1hYsu90WS1196XVL-PM-Um253kR8N7eE0taraxpJDywM/edit?usp=sharing)

---

## 🔧 Desenvolvimento

### Adicionar Novas Perguntas

1. Edite `index.html` e adicione um novo `<div class="question">` dentro do eixo desejado
2. Use `<select class="q-input">` com as opções de resposta
3. O frontend detectará automaticamente e enviará como `q11`, `q12`, etc.

Exemplo:
```html
<div class="question">
    <label>11. Nova pergunta?</label>
    <select class="q-input">
        <option value="">Selecione...</option>
        <option>Opção A</option>
        <option>Opção B</option>
    </select>
</div>
```

### Modificar Estilos

Todos os estilos estão na tag `<style>` em `index.html`. Atualize diretamente ali ou modifique `css/style.css` (se preferir usar CSS externo no futuro).

### Atualizar Google Apps Script

Veja o arquivo `GAS_REDEPLOY_INSTRUCOES.txt` para instruções completas sobre como atualizar e redeployar o backend.

---

## 📚 Referências

- **ANA NR 12:** Norma de Referência para Serviços de Drenagem Urbana
- **ProfÁgua UFRGS:** [Programa de Pós-Graduação em Recursos Hídricos](https://www.ufrgs.br/esa/programas/profagua/)
- **Apache ECharts:** https://echarts.apache.org/
- **GeoJSON IBGE:** https://github.com/tbrugz/geodata-br

---

## 👤 Equipe

| Papel | Nome |
|---|---|
| **Mestranda** | Édina |
| **Desenvolvedor** | Adão (GitHub: @AdaoGum) |
| **Instituição** | UFRGS - ProfÁgua |
| **Programa** | Mestrado Profissional em Engenharia Ambiental |

---

## 📝 Licença

Este projeto faz parte de uma pesquisa acadêmica. Destinado para fins educacionais e de pesquisa.

---

## ✅ Checklist de Deploy

- [x] Frontend: HTML/CSS/JS inline
- [x] Mapa interativo: ECharts + GeoJSON IBGE
- [x] Modal de identificação
- [x] 10 perguntas em 4 eixos
- [x] Google Apps Script + Sheets
- [x] GitHub Pages ativo
- [x] UFRGS logo
- [x] README.md
- [x] .gitignore

---

**Última atualização:** 3 de maio de 2026