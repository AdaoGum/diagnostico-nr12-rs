// ─── Variáveis globais ───────────────────────────────────────────────────────
let selectedCity = '';
const scriptURL = 'https://script.google.com/macros/s/AKfycbylnPGi8mc-98VcKeoNm5iqTxTLMl2JuRAWgmF3Kb4IEspzWdtYq6NFI5g-uoawyWUmAA/exec';

// ─── Inicialização do mapa ────────────────────────────────────────────────────
let myChart = null;

try {
    myChart = echarts.init(document.getElementById('map'));
} catch(err) {
    console.error('ECharts não carregou:', err);
    document.getElementById('loadingText').innerText = 'Erro ao inicializar mapa. Verifique sua conexão.';
}

if (myChart) {
    const geoJsonUrl = 'https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-43-mun.json';

    fetch(geoJsonUrl)
        .then(response => {
            if (!response.ok) throw new Error('Falha ao buscar GeoJSON: ' + response.status);
            return response.json();
        })
        .then(geoJson => {
            document.getElementById('loadingText').style.display = 'none';
            echarts.registerMap('RS', geoJson);

            // Popula o dropdown com municípios em ordem alfabética
            const select = document.getElementById('citySelect');
            geoJson.features
                .sort((a, b) => a.properties.name.localeCompare(b.properties.name))
                .forEach(f => {
                    const opt = document.createElement('option');
                    opt.value = f.properties.name;
                    opt.innerText = f.properties.name;
                    select.appendChild(opt);
                });

            myChart.setOption({
                tooltip: { trigger: 'item', formatter: '{b}' },
                series: [{
                    type: 'map', map: 'RS', roam: true,
                    itemStyle: { areaColor: '#cce5ff', borderColor: '#ffffff' },
                    emphasis: { itemStyle: { areaColor: '#0056b3' }, label: { color: '#fff' } }
                }]
            });
            myChart.resize();

            // Clique direto no polígono do mapa
            myChart.on('click', function(params) {
                openModal(params.name);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar GeoJSON:', err);
            document.getElementById('loadingText').innerText = 'Erro ao carregar o mapa. Verifique a conexão.';
        });

    window.addEventListener('resize', () => { if (myChart) myChart.resize(); });
}

// ─── Funções globais (chamadas via onclick no HTML) ──────────────────────────
function triggerModalFromSelect() {
    const val = document.getElementById('citySelect').value;
    if (val) openModal(val);
    else alert('Selecione um município na lista.');
}

function openModal(city) {
    selectedCity = city;
    document.getElementById('modalCityName').innerText = city;
    document.getElementById('userModal').classList.add('active');
}

function closeModal() {
    document.getElementById('userModal').classList.remove('active');
}

function goToPage2() {
    const name = document.getElementById('userName').value;
    const role = document.getElementById('userRole').value;

    if (!name || !role) {
        alert('Preencha seu nome e cargo para continuar.');
        return;
    }

    document.getElementById('displayCity').innerText = selectedCity;
    document.getElementById('displayUser').innerText = name;
    document.getElementById('displayRole').innerText = role;

    closeModal();
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    window.scrollTo(0, 0);
}

async function finishChecklist() {
    const btn = document.querySelector('.btn-finish');
    if(btn) { btn.innerText = 'Enviando...'; btn.disabled = true; }

    const questions = document.querySelectorAll('.q-input');
    const answers = {};
    questions.forEach((q, i) => { answers[`q${i+1}`] = q.value; });

    const payload = {
        nome: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        cargo: document.getElementById('userRole').value,
        municipio: selectedCity,
        respostas: answers
    };

    // coleta as respostas
    const questions = document.querySelectorAll('.q-input');
    const payload = {
        Data: new Date().toLocaleString(), // se quiser gravar data do envio
        Nome: document.getElementById('userName').value,
        Email: document.getElementById('userEmail').value,
        Cargo: document.getElementById('userRole').value,
        Municipio: selectedCity || document.getElementById('citySelect').value
    };

    // adiciona cada pergunta como campo 'Pergunta 1', 'Pergunta 2', ...
    questions.forEach((q, i) => {
        payload[`Pergunta ${i+1}`] = q.value;
    });

    console.log('payload a enviar', payload);

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        clearTimeout(timeout);

        alert('Dados enviados (requisição enviada). Obrigado!');
        location.reload();
    } catch (e) {
        console.error('Erro no envio:', e);
        alert('Erro ao enviar os dados. Verifique conexão ou permissões CORS.');
        if(btn) { btn.disabled = false; btn.innerText = 'Finalizar e Enviar Dados'; }
    }
}
