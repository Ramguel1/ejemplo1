var btnGuardar = document.getElementById('guardar');

btnGuardar.onclick = async () => {

    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;
    let proovedor = document.getElementById('proovedor').value;
    let unidad = document.getElementById('unidad').value;
    let categoria = document.getElementById('categoria').value;


    if (nombre.trim() == "" || precio.trim() == "" || cantidad.trim() == "" || proovedor.trim() == "" || unidad.trim() == "" || categoria.trim() == "") {
        Swal.fire({
            title: "malmal",
            text: "llena todo",
            icon: "error"
        });
        return;
    }


    let info = new FormData();
    info.append("nombre", nombre);
    info.append("precio", precio);
    info.append("cantidad", cantidad);
    info.append("proovedor", proovedor);
    info.append("unidad", unidad);
    info.append("categoria", categoria);


    let respuesta = await fetch("php/insertarProducto.php", { method: 'POST', body: info });
    let json = await respuesta.json();

    if (json.success == true) {
        Swal.fire({
            title: "se registro",
            text: json.mensaje,
            icon: "success"
        });
        limpiar();
        cargarProductos();
    } else {
        Swal.fire({
            title: "no se registro",
            text: json.mensaje,
            icon: "error"
        });
    }
}

const limpiar = () => {
    let nombres = document.getElementById('nombre');
    let precios = document.getElementById('precio');
    let cantidades = document.getElementById('cantidad');
    let proovedores = document.getElementById('proovedor');
    let unidades = document.getElementById('unidad');
    let categorias = document.getElementById('categoria');

    nombres.value = "";
    precios.value = "";
    cantidades.value = "";
    proovedores.value = "";
    unidades.value = "";
    categorias.value = "";
}

const cargarProductos = async () => {
    let respuesta = await fetch("php/cargarProducto.php");
    let json = await respuesta.json();
    let tablaHTML = ``
    let index = 0;
    json.data.forEach(item => {
        tablaHTML += `
        <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td>${item[5]}</td>
        <td>${item[6]}</td>
        <td><button class="btn btn-danger" onclick="eliminar(${item[0]})">DEL</button></td>
        <td><button class="btn btn-primary" onclick="edit(${item[0]})" data-bs-toggle="modal" data-bs-target="#actualizar">EDIT</button></td>
        </tr>`
    });
    document.getElementById("listaProductos").innerHTML = tablaHTML;

}

const eliminar = async (id) => {
    Swal.fire({
        title: "estas seguro de eliminar?",
        showDenyButton: true,
        confirmButtonText: "Si",
        confirmButtonColor: 'success',
        denyButtonText: "No "

    }).then(async (result) => {
        if (result.isConfirmed) {
            let idC = new FormData();
            idC.append('id', id);

            let respuesta = await fetch("php/eliminarProducto.php", {
                method: 'POST',
                body: idC
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "¡Se eliminó con éxito!",
                    text: json.mensaje,
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "ERROR",
                    text: json.mensaje,
                    icon: "error"
                });
            }
            cargarProductos();
            Swal.fire("Contacto eliminado", "", "success");
        }
    });
}


const edit = async (id) => {
    let idC = new FormData();
    idC.append('id', id);
    let respuesta = await fetch("php/editarProducto.php", {
        method: 'POST',
        body: idC
    });
    let json = await respuesta.json();

    document.querySelector("#id").value = json.id;
    document.querySelector("#nombre1").value = json.nombre;
    document.querySelector("#precio1").value = json.precio;
    document.querySelector("#cantidad1").value = json.cantidad;
    document.querySelector("#proovedor1").value = json.proovedor;
    document.querySelector("#unidad1").value = json.unidad;
    document.querySelector("#categoria1").value = json.categoria;
}

const actualizarProducto = async () => {
    var id = document.querySelector("#id").value;
    let nombre = document.getElementById('nombre1').value;
    let precio = document.getElementById('precio1').value;
    let cantidad = document.getElementById('cantidad1').value;
    let proovedor = document.getElementById('proovedor1').value;
    let unidad = document.getElementById('unidad1').value;
    let categoria = document.getElementById('categoria1').value;

    if (nombre.trim() == "" || precio.trim() == "" || cantidad.trim() == "" || proovedor.trim() == "" || unidad.trim() == "" || categoria.trim() == "") {
        Swal.fire({
            title: "ERROR",
            text: "Tienes campos vacíos",
            icon: "error"
        });
        return;
    }

    let info = new FormData();
    info.append("id", id);
    info.append("nombre", nombre);
    info.append("precio", precio);
    info.append("cantidad", cantidad);
    info.append("proovedor", proovedor);
    info.append("unidad", unidad);
    info.append("categoria", categoria);


    let respuesta = await fetch("php/actualizarProducto.php", { method: 'POST', body: info });
    let json = await respuesta.json();
    document.querySelector("#actualizar").click();
    if (json.success == true) {
        Swal.fire({
            title: "se ctualizo",
            text: json.mensaje,
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "no",
            text: json.mensaje,
            icon: "error"
        });
    }
    cargarProductos();
}



