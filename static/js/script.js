function changeScreen(id) {
    document.querySelectorAll('.game-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'screen-seats') generateSeats();
}

function generateSeats() {
    const grid = document.getElementById('seats-grid');
    grid.innerHTML = "";
    for (let i = 1; i <= 16; i++) {
        const row = document.createElement('div');
        row.className = "row";
        row.innerHTML = `
            <div class="seat" onclick="startStudy()"></div>
            <div class="seat ${i % 3 == 0 ? 'reserved' : ''}" onclick="startStudy()"></div>
            <div style="width:20px"></div>
            <div class="seat" onclick="startStudy()"></div>
            <div class="seat" onclick="startStudy()"></div>
        `;
        grid.appendChild(row);
    }
}

async function configurarVuelo() {
    const materia = document.getElementById('materia').value;
    const origen = document.getElementById('origen').value;
    const h = document.getElementById('v_horas').value || 0;
    const m = document.getElementById('v_minutos').value || 0;

    const res = await fetch('/configurar_vuelo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({materia, origen, horas: h, minutos: m})
    });
    const data = await res.json();
    document.getElementById('t-destino').innerHTML = `DESTINO: ${data.destino}`;
    document.getElementById('ticket-info').style.display = "block";
}

function startStudy() {
    changeScreen('screen-cabin');
    let time = 25 * 60;
    const display = document.getElementById('timer-display');
    const interval = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        display.textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
        if(time <= 0) clearInterval(interval);
        time--;
    }, 1000);
}