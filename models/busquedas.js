const fs = require('fs');
const axios = require('axios');
class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();

    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER,
            'units': 'metric',
            'lang': 'es',
        }
    }

    async ciudad(lugar = '') {
        console.log(lugar, 'lugar');
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            //console.log('ciudadk:',resp.data.features);


            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            console.log(error);
        }

    }


    async climaLugar(lat, lng) {
        try {
            let parametrosClima = this.paramsOpenWeather;
            parametrosClima.lat = lat;
            parametrosClima.lon = lng;
            //instance axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: parametrosClima
            });

            const resp = await instance.get();

            //console.log('ciudadk:',resp.data);


            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,

                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            };

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toUpperCase())) {
            return;
        }
        this.historial.unshift(lugar);
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        try {
            if (!fs.existsSync(this.dbPath)) {
                return null;
            }
            const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
            const data = JSON.parse(info);
            this.historial = data.historial;
            console.log('paso');
        } catch (error) {
            console.log(error);
        }

        //console.log(data);
        //return this.historial;

    }

    capitalizarLugares(){
       let contador = 0; 
        this.historial.forEach(lugarP => {
            contador += 1;
         //hacer un nuevo arreglo con los nuevos valores con esta linea
         //         palabras.push(lugar[0].toUpperCase() + lugar.substring(1))
            let palabra = lugarP.split(" ");
            let PalabraFinal = [];
            //console.log(palabra,'palabra');
             palabra.forEach(nuevaPalabra => {
               // console.log(nuevaPalabra, 'NuevaPalabraAntes');
            PalabraFinal.push(nuevaPalabra[0].toUpperCase() + nuevaPalabra.substring(1));
             //console.log(nuevaPalabra, 'NuevaPalabraDespues');
            });
            console.log
            
           let lugarP2 =  PalabraFinal.join(" ");
            
               console.log(`${contador}. ${lugarP2}`);

        });
    }
}

module.exports = Busquedas;