/* ------------------------- Navegacion por sections ------------------------- */
let options = document.querySelectorAll(".option");
let sections = document.querySelectorAll("section");
let main = document.querySelector("main");

let sectionsX = [];
sections.forEach((section, index) => {
    sectionsX[index] = section.getBoundingClientRect();
    console.log("sectionsx", sectionsX[index].x);
});

options.forEach((op, index) => {
    op.addEventListener("click", () => {
        if (sectionsX[index]) {
            options.forEach((e) => {
                e.classList.remove("active_option");
            });
            op.classList.add("active_option");
            window.scrollTo({
                top: 0
            });
            main.scrollLeft = sectionsX[index].x;
            console.log(sectionsX[index].x);
        };
    });
});

/* ------------------------- Cambiar color a header ------------------------- */
window.addEventListener("scroll", ()=>{
    if (document.documentElement.scrollTop > 40) {
        document.querySelector("header").style.backgroundColor = "rgb(255 255 255 / 70%)";
        document.querySelector("header").classList.add("bdFilter_Header");
    } else {
        document.querySelector("header").style.backgroundColor = "transparent";
        document.querySelector("header").classList.remove("bdFilter_Header");
    }
})

/* --------------------------------- Grafico -------------------------------- */
function crearGrafico(contenedor, labels, parametros, valores) {
    let canvasGrafico = document.getElementById(`${contenedor}`);

    const grafico = new Chart(canvasGrafico, {
        type: "bar",
        data: {
            labels: parametros,
            datasets: [
                {
                    label: labels[0],
                    data: valores[0],
                    backgroundColor: ["#077fdb", "green", "red"],
                }
            ],
        },
    });
    let chartGrafico = grafico;
}

window.addEventListener("load", () => {
    contenedor = "grafico";
    labels = ["Total"];
    parametros = [
        "Total",
        "Registrados",
        "No registrados"
    ];
    valores = [
        [5000, 3500, 1500]
    ];
    crearGrafico(contenedor, labels, parametros, valores);
});

/* ---------------------------- Manipulacion de datos ---------------------------- */
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
    consultarGeneros();
});

// !Eliminar
let btn_eliminar = document.getElementById("eliminar");
btn_eliminar.addEventListener("click", () => {
    let check = document.querySelectorAll(".table_check");
    check.forEach((c, index) => {
        if (c.checked) {
            let trCheck = c.parentNode.parentNode; //tr abuelo del checkbox
            trCheck.remove();
        }
    })
})

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
            <td><input type="checkbox" id="${idpelicula}-pelicula" class="table_check"></td>
            <td><label for="${idpelicula}-pelicula">${idpelicula}</label></td>
            <td><label for="${idpelicula}-pelicula">${titulooriginal}</label></td>
            <td><label for="${idpelicula}-pelicula">${titulolatino}</label></td>
            <td><label for="${idpelicula}-pelicula">${lanzamiento}</label></td>
            <td><label for="${idpelicula}-pelicula">${resena}</label></td>
            <td><label for="${idpelicula}-pelicula">${duracion} min</label></td>
            <td><label for="${idpelicula}-pelicula">${tipo}</label></td>
            <td><label for="${idpelicula}-pelicula">${pais}</label></td>
            <td><label for="${idpelicula}-pelicula">${estado}</label></td>
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
            <td><input type="checkbox" id="${idactor}-actor" class="table_check"></td>
            <td><label for="${idactor}-actor">${idactor}</label></td>
            <td><label for="${idactor}-actor">${nombre}</label></td>
            <td><label for="${idactor}-actor">${fechanacimiento}</label></td>
            <td><label for="${idactor}-actor">${descripcion}</label></td>
            <td><label for="${idactor}-actor">${estado}</label></td>
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
            <td><input type="checkbox" id="${iddirector}-director" class="table_check"></td>
            <td><label for="${iddirector}-director">${iddirector}</label></td>
            <td><label for="${iddirector}-director">${nombre}</label></td>
            <td><label for="${iddirector}-director">${fechanacimiento}</label></td>
            <td><label for="${iddirector}-director">${descripcion}</label></td>
            <td><label for="${iddirector}-director">${estado}</label></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

// !Consultar generos
const consultarGeneros = async () => {
    let parametros = new FormData();
    parametros.append("opc", "141");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    document.querySelector(".contGeneros").textContent = response.length;
    let tbody = document.getElementById("tGeneros");
    let fragment = document.createDocumentFragment();

    for (r of response) {
        //itera mi array de objetos
        let tr = document.createElement("tr");
        let {
            //destructura mi objeto
            idgenero,
            nombre,
            estado,
        } = r;
        tr.innerHTML = `
            <td><input type="checkbox" id="${idgenero}-genero" class="table_check"></td>
            <td><label for="${idgenero}-genero">${idgenero}</label></td>
            <td><label for="${idgenero}-genero">${nombre}</label></td>
            <td><label for="${idgenero}-genero">${estado}</label></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};
