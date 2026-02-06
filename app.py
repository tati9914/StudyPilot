from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# Simulación de vuelos (historial en memoria por ahora)
flight_records = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/configurar_vuelo', methods=['POST'])
def configurar_vuelo():
    data = request.json
    horas = int(data.get('horas', 0))
    minutos = int(data.get('minutos', 0))
    materia = data.get('materia', 'Estudio General')
    origen = data.get('origen', 'Origen Desconocido')

    tiempo_total_min = (horas * 60) + minutos
    
    # Lógica de destino basada en el tiempo de estudio
    if tiempo_total_min <= 30:
        destino = "Ciudad Próxima (Vuelo Corto)"
    elif tiempo_total_min <= 90:
        destino = "Capital Europea (Vuelo Medio)"
    elif tiempo_total_min <= 180:
        destino = "Metrópolis Asiática (Vuelo Largo)"
    else:
        destino = "Estación Orbital (Vuelo Épico)"

    fecha_vuelo = datetime.now().strftime("%Y-%m-%d %H:%M")

    # Guardar en el historial de vuelos
    flight_records.append({
        "materia": materia,
        "origen": origen,
        "destino": destino,
        "duracion": f"{horas}h {minutos}m",
        "fecha": fecha_vuelo
    })

    return jsonify({
        "destino": destino,
        "materia": materia,
        "origen": origen,
        "duracion": f"{horas}h {minutos}m",
        "fecha": fecha_vuelo
    })

@app.route('/get_flight_history', methods=['GET'])
def get_flight_history():
    return jsonify(flight_records)

if __name__ == '__main__':
    app.run(debug=True)