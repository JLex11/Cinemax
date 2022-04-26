/* ------------------------- Navegacion por sections ------------------------- */
let options = document.querySelectorAll(".option");
let sections = document.querySelectorAll("section");
let main = document.querySelector("main");

let sectionsX = [];
sections.forEach(
    (section, index) => (sectionsX[index] = section.getBoundingClientRect())
);

options.forEach((op, index) => {
    op.addEventListener("click", () => {
        //indica al scroll a que posicion en el eje x debe ir
        if (sectionsX[index]) main.scrollLeft = sectionsX[index].x;
    });
});

let indexSectionActiva;
let fEjecutada = true;
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                //convierte nodelist a array y obtiene su posicion dependiendo de la entry insersectada
                indexSectionActiva = [...sections].indexOf(entry.target);
                options.forEach((op, index) => {
                    window.scrollTo({ top: 0 });
                    if (index == indexSectionActiva)
                        op.classList.add("active_option");
                    else op.classList.remove("active_option");
                });

                var loader = document.getElementById("loader");
                if (entry.target.id == "data_section" && indexSectionActiva == 2) {
                    /* fEjecutada = true; dejar en true para ejecutar cada que es intersectada */
                    if (fEjecutada) {
                        loader.classList.toggle("loader");
                        consultarPeliculas();
                        consultarActores();
                        consultarDirectores();
                        consultarGeneros();
                        loader.classList.toggle("loader");
                        fEjecutada = false;
                    }
                } else {
                    loader.classList.remove("loader");
                }
            }
        });
    },
    {
        root: main,
        threshold: 0.7,
    }
);

sections.forEach((section) => observer.observe(section));

/* ------------------------- Cambiar color a header ------------------------- */
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 40) {
        document.querySelector("header").style.backgroundColor =
            "rgb(255 255 255 / 70%)";
        document.querySelector("header").classList.add("bdFilter_Header");
    } else {
        document.querySelector("header").style.backgroundColor = "transparent";
        document.querySelector("header").classList.remove("bdFilter_Header");
    }
});

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
                },
            ],
        },
    });
    let chartGrafico = grafico;
}

window.addEventListener("load", () => {
    contenedor = "grafico";
    labels = ["Total"];
    parametros = ["Total", "Registrados", "No registrados"];
    valores = [[5000, 3500, 1500]];
    crearGrafico(contenedor, labels, parametros, valores);
});

/* ---------------------------- Manipulacion de datos ---------------------------- */
// ?Fetch
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
window.addEventListener("load", () => {});

/* -------------------------- Activar los checkbox -------------------------- */
function actCheckBox() {
    if (check[0].style.display == "none")
        check.forEach((c) => (c.style.display = "block"));
    else check.forEach((c) => (c.style.display = "none"));
}

/* ------------------------------ Ventana modal ----------------------------- */
function vModal(title, content) {
    let modal = document.getElementById("modal");
    let tituloModal = modal.querySelector(".header_modal").querySelector("h2");
    let contentModal = modal.querySelector(".content_modal");
    let fragment = document.createDocumentFragment();

    let btn_modal_close = modal.querySelector(".btn_modal_close");
    btn_modal_close.addEventListener("click", () => {
        modal.classList.remove("modal");
        modal
            .querySelector(".container_modal_hide")
            .classList.remove("container_modal");
        document.querySelector("body").style.overflow = "unset";
        contentModal.innerHTML = "";
    });

    tituloModal.textContent = title;
    if (content.length > 0) {
        content.forEach((c) => {
            let subtitle = document.createElement("h3");
            let div = document.createElement("div");
            let td = c.querySelectorAll("td");
            td.forEach((t, index) => {
                let divLabel = document.createElement("div");
                let input = document.createElement("input");

                if (index == 0) {
                    idInput = t.querySelector("input").id;
                    posNomTabla = idInput.search("-") + 1;
                    nomTabla = idInput.slice(posNomTabla, idInput.length);
                    subtitle.innerHTML = `${nomTabla[0].toUpperCase()}${nomTabla.slice(
                        1,
                        nomTabla.length
                    )}`;
                    input.type = "hidden";
                    input.value = nomTabla;
                    divLabel.style.display = "none";
                } else {
                    let nomLabel = document.createElement("p");
                    nomLabel.innerHTML = t.id;
                    divLabel.appendChild(nomLabel);
                    input.type = "text";
                    input.value = t.textContent;
                    divLabel.appendChild(input);
                }
                div.appendChild(divLabel);
            });
            fragment.appendChild(subtitle);
            fragment.appendChild(div);
        });
    } else {
        let msj = document.createElement("h3");
        msj.innerHTML = "Selecciona una casilla";
        fragment.appendChild(msj);
    }
    contentModal.appendChild(fragment);
    modal.classList.add("modal");
    modal
        .querySelector(".container_modal_hide")
        .classList.add("container_modal");
    document.querySelector("body").style.overflow = "hidden";
}

