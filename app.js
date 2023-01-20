require('dotenv').config()

const { leerInput, inquireMenu, pausa, ListarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas();
    let opciones;
    do {
        opciones = await inquireMenu();
        switch (opciones) {
            case 1:
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                  
                    const id = await ListarLugares(lugares);
                    if(id === '0') continue;

                    //console.log({id});
                    const lugarSel = lugares.find( l => l.id === id);
                    //console.log(lugarSel);
                    busquedas.agregarHistorial(lugarSel.nombre);

                    const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng )
                    console.log('\nInformacion de la ciudad\n');
                    console.log('Ciudad: ', lugarSel.nombre);
                    console.log('Lat:', lugarSel.lat);
                    console.log('Lng: ', lugarSel.lng);
                    console.log('Temperatura: ', clima.temp);
                    console.log('Minima', clima.min);
                    console.log('Maxima', clima.max);
                    console.log('El clima se encuentra: ' , clima.desc);

                break;
            case 2:
                       busquedas.capitalizarLugares();
                      
                break;
            case 0:
                    console.log('opcion 3');
                break;
            default:
                break;
        }

      
        await pausa();
    } while (opciones != 0);
}


main();