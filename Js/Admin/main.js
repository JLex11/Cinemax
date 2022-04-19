/* ------------------------- Selector de navegacion ------------------------- */
let options = document.querySelectorAll(".option");
options.forEach((op) => {
    op.addEventListener("click", () => {
        options.forEach((e) => {
            e.classList.remove("active_option");
        });
        op.classList.add("active_option");
    });
});

/* --------------------------------- Grafico -------------------------------- */
function crearGrafico(contenedor, labels, parametros, valores) {
    let canvasGrafico = document.getElementById(`${contenedor}`);

    let chartGrafico = new Chart(canvasGrafico, {
        type: "line",
        data: {
            labels: parametros,
            datasets: [
                {
                    label: labels[0],
                    data: valores[0],
                    backgroundColor: ["#077fdb"],
                },
                {
                    label: labels[1],
                    data: valores[1],
                    backgroundColor: ["#3ca440"],
                },
                {
                    label: labels[2],
                    data: valores[2],
                    backgroundColor: ["#077fdb"],
                },
            ],
        },
    });
}

window.addEventListener("load", () => {
    contenedor = "grafico";
    labels = ["1er Pelicula", "2da Pelicula", "3er Pelicula"];
    parametros = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];
    valores = [
        [500, 450, 630, 690, 900, 870, 987, 1158, 679, 860, 1009, 1110],
        [100, 290, 360, 510, 730, 700, 587, 958, 279, 760, 809, 1000],
    ];
    crearGrafico(contenedor, labels, parametros, valores);
});

/* ---------------------------- Datos del server ---------------------------- */
// !Fetch
async function peticionFetch(parametros, url) {
    let peticion = await fetch(url, {
        method: "POST",
        body: parametros,
    });
    try {
        return await peticion.json();
    } catch (error) {
        console.log(error);
    }
}

// ?Se ejecuta al cargar toda la pagina
window.addEventListener("load", () => {
    consultarPeliculas();
    consultarActores();
    consultarDirectores();
});

// !Consultar peliculas
const consultarPeliculas = async () => {
    let parametros = new FormData();
    parametros.append("opc", "1");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    document.querySelector(".contPeliculas").textContent = response.length;
    let tbody = document.getElementById("tPeliculas");
    let fragment = document.createDocumentFragment();

    for (r of response) {
        //itera mi array de objetos
        let tr = document.createElement("tr");
        let {
            //destructura mi objeto
            idpelicula,
            titulooriginal,
            titulolatino,
            lanzamiento,
            resena,
            duracion,
            tipo,
            pais,
            estado,
        } = r;
        tr.innerHTML = `
        <tr>
            <td>${idpelicula}</td>
            <td>${titulooriginal}</td>
            <td>${titulolatino}</td>
            <td>${lanzamiento}</td>
            <td>${resena}</td>
            <td>${duracion} minutos</td>
            <td>${tipo}</td>
            <td>${pais}</td>
            <td>${estado}</td>
        </tr>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

// !Consultar actores
const consultarActores = async () => {
    let parametros = new FormData();
    parametros.append("opc", "61");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    document.querySelector(".contActores").textContent = response.length;
    let tbody = document.getElementById("tActores");
    let fragment = document.createDocumentFragment();

    for (r of response) {
        //itera mi array de objetos
        let tr = document.createElement("tr");
        let {
            //destructura mi objeto
            idactor,
            nombre,
            fechanacimiento,
            descripcion,
            estado,
        } = r;
        tr.innerHTML = `
        <td>${idactor}</td>
        <td>${nombre}</td>
        <td>${fechanacimiento}</td>
        <td>${descripcion}</td>
        <td>${estado}</td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

// !Consultar directores
const consultarDirectores = async () => {
    let parametros = new FormData();
    parametros.append("opc", "101");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    document.querySelector(".contDirectores").textContent = response.length;
    let tbody = document.getElementById("tDirectores");
    let fragment = document.createDocumentFragment();

    for (r of response) {
        //itera mi array de objetos
        let tr = document.createElement("tr");
        let {
            //destructura mi objeto
            iddirector,
            nombre,
            fechanacimiento,
            descripcion,
            estado,
        } = r;
        tr.innerHTML = `
        <td>${iddirector}</td>
        <td>${nombre}</td>
        <td>${fechanacimiento}</td>
        <td>${descripcion}</td>
        <td>${estado}</td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};
