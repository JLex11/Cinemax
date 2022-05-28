/* ------------------------- Navegacion por mainSections ------------------------- */
let navOptions = document.querySelectorAll(".option");
let mainSections = document.querySelectorAll("section");
let main = document.querySelector("main");

var { loader, loader_users } = navInSections();

/* ------------------------- Header y Button Up ------------------------- */
headerAndButtonUp();

function headerAndButtonUp() {
  let buttonUp = document.getElementById("button_up");
  let header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= 40) {
      header.style.backgroundColor = "rgb(255 255 255 / 95%)";
      buttonUp.classList.add("button_up_active");
    } else {
      header.style.backgroundColor = "transparent";
      buttonUp.classList.remove("button_up_active");
    }
  });

  buttonUp.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}

function navInSections() {
  let mainSectionsX = [];
  mainSections.forEach((section, index) => (mainSectionsX[index] = section.getBoundingClientRect()));

  window.addEventListener("resize", () => {
    mainSections.forEach((section, index) => (mainSectionsX[index] = section.getBoundingClientRect()));
  });

  navOptions.forEach((op, index) => {
    op.addEventListener("click", () => {
      if (mainSectionsX[index]) main.scrollLeft = mainSectionsX[index].x;
      window.scrollTo({ top: 0 });
    });
  });

  let indexSectionActiva;
  let fEjecutadaData = false;
  let fEjecutadaUsers = false;
  let firstExecute = false;
  var loader = document.getElementById("loader");
  var loader_users = document.getElementById("loader_users");

  const observer = new IntersectionObserver(sectionIsFocused(), { root: main, threshold: 0.1 });

  mainSections.forEach((section) => observer.observe(section));
  return { loader, loader_users };

  function sectionIsFocused() {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (firstExecute) {
            main.classList.add("section_focus_change");
            setTimeout(() => {
              main.classList.remove("section_focus_change");
            }, 500);
          } else firstExecute = true;

          stylizedNavOption();

          if (entry.target.id == "users_section") {
            if (!fEjecutadaUsers) {
              loader_users.classList.add("loader");
              consultarUsuarios();
              fEjecutadaUsers = true;
            }
          } else loader_users.classList.remove("loader");

          if (entry.target.id == "data_section") {
            if (!fEjecutadaData) {
              loader.classList.add("loader");
              consultarPeliculas();
              consultarActores();
              consultarDirectores();
              consultarGeneros();
              consultarEstadisticas();
              //se desactiva el loader desde una de las funciones
              fEjecutadaData = true;
            }
          } else loader.classList.remove("loader");
        }

        function stylizedNavOption() {
          indexSectionActiva = [...mainSections].indexOf(entry.target);
          navOptions.forEach((op, index) => {
            window.scrollTo({ top: 0 });
            if (index == indexSectionActiva) op.classList.add("active_option");
            else op.classList.remove("active_option");
          });
        }
      });
    };
  }
}

/* --------------------------------- Grafico -------------------------------- */
/* function crearGrafico(contenedor, labels, parametros, valores) {
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
} */

/* window.addEventListener("load", () => {
    contenedor = "grafico";
    labels = ["Total"];
    parametros = ["Total", "Registrados", "No registrados"];
    valores = [[5000, 3500, 1500]];
    crearGrafico(contenedor, labels, parametros, valores);
}); */

/* ---------------------- HeaderCards --------------------- */
class HeaderCards {
  principalContainer;
  hrefElement;
  headerItem;
  spanMaterialIcons;
  containerBody;
  id;
  icon;
  bodyElements;

  constructor(principalContainer, contents) {
    this.principalContainer = document.getElementById(principalContainer);
    this.hrefElement = document.createElement("a");
    this.headerItem = document.createElement("div");
    this.containerBody = document.createElement("div");
    this.id = contents.id;
    this.icon = contents.icon;
    this.bodyElements = contents.bodyElements;
    this.makeCard();
  }

  makeCard() {
    this.renderIcon();
    this.renderBody();

    this.headerItem.classList.add("header_item");
    this.hrefElement.appendChild(this.headerItem);
    this.hrefElement.href = "#" + this.id;
    this.principalContainer.appendChild(this.hrefElement);
  }

