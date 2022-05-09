/* ------------------------- Navegacion por sections ------------------------- */
let options = document.querySelectorAll(".option");
let sections = document.querySelectorAll("section");
let main = document.querySelector("main");

let sectionsX = [];
sections.forEach(
    (section, index) => (sectionsX[index] = section.getBoundingClientRect())
);
/* window.addEventListener("resize", () => {
    sections.forEach(
        (section, index) => (sectionsX[index] = section.getBoundingClientRect())
    );
}); */

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
                        consultarEstadisticas();
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
        threshold: 1,
    }
);

sections.forEach(section => observer.observe(section));

/* ------------------------- Header y Button Up ------------------------- */
let buttonUp = document.getElementById('button_up');
let header = document.getElementById('header');
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= 40) {
        header.style.backgroundColor =
            "rgb(255 255 255 / 90%)";
        buttonUp.classList.add('button_up_active');
    } else {
        header.style.backgroundColor = "transparent";
        buttonUp.classList.remove('button_up_active');
    }
});

buttonUp.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
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
                },
            ],
        },
    });
    let chartGrafico = grafico;
}

window.addEventListener("load", () => {
    /* contenedor = "grafico";
    labels = ["Total"];
    parametros = ["Total", "Registrados", "No registrados"];
    valores = [[5000, 3500, 1500]];
    crearGrafico(contenedor, labels, parametros, valores); */
});

/* ----------------------- Clases ----------------------- */
/* ---------------------- Datatable --------------------- */
class DataTable {
    elementParent;
    container_subsection;
    container_table;
    container_buttons_and_form;
    sub_container_buttons;
    buttons;
    section_subbody;
    container_section_subtitle;
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
        this.container_section_subtitle = document.createElement("div");
        this.section_subbody = document.createElement("div");
        this.container_table = document.createElement("div");
        this.container_buttons_and_form = document.createElement("div");
        this.sub_container_buttons = document.createElement("div");
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

        this.container_buttons_and_form.classList.add("container_buttons_and_form");

        this.section_subbody.appendChild(this.container_buttons_and_form);
        this.section_subbody.appendChild(this.container_table);
        this.section_subbody.classList.add("section_subbody");

        this.container_subsection.appendChild(this.container_section_subtitle);
        this.container_subsection.appendChild(this.section_subbody);
        this.container_subsection.classList.add("container_subsection");
        this.container_subsection.id = this.titulo;

        this.elementParent.appendChild(this.container_subsection);
    }

    capitalizarString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTitleBar() {
        this.container_section_subtitle.innerHTML = `
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

    renderActionBtns() {
        let fragment = document.createDocumentFragment();
        this.buttons.forEach(button => {
            let divBtn = document.createElement("div");
            divBtn.innerHTML = `<span class="material-icons-sharp">${button.icon}</span>`;
            divBtn.id = button.id;
            divBtn.classList.add('btns');
            divBtn.addEventListener("click", button.action);
            fragment.appendChild(divBtn);
        });
        this.sub_container_buttons.appendChild(fragment);
        this.sub_container_buttons.classList.add('sub_container_buttons');
        this.container_buttons_and_form.appendChild(this.sub_container_buttons);
    }

    renderFormAdd() {
        let container_form = document.createElement('div');
        let container_inputs = document.createElement('div');
        let formulario = document.createElement('form');
        let fragment = document.createDocumentFragment();
        let saveButton = document.createElement('button');
        saveButton.innerHTML = '<span class="material-icons-sharp">send</span>';
        formulario.id = 'form' + this.titulo;
        for (let i = 0; i < this.headers.length; i++) {
            let divContentLabel = document.createElement('div');
            divContentLabel.classList.add('content_label')

            let pText = document.createElement('p');
            pText.textContent = this.capitalizarString(this.headers[i]);

            let input = document.createElement('input');
            input.type = 'text';
            input.name = this.headers[i].replace(/ /g, "");
            input.placeholder = this.capitalizarString(this.headers[i]);
            input.classList.add('input_agregar_form');

            divContentLabel.appendChild(pText);
            divContentLabel.appendChild(input);

            fragment.appendChild(divContentLabel);
        }
        container_inputs.appendChild(fragment);
        container_inputs.classList.add('container_inputs');
        formulario.appendChild(container_inputs);
        formulario.appendChild(saveButton);
        container_form.appendChild(formulario);
        container_form.classList.add('sub_container_form');
        this.container_buttons_and_form.appendChild(container_form);
    }

    renderTrs() {
        let dFragment = document.createDocumentFragment();
        this.trs.forEach(t => {
            let tr = document.createElement("tr");
            tr.id = Math.floor(Math.random() * 1000);
            let td = document.createElement("td");
            td.innerHTML = `<input type="checkbox" id="${
                t[Object.keys(t)[0]]
            }-${this.titulo}" class="table_check">
            <label for="${t[Object.keys(t)[0]]}-${this.titulo}">
                <div class="custom_checkbox" id="custom_checkbox"></div>
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
                let checkboxLabel = hijo.querySelector("#custom_checkbox");
                checkboxLabel.classList.add('checkboxToButton');
                input.type = "button";
                input.value = "aceptar";
                input.addEventListener("click",() => {
                        let parent = input.parentNode.parentNode;
                        let pHijos = parent.querySelectorAll("td");
                        pHijos.forEach((h, index) => {
                            if (index == 0) {
                                checkboxLabel.classList.remove('checkboxToButton');
                                input.type = "checkbox";
                                input.value = "";
                                input.checked = false;
                            } else {
                                h.contentEditable = false;
                                h.classList.remove("editableOn");
                                datosEditados.push(h.textContent);
                            }
                        });
                    },{ once: true }
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


/* --------------------------- Consultar peliculas -------------------------- */
// !Consultar peliculas
const consultarPeliculas = async () => {
    let parametros = new FormData();
    parametros.append("opc", "1");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "peliculas",
        titleIcon: "movie",
        headers: Object.keys(await response[0]),
        actButtons: [
            {
                id: "btn_add",
                icon: "add",
                action: function () {
                    tPeliculas.renderFormAdd();
                },
            },
            {
                id: "btn_edit",
                icon: "edit",
                action: function () {
                    console.log("editar");
                    let checkBox = tPeliculas.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode;
                            tPeliculas.editarFilas(idFila.id);
                        }
                    });
                },
            },
            {
                id: "btn_delete",
                icon: "delete",
                action: function () {
                    console.log("eliminar");
                    let checkBox = tPeliculas.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach((check) => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode.id;
                            tPeliculas.eliminarFilas(idFila);
                        }
                    });
                },
            },
        ],
        trs: await response,
    };
    let tPeliculas = new DataTable(".data", await contents);
    loader.classList.remove("loader");
};

