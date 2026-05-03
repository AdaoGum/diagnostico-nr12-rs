let selectedCity = '';
const scriptURL = 'SUA_URL_DO_GOOGLE_SCRIPT_AQUI';

const chartDom = document.getElementById('map');
const myChart = echarts.init(chartDom);
const geoJsonUrl = 'https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-43-mun.json';

fetch(geoJsonUrl)
    .then(response => response.json())
    .then(geoJson => {
        document.getElementById('loadingText').style.display = 'none';
        echarts.registerMap('RS', geoJson);
        
        const select = document.getElementById('citySelect');
        geoJson.features.sort((a,b) => a.properties.name.localeCompare(b.properties.name)).forEach(f => {
            let opt = document.createElement('option');
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
        myChart.on('click', (p) => openModal(p.name));
    });

window.addEventListener('resize', () => myChart.resize());

function openModal(city) {
    selectedCity = city;
    document.getElementById('modalCityName').innerText = city;
    document.getElementById('userModal').classList.add('active');
}

function closeModal() { document.getElementById('userModal').classList.remove('active'); }

function triggerModalFromSelect() {
    const val = document.getElementById('citySelect').value;
    if(val) openModal(val); else alert("Selecione um município.");
}

function goToPage2() {
    const name = document.getElementById('userName').value;
    if(!name) return alert("Preencha seu nome.");
    
    document.getElementById('displayCity').innerText = selectedCity;
    document.getElementById('displayUser').innerText = name;
    document.getElementById('displayRole').innerText = document.getElementById('userRole').value;

    closeModal();
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    window.scrollTo(0,0);
}

async function finishChecklist() {
    const btn = document.querySelector('.btn-finish');
    btn.innerText = "Enviando...";
    btn.disabled = true;

    // Coleta todas as respostas de uma vez
    const questions = document.querySelectorAll('.q-input');
    const answers = {};
    questions.forEach((q, i) => { answers[`q${i+1}`] = q.value; });

    const payload = {
        nome: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        cargo: document.getElementById('userRole').value,
        municipio: selectedCity,
        ...answers
    };

    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload)
        });
        alert("Dados enviados com sucesso!");
        location.reload();
    } catch (e) {
        alert("Erro ao enviar.");
        btn.disabled = false;
        btn.innerText = "Finalizar e Enviar Dados";
    }
}