  renderIcon() {
    let spanIcon = document.createElement("span");
    spanIcon.classList.add("material-icons-sharp");
    spanIcon.innerText = this.icon;
    this.headerItem.appendChild(spanIcon);
  }

  renderBody() {
    this.containerBody.classList.add("container_body");
    let fragment = document.createDocumentFragment();

    this.bodyElements.forEach((bElement, i) => {
      let bodyElement = document.createElement("div");
      bodyElement.classList.add("body_element");
      bodyElement.innerHTML = `
            <h5>${this.bodyElements[i].number}</h5>
            <h5>${this.bodyElements[i].name}</h5>`;

      fragment.appendChild(bodyElement);
    });

    this.containerBody.appendChild(fragment);
    this.headerItem.appendChild(this.containerBody);
  }
}

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
  tableName;
  titulo;
  titleIcon;
  headers;
  info_campos;
  trs;
  dbParametros;
  dbTables;
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
    this.tableName = contents.name;
    this.titulo = this.capitalizarString(contents.titulo);
    this.titleIcon = contents.titleIcon;
    this.headers = contents.headers;
    this.info_campos = contents.info_campos;
    this.buttons = contents.actBtns;
    this.trs = contents.trs;
    this.dbParametros = contents.dbParametros;
    this.dbTables = contents.dbTables;
    this.cantRows = Object.getOwnPropertyNames(this.trs).length - 1;
    this.makeTable();
  }

  makeTable() {
    this.renderTitleBar();
    this.renderActionBtns();
    this.renderHeaders();
    this.renderTrs();

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

  renderActionBtns() {
    let fragment = document.createDocumentFragment();
    this.buttons.forEach((button) => {
      let divBtn = document.createElement("div");
      divBtn.innerHTML = `<span class="material-icons-sharp">${button.icon}</span>`;
      divBtn.id = button.id;
      divBtn.classList.add("btns");
      divBtn.addEventListener("click", button.action);
      fragment.appendChild(divBtn);
    });
    this.sub_container_buttons.appendChild(fragment);
    this.sub_container_buttons.classList.add("sub_container_buttons");
    this.container_buttons_and_form.appendChild(this.sub_container_buttons);
  }

  renderForm() {
    let container_form = document.createElement("div");
    let container_inputs = document.createElement("div");
    let formulario = document.createElement("form");
    let fragment = document.createDocumentFragment();
    let actBtns = document.createElement("div");
    actBtns.classList.add("container_form_act_btns");
    function crearBtnCerrar() {
      let btnCerrarForm = document.createElement("button");
      btnCerrarForm.classList.add("btn_form_cerrar");
      btnCerrarForm.innerHTML = `<span class="material-icons-sharp">close</span>`;
      btnCerrarForm.addEventListener("click", (e) => {
        e.preventDefault();
        let form = actBtns.parentNode;
        form.remove();
      });
      actBtns.appendChild(btnCerrarForm);
    }
    function crearBtnEnviar() {
      let btnEnviarForm = document.createElement("button");
      btnEnviarForm.classList.add("btn_form_enviar");
      btnEnviarForm.innerHTML = `<span class="material-icons-sharp">send</span>`;
      btnEnviarForm.addEventListener("click", (e) => {
        e.preventDefault();
        let form = actBtns.parentNode;
        /* console.log(form); */
        let parametros = new FormData(form);
        /* console.log(parametros.get('idactor')); */
      });
      actBtns.appendChild(btnEnviarForm);
    }
    crearBtnCerrar();
    crearBtnEnviar();

    formulario.id = "form" + this.titulo;

    for (let i = 0; i < this.headers.length; i++) {
      let divContentLabel = document.createElement("div");
      divContentLabel.classList.add("content_label");

      let pText = document.createElement("p");
      pText.textContent = this.capitalizarString(this.headers[i]);

      let input = document.createElement("input");
      input.type = "text";
      input.name = this.headers[i].replace(/ /g, "");
      input.placeholder = this.capitalizarString(this.headers[i]);
      input.classList.add("input_agregar_form");

      divContentLabel.appendChild(pText);
      divContentLabel.appendChild(input);

      fragment.appendChild(divContentLabel);
    }
    container_inputs.appendChild(fragment);
    container_inputs.classList.add("container_inputs");

    formulario.appendChild(container_inputs);
    formulario.appendChild(actBtns);

    container_form.appendChild(formulario);
    container_form.classList.add("sub_container_form");

    this.container_buttons_and_form.appendChild(container_form);
  }

  renderHeaders() {
    let tr = document.createElement("tr");
    let dFragment = document.createDocumentFragment();
    let th = document.createElement("th");
    tr.appendChild(th);

    this.headers.forEach((header) => {
      let th = document.createElement("th");
      th.textContent = this.capitalizarString(header);
      dFragment.appendChild(th);
    });
    tr.appendChild(dFragment);
    this.thead.appendChild(tr);
  }

  renderTrs() {
    let dFragment = document.createDocumentFragment();
    this.trs.forEach((t) => {
      let tr = document.createElement("tr");
      tr.id = Math.floor(Math.random() * 1000);
      let td = document.createElement("td");
      td.innerHTML = `<input type="checkbox" id="${t[Object.keys(t)[0]]}-${this.titulo}" class="table_check">
            <label for="${t[Object.keys(t)[0]]}-${this.titulo}">
                <div class="custom_checkbox" id="custom_checkbox"></div>
            </label>`;
      tr.appendChild(td);

      for (let i in t) {
        let td = document.createElement("td");
        if (typeof t[i] == "array" || typeof t[i] == "object") {
          td.innerHTML = `<select></select>`;
          let select = td.querySelector("select");
          t[i].forEach((i) => {
            select.innerHTML += `<option value="${i}">${i}</option>`;
          });
        } else {
          if (t[i].indexOf("../foto") == 0) {
            td.innerHTML = `
                        <a target="_blank" href="${t[i]}"><img src="${t[i]}" loading="lazy"></a>`;
          } else {
            td.textContent = t[i];
          }
        }
        tr.appendChild(td);
      }
      dFragment.appendChild(tr);
    });
    this.tbody.appendChild(dFragment);
  }

  async peticionFetch(parametros, url) {
    let peticion = await fetch(url, {
      method: "POST",
      body: parametros,
    });
    try {
      return await peticion.json();
    } catch (e) {
      console.log(e);
    }
  }

  async seeRow(table) {
    /* console.log(this.dbTables);  */ //se debe entregar desde el contents de una consulta a la db
    this.dbTables = {
      pelicula: "1",
      estadisticas: "21",
      estadisticaspelicula: "41",
      actor: "61",
    };
    let opcKeys = Object.getOwnPropertyNames(this.dbTables);
    let opc = "";
    /* for (let table of this.dbTables) {
            console.log(this.dbTables[table]);
            if (opcKeys[i] == table) opc = t;
        } */
    /* this.dbTables.forEach((t, i) => {
            if (opcKeys[i] == table) opc = t;
        }) */
    let url = this.dbParametros.url;
    console.log(opc);
    let parametros = new FormData();
    parametros.append("opc", opc);
    return "Melo";
  }

  async addRow(datos) {}

  async updateRow(datos) {
    let parametros = new FormData();
    for (let dato in datos) {
      parametros.append(dato, datos[dato]);
    }
    let url = this.dbParametros.url + "?opc=" + this.dbParametros.opcEditar;
    let response = this.peticionFetch(parametros, url);
  }

  async deleteRow(id) {}

  insertarFilas(datos) {
    let dFragment = document.createDocumentFragment();
    let tr = document.createElement("tr");
    tr.id = Math.floor(Math.random() * 100);
    let td = document.createElement("td");
    td.innerHTML = `<input type="checkbox" id="${t[Object.keys(t)[0]]}-${this.titulo}" class="table_check">
        <label for="${t[Object.keys(t)[0]]}-${this.titulo}">
            <div class="custom_checkbox"></div>
        </label>`;
    tr.appendChild(td);

    datos.forEach((fila) => {
      let td = document.createElement("td");
      td.textContent = fila;
      tr.appendChild(td);
    });
    dFragment.appendChild(tr);
    this.tbody.appendChild(dFragment);
    this.cantRows++;
    this.renderTitleBar();
  }

  async editarFilas(fila) {
    let filaEditar = document.getElementById(fila); //es el tr contenedor
    let fEHijos = filaEditar.querySelectorAll("td");
    let datosEditados = {};
    fEHijos.forEach((hijo, index) => {
      if (index == 0) {
        let checkboxLabel = hijo.querySelector("#custom_checkbox");
        checkboxLabel.classList.add("checkboxToButton");

        let input = hijo.querySelector("input");
        input.type = "button";
        input.value = "aceptar";

        let execute = false;
        let waitForEvent = setInterval(() => {
          if (!execute) {
            execute = this.capturarDatosEditados(input, checkboxLabel, datosEditados, execute, waitForEvent);
          }
        }, 1000);
      } else {
        if (this.tableName != this.info_campos[index - 1].table && this.info_campos[index - 1].table != "estadisticas") {
          hijo.innerHTML = `<select>`;
          let crearOptions = async () => {
            let datos = await this.seeRow(this.info_campos[index - 1].table);
            console.log(datos);
          };
          crearOptions();
          hijo.innerHTML += `</select>`;
        } else {
          hijo.contentEditable = true;
          hijo.classList.add("editableOn");
        }
      }
    });
  }

  capturarDatosEditados(input, checkboxLabel, datosEditados, execute, waitForEvent) {
    input.addEventListener(
      "click",
      () => {
        let trParent = input.parentNode.parentNode;
        let tdHijos = trParent.querySelectorAll("td");
        tdHijos.forEach((td, index) => {
          if (index == 0) {
            checkboxLabel.classList.remove("checkboxToButton");
            input.type = "checkbox";
            input.value = "";
            input.checked = false;
          } else {
            let nameCampo = this.headers[index - 1].replace(/ /, "");
            td.contentEditable = false;
            td.classList.remove("editableOn");
            if (td.querySelector("img")) {
              let fotoSrc = td.querySelector("img").src.replace("http://localhost/Cinemax", "..");
              datosEditados[nameCampo] = fotoSrc;
            } else if (td.querySelector("select")) {
              let valueSelect = td.querySelector("select").value;
              datosEditados[nameCampo] = valueSelect;
              td.innerHTML = valueSelect;
            } else {
              datosEditados[nameCampo] = td.textContent;
            }
          }
        });
        execute = true;
        clearInterval(waitForEvent);
        this.updateRow(datosEditados);
      },
      { once: true }
    );
    return execute;
  }

  eliminarFilas(fila) {
    document.getElementById(fila).remove();
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
    return "Ha ocurrido un error";
  }
}

