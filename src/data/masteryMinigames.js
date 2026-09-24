// src/data/masteryMinigames.js
// Minijuegos interactivos estilo Duolingo para las Maestrías

export const MASTERY_MINIGAMES = {
  // 1. COMPUTACIÓN & PRODUCTIVIDAD DIGITAL
  mastery_digital_productivity: {
    // Minijuego A: Duelo de Pares (Match Pairs)
    pairsGame: [
      { id: 'p1', left: 'Win + V', right: 'Historial de Portapapeles' },
      { id: 'p2', left: 'Ctrl + Shift + T', right: 'Recuperar Pestaña Cerrada' },
      { id: 'p3', left: 'Teclas F y J', right: 'Fila Guía de Mecanografía' },
      { id: 'p4', left: 'Método P.A.R.A.', right: 'Proyectos, Áreas, Recursos, Archivo' },
      { id: 'p5', left: 'Ctrl + L', right: 'Ir a la Barra de Búsqueda' },
      { id: 'p6', left: 'Ctrl + Backspace', right: 'Borrar Palabra Completa' },
      { id: 'p7', left: 'Alt + Tab', right: 'Alternar entre Ventanas' },
      { id: 'p8', left: 'Windows + Shift + S', right: 'Captura de Pantalla Rápida' }
    ],
    // Minijuego B: Ráfaga Contrarreloj (Speed Blitz)
    speedQuiz: [
      {
        q: '¿Qué atajo abre el portapapeles con todo lo copiado en Windows?',
        options: ['Win + C', 'Win + V', 'Ctrl + P', 'Alt + V'],
        correct: 1,
        tip: 'Win + V activa el historial de copiado múltiple.'
      },
      {
        q: '¿Dónde deben descansar los dedos índices al escribir sin mirar?',
        options: ['En la A y la L', 'En el Espacio', 'En la F y la J', 'En el Enter'],
        correct: 2,
        tip: 'Las teclas F y J tienen marcas con relieve táctil.'
      },
      {
        q: 'En el método P.A.R.A., ¿dónde van los archivos de metas con fecha límite?',
        options: ['Recursos', 'Proyectos', 'Áreas', 'Archivo'],
        correct: 1,
        tip: 'Los Proyectos tienen fecha límite fija y resultado específico.'
      },
      {
        q: '¿Qué atajo restaura inmediatamente la pestaña que cerraste por accidente?',
        options: ['Ctrl + Shift + T', 'Ctrl + Alt + Del', 'Ctrl + N', 'F5'],
        correct: 0,
        tip: 'Ctrl/Cmd + Shift + T es el salvavidas universal de pestañas.'
      },
      {
        q: '¿Cuál es la velocidad promedio con mecanografía táctil?',
        options: ['20-25 PPM', '70-90+ PPM', '10-15 PPM', '40 PPM'],
        correct: 1,
        tip: 'Con los 10 dedos superas fácilmente las 70 palabras por minuto.'
      }
    ],
    // Minijuego C: Ordena la Secuencia (Workflow Scramble)
    workflowScramble: [
      {
        title: 'Organizar una Descarga según P.A.R.A.',
        instruction: 'Ordena los pasos del 1 al 4 para procesar un documento descargado:',
        steps: [
          'Abrir la carpeta de Descargas',
          'Identificar si pertenece a un Proyecto activo o un Área continua',
          'Mover el archivo a su carpeta correspondiente en Google Drive/PC',
          'Eliminar el archivo duplicado de la carpeta Descargas'
        ]
      },
      {
        title: 'Postura y Manos para Escribir a 70 PPM',
        instruction: 'Ordena los pasos para iniciar la sesión de mecanografía:',
        steps: [
          'Sentarse con la espalda recta y codos a 90 grados',
          'Localizar el relieve de las teclas F y J con los índices',
          'Apoyar los demás dedos en la fila guía ASDF - JKLÑ',
          'Mirar únicamente a la pantalla sin bajar la vista al teclado'
        ]
      }
    ]
  },

  // 2. NEUROCIENCIA DEL ENFOQUE & DOPAMINA
  mastery_focus_neuroscience: {
    pairsGame: [
      { id: 'nf1', left: 'Dopamina Fásica', right: 'Pico Rápido de Placer (Notificaciones)' },
      { id: 'nf2', left: 'Dopamina Tónica', right: 'Nivel Base y Motivación Constante' },
      { id: 'nf3', left: 'Ritmo Ultradiamo', right: 'Ciclos de 90 min de Atención Óptima' },
      { id: 'nf4', left: 'Residuo de Atención', right: 'Costo Mental de Cambiar de Tarea' },
      { id: 'nf5', left: 'Corteza Prefrontal', right: 'Centro del Control y Autodisciplina' },
      { id: 'nf6', left: 'Micro-Pausa Visual', right: 'Mirar a 6+ metros para relajar ojos' },
      { id: 'nf7', left: 'Luz Solar Matutina', right: 'Sincroniza Cortisol y Ritmo Circadiano' },
      { id: 'nf8', left: 'Teléfono Lejos', right: 'Reduce 40% las distracciones pasivas' }
    ],
    speedQuiz: [
      {
        q: '¿Cuánto tiempo dura el ciclo ultradiano ideal de máxima concentración biológica?',
        options: ['20 minutos', '90 minutos', '4 horas', '15 minutos'],
        correct: 1,
        tip: 'El cerebro humano opera en ciclos ultradianos de aproximadamente 90 minutos.'
      },
      {
        q: '¿Qué fenómeno ocurre cuando revisas redes 5 segundos durante tu estudio?',
        options: ['Residuo de atención', 'Supermemoria', 'Pausa regenerativa', 'Dopamina tónica'],
        correct: 0,
        tip: 'El residuo de atención tarda hasta 20 minutos en disiparse tras una interrupción.'
      },
      {
        q: '¿Por qué las notificaciones generan adicción?',
        options: ['Por recompensa variable', 'Por el sonido suave', 'Por el brillo azul', 'Por la batería'],
        correct: 0,
        tip: 'El cerebro anticipa recompensas impredecibles con picos masivos de dopamina.'
      },
      {
        q: '¿Cuál es la mejor práctica al despertar para regular tu enfoque diario?',
        options: ['Ver TikTok 10 minutos', 'Recibir 10-15 min de luz solar matutina', 'Beber 3 cafés de golpe', 'Dormir 2 horas más'],
        correct: 1,
        tip: 'La luz solar directa en los ojos fija el pico de cortisol saludable para el día.'
      }
    ],
    workflowScramble: [
      {
        title: 'Protocolo de Entrada en Estado de Flujo',
        instruction: 'Ordena los pasos biológicos para entrar en concentración profunda:',
        steps: [
          'Dejar el teléfono en otra habitación o en modo avión',
          'Definir una única meta clara para los próximos 45-90 minutos',
          'Realizar 3 respiraciones profundas con exhalación prolongada',
          'Iniciar el cronómetro e ignorar cualquier pensamiento no relacionado'
        ]
      }
    ]
  },

  // 3. HÁBITOS ATÓMICOS & ESFUERZO
  mastery_atomic_habits: {
    pairsGame: [
      { id: 'ah1', left: 'Regla de los 2 Minutos', right: 'Haz el nuevo hábito ridículamente fácil' },
      { id: 'ah2', left: 'Acumulación de Hábitos', right: 'Después de [Hábito Actual], haré [Hábito Nuevo]' },
      { id: 'ah3', left: 'Diseño del Entorno', right: 'Haz la señal obvia y la distracción invisible' },
      { id: 'ah4', left: 'Pacto de Rendición', right: 'Compromiso social con consecuencias' },
      { id: 'ah5', left: 'Identidad vs Metas', right: 'No quiero leer un libro, quiero SER lector' },
      { id: 'ah6', left: 'Regla de No Romper 2 Veces', right: 'Fallar un día es accidente, dos es nuevo hábito' },
      { id: 'ah7', left: 'Fricción Estratégica', right: 'Aumenta los pasos para acceder a distracciones' },
      { id: 'ah8', left: 'Recompensa Inmediata', right: 'El cerebro repite lo que se siente bien hoy' }
    ],
    speedQuiz: [
      {
        q: 'Según James Clear, ¿cuál es el secreto para iniciar un nuevo hábito?',
        options: ['Tener fuerza de voluntad sobrehumana', 'Hacer que tome menos de 2 minutos empezar', 'Esperar a tener motivación', 'Hacerlo 3 horas el primer día'],
        correct: 1,
        tip: 'Cualquier hábito puede escalarse a una versión de 2 minutos para vencer la inercia.'
      },
      {
        q: '¿Qué es la acumulación de hábitos (Habit Stacking)?',
        options: ['Hacer 5 hábitos a la vez', 'Vincular el hábito nuevo a uno ya establecido', 'Anotar todo en una libreta', 'Comprar cursos online'],
        correct: 1,
        tip: 'Usa una rutina automática existente como detonante del nuevo hábito.'
      },
      {
        q: '¿Qué ocurre si fallas tu hábito un día?',
        options: ['Todo se arruinó y debes empezar de cero', 'Nunca faltes dos días seguidos', 'Deja el hábito', 'Castígate'],
        correct: 1,
        tip: 'Un fallo es un percance; dos fallos seguidos es el comienzo de un mal hábito.'
      }
    ],
    workflowScramble: [
      {
        title: 'El Bucle de Cuatro Pasos del Hábito',
        instruction: 'Ordena los 4 componentes del bucle neurológico de todo hábito:',
        steps: [
          'Señal (Hacerlo Obvio)',
          'Anhelo (Hacerlo Atractivo)',
          'Respuesta (Hacerlo Sencillo)',
          'Recompensa (Hacerlo Satisfactorio)'
        ]
      }
    ]
  }
};

// Frases motivacionales e interactivas del coach tipo Duolingo
export const COACH_TIPS = [
  '⚡ ¡Cada lección dominada te ahorra decenas de horas en el año!',
  '🎯 "No subes al nivel de tus metas, caes al nivel de tus sistemas." — James Clear',
  '💡 Tip: Activa Win + V hoy mismo y nunca volverás a copiar y pegar con miedo.',
  '🧠 Tu cerebro funciona en ciclos de 90 minutos. ¡Aprovéchalos al máximo!',
  '💎 ¡Rompe los cofres de final de unidad para ganar gemas y desbloquear skins!',
  '🔥 Mantén tu racha diaria: 10 minutos al día superan a 5 horas el domingo.',
  '⌨️ Los 10 dedos en el teclado multiplican tu velocidad por 3 sin cansancio visual.'
];
