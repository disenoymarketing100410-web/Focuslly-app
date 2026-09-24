// src/data/masteryCatalog.js
// CATÁLOGO DE MAESTRÍAS DE LARGO PLAZO CONECTADAS AL ECOSISTEMA FOCUSLY

import { PIANO_MASTERY } from './pianoMastery';

export const ALL_MASTERIES = [
  PIANO_MASTERY,
  {
    id: 'mastery_coding',
    title: 'Maestría en Programación, Algoritmos & Lógica',
    subtitle: 'De cero a arquitecto de software: lógica algorítmica, estructuras de datos, proyectos reales y clean code',
    icon: 'Terminal',
    category: 'Ingeniería de Software & Computación',
    totalHours: '18 Clases • 6 Niveles',
    badgeRewardId: 'badge_mastery_coding',
    badgeReward: {
      id: 'badge_mastery_coding',
      title: 'Arquitecto de Código',
      subtitle: 'Dominio de fundamentos de ingeniería de software',
      desc: 'Completaste la ruta de algoritmos, estructuras de datos y proyectos de software en Focusly.',
      tier: 'oro',
      icon: 'Terminal',
      xpReward: 900,
      diamondReward: 250
    },
    xpPerClass: 70,
    diamondsPerClass: 15,
    description: 'Aprende a pensar como un ingeniero de software de élite. Resuelve problemas complejos dividiéndolos en algoritmos puros, comprende complejidad temporal O(n), y construye software robusto.',
    color: 'from-cyan-600 via-blue-700 to-slate-900',
    accentColor: '#06B6D4',
    focuslyIntegration: {
      suggestedHabit: {
        title: 'Resolver 1 Reto de Algoritmos',
        category: 'estudio',
        categoryIcon: '💻',
        frequency: 'diario',
        difficulty: 'medio',
        xpReward: 40,
        diamondReward: 8,
        desc: 'Construir disciplina de resolución algorítmica diaria.'
      },
      suggestedFocusSession: {
        title: 'Deep Work: Sesión de Código y Arquitectura',
        minutes: 45,
        tag: '💻 Código',
        category: 'estudio',
        tips: 'Cierra todas las pestañas de mensajería y silencia notificaciones durante 45 minutos.'
      }
    },
    classes: [
      {
        id: 'code_lvl1_c1',
        level: 1,
        levelName: 'Nivel 1: Pensamiento Computacional',
        title: 'Clase 1: Variables, Tipos de Datos y la Memoria RAM',
        duration: '20 min',
        summary: 'Comprende cómo los ordenadores almacenan números, cadenas, booleanos y cómo opera la pila de ejecución en memoria.',
        video: {
          title: 'Cómo piensa un procesador: Variables y Punteros',
          duration: '5:30 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/Rk_sAHh9s08',
          keyMoments: [
            { time: '1:00', title: 'Bits y Bytes', desc: 'Representación binaria fundamental.' },
            { time: '3:20', title: 'Ámbitos de variables (Scope)', desc: 'Memoria local vs memoria global.' }
          ]
        },
        content: `
### ¿Qué es una Variable en Realidad?
Una variable no es solo un nombre en tu pantalla; es una **etiqueta que apunta a una dirección de memoria física en tu memoria RAM**:
- **Tipos Primitivos:** Enteros (int), flotantes (float), caracteres/strings y booleanos (true/false).
- **Inmutabilidad:** En muchos lenguajes modernos (como Rust o JavaScript const), hacer inmutables tus datos previene el 80% de los errores de sincronización y estado.
        `,
        practicalTask: 'Escribe un script que declare tres variables, intercambie sus valores sin perder información y trace mentalmente el estado de la memoria.',
        exam: [
          {
            id: 'cq_1_1',
            question: '¿Qué tipo de dato representa un valor de verdadero o falso?',
            options: ['String', 'Integer', 'Boolean', 'Float'],
            answer: 2,
            explanation: 'El tipo Boolean (booleano) representa valores binarios lógicos: verdadero o falso.'
          }
        ]
      },
      {
        id: 'code_lvl2_c1',
        level: 2,
        levelName: 'Nivel 2: Estructuras de Control',
        title: 'Clase 2: Condicionales, Bucles y la Máquina de Estados',
        duration: '22 min',
        summary: 'Domina bifurcaciones if/else, bucles for/while y el principio de no repetir código (DRY).',
        content: `
### El Flujo de Ejecución
Un programa sin condicionales es solo una lista fija de órdenes secuenciales.
1. **Condicionales (\`if / else\`):** Bifurcan el camino según el estado actual.
2. **Bucles (\`for / while\`):** Automatizan repeticiones sobre colecciones de datos.
3. **Evitar Bucles Infinitos:** Siempre garantiza que la condición de parada del bucle converja hacia el final.
        `,
        practicalTask: 'Crea un algoritmo de búsqueda binaria o un filtro de números primos utilizando bucles eficientes.',
        exam: [
          {
            id: 'cq_2_1',
            question: '¿Cuál es el peligro principal de un bucle "while" cuya condición nunca cambia a falso?',
            options: [
              'Genera un error de sintaxis al compilar',
              'Causa un bucle infinito que bloquea el hilo de ejecución',
              'Borra el disco duro',
              'Cambia los tipos de datos'
            ],
            answer: 1,
            explanation: 'Un bucle while que nunca evalúa a falso monopoliza la CPU en un bucle infinito, congelando la aplicación.'
          }
        ]
      }
    ]
  },
  {
    id: 'mastery_neuroscience',
    title: 'Maestría en Neurociencia del Enfoque & Dopamina',
    subtitle: 'La ciencia biológica del estado de flujo, control de dopamina, ritmos circadianos y fuerza de voluntad',
    icon: 'Brain',
    category: 'Neurociencia & Psicología de Élite',
    totalHours: '12 Clases • 4 Niveles',
    badgeRewardId: 'badge_mastery_neuro',
    badgeReward: {
      id: 'badge_mastery_neuro',
      title: 'Neuro-Estratega de la Atención',
      subtitle: 'Maestría en circuitos biológicos de dopamina y enfoque',
      desc: 'Dominaste los protocolos de reset de dopamina, ritmos ultradianos y estados de flujo.',
      tier: 'oro',
      icon: 'Brain',
      xpReward: 800,
      diamondReward: 200
    },
    xpPerClass: 65,
    diamondsPerClass: 15,
    description: 'Comprende la maquinaria química de tu cerebro: por qué las redes sociales secuestran tus receptores de dopamina, cómo inducir ondas cerebrales alfa y theta, y cómo sostener sesiones de 90 minutos sin fatiga.',
    color: 'from-purple-600 via-violet-800 to-stone-900',
    accentColor: '#A855F7',
    focuslyIntegration: {
      suggestedHabit: {
        title: 'Luz Solar Matutina (10 min)',
        category: 'salud',
        categoryIcon: '☀️',
        frequency: 'diario',
        difficulty: 'facil',
        xpReward: 25,
        diamondReward: 5,
        desc: 'Sincronizar el reloj circadiano y suprimir melatonina en los primeros 30 min del día.'
      },
      suggestedFocusSession: {
        title: 'Bloque Ultradiano de Enfoque (90 min)',
        minutes: 90,
        tag: '🧠 Deep Work',
        category: 'estudio',
        tips: 'Ciclo completo de neuroplasticidad: 10 min de calentamiento, 70 min de flujo y 10 min de descompresión.'
      }
    },
    classes: [
      {
        id: 'neuro_lvl1_c1',
        level: 1,
        levelName: 'Nivel 1: La Molécula del Deseo',
        title: 'Clase 1: La Dinámica de la Dopamina y el Dolor',
        duration: '18 min',
        summary: 'Aprende qué es la línea base de dopamina, por qué los picos rápidos de dopamina provocan caídas por debajo del nivel inicial, y cómo proteger tus receptores.',
        video: {
          title: 'El balancín de placer y dolor: La ciencia de la dopamina',
          duration: '6:40 min',
          embedUrl: 'https://www.youtube-nocookie.com/embed/5MgBikgcWYY',
          keyMoments: [
            { time: '1:10', title: 'Línea base vs Pico dopamínico', desc: 'Por qué los reels provocan apatía posterior.' },
            { time: '4:00', title: 'Protocolo de recompensa intrínseca', desc: 'Celebrar el esfuerzo, no solo el resultado.' }
          ]
        },
        content: `
### El Balancín Placer-Dolor
La dopamina no es la molécula del placer; es la molécula de la **anticipación, el impulso y la búsqueda**.
- **La Caída Post-Pico:** Cuando recibes una descarga artificial de dopamina (scroll infinito, pornografía, videojuegos adictivos), tu cerebro restaura la homeostasis inclinando la balanza hacia el **dolor y la apatía**.
- **El Peligro del Déficit:** Tras un pico de gratificación instantánea, tu línea base de dopamina desciende por debajo de lo normal. En ese estado, cualquier tarea normal (leer, estudiar, practicar un instrumento) se siente dolorosa e imposible de iniciar.
        `,
        practicalTask: 'Realiza un ayuno de notificaciones de 4 horas por la mañana y registra tu nivel de calma y capacidad de lectura sostenida.',
        exam: [
          {
            id: 'nq_1_1',
            question: '¿Qué ocurre con la línea base de dopamina inmediatamente después de un pico artificial rápido de gratificación instantánea?',
            options: [
              'Se mantiene permanentemente alta',
              'Cae temporalmente por debajo del nivel inicial, provocando apatía y baja motivación',
              'Se duplica',
              'No sufre ninguna variación'
            ],
            answer: 1,
            explanation: 'El cerebro compensa todo pico artificial reduciendo los receptores y bajando la línea base por debajo de lo normal.'
          }
        ]
      }
    ]
  },
  {
    id: 'mastery_accelerated_learning',
    title: 'Maestría en Aprendizaje Ultra-Rápido & Retención',
    subtitle: 'Active Recall, Repetición Espaciada, Técnica Feynman y Palacios de la Memoria',
    icon: 'Sparkles',
    category: 'Metacognición & Alto Rendimiento',
    totalHours: '10 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_learning',
    badgeReward: {
      id: 'badge_mastery_learning',
      title: 'Polímata Ágil',
      subtitle: 'Certificación en técnicas de memorización y aprendizaje veloz',
      desc: 'Completaste la ruta de retención de largo plazo y asimilación conceptual.',
      tier: 'oro',
      icon: 'Sparkles',
      xpReward: 750,
      diamondReward: 180
    },
    xpPerClass: 60,
    diamondsPerClass: 15,
    description: 'Estudiar durante 10 horas pasivas releyendo y subrayando es una ilusión de competencia. Aprende los métodos respaldados por la ciencia cognitiva que multiplican tu retención en una fracción del tiempo.',
    color: 'from-emerald-600 via-teal-700 to-slate-950',
    accentColor: '#10B981',
    focuslyIntegration: {
      suggestedHabit: {
        title: 'Repaso con Flashcards (15 min)',
        category: 'estudio',
        categoryIcon: '🃏',
        frequency: 'diario',
        difficulty: 'facil',
        xpReward: 30,
        diamondReward: 6,
        desc: 'Entrenar el recuerdo activo mediante preguntas y respuestas deliberadas.'
      },
      suggestedFocusSession: {
        title: 'Sesión Feynman: Explicar Concepto Difícil',
        minutes: 30,
        tag: '📚 Aprendizaje',
        category: 'estudio',
        tips: 'Toma una hoja en blanco y explica el tema como si se lo enseñaras a un niño de 10 años.'
      }
    },
    classes: [
      {
        id: 'learn_lvl1_c1',
        level: 1,
        levelName: 'Nivel 1: La Ciencia del Recuerdo',
        title: 'Clase 1: Active Recall vs La Ilusión de Competencia',
        duration: '16 min',
        summary: 'Por qué releer tus notas es inútil y cómo forzar a tu cerebro a recuperar información consolida las conexiones sinápticas.',
        content: `
### La Trampa del Reconocimiento
Cuando miras tus notas subrayadas con marcador fosforito, tu cerebro experimenta **facilidad de procesamiento**. Dice: *"Sí, esto lo conozco"*. Pero reconocer algo cuando está delante de tus ojos es muy distinto a ser capaz de **recuperarlo de tu memoria a largo plazo** en un examen o situación real.

### El Método del Recuerdo Activo (Active Recall):
1. Lee un párrafo o sección una sola vez.
2. Cierra el libro o apaga la pantalla por completo.
3. En una hoja en blanco, escribe de memoria todo lo que entendiste, dibujando esquemas y conexiones.
4. Vuelve a abrir el material solo para verificar los huecos que olvidaste.
        `,
        practicalTask: 'Aplica el Active Recall a tu materia más difícil durante 15 minutos cerrando los apuntes antes de redactar tus resúmenes.',
        exam: [
          {
            id: 'lq_1_1',
            question: '¿Por qué el subrayado y la relectura pasiva generan una "ilusión de competencia"?',
            options: [
              'Porque la tinta del marcador borra la memoria',
              'Porque confunden la familiaridad visual con la retención sináptica real',
              'Porque aceleran demasiado el cerebro',
              'Porque son ilegales en exámenes'
            ],
            answer: 1,
            explanation: 'Releer produce una falsa sensación de dominio porque el texto está a la vista, pero no entrena el esfuerzo de recuperación mental.'
          }
        ]
      }
    ]
  },
  {
    id: 'mastery_chess',
    title: 'Maestría en Ajedrez & Pensamiento Estratégico',
    subtitle: 'Principios de apertura, cálculo táctico, finales posicionales y toma de decisiones bajo presión',
    icon: 'Shield',
    category: 'Estrategia & Concentración Táctica',
    totalHours: '12 Clases • 4 Niveles',
    badgeRewardId: 'badge_mastery_chess',
    badgeReward: {
      id: 'badge_mastery_chess',
      title: 'Gran Maestro del Tiempo',
      subtitle: 'Maestría en táctica, cálculo y visión prospectiva',
      desc: 'Completaste la formación en pensamiento anticipatorio y estrategia sobre las 64 casillas.',
      tier: 'oro',
      icon: 'Shield',
      xpReward: 850,
      diamondReward: 200
    },
    xpPerClass: 65,
    diamondsPerClass: 15,
    description: 'El ajedrez es el gimnasio milenario de la corteza prefrontal. Entrena tu capacidad de calcular 3 jugadas adelante, controlar impulsos y anticipar los movimientos de la vida real.',
    color: 'from-stone-700 via-stone-800 to-black',
    accentColor: '#D4AF37',
    focuslyIntegration: {
      suggestedHabit: {
        title: '5 Problemas de Táctica de Ajedrez',
        category: 'mente',
        categoryIcon: '♟️',
        frequency: 'diario',
        difficulty: 'facil',
        xpReward: 25,
        diamondReward: 5,
        desc: 'Reconocimiento de patrones de horquilla, clavada y jaque mate.'
      },
      suggestedFocusSession: {
        title: 'Partida Clásica de Ajedrez con Análisis',
        minutes: 30,
        tag: '♟️ Ajedrez',
        category: 'mente',
        tips: 'Juega a ritmo lento (15+10) y analiza cada error después de terminar.'
      }
    },
    classes: [
      {
        id: 'chess_lvl1_c1',
        level: 1,
        levelName: 'Nivel 1: Los 3 Principios de Apertura',
        title: 'Clase 1: Centro, Desarrollo de Piezas Menores y Seguridad del Rey',
        duration: '18 min',
        summary: 'Los tres mandamientos inquebrantables de los maestros en los primeros 10 movimientos.',
        content: `
### Los 3 Pilares de la Apertura:
1. **Control del Centro:** Las casillas centrales (e4, d4, e5, d5) son la colina más alta del campo de batalla. Quien domina el centro puede trasladar sus piezas a cualquier flanco con el doble de velocidad.
2. **Desarrollo de Piezas Menores:** Caballo y alfil deben entrar en juego antes que la dama. ¡No muevas la misma pieza dos veces en la apertura!
3. **Seguridad del Rey (Enroque Temprano):** Lleva tu rey a un refugio seguro en las esquinas antes de que se abran las columnas centrales.
        `,
        practicalTask: 'Juega 2 partidas a 10 minutos aplicando estrictamente los 3 principios sin sacar la dama antes de la jugada 7.',
        exam: [
          {
            id: 'chq_1_1',
            question: '¿Por qué no es recomendable sacar la Dama en los primeros 3 movimientos de la partida?',
            options: [
              'Porque las reglas lo prohíben',
              'Porque el rival puede atacarla con piezas menores mientras desarrolla su ejército gratis',
              'Porque la dama no se puede mover en diagonal al inicio',
              'Porque cuesta diamantes'
            ],
            answer: 1,
            explanation: 'Sacar la dama prematuramente permite al oponente atacarla ganando tiempos de desarrollo valiosos.'
          }
        ]
      }
    ]
  },
  {
    id: 'mastery_finance',
    title: 'Maestría en Finanzas Personales & Inversión',
    subtitle: 'Presupuesto base cero, control del impulso de compra, interés compuesto y activos reales',
    icon: 'Trophy',
    category: 'Educación Financiera & Libertad',
    totalHours: '10 Clases • 3 Niveles',
    badgeRewardId: 'badge_mastery_finance',
    badgeReward: {
      id: 'badge_mastery_finance',
      title: 'Estratega del Capital',
      subtitle: 'Maestría en gestión de recursos e inteligencia financiera',
      desc: 'Dominaste los principios de ahorro anti-impulso, presupuesto y riqueza a largo plazo.',
      tier: 'oro',
      icon: 'Trophy',
      xpReward: 700,
      diamondReward: 160
    },
    xpPerClass: 60,
    diamondsPerClass: 15,
    description: 'Aprende la diferencia fundamental entre activos y pasivos, cómo escapar de la trampa del consumismo por estatus, y cómo poner a trabajar el interés compuesto a tu favor.',
    color: 'from-emerald-700 via-green-800 to-stone-900',
    accentColor: '#10B981',
    focuslyIntegration: {
      suggestedHabit: {
        title: 'Registrar Gastos del Día',
        category: 'mente',
        categoryIcon: '💰',
        frequency: 'diario',
        difficulty: 'facil',
        xpReward: 20,
        diamondReward: 5,
        desc: 'Consciencia absoluta del flujo de efectivo sin juzgarte.'
      },
      suggestedFocusSession: {
        title: 'Auditoría Financiera Semanal',
        minutes: 20,
        tag: '💰 Finanzas',
        category: 'mente',
        tips: 'Revisa tus suscripciones activas y gastos hormiga de los últimos 7 días.'
      }
    },
    classes: [
      {
        id: 'fin_lvl1_c1',
        level: 1,
        levelName: 'Nivel 1: Psicología del Gasto',
        title: 'Clase 1: La Regla de las 72 Horas y los Gastos Hormiga',
        duration: '15 min',
        summary: 'Domina el freno al impulso de compra: cómo postergar 72 horas los deseos no esenciales elimina el 80% del gasto superfluo.',
        content: `
### El Secuestro Dopamínico de las Compras
El marketing moderno está diseñado para activar tu sistema límbico con ofertas "urgentes".
- **La Regla de las 72 Horas:** Si ves algo no esencial que quieres comprar, anótalo en una lista y prohíbete comprarlo durante 72 horas exactas.
- Si tras 3 días completos aún lo necesitas de verdad, cómpralo con tranquilidad. En el 80% de los casos, la emoción química habrá pasado y olvidarás que querías comprarlo.
        `,
        practicalTask: 'Crea una lista de "Deseos en Cuarentena de 72 Horas" y coloca cualquier impulso de compra allí durante esta semana.',
        exam: [
          {
            id: 'fq_1_1',
            question: '¿Cuál es el objetivo primordial de la regla de espera de las 72 horas?',
            options: [
              'Esperar a que el banco cierre',
              'Permitir que el pico emocional de dopamina disminuya para evaluar la compra racionalmente',
              'Conseguir descuentos de última hora',
              'Ahorrar impuestos'
            ],
            answer: 1,
            explanation: 'La regla de las 72 horas desactiva la impulsividad biológica del momento y restaura la evaluación lógica del valor.'
          }
        ]
      }
    ]
  }
];