/* -------------Consultas a db-------------- */
//variables
const mFacadeUrl = "../Model/facade.php";
const btn_add = { id: "btn_add", icon: "add" };
const btn_edit = { id: "btn_edit", icon: "edit" };
const btn_delete = { id: "btn_edit", icon: "delete" };
let tableDatos;
async function consultarDbTables() {
  if (!tableDatos) {
    let parametros = new FormData();
    parametros.append("opc", "0");
    tableDatos = await peticionFetch(parametros, mFacadeUrl);
  }
  return await tableDatos;
}

// !Consultar peliculas
async function consultarPeliculas() {
  let dbTables = await consultarDbTables();
  dbTables.forEach((table) => {
    if (table.table == "pelicula") {
      console.log(table);
    }
  });

  let parametros = new FormData();
  parametros.append("opc", "1");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "pelicula",
    titulo: "peliculas",
    titleIcon: "movie",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tPeliculas.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tPeliculas.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach(async (check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tPeliculas.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tPeliculas.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tPeliculas.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "1",
      opcEditar: "2",
      opcEliminar: "3",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let contentsCard = await {
    id: "Peliculas",
    icon: "movie",
    bodyElements: [
      {
        number: Object.getOwnPropertyNames(await contents.trs).length - 1,
        name: "Peliculas",
      },
    ],
  };

  let peliculasCard = new HeaderCards("chi2", contentsCard);
  let tPeliculas = new DataTable(".data", await contents);
  loader.classList.remove("loader");
}

// !Consultar estadisticas
async function consultarEstadisticas() {
  let dbTables = await consultarDbTables();
  console.log(dbTables);

  let parametros = new FormData();
  parametros.append("opc", "21");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "estadisticas",
    titulo: "estadisticas",
    titleIcon: "bar_chart",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tEstadisticas.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tEstadisticas.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tEstadisticas.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tEstadisticas.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tEstadisticas.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "21",
      opcEditar: "22",
      opcEliminar: "23",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let contentsCard = await {
    id: "Estadisticas",
    icon: "bar_chart",
    bodyElements: [
      {
        number: Object.getOwnPropertyNames(await contents.trs).length - 1,
        name: "Estadisticas",
      },
    ],
  };

  let estadisticasCard = new HeaderCards("chi2", contentsCard);
  let tEstadisticas = new DataTable(".data", await contents);
  loader.classList.remove("loader");
}

// !Consultar actores
async function consultarActores() {
  let dbTables = await consultarDbTables();

  let parametros = new FormData();
  parametros.append("opc", "61");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "actor",
    titulo: "actores",
    titleIcon: "groups",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tActores.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tActores.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tActores.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tActores.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tActores.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "61",
      opcEditar: "62",
      opcEliminar: "63",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let contentsCard = await {
    id: "Actores",
    icon: "groups",
    bodyElements: [
      {
        number: Object.getOwnPropertyNames(await contents.trs).length - 1,
        name: "Actores",
      },
    ],
  };

  let actoresCard = new HeaderCards("chi2", contentsCard);
  let tActores = new DataTable(".data", await contents);
  loader.classList.remove("loader");
}

// !Consultar directores
async function consultarDirectores() {
  let dbTables = await consultarDbTables();

  let parametros = new FormData();
  parametros.append("opc", "101");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "director",
    titulo: "directores",
    titleIcon: "people",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tDirectores.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tDirectores.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tDirectores.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tDirectores.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tDirectores.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "101",
      opcEditar: "102",
      opcEliminar: "103",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let contentsCard = await {
    id: "Directores",
    icon: "people",
    bodyElements: [
      {
        number: Object.getOwnPropertyNames(await contents.trs).length - 1,
        name: "Directores",
      },
    ],
  };

  let directoresCard = new HeaderCards("chi2", contentsCard);
  let tDirectores = new DataTable(".data", await contents);
  loader.classList.remove("loader");
}

// !Consultar generos
async function consultarGeneros() {
  let dbTables = await consultarDbTables();

  let parametros = new FormData();
  parametros.append("opc", "141");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "genero",
    titulo: "generos",
    titleIcon: "theaters",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tGeneros.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tGeneros.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tGeneros.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tGeneros.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tGeneros.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "141",
      opcEditar: "142",
      opcEliminar: "143",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let contentsCard = await {
    id: "Generos",
    icon: "theaters",
    bodyElements: [
      {
        number: Object.getOwnPropertyNames(await contents.trs).length - 1,
        name: "Generos",
      },
    ],
  };

  let generosCard = new HeaderCards("chi2", contentsCard);
  let tGeneros = new DataTable(".data", await contents);
  loader.classList.remove("loader");
}

// !Consultar Usuarios
async function consultarUsuarios() {
  let dbTables = await consultarDbTables();

  let parametros = new FormData();
  parametros.append("opc", "181");
  let response = await peticionFetch(parametros, mFacadeUrl);

  let contents = await {
    name: "usuario",
    titulo: "usuarios",
    titleIcon: "theaters",
    headers: Object.keys(await response.datos[0]),
    info_campos: response.info_campos,
    actBtns: [
      {
        id: btn_add.id,
        icon: btn_add.icon,
        action: function () {
          tUsuarios.renderForm();
        },
      },
      {
        id: btn_edit.id,
        icon: btn_edit.icon,
        action: function () {
          let checkBox = tUsuarios.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode;
              tUsuarios.editarFilas(fila.id);
            }
          });
        },
      },
      {
        id: btn_delete.id,
        icon: btn_delete.icon,
        action: function () {
          let checkBox = tUsuario.section_subbody.querySelectorAll("input[type=checkbox]");
          checkBox.forEach((check) => {
            if (check.checked) {
              let fila = check.parentNode.parentNode.id;
              tUsuarios.eliminarFilas(fila);
            }
          });
        },
      },
    ],
    trs: await response.datos,
    dbParametros: {
      opcConsultar: "181",
      opcEditar: "182",
      opcEliminar: "183",
      url: mFacadeUrl,
    },
    dbTables: dbTables,
  };

  let tUsuarios = new DataTable(".user_data", await contents);
  loader_users.classList.remove("loader");
}
