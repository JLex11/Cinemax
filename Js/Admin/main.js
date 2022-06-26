let body = document.querySelector('body');
let navBar = document.querySelector('nav');
let navOptions = document.querySelectorAll('.option img');
let targetSpan = navBar.querySelector('.targetStyles');
let mainSections = document.querySelectorAll('section');
let main = document.querySelector('main');
let loader = document.getElementById('loader');
let loader_users = document.getElementById('loader_users');
/* let prevElementClicked = 0; */
let posElementClicked = 0;
let firstSession = false;

addEventListener('load', () => {
    checkFirstTime();
    navInSections();
    header();
    homeHeaderCards();
    crearGrafico();
    makeScrollableElements();
});

function checkFirstTime() {
    if (localStorage.getItem('firstSession')) {
        firstSession = false;
    } else {
        firstSession = true;
        localStorage.setItem('firstSession', firstSession);
        navBar.classList.add('navFirst');
    }
}

function navInSections() {
    let fEjecutadaData = false;
    let fEjecutadaUsers = false;
    let mainSectionsX = [];

    mainSections.forEach((section, index) => {
        mainSectionsX[index] = section.offsetLeft;
    });

    if (localStorage.getItem('posElementClicked')) {
        posElementClicked = localStorage.getItem('posElementClicked');
        moverMainScroll({ focusAnimation: false, behaviorAnimation: false });
        moverTargetSpan(posElementClicked);
        consultasADb(posElementClicked);
        ocultarNavBar(true);
    }

    navBar.addEventListener('click', e => {
        let posNavOpt = [...navOptions].indexOf(e.target);
        if (mainSectionsX[posNavOpt] !== undefined && posNavOpt >= 0) {
            posElementClicked = posNavOpt;
            localStorage.setItem('posElementClicked', posElementClicked);

            moverMainScroll({ focusAnimation: true });
            moverTargetSpan(posElementClicked);
            consultasADb(posElementClicked);
        }
    });

    navBar.addEventListener('mouseover', () => {
        ocultarNavBar(false);
        if (firstSession == true) {
            navBar.classList.remove('navFirst');
        }

        setTimeout(() => {
            navBar.addEventListener('mouseleave', () => {
                ocultarNavBar(true);
            });
        }, 1000);
    });

    addEventListener('keydown', e => {
        let auxEleClicked = posElementClicked;
        if (e.key > 0 && e.key < mainSectionsX.length + 1 && e.altKey) {
            posElementClicked = e.key - 1;

            if (mainSectionsX[posElementClicked] !== undefined && posElementClicked >= 0) {
                localStorage.setItem('posElementClicked', posElementClicked);
                moverMainScroll({ focusAnimation: true });
                moverTargetSpan(posElementClicked);
                consultasADb(posElementClicked);
            } else {
                posElementClicked = auxEleClicked;
            }
        }
    });

    addEventListener('resize', () => {
        mainSections.forEach((section, index) => {
            mainSectionsX[index] = section.offsetLeft;
        });
        moverMainScroll({ focusAnimation: false, behaviorAnimation: false });
        moverTargetSpan(posElementClicked);
    });

    new ResizeObserver(() => {
        mainSections.forEach((section, index) => {
            mainSectionsX[index] = section.offsetLeft;
        });
        moverMainScroll({ focusAnimation: false, behaviorAnimation: false });
    }).observe(body);

    function ocultarNavBar(active) {
        if (active) {
            setTimeout(() => {
                navBar.classList.add('navHidden');
            }, 1000);
        } else {
            navBar.classList.remove('navHidden');
        }
    }

    function moverMainScroll(options) {
        if (options.focusAnimation == true) {
            main.classList.add('section_focus_change');
            setTimeout(() => {
                main.classList.remove('section_focus_change');
            }, 500);
        }

        /* prevElementClicked = posElementClicked; */
        main.scroll({
            left: mainSectionsX[posElementClicked],
        });
    }

    function moverTargetSpan(posicion) {
        navOptions.forEach((option, index) => {
            if (index == posicion) option.parentNode.classList.add('option_active');
            else option.parentNode.classList.remove('option_active');
        });

        targetSpan.style.left = `${targetSpan.clientWidth * posicion}px`;
        targetSpan.classList.add('targetOnMove');
        setTimeout(() => {
            targetSpan.classList.remove('targetOnMove');
        }, 500);

        window.scrollTo({
            top: 0,
        });
    }

    function consultasADb(posicion) {
        if (posicion == 1) {
            if (!fEjecutadaUsers) {
                loader_users.classList.add('loader');
                consultarUsuarios();
                fEjecutadaUsers = true;
            }
        }

        if (posicion == 2) {
            if (!fEjecutadaData) {
                loader.classList.add('loader');
                consultarPeliculas();
                consultarActores();
                consultarDirectores();
                consultarGeneros();
                consultarEstadisticas();
                //se desactiva el loader desde una de las funciones
                fEjecutadaData = true;
            }
        }
    }
}

