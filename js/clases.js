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
}

const sistema = Sistema.getInstancia()

class Pais {
  id
  name
  currency
  latitude
  longitude

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