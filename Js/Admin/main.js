/* ------------------------- Navegacion por sections ------------------------- */
let options = document.querySelectorAll(".option");
let sections = document.querySelectorAll("section");
let main = document.querySelector("main");

let sectionsX = [];
sections.forEach(
    (section, index) => (sectionsX[index] = section.getBoundingClientRect())
);
window.addEventListener("resize", () => {
    sections.forEach(
        (section, index) => (sectionsX[index] = section.getBoundingClientRect())
    );
});

options.forEach((op, index) => {
    op.addEventListener("click", () => {
        //indica al scroll a que posicion en el eje x debe ir
        if (sectionsX[index]) main.scrollLeft = sectionsX[index].x;
    });
});

let indexSectionActiva;
let fEjecutada = false;
var loader = document.getElementById("loader");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //convierte nodelist a array y obtiene su posicion dependiendo de la entry insersectada
                indexSectionActiva = [...sections].indexOf(entry.target);
                options.forEach((op, index) => {
                    window.scrollTo({ top: 0 });
                    if (index == indexSectionActiva)
                        op.classList.add("active_option");
                    else op.classList.remove("active_option");
                });

                if (
                    entry.target.id == "data_section" &&
                    indexSectionActiva == 2
                ) {
                    /* fEjecutada = false; */
                    /* dejar en true para ejecutar cada que es intersectada */
                    if (!fEjecutada) {
                        loader.classList.add("loader");
                        consultarPeliculas();
                        consultarActores();
                        consultarDirectores();
                        consultarGeneros();
                        //se desactiva el loader desde una de las funciones
                        fEjecutada = true;
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

sections.forEach(section => observer.observe(section));

/* ------------------------- Cambiar color a header ------------------------- */
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= 40) {
        document.querySelector("header").style.backgroundColor =
            "rgb(255 255 255 / 80%)";
    } else {
        document.querySelector("header").style.backgroundColor = "transparent";
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

/* ----------------------- Clases ----------------------- */
/* ---------------------- Datatable --------------------- */
class DataTable {
    elementParent;
    container_subsection;
    container_table;
    actions_buttons_container;
    buttons;
    section_subbody;
    section_subtitle;
    titulo;
    titleIcon;
    headers;
    trs;
    cantRows;
    table;
    thead;
    tbody;

    constructor(elementParent, contents) {
        this.elementParent = document.querySelector(elementParent);
        this.container_subsection = document.createElement("div");
        this.section_subtitle = document.createElement("div");
        this.section_subbody = document.createElement("div");
        this.container_table = document.createElement("div");
        this.actions_buttons_container = document.createElement("div");
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.titulo = this.capitalizarString(contents.titulo);
        this.titleIcon = contents.titleIcon;
        this.headers = contents.headers;
        this.buttons = contents.actButtons;
        this.trs = contents.trs;
        this.cantRows = Object.getOwnPropertyNames(this.trs).length - 1;
        this.makeTable();
    }

    makeTable() {
        this.renderHeaders();
        this.renderTrs();
        this.renderTitleBar();
        this.renderActionBtns();

        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        this.container_table.appendChild(this.table);
        this.container_table.classList.add("container_table");

        this.actions_buttons_container.classList.add("act_btns");

        this.section_subbody.appendChild(this.actions_buttons_container);
        this.section_subbody.appendChild(this.container_table);
        this.section_subbody.classList.add("section_subbody");

        this.container_subsection.appendChild(this.section_subtitle);
        this.container_subsection.appendChild(this.section_subbody);
        this.container_subsection.classList.add("container_subsection");

        this.elementParent.appendChild(this.container_subsection);
    }

    capitalizarString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTitleBar() {
        this.section_subtitle.innerHTML = `
        <div class="section_subtitle">
            <h2>${this.titulo}</h2>
            <div>
                <span class="material-icons-sharp">${this.titleIcon}</span>
                <h2 class="contRows">${this.cantRows}</h2>
            </div>
        </div>
        `;
    }

    renderHeaders() {
        let tr = document.createElement("tr");
        let dFragment = document.createDocumentFragment();
        let th = document.createElement("th");
        tr.appendChild(th);

        this.headers.forEach(header => {
            let th = document.createElement("th");
            th.textContent = this.capitalizarString(header);
            dFragment.appendChild(th);
        });
        tr.appendChild(dFragment);
        this.thead.appendChild(tr);
    }

    renderTrs() {
        let dFragment = document.createDocumentFragment();
        this.trs.forEach(t => {
            let tr = document.createElement("tr");
            tr.id = Math.floor(Math.random() * 100);
            let td = document.createElement("td");
            td.innerHTML = `<input type="checkbox" id="${
                t[Object.keys(t)[0]]
            }-${this.titulo}" class="table_check">
            <label for="${t[Object.keys(t)[0]]}-${this.titulo}">
                <div class="custom_checkbox"></div>
            </label>`;
            tr.appendChild(td);

            for (let i in t) {
                let td = document.createElement("td");
                if (typeof t[i] == "array" || typeof t[i] == "object") {
                    td.innerHTML = `<select></select>`;
                    let select = td.querySelector("select");
                    t[i].forEach(i => {
                        select.innerHTML += `<option value="${i}">${i}</option>`;
                    });
                } else {
                    td.textContent = t[i];
                }
                tr.appendChild(td);
            }
            dFragment.appendChild(tr);
        });
        this.tbody.appendChild(dFragment);
    }

    renderActionBtns() {
        let fragment = document.createDocumentFragment();
        this.buttons.forEach((i, index) => {
            let divBtn = document.createElement("div");
            divBtn.innerHTML = `<span class="material-icons-sharp">${this.buttons[index].icon}</span>`;
            divBtn.id = this.buttons[index].id;
            divBtn.addEventListener('click', this.buttons[index].action);
            fragment.appendChild(divBtn);
        });
        this.actions_buttons_container.appendChild(fragment);
    }

    insertarFilas(datos) {
        let dFragment = document.createDocumentFragment();
        let tr = document.createElement("tr");
        tr.id = Math.floor(Math.random() * 100);
        let td = document.createElement("td");
        td.innerHTML = `<input type="checkbox" id="${t[Object.keys(t)[0]]}-${
            this.titulo
        }" class="table_check">
        <label for="${t[Object.keys(t)[0]]}-${this.titulo}">
            <div class="custom_checkbox"></div>
        </label>`;
        tr.appendChild(td);

        datos.forEach(fila => {
            let td = document.createElement("td");
            td.textContent = fila;
            tr.appendChild(td);
        });
        dFragment.appendChild(tr);
        this.tbody.appendChild(dFragment);
        this.cantRows++;
        this.renderTitleBar();
    }

    editarFilas(idFila) {
        let filaEditar = document.getElementById(idFila); //es el tr contenedor
        let fEHijos = filaEditar.querySelectorAll("td");
        let datosEditados = [];
        fEHijos.forEach((hijo, index) => {
            if (index == 0) {
                let input = hijo.querySelector("input");
                input.type = "button";
                input.value = "aceptar";
                input.addEventListener(
                    "click",
                    () => {
                        let parent = input.parentNode.parentNode;
                        let pHijos = parent.querySelectorAll("td");
                        pHijos.forEach((h, index) => {
                            if (index == 0) {
                                input.type = "checkbox";
                                input.value = "";
                                input.checked = false;
                            } else {
                                h.contentEditable = false;
                                h.classList.remove("editableOn");
                                datosEditados.push(h.textContent);
                            }
                        });
                    },
                    { once: true }
                );
            } else {
                hijo.contentEditable = true;
                hijo.classList.add("editableOn");
            }
        });
    }

    eliminarFilas(idFila) {
        let filaEliminar = document.getElementById(idFila);
        let fElimParent = filaEliminar.parentNode; //parent es el tr contenedor
        fElimParent.removeChild(filaEliminar);
        this.cantRows--;
        this.renderTitleBar();
    }
}

/* ---------------------------- Fetch ---------------------------- */
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

/* ------------------------------ Ventana modal ----------------------------- */
// !Modal
function vModal(title, content) {
    let modal = document.getElementById("modal");
    let tituloModal = modal.querySelector(".header_modal").querySelector("h2");
    let contentModal = modal.querySelector(".content_modal");
    let fragment = document.createDocumentFragment();

    let cerrarModal = () => {
        modal.classList.remove("modal");
        modal
            .querySelector(".container_modal_hide")
            .classList.remove("container_modal");
        document.querySelector("body").style.overflow = "unset";
        contentModal.innerHTML = "";
    };

    tituloModal.textContent = title;

    if (content.length > 0) {
        content.forEach(c => {
            let subtitle = document.createElement("h3");
            let form = document.createElement("form");
            let td = c.querySelectorAll("td");
            td.forEach((t, index) => {
                let divLabel = document.createElement("div");
                let input = document.createElement("input");
                input.name = t.dataset.label;
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
                    nomLabel.innerHTML = t.dataset.label;
                    divLabel.appendChild(nomLabel);
                    input.type = "text";
                    input.value = t.textContent;
                    divLabel.appendChild(input);
                }
                form.appendChild(divLabel);
            });
            form.id = nomTabla;
            fragment.appendChild(subtitle);
            fragment.appendChild(form);
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

    /* ----------------------- Botones de cerrar y aceptar ---------------------- */
    let btn_modal_close = modal.querySelector(".btn_modal_close");
    btn_modal_close.addEventListener("click", () => {
        cerrarModal();
    });

    let btn_modal_aceptar = document.getElementById("btn_modal_aceptar");
    btn_modal_aceptar.addEventListener("click", () => {
        let arrFormData = [];
        let formularios = modal.querySelectorAll("form");
        formularios.forEach((f, index) => {
            arrFormData[index] = new FormData(f);
            tabla = f.id;
            editarDatos(tabla, arrFormData[index]);
        });
        cerrarModal();
        let check = document.querySelectorAll(".table_check");
        check.forEach(c => (c.checked = false));
    });
}

/* -------------------------------- Eliminar -------------------------------- */
// !Eliminar
let btn_eliminar = document.getElementById("eliminar");
btn_eliminar.addEventListener("click", () => {
    let check = document.querySelectorAll(".table_check");
    check.forEach(c => {
        if (c.checked == true) c.parentNode.parentNode.remove();
        c.checked = false;
    });
});

/* --------------------------------- Editar --------------------------------- */
// !Editar
let btn_editar = document.getElementById("editar");
btn_editar.addEventListener("click", () => {
    let check = document.querySelectorAll(".table_check");
    let tr = [];
    check.forEach((c, index) => {
        if (c.checked) tr[index] = c.parentNode.parentNode;
    });
    vModal("Editar", tr);
});

let editarDatos = async (tabla, parametros) => {
    let opc;
    if (tabla == "pelicula") opc = 2;
    else if (tabla == "estadisticas") opc = 22;
    else if (tabla == "estadisticaspelicula") opc = 42;
    else if (tabla == "actor") opc = 62;
    else if (tabla == "actorpelicula") opc = 82;
    else if (tabla == "director") opc = 102;
    else if (tabla == "directorpelicula") opc = 122;
    else if (tabla == "genero") opc = 142;
    else if (tabla == "generopelicula") opc = 162;
    else alert("Ha ocurrido un error al actualizar la informacion");
    let url = `../Model/facade.php?opc=${opc}`;
    parametros.forEach(p => {
        console.log(p);
    });
    let response = await peticionFetch(parametros, url);
    console.log(await response);
};

/* --------------------------- Consultar peliculas -------------------------- */
// !Consultar peliculas
const consultarPeliculas = async () => {
    let parametros = new FormData();
    parametros.append("opc", "1");
    let url = "../Model/facade.php?opc=1";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "peliculas",
        titleIcon: "movie",
        headers: Object.keys(await response[0]),
        actButtons: [
            { id: "btn_add", icon: "add", action: function () {
                console.log("agregar");
                console.log(tPeliculas.buttons);
                },
            },
            { id: "btn_edit", icon: "edit", action: function () {
                    console.log("editar");
                },
            },
            { id: "btn_delete", icon: "delete", action: function () {
                    console.log("eliminar");
                },
            },
        ],
        trs: await response,
    };
    let tPeliculas = new DataTable(".data", await contents);
    loader.classList.remove("loader");
};
/* ---------------------------- Consultar actores --------------------------- */
// !Consultar actores
const consultarActores = async () => {
    let parametros = new FormData();
    parametros.append("opc", "61");
    let url = "../Model/facade.php?opc=1";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "actores",
        titleIcon: "person",
        headers: Object.keys(await response[0]),
        actButtons: [
            { id: "btn_add", icon: "add", action: function () {
                    console.log("agregar");
                },
            },
            { id: "btn_edit", icon: "edit", action: function () {
                    console.log("editar");
                },
            },
            { id: "btn_delete", icon: "delete", action: function () {
                    console.log("eliminar");
                },
            },
        ],
        trs: await response,
    };
    let tActores = new DataTable(".data", await contents);
    loader.classList.remove("loader");
};
/* -------------------------- Consultar directores -------------------------- */
// !Consultar directores
const consultarDirectores = async () => {
    let parametros = new FormData();
    parametros.append("opc", "101");
    let url = "../Model/facade.php?opc=101";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "directores",
        titleIcon: "person",
        headers: Object.keys(await response[0]),
        actButtons: [
            { id: "btn_add", icon: "add", action: function () {
                    console.log("agregar");
                },
            },
            { id: "btn_edit", icon: "edit", action: function () {
                    console.log("editar");
                },
            },
            { id: "btn_delete", icon: "delete", action: function () {
                    console.log("eliminar");
                },
            },
        ],
        trs: await response,
    };
    let tDirectores = new DataTable(".data", await contents);
    loader.classList.remove("loader");
};
/* ---------------------------- Consultar generos --------------------------- */
// !Consultar generos
const consultarGeneros = async () => {
    let parametros = new FormData();
    parametros.append("opc", "141");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "generos",
        titleIcon: "person",
        headers: Object.keys(await response[0]),
        actButtons: [
            { id: "btn_add", icon: "add", action: function () {
                    console.log("agregar");
                },
            },
            { id: "btn_edit", icon: "edit", action: function () {
                    console.log("editar");
                },
            },
            { id: "btn_delete", icon: "delete", action: function () {
                    console.log("eliminar");
                },
            },
        ],
        trs: await response,
    };
    let tGeneros = new DataTable(".data", await contents);
    loader.classList.remove("loader");
};

