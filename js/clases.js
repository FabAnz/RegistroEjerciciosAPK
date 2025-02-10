class Sistema {
  static s_instancia
  usuarioActivo
  paises

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
