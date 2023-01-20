const inquirer = require('inquirer');
require('colors');

const preguntas = [{
type: 'list',
name: 'opcion',
message: 'Que desea hacer?',
choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Historial` 
        },
        {
            value: 0,
            name: `${'0.'.green} Salir`
        }
]

}
];

const inquireMenu = async() =>{
    console.clear();
    console.log('====================================='.green);
    console.log('Seleccione una opcion'.white);
    console.log('====================================='.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() =>{
    const question = [{
        name:'confirmacion',
        message: `Presione ${ 'ENTER'.green } para continuar`,
        type: 'input'
    }
    ]


    await inquirer.prompt(question);
       

}


const leerInput = async( message ) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const ListarLugares = async(lugares =[])=>{
    const choices = lugares.map((lugar,i)=>{
    const idx = `${i+1}.`.green;
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + 'cancelar'

    });
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccionar',
        choices
    }]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
        
    }]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarTareasCheck = async(tareas =[])=>{
    const choices = tareas.map((tarea,i)=>{
    const idx = `${i+1}`.green;
        return{
            value: tarea.id,
            name: `${idx}${tarea.desc}`,
            checked: (tarea.CompletadoEn) ? true : false
        }
    });
    // choices.unshift({
    //     value: '0',
    //     name: '0.'.green + 'cancelar'

    // });
    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}



module.exports ={
inquireMenu,
pausa,
leerInput,
ListarLugares,
confirmar,
mostrarTareasCheck
}