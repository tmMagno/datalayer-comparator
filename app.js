// ─── Módulo 2: Parser ───────────────────────────────────────────
const parsear = (texto) => {
  try {
    const objeto = JSON.parse(texto)
    return { ok: true, dato: objeto }
  } catch (error) {
    return { ok: false, mensaje: "JSON inválido" }
  }
}

// ─── Módulo 3: Aplanador ────────────────────────────────────────
const aplanar = (objeto, prefijo) => {
  const resultado = {}

  Object.keys(objeto).forEach((clave) => {
    const valor = objeto[clave]
    const claveCompleta = prefijo ? prefijo + "." + clave : clave

    if (typeof valor === "object") {
      const subResultado = aplanar(valor, claveCompleta)
      Object.assign(resultado, subResultado)
    } else {
      resultado[claveCompleta] = valor
    }
  })

  return resultado
}

// ─── Módulo 4: Comparador ───────────────────────────────────────
const comparar = (esperadoPlano, recibidoPlano) => {
  const todasLasClaves = [...new Set([
    ...Object.keys(esperadoPlano),
    ...Object.keys(recibidoPlano)
  ])]

  const resultados = []

  todasLasClaves.forEach((clave) => {
    const valorEsperado = esperadoPlano[clave]
    const valorRecibido = recibidoPlano[clave]

    if (valorEsperado === undefined) {
      resultados.push({ clave, estado: "EXTRA", valorRecibido })
    } else if (valorRecibido === undefined) {
      resultados.push({ clave, estado: "AUSENTE", valorEsperado })
    } else if (valorEsperado === valorRecibido) {
      resultados.push({ clave, estado: "OK", valorEsperado })
    } else {
      resultados.push({ clave, estado: "DIFERENCIA", valorEsperado, valorRecibido })
    }
  })

  return resultados
}

// ─── Módulo 5: Resultados en pantalla ───────────────────────────
const mostrarResultados = (resultados) => {
  const div = document.getElementById("resultado")

  const ok       = resultados.filter(r => r.estado === "OK").length
  const diff     = resultados.filter(r => r.estado === "DIFERENCIA").length
  const ausente  = resultados.filter(r => r.estado === "AUSENTE").length
  const extra    = resultados.filter(r => r.estado === "EXTRA").length

  let filas = ""

  resultados.forEach((item) => {
    let detalle = ""
    let color   = ""

    if (item.estado === "OK") {
      color   = "#22c55e"
      detalle = `${item.valorEsperado}`
    } else if (item.estado === "DIFERENCIA") {
      color   = "#ef4444"
      detalle = `esperado: ${item.valorEsperado} — recibido: ${item.valorRecibido}`
    } else if (item.estado === "AUSENTE") {
      color   = "#f97316"
      detalle = `falta en recibido — esperado: ${item.valorEsperado}`
    } else if (item.estado === "EXTRA") {
      color   = "#eab308"
      detalle = `no estaba en esperado — recibido: ${item.valorRecibido}`
    }

    filas += `
      <div style="display:flex; gap:12px; padding:8px 0; border-bottom:1px solid #eee; font-family:monospace; font-size:13px;">
        <span style="min-width:180px; color:#555;">${item.clave}</span>
        <span style="min-width:90px; color:${color}; font-weight:500;">${item.estado}</span>
        <span style="color:#333;">${detalle}</span>
      </div>
    `
  })

  div.innerHTML = `
    <div style="display:flex; gap:16px; margin-bottom:16px; flex-wrap:wrap;">
      <div style="background:#f0fdf4; border-radius:8px; padding:10px 20px;">
        <div style="font-size:11px; color:#555;">OK</div>
        <div style="font-size:22px; font-weight:500; color:#22c55e;">${ok}</div>
      </div>
      <div style="background:#fef2f2; border-radius:8px; padding:10px 20px;">
        <div style="font-size:11px; color:#555;">Diferencias</div>
        <div style="font-size:22px; font-weight:500; color:#ef4444;">${diff}</div>
      </div>
      <div style="background:#fff7ed; border-radius:8px; padding:10px 20px;">
        <div style="font-size:11px; color:#555;">Ausentes</div>
        <div style="font-size:22px; font-weight:500; color:#f97316;">${ausente}</div>
      </div>
      <div style="background:#fefce8; border-radius:8px; padding:10px 20px;">
        <div style="font-size:11px; color:#555;">Extras</div>
        <div style="font-size:22px; font-weight:500; color:#eab308;">${extra}</div>
      </div>
    </div>
    <div style="background:white; border:1px solid #eee; border-radius:8px; padding:12px 16px;">
      ${filas}
    </div>
  `
}

// ─── Evento del botón ───────────────────────────────────────────
const boton = document.getElementById("btn-comparar")

boton.addEventListener("click", () => {
  const textoEsperado = document.getElementById("esperado").value
  const textoRecibido = document.getElementById("recibido").value

  const resultadoEsperado = parsear(textoEsperado)
  const resultadoRecibido = parsear(textoRecibido)

  if (resultadoEsperado.ok === false || resultadoRecibido.ok === false) {
    document.getElementById("resultado").innerHTML = `
      <p style="color:#ef4444; font-weight:500;">JSON inválido — revisá el formato de los tags.</p>
    `
    return
  }

  const esperadoPlano = aplanar(resultadoEsperado.dato, "")
  const recibidoPlano = aplanar(resultadoRecibido.dato, "")

  const resultados = comparar(esperadoPlano, recibidoPlano)

  mostrarResultados(resultados)
})