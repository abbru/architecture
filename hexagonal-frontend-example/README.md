# Hexagonal Frontend Example

Este es un ejemplo de arquitectura hexagonal aplicada al frontend, basado en el proyecto landing-refactor.

## Estructura

- **domain/**: Entidades y lógica de negocio pura
- **application/**: Servicios y casos de uso
- **infrastructure/**: Adaptadores e implementaciones concretas
- **ui/**: Componentes de interfaz de usuario (Astro)

## Cómo usar

1. Instala dependencias: `npm install`
2. Ejecuta el servidor: `npm run dev`
3. Abre el navegador en la URL correspondiente

El componente UserProfile permite crear usuarios y mostrar su información.

## Dependencias

- Astro
- TypeScript

## Notas

Este ejemplo demuestra la separación de capas en hexagonal architecture para frontend, manteniendo el dominio independiente de la UI y la infraestructura.