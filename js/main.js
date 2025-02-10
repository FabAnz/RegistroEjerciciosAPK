//Constantes
const API_URL = "https://movetrack.develotion.com/"

//DOM
const ROUTER = document.querySelector("#ruteo")
const NAV = document.querySelector("#nav")

const PANTALLA_HOME = document.querySelector("#pageHome")
const PANTALLA_LOGIN = document.querySelector("#pageLogin")
const PANTALLA_REGISTRO_USUARIO = document.querySelector("#pageRegistroUsuario")
const PANTALLA_PRINCIPAL = document.querySelector("#tabMain")

// Inicializaci n del sistema
inicializar()

function inicializar() {
  subscripcionAEventos()
  verificarUsuarioLocalStorage()
}

function subscripcionAEventos() {
  // Routeo
  ROUTER.addEventListener("ionRouteDidChange", navegar)
  //Botones
  document.querySelector("#btnLoginIngresar").addEventListener("click", btnLoginIngresarHandler)
  document.querySelector("#btnRegistroUsuarioRegistrarme").addEventListener("click", btnRegistroUsuarioRegistrarmeHandler)
}

function verificarUsuarioLocalStorage() {
  const usuarioRecuperado = localStorage.getItem("UsuarioActivoLocalStorage")
  if (usuarioRecuperado)
    sistema.usuarioActivo = JSON.parse(usuarioRecuperado)
}

//Navegacion
function navegar(e) {
  const ruta = e.detail.to
  switch (ruta) {
    case "/":
      verificarInicio()
      break
    case "/login":
      mostrarLogin()
      break
    case "/registroUsuario":
      cargarPaises()
      mostrarRegistroUsuario()
      break
    case "/resumen":
      mostrarPrincipal()
      break
    default:
      verificarInicio()
      break;
  }
}

function verificarInicio() {
  if (sistema.usuarioActivo) {
    NAV.setRoot("page-resumen")
    NAV.popToRoot()
  } else {
    NAV.setRoot("page-login")
    NAV.popToRoot()
  }
}

//Carga de datos
function cargarPaises() {
  if (sistema.paises) return

  fetch(`${API_URL}/paises.php`)
    .then((response) => {
      if (response.status != 200)
        //TODO en caso de que se use la carga de paises en otro lado, modificar como se muestra el error, tal vez hacerlo en un alert global
        document.querySelector("#pRegistroUsuarioPais").innerHTML = "Error en el servidor, no se pueden cargar los paises"
      return response.json()
    }).then((data) => {
      sistema.paises = data.paises.map(p => Pais.parse(p))
      cargarPaisesEnSelect()
    }).catch((error) => {
      console.log(error)
    })
}

function cargarPaisesEnSelect() {
  let lista = ""

  sistema.paises.forEach(p => lista += `<ion-select-option value=${p.id} >${p.name}</ion-select-option>`)
  document.querySelector("#slcRegistroUsuarioPais").innerHTML = lista
}

//Manejo UI
function ocultarPantallas() {
  PANTALLA_HOME.style.display = "none"
  PANTALLA_LOGIN.style.display = "none"
  PANTALLA_REGISTRO_USUARIO.style.display = "none"
  PANTALLA_PRINCIPAL.style.display = "none"
}

function mostrarLogin() {
  ocultarPantallas()
  PANTALLA_LOGIN.style.display = "block"
}

function mostrarRegistroUsuario() {
  ocultarPantallas()
  PANTALLA_REGISTRO_USUARIO.style.display = "block"
}

function mostrarPrincipal() {
  ocultarPantallas()
  PANTALLA_PRINCIPAL.style.display = "block"
}

//Login
function btnLoginIngresarHandler() {
  //TODO Login
}

//Registro de usuario
function btnRegistroUsuarioRegistrarmeHandler() {
  const usuario = document.querySelector("#iRegistroUsuarioUsuario").value
  const password = document.querySelector("#iRegistroUsuarioPassword").value
  const idPais = document.querySelector("#slcRegistroUsuarioPais").value

  const nuevoUsuario = {
    usuario: usuario,
    password: password,
    idPais: idPais
  }

  document.querySelector("#pLoginMensaje").innerHTML = ''
  document.querySelector("#pRegistroUsuarioMensaje").innerHTML = ""

  try {
    if (!usuario || !password || !idPais)
      throw new Error("Se deben completar todos los datos")

    fetch(`${API_URL}/usuarios.php`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nuevoUsuario) })
      .then((response) => {
        if (response.status != 200)
          document.querySelector("#pRegistroUsuarioMensaje").innerHTML = "Hubo un error, vuelva a intentar más tarde"
        return response.json()
      }).then((data) => {
        if (data.mensaje) {
          document.querySelector("#pRegistroUsuarioMensaje").innerHTML = data.mensaje
        } else {
          document.querySelector("#pLoginMensaje").innerHTML = `Gracias por registrarte, ahora inicia sesión para ingresar`
          NAV.popToRoot()
          mostrarLogin()
        }
      }).catch((error) => {
        console.log(error)
      })


  } catch (error) {
    document.querySelector("#pRegistroUsuarioMensaje").innerHTML = error
  }
}