let options = document.querySelectorAll('.option');
options.forEach((op)=> {
    op.addEventListener('click', () => {
        options.forEach((e)=> {
            e.classList.remove('active_option');
        })
        op.classList.add('active_option');
    })
})

/* --------------------------------- Grafico -------------------------------- */
function crearGrafico(contenedor, labels, parametros, valores) {
    /* contenedor = 'grafico';
    parametros = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    valores = [
        [500, 450, 630, 690, 900, 870, 987, 1158, 679, 860, 1009, 1110],
        [100, 290, 360, 510, 730, 700, 587, 958, 279, 760, 809, 1000]
    ]; */
    let canvasGrafico = document.getElementById(`${contenedor}`);

    let chartGrafico = new Chart(canvasGrafico, {
        type: 'line',
        data: {
            labels: parametros,
            datasets: [
                {
                    label: labels[0],
                    data: valores[0],
                    backgroundColor: ['#077fdb']
                },
                {
                    label: labels[1],
                    data: valores[1],
                    backgroundColor: ['#3ca440']
                },
                {
                    label: labels[2],
                    data: valores[2],
                    backgroundColor: ['#077fdb']
                }
            ]
        }
    });
}

window.addEventListener('load', () => {
    contenedor = 'grafico';
    labels = ['1er Pelicula', '2da Pelicula', '3er Pelicula'];
    parametros = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    valores = [
        [500, 450, 630, 690, 900, 870, 987, 1158, 679, 860, 1009, 1110],
        [100, 290, 360, 510, 730, 700, 587, 958, 279, 760, 809, 1000]
    ];
    crearGrafico(contenedor, labels, parametros, valores);
})

async function peticionFetch(/* parametros, url */) {
    let parametros = new FormData();
        parametros.append('opc', '1');
    let url = '../Model/facade.php?opc=1';
    
    try {
        let peticion = await fetch(url, {
            method: 'POST',
            body: parametros
        });

        console.log(await peticion.json());
    } catch (error) {
        console.log(error);
    }
}

peticionFetch();