/* -------------------------------- Consultar ------------------------------- */
/* const consultarPeliculas2 = async () => {
    let parametros = new FormData();
    parametros.append("opc", "1");
    let url = "../Model/facade.php?opc=1";
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
            duracion,
            resena,
            tipo,
            pais,
            estado,
            cantvistas,
            cantlikes,
            cantcomentarios
        } = r;
        tr.innerHTML = `
            <td>
            <input type="checkbox" id="${idpelicula}-pelicula" class="table_check">
            <label for="${idpelicula}-pelicula">
                <div class="custom_checkbox"></div>
            </label>
            </td>
            <td data-label="idpelicula"><p>${idpelicula}</p></td>
            <td data-label="titulooriginal"><p>${titulooriginal}</p></td>
            <td data-label="titulolatino"><p>${titulolatino}</p></td>
            <td data-label="lanzamiento"><p>${lanzamiento}</p></td>
            <td data-label="duracion"><p>${duracion}</p></td>
            <td data-label="resena"><p>${resena}</p></td>
            <td data-label="tipo"><p>${tipo}</p></td>
            <td data-label="pais"><p>${pais}</p></td>
            <td data-label="estado"><p>${estado}</p></td>
            <td data-label="vistas"><p>${cantvistas}</p></td>
            <td data-label="likes"><p>${cantlikes}</p></td>
            <td data-label="comentarios"><p>${cantcomentarios}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);

    //desactivar loader
    loader.classList.remove("loader");
}; */

