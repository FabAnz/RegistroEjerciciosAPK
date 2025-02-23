class Sistema {
  static s_instancia
  usuarioActivo = null
  paises
  actividades
  registros
  registrosFiltrados

  static getInstancia() {
    if (!this.s_instancia) this.s_instancia = new Sistema()
    return this.s_instancia
  }

  verificarUsuarioLocalStorage() {
    const usuarioRecuperado = localStorage.getItem("OBDesAPKUsuarioActivo")
    if (usuarioRecuperado)
      this.usuarioActivo = JSON.parse(usuarioRecuperado)
  }

  filtrarRegistrosPorPeriodo(periodo) {
    let fechaLimite = new Date()

    switch (periodo) {
      case "todo":
        this.registrosFiltrados = this.registros
        break
      case "hoy":
        fechaLimite.setHours(0, 0, 0, 0) // Elimina horas, minutos, segundos y milisegundos
        this.registrosFiltrados = this.registros.filter(r => {
          let fechaRegistro = new Date(r.fecha + "T00:00")
          fechaRegistro.setHours(0, 0, 0, 0)
          return fechaRegistro.getTime() == fechaLimite.getTime()
        })
        break
      case "semana":
        fechaLimite.setDate(fechaLimite.getDate() - 7)
        this.registrosFiltrados = this.registros.filter(r => (
          new Date(r.fecha + "T00:00") >= fechaLimite
        ))
        break
      case "mes":
        fechaLimite.setMonth(fechaLimite.getMonth() - 1)
        this.registrosFiltrados = this.registros.filter(r => (
          new Date(r.fecha + "T00:00") >= fechaLimite
        ))
        break
    }
  }

  tiempoTotal() {
    const tiempoTotal = this.registros.reduce((total, r) => total + r.tiempo, 0) / 60
    return tiempoTotal
  }

  tiempoDelDia() {
    this.filtrarRegistrosPorPeriodo('hoy')
    const tiempoTotal = this.registrosFiltrados.reduce((total, r) => total + r.tiempo, 0)
    return tiempoTotal
  }
}

const sistema = Sistema.getInstancia()

class Pais {
  id
  name
  currency
  latitude
  longitude
  marker

  static parse(data) {
    const pais = new Pais()
    if (data.id)
      pais.id = data.id
    if (data.name)
      pais.name = data.name
    if (data.currency)
      pais.currency = data.currency
    if (data.latitude)
      pais.latitude = data.latitude
    if (data.longitude)
      pais.longitude = data.longitude
    if (data.marker)
      pais.marker = data.marker
    return pais
  }
}

class Actividad {
  id
  nombre
  imagen

  static parse(data) {
    const actividad = new Actividad()
    if (data.id)
      actividad.id = data.id
    if (data.nombre)
      actividad.nombre = data.nombre
    if (data.imagen)
      actividad.imagen = data.imagen
    return actividad
  }


}

class Registro {
  id
  idActividad
  idUsuario
  tiempo
  fecha

  static parse(data) {
    const registro = new Registro()
    if (data.id) registro.id = data.id
    if (data.idActividad) registro.idActividad = data.idActividad
    if (data.idUsuario) registro.idUsuario = data.idUsuario
    if (data.tiempo) registro.tiempo = data.tiempo
    if (data.fecha) registro.fecha = data.fecha
    return registro
  }
}