/* --------------- Consultar Estadisticas --------------- */
// !Consultar estadisticas
const consultarEstadisticas = async () => {
    let parametros = new FormData();
    parametros.append("opc", "21");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "estadisticas",
        titleIcon: "bar_chart",
        headers: Object.keys(await response[0]),
        actButtons: [
            {
                id: "btn_add",
                icon: "add",
                action: function () {
                    tEstadisticas.renderFormAdd();
                },
            },
            {
                id: "btn_edit",
                icon: "edit",
                action: function () {
                    console.log("editar");
                    let checkBox = tEstadisticas.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode;
                            tEstadisticas.editarFilas(idFila.id);
                        }
                    });
                },
            },
            {
                id: "btn_delete",
                icon: "delete",
                action: function () {
                    console.log("eliminar");
                    let checkBox = tEstadisticas.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach((check) => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode.id;
                            tEstadisticas.eliminarFilas(idFila);
                        }
                    });
                },
            },
        ],
        trs: await response,
    };
    let tEstadisticas = new DataTable(".data", await contents);
    loader.classList.remove("loader");
}

/* ---------------------------- Consultar actores --------------------------- */
// !Consultar actores
const consultarActores = async () => {
    let parametros = new FormData();
    parametros.append("opc", "61");
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "actores",
        titleIcon: "groups",
        headers: Object.keys(await response[0]),
        actButtons: [
            {
                id: "btn_add",
                icon: "add",
                action: function () {
                    tActores.renderFormAdd();
                },
            },
            {
                id: "btn_edit",
                icon: "edit",
                action: function () {
                    console.log("editar");
                    let checkBox = tActores.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode;
                            tActores.editarFilas(idFila.id);
                        }
                    });
                },
            },
            {
                id: "btn_delete",
                icon: "delete",
                action: function () {
                    console.log("eliminar");
                    let checkBox = tActores.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach((check) => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode.id;
                            tActores.eliminarFilas(idFila);
                        }
                    });
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
    let url = "../Model/facade.php";
    let response = await peticionFetch(parametros, url);

    let contents = await {
        titulo: "directores",
        titleIcon: "people",
        headers: Object.keys(await response[0]),
        actButtons: [
            {
                id: "btn_add",
                icon: "add",
                action: function () {
                    tDirectores.renderFormAdd();
                },
            },
            {
                id: "btn_edit",
                icon: "edit",
                action: function () {
                    console.log("editar");
                    let checkBox = tDirectores.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode;
                            tDirectores.editarFilas(idFila.id);
                        }
                    });
                },
            },
            {
                id: "btn_delete",
                icon: "delete",
                action: function () {
                    console.log("eliminar");
                    let checkBox = tDirectores.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach((check) => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode.id;
                            tDirectores.eliminarFilas(idFila);
                        }
                    });
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
        titleIcon: "theaters",
        headers: Object.keys(await response[0]),
        actButtons: [
            {
                id: "btn_add",
                icon: "add",
                action: function () {
                    tGeneros.renderFormAdd();
                },
            },
            {
                id: "btn_edit",
                icon: "edit",
                action: function () {
                    console.log("editar");
                    let checkBox = tGeneros.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode;
                            tGeneros.editarFilas(idFila.id);
                        }
                    });
                },
            },
            {
                id: "btn_delete",
                icon: "delete",
                action: function () {
                    console.log("eliminar");
                    let checkBox = tGeneros.section_subbody.querySelectorAll("input[type=checkbox]");
                    checkBox.forEach((check) => {
                        if (check.checked) {
                            let idFila = check.parentNode.parentNode.id;
                            tGeneros.eliminarFilas(idFila);
                        }
                    });
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
