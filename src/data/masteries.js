// src/data/masteries.js
// Cursos y Maestrías de Productividad, Computación, Neurociencia, IA y Aprendizaje para Jóvenes

export const MASTERIES_DATA = [
  {
    id: 'mastery_digital_productivity',
    title: 'Maestría en Computación & Productividad Digital',
    subtitle: 'Domina tu computadora, atajos de teclado, organización de archivos y herramientas de élite',
    icon: 'Laptop',
    category: 'Computación & Tecnología',
    totalHours: '9 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_computer',
    badgeReward: {
      id: 'badge_mastery_computer',
      title: 'Maestro de la Computación',
      subtitle: 'Productividad digital de élite',
      desc: 'Completaste los 3 niveles de la maestría en Computación y Productividad Digital.',
      tier: 'oro',
      icon: 'Laptop',
      xpReward: 600,
      diamondReward: 150
    },
    xpPerClass: 60,
    diamondsPerClass: 20,
    description: 'Aprende a usar tu computadora a la velocidad del pensamiento. Elimina la fricción digital dominando el teclado, la estructura de carpetas PARA, Markdown, Notion y atajos globales de sistema.',
    color: 'from-blue-600 to-indigo-800',
    accentColor: '#3B82F6',
    classes: [
      // NIVEL 1: FUNDAMENTOS
      {
        id: 'c1_touch_typing',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 1: Mecanografía Táctil & Atajos Universales',
        duration: '15 min',
        summary: 'Aprende a escribir a más de 70 PPM con los 10 dedos y domina los atajos esenciales del sistema para no tocar el ratón.',
        video: {
          title: 'Guía Rápida: Los 10 Dedos en el Teclado y Atajos de Sistema',
          duration: '4:20 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/Rk_sAHh9s08',
          keyMoments: [
            { time: '0:30', title: 'Fila Guía (ASDF - JKLÑ)', desc: 'Posición de descanso de los índices en las teclas F y J con relieve.' },
            { time: '1:45', title: 'Historial de Portapapeles (Win + V)', desc: 'Cómo ver todo lo que has copiado en las últimas horas.' },
            { time: '3:10', title: 'Navegación veloz con Ctrl + Flechas', desc: 'Salta palabras enteras y selecciona texto en milisegundos.' }
          ]
        },
        content: `
### ¿Por qué la mecanografía es tu superpoder inicial?
La mayoría de estudiantes escriben con dos dedos mirando el teclado a 25-30 palabras por minuto (PPM). Un estudiante que domina la mecanografía táctil escribe a **70-90 PPM sin mirar las teclas**.
Esto significa que terminarás tus ensayos, resúmenes, tareas y código en **un tercio del tiempo**, liberando horas cada semana.

### 1. La Regla de la Fila Guía
- Coloca tus dedos índices en las teclas **F** y **J** (las únicas que tienen una pequeña pestaña o relieve táctil).
- Mano izquierda: **A, S, D, F**
- Mano derecha: **J, K, L, Ñ**
- Los pulgares descansan exclusivamente en la **Barra Espaciadora**.

### 2. Atajos Universales que Salvan Horas:
1. **Historial de Portapapeles (\`Win + V\` en Windows / Mac con Maccy):** Nunca vuelvas a perder un texto o enlace copiado hace 10 minutos.
2. **Navegación de texto rápida:**
   - \`Ctrl / Cmd + Flecha Izq/Der\`: Salta palabras completas.
   - \`Ctrl / Cmd + Shift + Flechas\`: Selecciona palabras de golpe sin usar el ratón.
   - \`Ctrl / Cmd + Backspace\`: Borra la palabra entera previa.
3. **Control del Navegador:**
   - \`Ctrl / Cmd + T\`: Nueva pestaña.
   - \`Ctrl / Cmd + W\`: Cerrar pestaña actual.
   - \`Ctrl / Cmd + Shift + T\`: **Recuperar inmediatamente la última pestaña cerrada por error.**
   - \`Ctrl / Cmd + L\`: Ir directo a la barra de búsqueda.
        `,
        practicalTask: 'Activa el historial de portapapeles (Win + V) y practica 5 minutos en Monkeytype o Keybr manteniendo los 10 dedos.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué atajo de teclado te permite recuperar instantáneamente una pestaña del navegador cerrada por accidente?',
            options: ['Ctrl + Alt + Supr', 'Ctrl / Cmd + Shift + T', 'Ctrl + W', 'F5'],
            answer: 1,
            explanation: 'Ctrl + Shift + T (o Cmd + Shift + T en Mac) restaura la última pestaña que cerraste en cualquier navegador moderno.'
          },
          {
            id: 'q2',
            question: '¿En qué teclas deben descansar tus dedos índices según la técnica de mecanografía táctil?',
            options: ['En la A y la L', 'En la F y la J (tienen relieve)', 'En el Espacio y el Enter', 'En la Q y la P'],
            answer: 1,
            explanation: 'Las teclas F y J tienen marcas táctiles para que tus dedos se ubiquen sin necesidad de mirar la pantalla ni el teclado.'
          }
        ]
      },
      {
        id: 'c2_file_architecture',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 2: Arquitectura de Archivos Método P.A.R.A.',
        duration: '18 min',
        summary: 'Crea una estructura de carpetas profesional y dile adiós al caos del escritorio y la carpeta de descargas.',
        video: {
          title: 'El Método PARA para Organizar tus Archivos de Estudio',
          duration: '5:10 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/S2z92j8X1m8',
          keyMoments: [
            { time: '0:45', title: 'Por qué el escritorio desordenado te agota', desc: 'Sobrecarga visual y cognitiva cada vez que abres tu computadora.' },
            { time: '2:10', title: 'Las 4 Carpetas Maestras', desc: 'Proyectos, Áreas, Recursos y Archivo explicados con ejemplos.' },
            { time: '4:00', title: 'Nomenclatura ISO de Fechas', desc: 'Cómo nombrar archivos para que nunca se desorganicen.' }
          ]
        },
        content: `
### El Costo Oculto del Desorden Digital
Tener 100 archivos sueltos en el escritorio genera micro-estrés visual y te hace perder hasta 15 minutos al día buscando un archivo antes de una clase o examen.

### El Método P.A.R.A. (Tiago Forte):
Solo necesitas **4 carpetas maestras** en tu disco o Google Drive/OneDrive:
1. **1_PROYECTOS:** Tareas con fecha límite activa (ej: \`Ensayo_Historia_Final\`, \`Exposicion_Biologia\`, \`Feria_Ciencias\`).
2. **2_AREAS:** Responsabilidades continuas a largo plazo (ej: \`Matematicas_2026\`, \`Finanzas_Personales\`, \`Salud_Gimnasio\`).
3. **3_RECURSOS:** Temas de interés y referencia que te gusta guardar (ej: \`Plantillas_Canva\`, \`Libros_PDF\`, \`Tutoriales_Programacion\`).
4. **4_ARCHIVO:** Proyectos completados que ya no tocas activamente pero quieres conservar por seguridad.

### Nomenclatura ISO Inteligente:
Nombra tus archivos con el formato universal:
\`YYYY-MM-DD_NombreArchivo_v01.ext\` (ej: \`2026-06-20_ResumenQuimica_v02.pdf\`). De este modo, tu sistema operativo los ordenará cronológicamente de forma perfecta.
        `,
        practicalTask: 'Crea las 4 carpetas maestras (1_Proyectos, 2_Areas, 3_Recursos, 4_Archivo) y mueve los archivos sueltos de tu escritorio a su lugar correspondiente.',
        exam: [
          {
            id: 'q1',
            question: 'En el método PARA, ¿dónde colocarías una tarea escolar que debes entregar este viernes?',
            options: ['En Recursos', 'En Archivo', 'En Proyectos', 'En el Escritorio suelto'],
            answer: 2,
            explanation: 'La carpeta Proyectos almacena tareas activas con una fecha de entrega o meta concreta.'
          },
          {
            id: 'q2',
            question: '¿Cuál es el formato recomendado para que los archivos se ordenen automáticamente por fecha?',
            options: ['Tarea_Nueva_Hoy.pdf', 'YYYY-MM-DD_Nombre_v01.pdf', 'Archivo(1)(copia).docx', 'DD-MM-YYYY_Final_FINAL.pdf'],
            answer: 1,
            explanation: 'El estándar ISO (Año-Mes-Día) ordena alfabéticamente los archivos en orden cronológico exacto.'
          }
        ]
      },
      {
        id: 'c3_markdown_basics',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 3: Toma de Notas Ágiles con Markdown',
        duration: '20 min',
        summary: 'Aprende la sintaxis de Markdown para tomar notas limpias, títulos, checklists y bloques de código sin tocar el ratón.',
        video: {
          title: 'Aprende Markdown en 5 Minutos para Tomar Apuntes Top',
          duration: '4:50 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/bqwJ0z5qZ-Q',
          keyMoments: [
            { time: '0:30', title: 'Títulos con Almohadillas (#)', desc: 'Estructura jerárquica clara sin menús complicados.' },
            { time: '2:15', title: 'Listas de tareas interactivas', desc: 'Uso de - [ ] y - [x] para checklists rápidas.' },
            { time: '3:45', title: 'Exportación universal', desc: 'Tus notas funcionan en Notion, Obsidian, GitHub y WhatsApp.' }
          ]
        },
        content: `
### ¿Qué es Markdown?
Markdown es el estándar universal de escritura rápida utilizado por ingenieros, escritores y estudiantes de alto rendimiento. Te permite dar formato directamente mientras escribes.

### Sintaxis Clave:
- \`# Título Principal\` / \`## Subtítulo\` / \`### Sección Menor\`
- \`**Texto en Negrita**\` y \`*Texto en Cursiva*\`
- \`- [ ] Tarea por hacer\` / \`- [x] Tarea completada\`
- \`> Frase destacada o cita clave del profesor\`
- \`\`\` código o fórmula matemática \`\`\`
- \`[Enlace](https://url.com)\`

### Por qué supera a Word para apuntes rápidos:
No hay barras de herramientas distractoras. Te concentras 100% en lo que dice el profesor o en el libro que estás sintetizando.
        `,
        practicalTask: 'Escribe un resumen de tu materia favorita usando 3 niveles de títulos (#, ##, ###), una lista de tareas (- [ ]) y una cita (>).',
        exam: [
          {
            id: 'q1',
            question: '¿Cómo se crea un texto en negrita en la sintaxis de Markdown?',
            options: ['<bold>Texto</bold>', '**Texto**', '# Texto', '[Texto]'],
            answer: 1,
            explanation: 'Envolver el texto con dos asteriscos (**ejemplo**) aplica negrita al instante.'
          }
        ]
      },

      // NIVEL 2: APLICACIÓN PRÁCTICA
      {
        id: 'c4_notion_system',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 4: Diseña tu Centro de Mando en Notion',
        duration: '22 min',
        summary: 'Construye un gestor de materias, exámenes, tareas con fechas y enlaces rápidos en una sola página limpia.',
        video: {
          title: 'Notion para Estudiantes: Dashboard de Materias y Exámenes',
          duration: '6:30 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/VbTwtL4Yq_w',
          keyMoments: [
            { time: '1:10', title: 'Base de datos de Entregas', desc: 'Vistas en tabla, calendario y tablero Kanban.' },
            { time: '3:30', title: 'Plantilla por Materia', desc: 'Crea una página reusable con apuntes y bibliografía.' },
            { time: '5:15', title: 'Filtros mágicos', desc: 'Muestra solo las tareas que vencen en los próximos 7 días.' }
          ]
        },
        content: `
### Notion como Segundo Cerebro
Tu cerebro está hecho para **tener ideas, no para almacenar listas de 40 pendientes**. Notion funciona como una extensión externa de tu memoria de trabajo.

### Estructura de tu Dashboard Estudiantil:
1. **Base de Datos Maestra de Tareas:**
   - Columnas: *Nombre de Tarea*, *Materia*, *Fecha Límite*, *Estado (Pendiente / En Progreso / Listo)*, *Prioridad*.
2. **Vista Calendario:** Te permite ver de un vistazo qué semanas del mes están saturadas de exámenes para prepararte con anticipación.
3. **Espacio de Notas Rápidas:** Una sección de captura rápida para anotar ideas o deberes en 3 segundos antes de que se te olviden.
        `,
        practicalTask: 'Crea una tabla en Notion con tus materias actuales y añade los próximos 3 exámenes o entregas importantes.',
        exam: [
          {
            id: 'q1',
            question: '¿Cuál es la ventaja de usar una Base de Datos en Notion en lugar de texto plano?',
            options: ['Ocupa más espacio', 'Permite filtrar, ordenar por fecha y cambiar a vista calendario', 'Solo funciona sin conexión', 'No permite escribir'],
            answer: 1,
            explanation: 'Las bases de datos permiten transformar una lista de tareas en calendario, tablero Kanban o tabla ordenada por fecha límite.'
          }
        ]
      },
      {
        id: 'c5_browser_efficiency',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 5: Navegación de Alta Velocidad & Extensiones Clave',
        duration: '17 min',
        summary: 'Aprende a buscar como un profesional con operadores booleanos de Google y extensiones que bloquean distracciones.',
        video: {
          title: 'Domina las Búsquedas Avanzadas en Google y Atajos Web',
          duration: '5:00 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/LTJygAmpYcU',
          keyMoments: [
            { time: '0:50', title: 'Operador filetype:pdf', desc: 'Encuentra libros y papers académicos al instante.' },
            { time: '2:20', title: 'Operador site:edu o site:wikipedia.org', desc: 'Filtra resultados solo de fuentes académicas confiables.' },
            { time: '4:10', title: 'Búsqueda exacta con comillas (" ")', desc: 'Fuerza la frase exacta sin palabras sinónimas.' }
          ]
        },
        content: `
### Trucos de Búsqueda Avanzada en Google:
1. **\`filetype:pdf "fotosintesis resumen"\`**: Descarga directamente documentos, diapositivas y guías en PDF.
2. **\`site:edu "calculo diferencial"\`**: Busca únicamente en servidores de universidades reconocidas.
3. **\`"frase exacta"\`**: Obliga a Google a encontrar la frase idéntica entre comillas.
4. **\`termino -palabraExcluida\`**: Excluye resultados irrelevantes (ej: \`jaguar -auto\`).
        `,
        practicalTask: 'Realiza una búsqueda en Google usando filetype:pdf y comillas para encontrar un resumen oficial de tu materia más difícil.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué comando de Google te permite encontrar únicamente documentos en formato PDF?',
            options: ['search:pdf', 'filetype:pdf', 'only:pdf', 'download:pdf'],
            answer: 1,
            explanation: 'filetype:pdf restringe los resultados de Google a archivos descargables en formato PDF.'
          }
        ]
      },

      // NIVEL 3: MAESTRÍA & HACKS AVANZADOS
      {
        id: 'c6_automation_and_ai',
        level: 3,
        levelName: 'Nivel 3: Maestría & Hacks Avanzados',
        title: 'Clase 6: Automatización de Tareas & Atajos de Élite',
        duration: '25 min',
        summary: 'Configura lanzadores rápidos (Raycast / PowerToys), macros de texto y automatizaciones para ahorrar horas cada mes.',
        video: {
          title: 'Automatiza tu PC: Raycast, PowerToys y Expansores de Texto',
          duration: '6:15 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/6o8m6zCgQy8',
          keyMoments: [
            { time: '1:00', title: 'Lanzadores con Alt + Espacio', desc: 'Abre apps, calcula números y traduce sin abrir el navegador.' },
            { time: '3:15', title: 'Text Expansion (Expansor de Texto)', desc: 'Escribe tu email o firmas largas con 3 letras clave.' },
            { time: '5:00', title: 'OCR Instantáneo', desc: 'Copia texto de imágenes y vídeos con Win+Shift+T.' }
          ]
        },
        content: `
### El Siguiente Nivel: Eliminar Fricción Repetitiva
Un estudiante élite nunca escribe su correo 10 veces al día caracter por caracter, ni busca la calculadora en el menú inicio.

### Herramientas Imprescindibles:
1. **PowerToys (Windows) / Raycast o Alfred (Mac):**
   - \`Alt + Espacio\`: Lanza cualquier aplicación, convierte monedas y realiza operaciones matemáticas al vuelo.
   - **Extractor de Texto OCR (\`Win + Shift + T\`):** Selecciona cualquier parte de la pantalla (un video de clase, una foto borrosa) y extrae el texto editable en tu portapapeles.
2. **Expansión de Texto:**
   - Escribe \`;correo\` y se transforma automáticamente en \`tu_nombre_completo@email.com\`.
        `,
        practicalTask: 'Instala PowerToys o Raycast y prueba la función de OCR en pantalla para copiar texto de una imagen.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué función te permite copiar texto directamente de una imagen o vídeo congelado en pantalla?',
            options: ['OCR (Reconocimiento Óptico de Caracteres)', 'Desfragmentación de disco', 'Bluetooth', 'Modo avión'],
            answer: 0,
            explanation: 'La tecnología OCR escanea los píxeles de una imagen y los convierte en texto seleccionable y editable.'
          }
        ]
      }
    ]
  },

  {
    id: 'mastery_neuroscience_focus',
    title: 'Maestría en Neurociencia del Enfoque & Dopamina',
    subtitle: 'Desintoxica tu mente de TikTok, comprende tu química cerebral y entra en Estado de Flujo',
    icon: 'Brain',
    category: 'Neurociencia & Psicología',
    totalHours: '8 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_focus',
    badgeReward: {
      id: 'badge_mastery_focus',
      title: 'Mente Indomable',
      subtitle: 'Control absoluto de la dopamina',
      desc: 'Completaste la maestría en Neurociencia del Enfoque y Dopamina.',
      tier: 'mitico',
      icon: 'Brain',
      xpReward: 700,
      diamondReward: 180
    },
    xpPerClass: 65,
    diamondsPerClass: 22,
    description: 'Comprende los circuitos de recompensa de tu cerebro. Aprende cómo el algoritmo de videos cortos secuestra tu atención y aplica protocolos basados en ciencia (Dr. Andrew Huberman, Cal Newport) para alcanzar foco profundo.',
    color: 'from-purple-600 to-indigo-900',
    accentColor: '#8B5CF6',
    classes: [
      // NIVEL 1
      {
        id: 'c1_dopamine_loops',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 1: La Trampa de la Dopamina Barata',
        duration: '16 min',
        summary: 'Descubre qué es realmente la dopamina (la molécula de la anticipación) y por qué las redes te dejan sin energía para estudiar.',
        video: {
          title: 'Neurociencia: Cómo las Redes Sociales Hackean tu Dopamina',
          duration: '5:40 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/p3JLaF_4Tz8',
          keyMoments: [
            { time: '0:40', title: 'Dopamina = Deseo, no Placer', desc: 'La molécula que te impulsa a buscar la siguiente recompensa.' },
            { time: '2:15', title: 'Línea Base de Dopamina', desc: 'Por qué después de 1 hora de Reels todo lo demás se siente aburrido.' },
            { time: '4:20', title: 'Reinicio de Receptores', desc: 'Cómo 48 horas de desintoxicación devuelven el disfrute por el estudio.' }
          ]
        },
        content: `
### La Gran Mentira sobre la Dopamina
La mayoría cree que la dopamina es la molécula del placer. La neurociencia moderna ha demostrado que **la dopamina es la molécula de la anticipación y la búsqueda**.
Cuando haces scroll en TikTok o Instagram Reels, tu cerebro no está disfrutando el video actual: está ansioso por saber qué video vendrá después.

### El Efecto de la "Línea Base":
- Cuando recibes picos artificiales continuos de dopamina con videos de 15 segundos, tu cerebro **apaga receptores D2** para protegerse de la sobreestimulación.
- Resultado: Tu línea base cae en picada. Leer un libro de texto o resolver un problema de matemáticas se siente dolorosamente aburrido porque requiere esfuerzo sostenido con recompensa tardía.

### Cómo revertirlo:
Aplica el principio de **fricción**: pon tu celular en otra habitación antes de estudiar. La dopamina sigue la ley del menor esfuerzo.
        `,
        practicalTask: 'Hoy realiza tu primera sesión de estudio de 25 minutos dejando el teléfono en una habitación distinta.',
        exam: [
          {
            id: 'q1',
            question: 'Según la neurociencia, ¿cuál es la función principal de la dopamina?',
            options: ['Dormir profundamente', 'Impulsar la motivación, búsqueda y anticipación', 'Crear dolor muscular', 'Reducir el apetito'],
            answer: 1,
            explanation: 'La dopamina es el neurotransmisor que genera deseo y motivación por conseguir una recompensa futura.'
          }
        ]
      },
      {
        id: 'c2_flow_state',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 2: El Estado de Flujo (Deep Work)',
        duration: '18 min',
        summary: 'Aprende las 4 condiciones para entrar en Estado de Flujo donde el tiempo vuela y tu rendimiento se multiplica por 5.',
        video: {
          title: 'Cómo Entrar en Estado de Flujo (Deep Work) Según la Ciencia',
          duration: '6:10 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/fGI0fX7cO9I',
          keyMoments: [
            { time: '1:00', title: 'El canal de Flujo (Mihaly Csikszentmihalyi)', desc: 'Equilibrio perfecto entre desafío alto y habilidad alta.' },
            { time: '3:00', title: 'Eliminar el "Residuo de Atención"', desc: 'Por qué mirar un mensaje de WhatsApp arruina los siguientes 20 minutos.' },
            { time: '4:50', title: 'Ritual de Inicio de 3 Minutos', desc: 'Música binaural o ruido marrón para activar ondas alfa.' }
          ]
        },
        content: `
### ¿Qué es el Estado de Flujo?
Descrito por el psicólogo Mihaly Csikszentmihalyi, es ese estado mental donde estás tan inmerso en una tarea que el ego desaparece, el tiempo se distorsiona y tu velocidad de aprendizaje se dispara.

### Las 3 Reglas para Activar el Flujo:
1. **Regla del 4% de Dificultad:** La tarea no debe ser tan fácil que aburra, ni tan difícil que cause pánico.
2. **Cero Multitarea:** Cambiar de ventana deja "residuo de atención" (según Cal Newport), reduciendo tu coeficiente intelectual temporal en hasta 10 puntos.
3. **Señal de Inicio Clara:** Un vaso de agua, auriculares puestos, temporizador de 50 minutos y teléfono apagado.
        `,
        practicalTask: 'Elige una tarea académica difícil y trabájala en un bloque ininterrumpido de 45 minutos sin música con letra.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué es el "residuo de atención" descubierto por la investigadora Sophie Leroy?',
            options: ['La basura que dejas en tu escritorio', 'Parte de tu cerebro que sigue procesando la distracción anterior aunque hayas vuelto a estudiar', 'Quedarse dormido en clase', 'Olvidar el tema de ayer'],
            answer: 1,
            explanation: 'Cada vez que cambias de tarea (ej: mirar un mensaje de 5 segundos), tu cerebro tarda hasta 15-20 minutos en recuperar el 100% del foco.'
          }
        ]
      },

      // NIVEL 2
      {
        id: 'c3_circadian_rhythms',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 3: Ritmos Circadianos y Luz Solar para la Energía Mental',
        duration: '19 min',
        summary: 'Protocolos de Andrew Huberman: Luz natural matutina, café estratégico y temperatura para evitar la fatiga mental.',
        video: {
          title: 'Protocolos de Andrew Huberman para Energía y Concentración',
          duration: '5:50 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/a92Pz7P_x94',
          keyMoments: [
            { time: '0:50', title: 'Luz solar en los primeros 30 minutos', desc: 'Resetea el reloj maestro del cerebro y el cortisol saludable.' },
            { time: '2:40', title: 'Retrasar el café 90 minutos', desc: 'Evita el bajón de energía de las 3 de la tarde eliminando la adenosina.' },
            { time: '4:20', title: 'El suspiro fisiológico para calmar la ansiedad', desc: 'Dos inhalaciones por la nariz y una exhalación larga por la boca.' }
          ]
        },
        content: `
### Tu Reloj Biológico y la Claridad Mental
Tu capacidad de memorizar y concentrarte está regulada por el núcleo supraquiasmático en tu cerebro.

### 3 Hábitos con Respaldo Científico:
1. **Luz Solar Matutina:** Salir a la luz exterior durante 10 minutos al despertar fija el pico de cortisol matutino y programa la liberación de melatonina para 16 horas después (mejor sueño).
2. **Retrasar la Cafeína 90 Minutos:** Al despertar, los niveles de adenosina (la molécula del cansancio) aún se están limpiando. Esperar 90 minutos evita el temido colapso de energía de la tarde.
3. **El Suspiro Fisiológico:** Si sientes agobio o ansiedad ante un examen: realiza **dos inhalaciones consecutivas por la nariz** y luego **una exhalación lenta y prolongada por la boca**. Reduce el ritmo cardíaco en 10 segundos.
        `,
        practicalTask: 'Mañana, al levantarte, sal al balcón o ventana 5 minutos antes de mirar cualquier pantalla.',
        exam: [
          {
            id: 'q1',
            question: '¿Por qué la neurociencia recomienda exponerse a la luz solar en los primeros minutos de la mañana?',
            options: ['Para quemar calorías', 'Para calibrar el reloj biológico circadiano y activar la vigilia mental', 'Para enfriar el cuerpo', 'No tiene ningún efecto'],
            answer: 1,
            explanation: 'La luz solar matutina estimula las células ganglionares de la retina, sincronizando la energía y el sueño nocturno.'
          }
        ]
      },

      // NIVEL 3
      {
        id: 'c4_dopamine_reset_protocol',
        level: 3,
        levelName: 'Nivel 3: Maestría & Hacks Avanzados',
        title: 'Clase 4: Protocolo de Reset Dopaminérgico de 72 Horas',
        duration: '24 min',
        summary: 'Cómo ejecutar un detox digital estructurado de fin de semana para recuperar la concentración perdida y la paz mental.',
        video: {
          title: 'Cómo Hacer un Detox de Dopamina Real (Paso a Paso)',
          duration: '6:40 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/9QiE-M1LrZ8',
          keyMoments: [
            { time: '1:10', title: 'Qué eliminar vs qué mantener', desc: 'Cero feeds algorítmicos, pero sí paseos, lectura y música tranquila.' },
            { time: '3:30', title: 'El día 2: El síndrome de abstinencia digital', desc: 'Por qué sientes aburrimiento y cómo ese aburrimiento repara tu creatividad.' },
            { time: '5:10', title: 'Reintroducción consciente', desc: 'Límites de tiempo con contraseñas que otra persona conoce.' }
          ]
        },
        content: `
### El Poder del Aburrimiento Creativo
En la era moderna nunca dejamos que el cerebro esté aburrido: cada fila del supermercado o semáforo se llena sacando el móvil.
Sin embargo, **la red neuronal por defecto (DMN)** —responsable de conectar ideas complejas y generar soluciones creativas— solo se activa cuando no hay estímulos externos rápidos.

### Protocolo de 72 Horas:
1. **Regla de Pantallas en Escala de Grises:** Pon la pantalla de tu móvil en blanco y negro (elimina el anzuelo visual de los colores saturados).
2. **Sin Feeds Infinitos:** Prohibido TikTok, Instagram Explore, YouTube Shorts y X por 72 horas.
3. **Reemplazo Físico:** Ten a mano un cuaderno de papel y un libro interesante.
        `,
        practicalTask: 'Activa el modo escala de grises en los ajustes de accesibilidad de tu teléfono hoy mismo.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué le ocurre a la creatividad cuando eliminamos la sobreestimulación constante y permitimos el aburrimiento?',
            options: ['Se apaga por completo', 'Se activa la Red Neuronal por Defecto facilitando ideas profundas', 'Aumenta el cansancio físico', 'Se pierde la memoria'],
            answer: 1,
            explanation: 'El aburrimiento saludable activa la Default Mode Network del cerebro, permitiendo la síntesis profunda de información.'
          }
        ]
      }
    ]
  },

  {
    id: 'mastery_ultra_learning',
    title: 'Maestría en Aprendizaje Ultra-Rápido & Memoria',
    subtitle: 'Active Recall, Repetición Espaciada con Anki, Técnica Feynman y Palacios Mentales',
    icon: 'BookOpen',
    category: 'Metodologías de Estudio',
    totalHours: '8 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_learning',
    badgeReward: {
      id: 'badge_mastery_learning',
      title: 'Polímata Veloz',
      subtitle: 'Memoria y aprendizaje acelerado',
      desc: 'Completaste la maestría en Aprendizaje Ultra-Rápido y Métodos de Estudio.',
      tier: 'oro',
      icon: 'BookOpen',
      xpReward: 550,
      diamondReward: 140
    },
    xpPerClass: 55,
    diamondsPerClass: 18,
    description: 'Deja de releer y subrayar con marcadores de colores (la ilusión de competencia). Aprende los únicos métodos validados por la ciencia cognitiva para sacar 10 estudiando la mitad de tiempo.',
    color: 'from-emerald-600 to-teal-800',
    accentColor: '#10B981',
    classes: [
      {
        id: 'c1_active_recall',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 1: Active Recall vs. La Ilusión de Competencia',
        duration: '17 min',
        summary: 'Por qué releer es perder el tiempo y cómo forzar a tu cerebro a recordar información crea conexiones neuronales indestructibles.',
        video: {
          title: 'El Secreto para Estudiar: Active Recall Explicado',
          duration: '5:15 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/ukLnPbIffxE',
          keyMoments: [
            { time: '0:50', title: 'La trampa del subrayador', desc: 'Reconocer no es lo mismo que recordar activamente.' },
            { time: '2:30', title: 'El Efecto Testeo (Testing Effect)', desc: 'Autoevaluarte consolida la memoria a largo plazo.' },
            { time: '4:10', title: 'El método del papel en blanco', desc: 'Escribe todo lo que recuerdas sin mirar el libro.' }
          ]
        },
        content: `
### La Trampa de Releer y Subrayar
Cuando pasas un resaltador amarillo sobre un libro, tu cerebro siente familiaridad y piensa: *"Ah, esto me suena, ya me lo sé"*. Eso se llama **Ilusión de Competencia**.
En el examen real no tienes el libro delante para reconocerlo; tienes que **extraerlo** de tu memoria.

### La Regla del Active Recall (Recuerdo Activo):
El aprendizaje no ocurre cuando metes información a tu cabeza, sino **cuando te esfuerzas por sacarla**.
- En lugar de leer un tema 5 veces: léelo una vez, cierra el libro y escribe en una hoja en blanco todo lo que logres recordar.
- Luego abre el libro y mira qué puntos clave olvidaste. Esos puntos son los únicos que necesitas reforzar.
        `,
        practicalTask: 'Lee una página de tu tema actual, cierra el libro y escribe 5 conceptos clave de memoria.',
        exam: [
          {
            id: 'q1',
            question: '¿Por qué el Active Recall (recuerdo activo) es superior a releer apuntes?',
            options: ['Porque gasta más papel', 'Porque obliga al cerebro a reconstruir la ruta neuronal de la memoria', 'Porque es más rápido de leer', 'Porque no requiere pensar'],
            answer: 1,
            explanation: 'El esfuerzo por recuperar información sin mirarla fortalece la consolidación sináptica en la memoria a largo plazo.'
          }
        ]
      },
      {
        id: 'c2_spaced_repetition_anki',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 2: Repetición Espaciada & Dominio de Anki',
        duration: '21 min',
        summary: 'Vence la curva del olvido de Ebbinghaus utilizando tarjetas inteligentes con algoritmos espaciados.',
        video: {
          title: 'Guía de Anki para Principiantes: Repetición Espaciada',
          duration: '6:00 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/7K2StK7e3DA',
          keyMoments: [
            { time: '1:00', title: 'La Curva del Olvido de Ebbinghaus', desc: 'A las 48 horas olvidas el 70% si no repasas en el momento justo.' },
            { time: '3:20', title: 'Cómo crear Flashcards atómicas', desc: 'Una sola pregunta puntual por tarjeta, nunca párrafos enteros.' },
            { time: '4:50', title: 'La regla de oro: Sé honesto con el botón', desc: 'Fácil, Bueno, Difícil o Repetir.' }
          ]
        },
        content: `
### La Curva del Olvido
Hermann Ebbinghaus descubrió que olvidamos el 75% de lo aprendido en menos de 48 horas a menos que haya un repaso programado.
Si repasas justo cuando estás a punto de olvidar, la curva se aplana y la memoria se vuelve casi permanente.

### Anki y las Flashcards Inteligentes:
Anki calcula automáticamente cuándo debes repasar cada tarjeta según tu nivel de dificultad.
- **Regla Atómica:** Una tarjeta debe tener una sola pregunta directa (ej: *¿Cuál es la función de la mitocondria?* -> *Producir ATP*).
- 15 minutos diarios de Anki en el autobús o antes de dormir sustituyen 8 horas de estudio agónico la noche antes del examen.
        `,
        practicalTask: 'Crea 5 flashcards de tu materia más memorística y repásalas hoy.',
        exam: [
          {
            id: 'q1',
            question: '¿Cuándo es el momento óptimo para repasar un concepto según la repetición espaciada?',
            options: ['10 veces el mismo día', 'Justo en el momento en que estás a punto de olvidarlo', 'Nunca', 'Solo la mañana del examen'],
            answer: 1,
            explanation: 'El repaso espaciado interviene justo antes de que la información desaparezca de la memoria activa, reforzándola exponencialmente.'
          }
        ]
      },
      {
        id: 'c3_feynman_technique',
        level: 3,
        levelName: 'Nivel 3: Maestría & Hacks Avanzados',
        title: 'Clase 3: La Técnica Feynman (Explica como a un niño de 10 años)',
        duration: '20 min',
        summary: 'El método del Premio Nobel Richard Feynman para detectar lagunas de conocimiento y simplificar cualquier materia compleja.',
        video: {
          title: 'La Técnica Feynman: El Secreto para Entender Cualquier Cosa',
          duration: '5:30 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/tkm0PCPXhKs',
          keyMoments: [
            { time: '1:00', title: 'Paso 1: Elige un concepto y escribe el título', desc: 'Enfoca un solo principio o teorema.' },
            { time: '2:30', title: 'Paso 2: Explícalo con analogías simples', desc: 'Prohibido usar palabras técnicas o jerga rimbombante.' },
            { time: '4:15', title: 'Paso 3: Identifica los baches y simplifica', desc: 'Donde te trabas es donde realmente no lo entiendes.' }
          ]
        },
        content: `
### "Si no puedes explicárselo a un niño de 10 años, no lo entiendes tú mismo"
Richard Feynman revolucionó la física no memorizando ecuaciones complejas, sino traduciéndolas a modelos mentales y analogías visuales sencillas.

### Los 4 Pasos del Método Feynman:
1. **Elige el concepto:** Escribe el nombre del tema arriba de una hoja en blanco.
2. **Explícalo en voz alta o por escrito:** Como si le dieras clase a un compañero que nunca ha visto la materia.
3. **Identifica tus lagunas:** En el momento en que tengas que usar una palabra técnica o te quedes dudando, detente. Vuelve al libro a clarificar ese punto exacto.
4. **Crea una analogía:** Por ejemplo: *"La memoria RAM es como la mesa de tu escritorio (lo que tienes abierto ahora) y el Disco Duro es como el armario de tu habitación (donde guardas todo para después)"*.
        `,
        practicalTask: 'Toma un concepto difícil de tu curso y explícaselo a alguien (o a ti mismo frente al espejo) sin usar términos técnicos.',
        exam: [
          {
            id: 'q1',
            question: '¿Cuál es el objetivo central de la Técnica Feynman?',
            options: ['Aprender a hablar más rápido', 'Identificar lagunas de entendimiento explicando conceptos complejos de forma simple', 'Copiar el libro palabra por palabra', 'Memorizar fechas históricas'],
            answer: 1,
            explanation: 'Al obligarte a simplificar sin tecnicismos, descubres con precisión quirúrgica qué partes del tema no dominas realmente.'
          }
        ]
      }
    ]
  },

  {
    id: 'mastery_ai_student',
    title: 'Maestría en Inteligencia Artificial & Prompts de Élite',
    subtitle: 'Aprende a usar la IA como tu tutor socrático personal, generador de resúmenes y asistente de estudio',
    icon: 'Sparkles',
    category: 'Inteligencia Artificial',
    totalHours: '6 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_ai',
    badgeReward: {
      id: 'badge_mastery_ai',
      title: 'Maestro de la IA',
      subtitle: 'Prompts y razonamiento avanzado',
      desc: 'Completaste la maestría en Inteligencia Artificial y Prompts para Estudiantes.',
      tier: 'diamante',
      icon: 'Sparkles',
      xpReward: 650,
      diamondReward: 160
    },
    xpPerClass: 60,
    diamondsPerClass: 20,
    description: 'No uses la IA solo para que haga tus deberes (lo cual te vuelve dependiente). Conviértela en un tutor socrático que te haga preguntas difíciles, evalúe tus ensayos y te prepare para cualquier examen.',
    color: 'from-cyan-600 to-blue-900',
    accentColor: '#06B6D4',
    classes: [
      {
        id: 'c1_socratic_tutor',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 1: El Prompt del Tutor Socrático',
        duration: '16 min',
        summary: 'Cómo configurar a la IA para que no te dé la respuesta servida, sino que te guíe con preguntas clave para que pienses por ti mismo.',
        video: {
          title: 'Convierte a la IA en tu Profesor Privado con este Prompt',
          duration: '5:10 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/jC4v5AS4RIM',
          keyMoments: [
            { time: '1:00', title: 'La diferencia entre hacer trampa y aprender', desc: 'Por qué pedir la respuesta directa destruye tu pensamiento crítico.' },
            { time: '2:45', title: 'Estructura de un Buen Prompt de Rol', desc: 'Rol + Contexto + Reglas + Meta.' },
            { time: '4:20', title: 'Simulación de examen oral', desc: 'Pídele que te haga una pregunta a la vez y califique tus respuestas.' }
          ]
        },
        content: `
### La Fórmula del Prompt Maestro:
Nunca le digas a la IA simplemente *"explícame la revolución francesa"*. Dale un marco estructurado:

\`\`\`text
Actúa como un profesor universitario experto y tutor socrático.
Mi objetivo es entender a fondo [Tema: La Fotosíntesis].
REGLAS:
1. No me des las respuestas directas.
2. Hazme una pregunta conceptual a la vez para evaluar mi nivel.
3. Espera mi respuesta y dame feedback constructivo señalando aciertos y errores.
4. Sube la dificultad progresivamente.
Empieza con la primera pregunta.
\`\`\`
        `,
        practicalTask: 'Copia el prompt del tutor socrático y haz una sesión de 5 preguntas sobre tu materia de examen.',
        exam: [
          {
            id: 'q1',
            question: '¿Qué ventaja tiene pedirle a la IA que actúe como tutor socrático en lugar de pedirle el resumen final?',
            options: ['Gasta menos batería', 'Te obliga a ejercitar el razonamiento activo y afianzar los conceptos', 'Genera imágenes más bonitas', 'Tarda menos en contestar'],
            answer: 1,
            explanation: 'El método socrático desarrolla tus habilidades analíticas porque tú eres quien formula y defiende las respuestas.'
          }
        ]
      },
      {
        id: 'c2_flashcards_from_text',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 2: Generación Automatizada de Flashcards & Quizzes',
        duration: '18 min',
        summary: 'Pasa de un PDF de 40 páginas a un mazo de preguntas de alta calidad en formato pregunta/respuesta en 30 segundos.',
        video: {
          title: 'Cómo Crear Mazos de Anki con IA en Segundos',
          duration: '5:45 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/3fOnV3uLz3E',
          keyMoments: [
            { time: '0:50', title: 'Subir textos limpios', desc: 'Evita alucinaciones proporcionando tú la fuente de estudio.' },
            { time: '2:30', title: 'El formato CSV / TSV', desc: 'Exportación directa para importar en Anki con 1 clic.' },
            { time: '4:30', title: 'Revisión humana crítica', desc: 'Siempre valida que las respuestas coincidan con tu libro.' }
          ]
        },
        content: `
### Grounding: Proporcionar la Fuente Exacta
Para evitar que la IA invente datos ("alucinaciones"), la regla fundamental es **pegarle el texto de tu clase o libro** y decirle:
*"Basándote ÚNICAMENTE en el texto anterior, genera 10 preguntas de opción múltiple con su respuesta correcta y una breve justificación"*.
        `,
        practicalTask: 'Toma un párrafo de tus apuntes y pídele a la IA que cree 3 preguntas de examen con 4 opciones cada una.',
        exam: [
          {
            id: 'q1',
            question: '¿Cómo se evitan las alucinaciones de la IA al estudiar?',
            options: ['Apagando la computadora', 'Entregándole el texto o apuntes de referencia y exigiéndole responder solo en base a él', 'Escribiendo en mayúsculas', 'Usando preguntas de una sola palabra'],
            answer: 1,
            explanation: 'Proveer el contexto y restringir la respuesta al material oficial garantiza precisión absoluta.'
          }
        ]
      }
    ]
  },

  {
    id: 'mastery_financial_mindset',
    title: 'Maestría en Finanzas Personales & Mentalidad para Jóvenes',
    subtitle: 'Aprende a controlar el gasto impulsivo por dopamina, la regla de las 72 horas y el interés compuesto',
    icon: 'Gem',
    category: 'Finanzas & Mentalidad',
    totalHours: '6 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_finance',
    badgeReward: {
      id: 'badge_mastery_finance',
      title: 'Mente Próspera',
      subtitle: 'Disciplina financiera y visión de futuro',
      desc: 'Completaste la maestría en Finanzas Personales y Control del Impulso.',
      tier: 'oro',
      icon: 'Gem',
      xpReward: 500,
      diamondReward: 130
    },
    xpPerClass: 50,
    diamondsPerClass: 16,
    description: 'El dinero y el enfoque tienen la misma raíz: el autocontrol. Domina la psicología del gasto, evita compras por ansiedad de redes y aprende a invertir en tus habilidades desde joven.',
    color: 'from-amber-600 to-yellow-800',
    accentColor: '#F59E0B',
    classes: [
      {
        id: 'c1_impulse_buying',
        level: 1,
        levelName: 'Nivel 1: Fundamentos',
        title: 'Clase 1: La Regla de las 72 Horas para Compras',
        duration: '15 min',
        summary: 'Cómo evitar gastar tu dinero en cosas que a las 2 semanas estarán arrumbadas en tu habitación.',
        video: {
          title: 'La Psicología del Gasto Impulsivo y la Regla de las 72 Horas',
          duration: '4:40 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/5k5e8V3gVzY',
          keyMoments: [
            { time: '0:45', title: 'La trampa del checkout en 1 clic', desc: 'Comprar por aburrimiento o tristeza momentánea.' },
            { time: '2:15', title: 'La lista de deseos de 72 horas', desc: 'Anota lo que quieres y espera 3 días enteros.' },
            { time: '3:50', title: 'El test del dinero en efectivo', desc: '¿Preferirías el objeto o los billetes físicos en la mano?' }
          ]
        },
        content: `
### Compras por Dopamina Rápida
Cuando ves un gadget, ropa o skin en un juego, tu cerebro experimenta un pico de dopamina que nubla el juicio racional.
En el 80% de los casos, a los 3 días ese deseo desaparece por completo.

### La Regla de las 72 Horas:
Si ves algo que no es una necesidad básica (comida, salud): **anótalo en una lista de espera y no lo compres hasta que hayan pasado 72 horas**.
Si después de 3 días aún lo consideras indispensable, cómpralo con tranquilidad. Si no, acabas de ahorrarte dinero sin sufrir.
        `,
        practicalTask: 'Crea una nota en tu teléfono llamada "Lista de Espera 72h" para tu próxima compra no esencial.',
        exam: [
          {
            id: 'q1',
            question: '¿Cuál es el beneficio de aplicar la regla de las 72 horas antes de comprar un capricho?',
            options: ['Que el producto suba de precio', 'Permitir que el pico de dopamina emocional baje para evaluar con lógica real', 'Perder la tarjeta de crédito', 'Olvidar cómo comprar'],
            answer: 1,
            explanation: 'Esperar 72 horas permite que la emoción inicial se disipe y tomes decisiones con el córtex prefrontal racional.'
          }
        ]
      },
      {
        id: 'c2_compound_interest',
        level: 2,
        levelName: 'Nivel 2: Aplicación Práctica',
        title: 'Clase 2: El Interés Compuesto en Dinero y Hábitos',
        duration: '18 min',
        summary: 'Cómo mejorar un 1% cada día te vuelve 37 veces mejor en un año, tanto en tus ahorros como en tus conocimientos.',
        video: {
          title: 'El Poder del Interés Compuesto y los Hábitos Atómicos',
          duration: '5:20 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/Q8m_3Z5Fk9g',
          keyMoments: [
            { time: '1:00', title: 'La matemática del 1.01^365', desc: 'Pequeñas mejoras acumuladas producen resultados masivos.' },
            { time: '2:50', title: 'Invertir en ti mismo primero', desc: 'Libros, cursos y herramientas tienen el mayor retorno de inversión (ROI).' },
            { time: '4:10', title: 'El fondo de tranquilidad', desc: 'Tener un colchón para emergencias elimina el estrés financiero.' }
          ]
        },
        content: `
### El Efecto Bola de Nieve
Albert Einstein llamaba al interés compuesto la "octava maravilla del mundo".
Si mejoras un 1% cada día:
$$1.01^{365} = 37.78$$
Serás **casi 38 veces mejor** al cabo de un año.
Lo mismo aplica para el ahorro: guardar pequeñas cantidades constantes desde los 15-20 años genera una ventaja insuperable gracias al factor tiempo.
        `,
        practicalTask: 'Calcula cuánto dinero ahorrarías en 1 año si guardas el equivalente a un café o refresco cada semana.',
        exam: [
          {
            id: 'q1',
            question: '¿Por qué empezar a desarrollar hábitos o ahorrar desde joven es tan poderoso?',
            options: ['Porque el tiempo multiplica el interés compuesto de forma exponencial', 'Porque las cosas son gratis', 'Porque no hay tareas', 'No tiene ninguna ventaja'],
            answer: 0,
            explanation: 'El factor tiempo es el exponente en la fórmula de acumulación: a mayor horizonte temporal, mayor es la multiplicación de resultados.'
          }
        ]
      }
    ]
  }
];
