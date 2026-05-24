# Datalayer Comparator

**ES** | [EN](#english-version)

## ¿Qué es?

Herramienta web para comparar datalayers de Google Tag Manager de forma simple y visual. Desarrollada para equipos de QA que necesitan verificar que los tags implementados coincidan con los tags esperados.

## ¿Por qué existe?

En los flujos de QA tradicionales, comparar datalayers es un proceso manual y propenso a errores. Esta herramienta automatiza esa comparación y muestra las diferencias de forma clara, campo por campo.

## ¿Cómo se usa?

1. Pegá el tag esperado en el panel izquierdo
2. Pegá el tag recibido del datalayer en el panel derecho
3. Hacé click en **Comparar**
4. La herramienta muestra qué campos están OK, cuáles tienen diferencias, cuáles faltan y cuáles sobran

## Stack tecnológico

- HTML
- CSS
- JavaScript vanilla

## Roadmap

- [x] v1.0 — Comparador web MVP
- [ ] v2.0 — Historial de comparaciones
- [ ] v3.0 — Extensión de Chrome
- [ ] v4.0 — Detección automática del datalayer desde la página
- [ ] v5.0 — Exportar reporte a PDF / Excel

## Estructura del proyecto

datalayer-comparator/
├── index.html   → estructura de la interfaz
├── style.css    → estilos visuales
└── app.js       → lógica completa (parser, aplanador, comparador, resultados)

## App en producción

🔗 [https://tmMagno.github.io/datalayer-comparator](https://tmMagno.github.io/datalayer-comparator)

---

## English version

# Datalayer Comparator

## What is it?

A web tool to compare Google Tag Manager datalayers in a simple and visual way. Built for QA teams who need to verify that implemented tags match the expected tags.

## Why does it exist?

In traditional QA workflows, comparing datalayers is a manual and error-prone process. This tool automates that comparison and displays differences clearly, field by field.

## How to use it?

1. Paste the expected tag in the left panel
2. Paste the received datalayer tag in the right panel
3. Click **Compare**
4. The tool shows which fields are OK, which have differences, which are missing and which are extra

## Tech stack

- HTML
- CSS
- Vanilla JavaScript

## Roadmap

- [x] v1.0 — Web comparator MVP
- [ ] v2.0 — Comparison history
- [ ] v3.0 — Chrome extension
- [ ] v4.0 — Automatic datalayer detection from the page
- [ ] v5.0 — Export report to PDF / Excel

## Project structure
datalayer-comparator/
├── index.html   → interface structure
├── style.css    → visual styles
└── app.js       → full logic (parser, flattener, comparator, results)