/* const consultarActores2 = async () => {
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
            <td data-label="id actor"><p>${idactor}</p></td>
            <td data-label="nombre"><p>${nombre}</p></td>
            <td data-label="fecha nacimiento"><p>${fechanacimiento}</p></td>
            <td data-label="descripcion"><p>${descripcion}</p></td>
            <td data-label="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
    //desactivar loader
    loader.classList.remove("loader");
}; */

/* const consultarDirectores2 = async () => {
    let parametros = new FormData();
    parametros.append("opc", "101");
    let url = "../Model/facade.php?opc=101";
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
            <td data-label="id director"><p>${iddirector}</p></td>
            <td data-label="nombre"><p>${nombre}</p></td>
            <td data-label="fecha nacimiento"><p>${fechanacimiento}</p></td>
            <td data-label="descripcion"><p>${descripcion}</p></td>
            <td data-label="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
    //desactivar loader
    loader.classList.remove("loader");
}; */

/* const consultarGeneros2 = async () => {
    let parametros = new FormData();
    parametros.append("opc", "141");
    let url = "../Model/facade.php?opc=141";
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
            <td data-label="id genero"><p>${idgenero}</p></td>
            <td data-label="nombre"><p>${nombre}</p></td>
            <td data-label="estado"><p>${estado}</p></td>
        `;
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
    //desactivar loader
    loader.classList.remove("loader");
}; */