function header() {
    let buttonUp = document.getElementById('button_up');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= 40) {
            buttonUp.classList.add('button_up_active');
        } else {
            buttonUp.classList.remove('button_up_active');
        }
    });

    buttonUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
        });
    });
}

function crearGrafico() {
    let grafico = {
        contenedor: 'grafico',
        labels: ['Usuarios'],
        parametros: ['En linea', 'Registrados', 'No registrados', 'Pendientes', 'Semi-Registrados'],
        valores: [[2850, 3000, 2900, 3160, 3109]],
    };
    renderGrafico({ ...grafico });

    function renderGrafico({ contenedor, labels, parametros, valores }) {
        let canvasGrafico = document.getElementById(contenedor);
        // eslint-disable-next-line no-undef
        new Chart(canvasGrafico, {
            type: 'line',
            data: {
                labels: parametros,
                datasets: [
                    {
                        label: labels[0],
                        data: valores[0],
                        backgroundColor: ['#0069bd', 'lightgreen', 'red'],
                    },
                ],
            },
            responsive: true,
        });
    }
}

function homeHeaderCards() {
    let contentsCard = [
        {
            id: 'InLine',
            icon: 'person',
            bodyElements: [
                {
                    number: 890,
                    name: 'En Linea 🔵',
                },
            ],
        },
        {
            id: 'Registered',
            icon: 'done',
            bodyElements: [
                {
                    number: 578,
                    name: 'Registrados 🟢',
                },
            ],
        },
        {
            id: 'Unregistered',
            icon: 'clear',
            bodyElements: [
                {
                    number: 300,
                    name: 'No Registrados 🔴',
                },
            ],
        },
    ];

    new HeaderCards('homeCards', contentsCard[0]);
    new HeaderCards('homeCards', contentsCard[1]);
    new HeaderCards('homeCards', contentsCard[2]);
}

function makeScrollableElements() {
    let ovContainers = document.querySelectorAll('.overflowable_container');
    ovContainers.forEach(ovContainer => {
        let firstChild = ovContainer.firstElementChild;
        isScrollableElement(ovContainer, firstChild);
    });
}

function isScrollableElement(elementParent, overflowElement) {
    elementParent.addEventListener('wheel', e => {
        e.preventDefault();
        elementParent.scrollLeft += e.deltaY / 2;
    });

    let wOverflowElement = overflowElement.offsetWidth;
    let wElementParent = elementParent.offsetWidth;
    let minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
    let maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;

    let buttonLeft = document.createElement('div');
    let buttonRight = document.createElement('div');

    buttonLeft.classList.add('button_left');
    buttonLeft.classList.add('scrollButtons');

    buttonRight.classList.add('button_right');
    buttonRight.classList.add('scrollButtons');

    buttonLeft.innerHTML = `
        <span class="material-icons-round">navigate_before</span>`;
    buttonLeft.addEventListener('click', () => {
        elementParent.scrollLeft -= 300;
    });

    buttonRight.innerHTML = `
        <span class="material-icons-round">navigate_next</span>`;
    buttonRight.addEventListener('click', () => {
        elementParent.scrollLeft += 300;
    });

    elementParent.parentNode.append(buttonLeft, buttonRight);

    function isVisibilyScrollButtons() {
        if (wOverflowElement > wElementParent) {
            if (elementParent.scrollLeft > 1) {
                buttonLeft.style.transform = 'scaleX(1)';
            } else {
                buttonLeft.style.transform = 'scaleX(0)';
            }

            let scrollRelation = wElementParent + elementParent.scrollLeft;
            if (scrollRelation > minRange && scrollRelation < maxRange) {
                buttonRight.style.transform = 'scaleX(0)';
            } else {
                buttonRight.style.transform = 'scaleX(1)';
            }
        } else {
            buttonLeft.style.transform = 'scaleX(0)';
            buttonRight.style.transform = 'scaleX(0)';
        }
    }

    elementParent.addEventListener('scroll', () => {
        isVisibilyScrollButtons();
    });

    addEventListener('resize', () => {
        wOverflowElement = overflowElement.offsetWidth;
        wElementParent = elementParent.offsetWidth;
        minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
        maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
        isVisibilyScrollButtons();
    });

    new ResizeObserver(() => {
        wOverflowElement = overflowElement.offsetWidth;
        wElementParent = elementParent.offsetWidth;
        minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
        maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
        isVisibilyScrollButtons();
    }).observe(overflowElement);
}