/* -------------------------------- Eliminar -------------------------------- */
let btn_eliminar = document.getElementById("eliminar");
btn_eliminar.addEventListener("click", () => {
    let check = document.querySelectorAll(".table_check");
    check.forEach((c) => {
        if (c.checked == true) c.parentNode.parentNode.remove();
        c.checked = false;
    });
});

/* --------------------------------- Editar --------------------------------- */
let btn_editar = document.getElementById("editar");
btn_editar.addEventListener("click", () => {
    let check = document.querySelectorAll(".table_check");
    let tr = [];
    check.forEach((c, index) => {
        if (c.checked) tr[index] = c.parentNode.parentNode;
    });
    vModal("Editar", tr);
});

/* -------------------------------- Consultar ------------------------------- */
/* --------------------------- Consultar peliculas -------------------------- */
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
            <td>
            <input type="checkbox" id="${idpelicula}-pelicula" class="table_check">
            <label for="${idpelicula}-pelicula">
                <div class="custom_checkbox"></div>
            </label>
            </td>
            <td id="idpelicula"><p>${idpelicula}</p></td>
            <td id="titulooriginal"><p>${titulooriginal}</p></td>
            <td id="titulolatino"><p>${titulolatino}</p></td>
            <td id="lanzamiento"><p>${lanzamiento}</p></td>
            <td id="resena"><p>${resena}</p></td>
            <td id="duracion"><p>${duracion}</p></td>
            <td id="tipo"><p>${tipo}</p></td>
            <td id="pais"><p>${pais}</p></td>
            <td id="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

/* ---------------------------- Consultar actores --------------------------- */
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
            <td>
            <input type="checkbox" id="${idactor}-actor" class="table_check">
            <label for="${idactor}-actor">
                <div class="custom_checkbox"></div>
            </label>
            </td>
            <td id="idactor"><p>${idactor}</p></td>
            <td id="nombre"><p>${nombre}</p></td>
            <td id="fechanacimiento"><p>${fechanacimiento}</p></td>
            <td id="descripcion"><p>${descripcion}</p></td>
            <td id="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

/* -------------------------- Consultar directores -------------------------- */
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
            <td>
            <input type="checkbox" id="${iddirector}-director" class="table_check">
            <label for="${iddirector}-director">
                <div class="custom_checkbox"></div>
            </label>
            </td>
            <td id="iddirector"><p>${iddirector}</p></td>
            <td id="nombre"><p>${nombre}</p></td>
            <td id="fechanacimiento"><p>${fechanacimiento}</p></td>
            <td id="descripcion"><p>${descripcion}</p></td>
            <td id="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};

/* ---------------------------- Consultar generos --------------------------- */
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
            <td>
            <input type="checkbox" id="${idgenero}-genero" class="table_check">
            <label for="${idgenero}-genero">
                <div class="custom_checkbox"></div>
            </label>
            </td>
            <td id="idgenero"><p>${idgenero}</p></td>
            <td id="nombre"><p>${nombre}</p></td>
            <td id="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
};
