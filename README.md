# 🧱 Arquitectura Hexagonal - Charla Técnica

## 🗺️ Introducción: un recorrido por las arquitecturas

Antes de hablar sobre arquitectura hexagonal, vale la pena entender cómo llegamos hasta acá. A lo largo del tiempo, las aplicaciones han ido adoptando distintos estilos arquitectónicos, cada uno intentando resolver problemas de complejidad, escalabilidad y mantenibilidad.

---

### 🧊 1. Arquitectura Monolítica Tradicional

El código suele estar todo junto, mezclando lógica de negocio, acceso a datos y controladores en una única estructura. Muy común en aplicaciones legacy o proyectos pequeños.

**Problemas típicos:**

- Difícil de testear.
- Acoplamiento entre capas.
- Costosa evolución con el tiempo.

---

### 🍰 2. Arquitectura en Capas (Layered)

Divide la aplicación en capas bien definidas (por ejemplo: presentación, lógica de negocio, acceso a datos). Cada capa depende solo de la inferior.

**Ventajas:**

- Organización clara del código.
- Separación de responsabilidades.

**Problemas:**

- El dominio sigue dependiendo de la infraestructura.
- Cambios en la base de datos pueden propagarse a la lógica de negocio.

---

### 🎭 3. Arquitectura MVC (Modelo - Vista - Controlador)

MVC es un patrón que divide la aplicación en tres componentes principales:

- **Modelo**: contiene la lógica de negocio y los datos.
- **Vista**: representa la interfaz de usuario.
- **Controlador**: gestiona la entrada del usuario y coordina la interacción entre modelo y vista.

**Ventajas:**

- Separación de responsabilidades clara para aplicaciones con interfaz de usuario.
- Facilita el mantenimiento y la escalabilidad de las interfaces gráficas o frontends web.

**Problemas:**

- En muchas implementaciones, el **Modelo termina acoplado a detalles de infraestructura** (como el ORM o la base de datos).
- No resuelve del todo el problema de la dependencia del dominio con respecto al framework o la capa de presentación.

> ⚠️ En algunos frameworks (como Laravel, Django o Ruby on Rails), el Modelo incluye acceso a base de datos directamente, lo que puede ser problemático para mantener una separación clara del dominio.

---

### 🔌 4. Arquitectura Orientada a Servicios (SOA / Microservicios)

Divide el sistema en múltiples servicios independientes, cada uno responsable de un conjunto específico de funcionalidades. Popularizada más recientemente con microservicios.

**Ventajas:**

- Escalabilidad.
- Independencia entre servicios.

**Problemas:**

- Complejidad de infraestructura.
- Dificultades en la coordinación y comunicación entre servicios.

---

### 🌀 5. Arquitectura Hexagonal (Ports and Adapters)

La arquitectura hexagonal, también conocida como **Ports and Adapters**, busca aislar completamente el **núcleo de la aplicación** del mundo exterior. Para lograrlo, se suele dividir la aplicación en tres capas bien diferenciadas:

---

#### 🧠 1. Dominio

Contiene la lógica **pura de negocio**, independiente de frameworks, UI, bases de datos o protocolos.

- **Entidades**: Representan conceptos centrales del negocio (por ejemplo: `User`, `Pedido`, `Task`).
- **Objetos de valor**: Representan valores que no tienen identidad (por ejemplo: `Email`, `Price`).
- **Lógica de negocio inmutable**: Todo el código en esta capa debe ser testable sin necesidad de mockear nada externo.

🔒 No depende de ninguna otra capa.

---

#### ⚙️ 2. Aplicación

Contiene los **casos de uso**: las acciones que se pueden ejecutar en el sistema desde una perspectiva de negocio.

- **Casos de uso**: Orquestan entidades y objetos de valor para cumplir una tarea (por ejemplo: `CreateTask`, `RegisterUser`).
- **Interfaces (puertos)**: Se definen aquí para representar servicios que el dominio necesita usar (por ejemplo: `RepositoryTask`, `Notification`).

📥 Esta capa **usa** el dominio y **declara** dependencias hacia afuera, sin saber cómo se implementan.

---

#### 🌐 3. Infraestructura

Contiene los detalles técnicos concretos: bases de datos, frameworks, librerías, web servers, etc.

- **Adaptadores**: Implementaciones de los puertos definidos en la capa de aplicación (por ejemplo: `MySQLRepository`, `EmailNotification`).
- **Interfaces externas**: Entradas (HTTP, CLI, eventos) que llaman a los casos de uso.
- **Salidas**: Conexiones a sistemas externos (APIs, persistencia, colas, etc.).

📎 Esta capa **depende de** la aplicación, nunca al revés.

---

#### 📐 Diagrama lógico de dependencias

```
    Interfaces de usuario / Web / CLI / Tests
                    ↓
              [ Aplicación ]
              - Casos de uso
              - Puertos (Interfaces)
                    ↓
              [  Dominio  ]
              - Entidades
              - Objetos de valor
                    ↑
              [ Infraestructura ]
              - Adaptadores
              - Persistencia
              - APIs externas
```

> ⚠️ Importante: la dirección de las dependencias siempre apunta **hacia el dominio**.

---

### 🚀 Conclusión

La arquitectura hexagonal no es una bala de plata, pero puede ayudarte a construir software más limpio, mantenible y adaptable. Entenderla permite tomar mejores decisiones incluso cuando no se implementa por completo.

---

### 📚 Recursos recomendados

- Alistair Cockburn – "Hexagonal Architecture"
- Clean Architecture – Robert C. Martin
- Ejemplos en GitHub: hexagonal apps en Java, PHP, Go, Node.js, etc.

---