/* ---------------------- HeaderCards --------------------- */
class HeaderCards {
    principalContainer;
    headerItem;
    spanMaterialIcons;
    containerBody;
    id;
    icon;
    bodyElements;

    constructor(principalContainer, contents) {
        this.principalContainer = document.getElementById(principalContainer);
        this.headerItem = document.createElement('a');
        this.containerBody = document.createElement('div');
        this.id = contents.id;
        this.icon = contents.icon;
        this.bodyElements = contents.bodyElements;
        this.makeCard();
    }

    makeCard() {
        this.renderIcon();
        this.renderBody();

        this.headerItem.classList.add('header_item');
        this.headerItem.href = '#' + this.id;
        this.principalContainer.appendChild(this.headerItem);
    }

    renderIcon() {
        let spanIcon = document.createElement('span');
        spanIcon.classList.add('material-icons-round');
        spanIcon.innerText = this.icon;
        this.headerItem.appendChild(spanIcon);
    }

    renderBody() {
        this.containerBody.classList.add('container_body');
        let fragment = document.createDocumentFragment();

        this.bodyElements.forEach((bElement, i) => {
            let bodyElement = document.createElement('div');
            bodyElement.classList.add('body_element');
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
    tableFields;
    describe;
    trs;
    indexUltElement;
    numRowsPerPage;
    actualPage;
    dbParametros;
    dbTables;
    cantRows;
    table;
    thead;
    tbody;
    container_rows_actions;
    ls;

    constructor(elementParent, contents) {
        this.elementParent = document.querySelector(elementParent);
        this.container_subsection = document.createElement('div');
        this.container_section_subtitle = document.createElement('div');
        this.section_subbody = document.createElement('div');
        this.container_table = document.createElement('div');
        this.container_buttons_and_form = document.createElement('div');
        this.sub_container_buttons = document.createElement('div');
        this.container_rows_actions = document.createElement('div');
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.ls = localStorage;
        this.tableName = contents.name;
        this.titulo = this.capitalizarString(contents.titulo);
        this.titleIcon = contents.titleIcon;
        this.headers = contents.headers;
        this.tableFields = contents.tableFields;
        this.describe = contents.describe;
        this.buttons = contents.actBtns;
        this.trs = contents.trs;
        this.indexUltElement = 0;
        this.numRowsPerPage = this.ls.getItem(`numRowsPerPage${this.titulo}`) ? this.ls.getItem(`numRowsPerPage${this.titulo}`) : 1;
        this.actualPage = 1;
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
        this.renderRowActions();
        this.changeNumRowsPerPage();

        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        this.container_table.appendChild(this.table);
        this.container_table.classList.add('container_table');

        this.container_buttons_and_form.classList.add('container_buttons_and_form');

        this.container_rows_actions.classList.add('container_rows_actions');

        this.section_subbody.append(this.container_buttons_and_form, this.container_table, this.container_rows_actions);
        this.section_subbody.classList.add('section_subbody');

        this.container_subsection.append(this.container_section_subtitle, this.section_subbody);
        this.container_subsection.classList.add('container_subsection');
        this.container_subsection.id = this.titulo;

        this.elementParent.appendChild(this.container_subsection);
    }

    capitalizarString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    stringToArray(string, replaceCharacter, ...serapated) {
        serapated.forEach(s => {
            string = string.replace(s, replaceCharacter);
        });
        let arr = string.split(replaceCharacter);
        if (arr[0] == 'int' || arr[0] == 'year') arr[0] = 'number';
        if (arr[0] == 'char' || arr[0] == 'varchar') arr[0] = 'text';
        if (arr[0] == 'date') arr[0] = 'date';
        if (arr[0] == 'enum') {
            arr[0] = 'text';
            arr[1] = '1';
        }
        return arr;
    }

    renderTitleBar() {
        this.container_section_subtitle.innerHTML = `
        <div class="section_subtitle">
            <h2>${this.titulo}</h2>
            <div>
                <span class="material-icons-round">${this.titleIcon}</span>
                <h2 class="contRows">${this.cantRows}</h2>
            </div>
        </div>
        `;
    }

    renderActionBtns() {
        let fragment = document.createDocumentFragment();
        this.buttons.forEach(button => {
            let divBtn = document.createElement('div');
            divBtn.innerHTML = `<span class="material-icons-round">${button.icon}</span>`;
            divBtn.id = button.id;
            divBtn.classList.add('btns');
            divBtn.addEventListener('click', button.action);
            fragment.appendChild(divBtn);
        });
        this.sub_container_buttons.appendChild(fragment);
        this.sub_container_buttons.classList.add('sub_container_buttons');
        this.container_buttons_and_form.appendChild(this.sub_container_buttons);
    }

    renderModal(body) {
        let modalTitle = 'Modal Title';

        let containerModal = document.createElement('div');
        let containerHeader = document.createElement('div');
        let containerBody = document.createElement('div');

        containerModal.classList.add('modal-container');
        containerHeader.classList.add('modal-header');
        containerBody.classList.add('modal-body');

        function renderHeader() {
            let headerContent = document.createElement('div');
            headerContent.classList.add('header-content');

            function renderTitle() {
                let divModalTitle = document.createElement('div');
                divModalTitle.classList.add('modal-title');

                let h3Title = document.createElement('h3');
                h3Title.textContent = modalTitle;

                divModalTitle.append(h3Title);
                return divModalTitle;
            }

            function renderActions() {
                let divModalActions = document.createElement('div');
                divModalActions.classList.add('modal-actions');

                let spanCloseButton = document.createElement('span');
                spanCloseButton.classList.add('material-icons-round');
                spanCloseButton.textContent = 'close';
                spanCloseButton.addEventListener('click', () => {
                    containerModal.remove();
                });

                divModalActions.append(spanCloseButton);
                return divModalActions;
            }

            headerContent.append(renderTitle(), renderActions());
            return headerContent;
        }

        function renderBody() {
            let bodyContent = document.createElement('div');
            bodyContent.classList.add('body-content');
            bodyContent.append(body);
            return bodyContent;
        }

        containerModal.append(renderHeader(), renderBody());
        this.section_subbody.append(containerModal);
    }

    renderHeaders() {
        let tr = document.createElement('tr');
        let dFragment = document.createDocumentFragment();
        let th = document.createElement('th');
        tr.appendChild(th);

        this.headers.forEach(header => {
            let th = document.createElement('th');
            th.textContent = this.capitalizarString(header);
            dFragment.appendChild(th);
        });
        tr.appendChild(dFragment);
        this.thead.appendChild(tr);
    }

    renderTrs() {
        let dFragment = document.createDocumentFragment();
        let rows = 0;
        for (let i = this.indexUltElement; i < this.cantRows; i++) {
            if (this.trs[i]) {
                let t = this.trs[i];
                let rowId = `${t[Object.keys(t)[0]]}-${this.tableName}`;
                let checkBoxId = `${t[Object.keys(t)[0]]}-${this.titulo}`;

                let tr = document.createElement('tr');
                tr.id = rowId;

                let td = document.createElement('td');
                td.innerHTML = `
                <input type="checkbox" id="${checkBoxId}" class="table_check">
                <label for="${checkBoxId}">
                    <div class="custom_checkbox" id="custom_checkbox"></div>
                </label>`;
                tr.append(td);

                let describeCont = 0;
                for (let i in t) {
                    let td = document.createElement('td');
                    td.setAttribute('data-label', `${this.capitalizarString(this.headers[describeCont])}`);

                    let describe = this.describe[describeCont] ? this.describe[describeCont] : false;
                    if (describe && describe.Field == 'foto') {
                        let ahref = document.createElement('a');
                        ahref.setAttribute('target', '_blank');
                        ahref.href = t[i];

                        let img = document.createElement('img');
                        img.src = t[i];
                        img.setAttribute('loading', 'lazy');
                        img.addEventListener('error', () => {
                            td.innerHTML = `
                            <span class="material-icons-round" style="color: gray;">image_not_supported</span>`;
                        });

                        ahref.appendChild(img);
                        td.appendChild(ahref);
                    } else if (describe && describe.Field == 'estado') {
                        td.textContent = t[i];
                        if (t[i] == 'T') {
                            td.classList.add('estado_activo');
                        } else {
                            td.classList.add('estado_inactivo');
                        }
                    } else {
                        td.textContent = t[i];
                    }
                    describeCont++;
                    tr.appendChild(td);
                }
                dFragment.appendChild(tr);
            }
            rows++;
            if (rows == this.numRowsPerPage) break;
        }
        this.tbody.innerHTML = '';
        this.tbody.appendChild(dFragment);
    }

    renderRowActions() {
        let numPages = Math.ceil(this.cantRows / this.numRowsPerPage);
        while (this.actualPage > numPages) {
            this.actualPage--;
        }

        let container_pages_number = document.createElement('div');
        container_pages_number.classList.add('container_pages_number');
        container_pages_number.innerHTML += '<p>Mostrando</p>';

        let inputNumRows = document.createElement('input');
        inputNumRows.setAttribute('value', this.numRowsPerPage);
        inputNumRows.setAttribute('max', this.cantRows);
        inputNumRows.setAttribute('min', 1);

        let fragment = document.createDocumentFragment();

        inputNumRows.appendChild(fragment);
        container_pages_number.appendChild(inputNumRows);
        container_pages_number.innerHTML += `<p>de ${this.cantRows}</p>`;
        this.changeNumRowsPerPage(container_pages_number);

        let container_pages_nav = document.createElement('div');
        container_pages_nav.classList.add('container_pages_nav');
        container_pages_nav.innerHTML = `
            <ul>
                ${this.actualPage > 1 ? '<li>1</li>' : ''}
                ${this.actualPage > 3 ? '<li>' + (this.actualPage - 2) + '</li>' : ''}
                ${this.actualPage > 2 ? '<li>' + (this.actualPage - 1) + '</li>' : ''}
                <li class="actualPage_indicator">${this.actualPage}</li>
                ${numPages - this.actualPage > 1 ? '<li>...</li>' : ''}
                ${numPages != this.actualPage ? '<li>' + numPages + '</li>' : ''}
                ${this.actualPage > 1 ? '<li data-type=\'rowRight\'><span class=\'material-icons-round\'>chevron_left</span></li>' : ''}
                ${numPages - this.actualPage > 0 ? '<li data-type=\'rowLeft\'><span class=\'material-icons-round\'>chevron_right</span></li>' : ''}
            </ul>`;

        this.container_rows_actions.innerHTML = '';
        this.container_rows_actions.append(container_pages_number, container_pages_nav);
        this.moveInRows(container_pages_nav);
    }

    changeNumRowsPerPage(inputParent) {
        if (inputParent) {
            let input = inputParent.querySelector('input');
            let regVal = /^[0-9]*[0-9]+$/;
            input.addEventListener('keypress', e => {
                if (e.key == 'Enter') {
                    if (regVal.test(input.value)) {
                        this.indexUltElement = 0;
                        this.numRowsPerPage = input.value > this.cantRows ? this.cantRows : input.value;
                        this.ls.setItem(`numRowsPerPage${this.titulo}`, this.numRowsPerPage);
                        this.renderRowActions();
                        this.renderTrs();
                    } else {
                        input.value = this.numRowsPerPage;
                    }
                }
            });
        } else {
            if (this.ls.getItem(`numRowsPerPage${this.titulo}`)) {
                this.numRowsPerPage = this.ls.getItem(`numRowsPerPage${this.titulo}`);
            } else {
                this.ls.setItem(`numRowsPerPage${this.titulo}`, this.numRowsPerPage);
            }
        }
    }

    moveInRows(container_pages_nav) {
        let listUl = container_pages_nav.querySelector('ul');
        listUl.addEventListener('click', evt => {
            let rowNavSelected = parseInt(evt.target.textContent, 10);
            if (!isNaN(rowNavSelected)) {
                this.actualPage = rowNavSelected;
                this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
                this.renderRowActions();
                this.renderTrs();
            }
        });
        let listLi = container_pages_nav.querySelectorAll('li');
        listLi.forEach(li => {
            if (li.dataset.type) {
                li.addEventListener('click', () => {
                    if (li.dataset.type == 'rowRight') {
                        this.actualPage--;
                        this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
                        this.renderRowActions();
                        this.renderTrs();
                    }
                    if (li.dataset.type == 'rowLeft') {
                        this.actualPage++;
                        this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
                        this.renderRowActions();
                        this.renderTrs();
                    }
                });
            }
        });
    }

    editarFila(idfila) {}

    async peticionF(parametros, url) {
        let response = await fetch(url, {
            method: 'POST',
            body: parametros,
        });
        try {
            return await response.json();
        } catch (error) {
            return 'Ha ocurrido un error: ' + error;
        }
    }

    async seeRow(table) {
        let tableInfo;
        this.dbTables.forEach(t => {
            if (t.table == table) {
                tableInfo = t;
            }
        });
        let parametros = new FormData();
        parametros.append('opc', tableInfo.opc);
        return await this.peticionF(parametros, this.dbParametros.url);
    }

    /* async addRow(datos) {} */

    async updateRow(datos) {
        datos.append('opc', this.dbParametros.opcEditar);
        let response = this.peticionF(datos, this.dbParametros.url);
        response.then(r => {
            console.log(r);
        });
    }

    async deleteRow(id) {
        let datos = new FormData();
        datos.append('campo', id);
        datos.append('opc', this.dbParametros.opcEliminar);
        let response = this.peticionF(datos, this.dbParametros.url);
        response.then(r => {
            console.log(r);
        });
    }

    insertarFilas(datos) {
        console.log('method: insertarFilas(datos)', datos);
    }

    async editarFilas(fila) {
        let filaEditar = document.getElementById(fila); //es el tr contenedor
        let tdCampos = filaEditar.childNodes;

        let containerBody = document.createElement('div');
        let form = document.createElement('form');
        form.setAttribute('enctype', 'multipart/form-data');

        let fragment = document.createDocumentFragment();

        for (let i = 0; i < tdCampos.length - 1; i++) {
            let describeType = ['text', '11'];
            let readonly = false;

            let input = document.createElement('input');
            input.name = this.describe[i] ? this.describe[i].Field : this.headers[i];
            input.placeholder = this.headers[i] ? this.headers[i] : '';
            if (readonly) input.setAttribute('readonly', '');

            if (this.describe[i]) {
                describeType = this.stringToArray(this.describe[i].Type, ' ', '(', ')');
                readonly = this.describe[i].Key == 'PRI' ? true : false;

                if (this.describe[i].Field == 'foto') {
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                } else {
                    input.setAttribute('type', describeType[0]);
                    input.setAttribute('max-lenght', describeType[1]);
                }
            }

            fragment.appendChild(input);
        }
        form.append(fragment);

        let saveBtn = document.createElement('div');
        saveBtn.innerHTML = '<span class="material-icons-round">send</span>';
        saveBtn.addEventListener('click', () => {
            let formData = new FormData(form);
        });

        containerBody.append(form, saveBtn);
        this.renderModal(containerBody);
    }

    eliminarFilas(fila) {
        let filaEliminarTds = fila.querySelectorAll('td');
        filaEliminarTds.forEach((td, i) => {
            if (this.headers[i - 1]) {
                if (this.headers[i - 1].indexOf('id') == 0) {
                    this.deleteRow(td.textContent);
                }

                if (this.headers[i - 1].indexOf('estado') == 0) {
                    td.classList.add('estado_inactivo');
                    td.classList.remove('estado_activo');
                }
            }
        });
    }
}

/* --------------- Fetch ---------------- */
// ?Fetch
async function peticionFetch(parametros, url) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: parametros,
        });
        return await response.json();
    } catch (error) {
        return 'Ha ocurrido un error: ' + error;
    }
}

/* -------------Consultas a db-------------- */
//variables
const mFacadeUrl = '../Model/facade.php';
/* const mFacadeUrl = "http://cinemaxadmon.000webhostapp.com/Model/facade.php"; */
const btn_add = {
    id: 'btn_add',
    icon: 'add',
};
const btn_edit = {
    id: 'btn_edit',
    icon: 'edit',
};
const btn_delete = {
    id: 'btn_edit',
    icon: 'delete',
};

async function consultarDbTables() {
    let tableDatos;
    if (!tableDatos) {
        let parametros = new FormData();
        parametros.append('opc', '0');
        tableDatos = await peticionFetch(parametros, mFacadeUrl);
    }
    return await tableDatos;
}

// !Consultar peliculas
async function consultarPeliculas() {
    let nameTable = 'pelicula';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'peliculas',
        titleIcon: 'movie',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tPeliculas.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(async check => {
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
                    let checkBox = tPeliculas.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            check.checked = false;
                            tPeliculas.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '1',
            opcEditar: '2',
            opcEliminar: '3',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let contentsCard = {
        id: 'Peliculas',
        icon: 'movie',
        bodyElements: [
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Peliculas',
            },
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Nuevas',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
    let tPeliculas = new DataTable('.data', contents);
    loader.classList.remove('loader');
}

// !Consultar estadisticas
async function consultarEstadisticas() {
    let nameTable = 'estadisticas';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'estadisticas',
        titleIcon: 'bar_chart',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tEstadisticas.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
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
                    let checkBox = tEstadisticas.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            tEstadisticas.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '21',
            opcEditar: '22',
            opcEliminar: '23',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let contentsCard = {
        id: 'Estadisticas',
        icon: 'bar_chart',
        bodyElements: [
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Estadisticas',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
    let tEstadisticas = new DataTable('.data', contents);
    loader.classList.remove('loader');
}

// !Consultar actores
async function consultarActores() {
    let nameTable = 'actor';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'actores',
        titleIcon: 'groups',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tActores.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
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
                    let checkBox = tActores.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            tActores.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '61',
            opcEditar: '62',
            opcEliminar: '63',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let contentsCard = {
        id: 'Actores',
        icon: 'groups',
        bodyElements: [
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Actores',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
    let tActores = new DataTable('.data', contents);
    loader.classList.remove('loader');
}

// !Consultar directores
async function consultarDirectores() {
    let nameTable = 'director';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'directores',
        titleIcon: 'people',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tDirectores.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
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
                    let checkBox = tDirectores.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            tDirectores.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '101',
            opcEditar: '102',
            opcEliminar: '103',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let contentsCard = {
        id: 'Directores',
        icon: 'people',
        bodyElements: [
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Directores',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
    let tDirectores = new DataTable('.data', contents);
    loader.classList.remove('loader');
}

// !Consultar generos
async function consultarGeneros() {
    let nameTable = 'genero';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'generos',
        titleIcon: 'theaters',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tGeneros.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
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
                    let checkBox = tGeneros.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            tGeneros.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '141',
            opcEditar: '142',
            opcEliminar: '143',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let contentsCard = {
        id: 'Generos',
        icon: 'theaters',
        bodyElements: [
            {
                number: Object.getOwnPropertyNames(await contents.trs).length - 1,
                name: 'Generos',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
    let tGeneros = new DataTable('.data', contents);
    loader.classList.remove('loader');
}

// !Consultar Usuarios
async function consultarUsuarios() {
    let nameTable = 'usuario';
    let tableOpcInfo;
    let dbTables = await consultarDbTables();
    dbTables.forEach(table => {
        if (table.table == nameTable) {
            tableOpcInfo = table;
        }
    });

    let parametros = new FormData();
    parametros.append('opc', tableOpcInfo.opc);
    let response = await peticionFetch(parametros, mFacadeUrl);

    let contents = {
        name: nameTable,
        titulo: 'usuarios',
        titleIcon: 'theaters',
        headers: Object.keys(await response.datos[0]),
        tableFields: await response.table_Fields,
        describe: await response.describe,
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
                    let checkBox = tUsuarios.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
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
                    let checkBox = tUsuarios.section_subbody.querySelectorAll('input[type=checkbox]');
                    checkBox.forEach(check => {
                        if (check.checked) {
                            let fila = check.parentNode.parentNode;
                            tUsuarios.eliminarFilas(fila);
                        }
                    });
                },
            },
        ],
        trs: await response.datos,
        dbParametros: {
            opcConsultar: '181',
            opcEditar: '182',
            opcEliminar: '183',
            url: mFacadeUrl,
        },
        dbTables: dbTables,
    };

    let tUsuarios = new DataTable('.user_data', contents);
    loader_users.classList.remove('loader');
}
