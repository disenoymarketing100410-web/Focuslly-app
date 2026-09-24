// src/data/pianoMastery.js
// RUTA COMPLETA DE MAESTRÍA EN PIANO Y EXPRESIÓN MUSICAL (8 NIVELES PROGRESIVOS)

export const PIANO_MASTERY = {
  id: 'mastery_piano',
  title: 'Maestría en Piano & Lenguaje Musical',
  subtitle: 'Desde tus primeros acordes y digitación hasta la interpretación clásica, improvisación y dominio sonoro',
  icon: 'Music',
  category: 'Música & Expresión Sonora',
  totalHours: '24 Clases • 8 Niveles de Dominio',
  badgeRewardId: 'badge_mastery_piano',
  badgeReward: {
    id: 'badge_mastery_piano',
    title: 'Virtuoso del Piano',
    subtitle: '8 Niveles de técnica y musicalidad completados',
    desc: 'Dominaste los fundamentos, lectura, coordinación bimanual, armonía e interpretación en el teclado.',
    tier: 'oro',
    icon: 'Music',
    xpReward: 1200,
    diamondReward: 350
  },
  xpPerClass: 75,
  diamondsPerClass: 15,
  description: 'Un sistema integral de aprendizaje al estilo conservatorio moderno: postura ergonómica, lectura fluida a primera vista, independencia de manos, escalas, acordes, armonía funcional y un proyecto final de interpretación.',
  color: 'from-amber-600 via-yellow-700 to-stone-900',
  accentColor: '#F59E0B',
  
  // CONEXIÓN NATIVA CON HERRAMIENTAS DE FOCUSLY
  focuslyIntegration: {
    suggestedHabit: {
      title: 'Práctica de Piano (20 min)',
      category: 'arte',
      categoryIcon: '🎹',
      frequency: 'diario',
      difficulty: 'normal',
      xpReward: 50,
      diamondReward: 10,
      desc: 'Rutina diaria de técnica, escalas y lectura musical deliberada.'
    },
    suggestedFocusSession: {
      title: 'Sesión de Piano: Técnica y Escalas',
      minutes: 25,
      tag: '🎹 Piano',
      category: 'musica',
      tips: 'Comienza con 5 minutos de estiramientos de muñeca y metrónomo a 60 BPM.'
    },
    suggestedChallenge: {
      title: 'Semana del Toque Firme',
      desc: 'Practica 15 minutos diarios durante 7 días consecutivos manteniendo los dedos curvados.'
    },
    suggestedCalendarTask: {
      title: 'Ensayo General: Repertorio de Piano',
      duration: '45 min',
      type: 'practica'
    }
  },

  classes: [
    // ==========================================
    // NIVEL 1: FUNDAMENTOS DEL PIANO
    // ==========================================
    {
      id: 'piano_lvl1_c1',
      level: 1,
      levelName: 'Nivel 1: Fundamentos',
      title: 'Clase 1: Anatomía del Teclado, Postura y Digitación',
      duration: '15 min',
      summary: 'Reconoce las teclas blancas y negras, el Do central (C4), la postura neutra de muñeca y la numeración de los 5 dedos.',
      video: {
        title: 'Postura perfecta frente al teclado y digitación (1 al 5)',
        duration: '5:10 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vPhg6scQKQA',
        keyMoments: [
          { time: '0:45', title: 'Patrón de 2 y 3 teclas negras', desc: 'Cómo localizar el Do a la izquierda de las 2 teclas negras.' },
          { time: '2:15', title: 'Posición de las manos', desc: 'Imagina que sostienes una manzana suave: dedos arqueados y muñecas relajadas.' },
          { time: '3:50', title: 'Numeración de los dedos', desc: '1: Pulgar, 2: Índice, 3: Medio, 4: Anular, 5: Meñique.' }
        ]
      },
      content: `
### 1. El Mapa del Teclado
El teclado es una repetición constante de un patrón de **12 notas**:
- Grupos de **2 teclas negras**: Justo a la izquierda de la primera tecla negra está el **Do (C)**.
- Grupos de **3 teclas negras**: Justo a la izquierda de la primera tecla negra está el **Fa (F)**.
- El **Do Central (Middle C / C4)** se encuentra en el centro de tu teclado o piano, sirviendo como frontera entre la mano izquierda y la derecha.

### 2. La Postura Neutra
- Espalda recta, hombros sueltos y pies planos en el suelo para equilibrar el peso.
- Los antebrazos deben quedar paralelos al suelo formando un ángulo de 90° con los codos.
- **La Manzana Invisible:** Nunca toques con los dedos planos ni las muñecas caídas. Los dedos deben estar suavemente curvados sobre las yemas.

### 3. Digitación Universal (1 al 5)
Ambas manos comparten la misma numeración:
1. **Pulgar** (1)
2. **Índice** (2)
3. **Medio** (3)
4. **Anular** (4 - el dedo con menor independencia muscular)
5. **Meñique** (5)
      `,
      practicalTask: 'Localiza todos los "Do" en tu piano o teclado virtual y toca con la mano derecha la secuencia 1-2-3-4-5-4-3-2-1 con ritmo constante.',
      exam: [
        {
          id: 'pq_1_1',
          question: '¿Dónde se encuentra ubicada la nota Do (C) en el piano?',
          options: [
            'A la derecha del grupo de 3 teclas negras',
            'Inmediatamente a la izquierda del grupo de 2 teclas negras',
            'Entre las dos teclas negras centrales',
            'En el extremo derecho del teclado'
          ],
          answer: 1,
          explanation: 'La nota Do (C) siempre se ubica inmediatamente a la izquierda del grupo de dos teclas negras.'
        },
        {
          id: 'pq_1_2',
          question: 'En la convención universal de digitación de piano, ¿qué dedo corresponde al número 1?',
          options: ['El meñique', 'El índice', 'El pulgar', 'El anular'],
          answer: 2,
          explanation: 'Tanto en la mano izquierda como en la derecha, el número 1 siempre representa al pulgar.'
        }
      ]
    },

    // ==========================================
    // NIVEL 2: RITMO Y TIEMPO
    // ==========================================
    {
      id: 'piano_lvl2_c1',
      level: 2,
      levelName: 'Nivel 2: Ritmo & Tiempo',
      title: 'Clase 2: Pulsos, Figuras Rítmicas y el Metrónomo',
      duration: '18 min',
      summary: 'Domina las figuras de Negra (1 pulso), Blanca (2 pulsos), Redonda (4 pulsos) y Corcheas en compás de 4/4.',
      video: {
        title: 'Cómo interiorizar el tempo con el metrónomo',
        duration: '4:45 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5MgBikgcWYY',
        keyMoments: [
          { time: '0:30', title: 'El latido del compás 4/4', desc: 'Cuatro negras por compás.' },
          { time: '2:00', title: 'Subdivisión de corcheas', desc: 'Contando 1-y-2-y-3-y-4-y.' }
        ]
      },
      content: `
### La Arquitectura del Tiempo
La música se compone de dos dimensiones inseparables: **altura (qué notas tocar)** y **tiempo (cuándo y cuánto tiempo sostenerlas)**.

1. **Compás de 4/4 (Compasillo):** Cada compás contiene exactamente 4 pulsos de negra.
2. **Las Figuras Rítmicas Esenciales:**
   - **Redonda (Whole note):** Dura **4 pulsos**. Se cuenta: 1 - 2 - 3 - 4.
   - **Blanca (Half note):** Dura **2 pulsos**. Dos blancas completan un compás.
   - **Negra (Quarter note):** Dura **1 pulso**. Cuatro negras completan un compás.
   - **Corcheas (Eighth notes):** Cada corchea dura **medio pulso** (0.5). Dos corcheas por cada tiempo del metrónomo: *"1 y, 2 y, 3 y, 4 y"*.
      `,
      practicalTask: 'Configura un metrónomo a 60 BPM. Toca cuatro compases de redondas, cuatro de blancas y ocho de negras sin adelantarte al clic.',
      exam: [
        {
          id: 'pq_2_1',
          question: 'En un compás de 4/4, ¿cuántos pulsos completos dura una Redonda?',
          options: ['2 pulsos', '1 pulso', '4 pulsos', '8 pulsos'],
          answer: 2,
          explanation: 'La redonda equivale a la unidad de compás completo en 4/4 y se sostiene a lo largo de 4 pulsos enteros.'
        }
      ]
    },

    // ==========================================
    // NIVEL 3: LECTURA MUSICAL (PENTAGRAMA)
    // ==========================================
    {
      id: 'piano_lvl3_c1',
      level: 3,
      levelName: 'Nivel 3: Lectura Musical',
      title: 'Clase 3: El Gran Pentagrama (Clave de Sol y Fa)',
      duration: '20 min',
      summary: 'Aprende a leer el gran pentagrama: Clave de Sol para la mano derecha y Clave de Fa para la mano izquierda.',
      video: {
        title: 'Lectura a primera vista sin dolor',
        duration: '6:15 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vPhg6scQKQA',
        keyMoments: [
          { time: '1:10', title: 'Clave de Sol (G Clef)', desc: 'Líneas: Mi-Sol-Si-Re-Fa.' },
          { time: '3:20', title: 'Clave de Fa (Bass Clef)', desc: 'Líneas: Sol-Si-Re-Fa-La.' }
        ]
      },
      content: `
### El Gran Pentagrama
El piano utiliza el **Gran Pentagrama**, formado por dos pentagramas de 5 líneas unidos por una llave:
- **Pentagrama Superior (Clave de Sol):** Representa los registros medios y agudos. Generalmente se toca con la **Mano Derecha**.
- **Línea Adicional Central:** El **Do Central (C4)** flota en una línea imaginaria entre ambos pentagramas.
- **Pentagrama Inferior (Clave de Fa):** Representa los registros graves. Generalmente se toca con la **Mano Izquierda**.

### Regla Mnemotécnica de las Líneas:
- **Clave de Sol (Líneas de abajo a arriba):** Mi - Sol - Si - Re - Fa (E - G - B - D - F).
- **Clave de Sol (Espacios de abajo a arriba):** Fa - La - Do - Mi (F - A - C - E).
      `,
      practicalTask: 'Dibuja un gran pentagrama en una hoja y ubica el Do Central con su línea adicional, luego toca las notas correspondientes.',
      exam: [
        {
          id: 'pq_3_1',
          question: '¿Qué nota representa el primer espacio inferior en la Clave de Sol?',
          options: ['Mi', 'Sol', 'Fa', 'La'],
          answer: 2,
          explanation: 'El primer espacio del pentagrama en clave de Sol corresponde a la nota Fa (F).'
        }
      ]
    },

    // ==========================================
    // NIVEL 4: ACORDES Y ARMONÍA
    // ==========================================
    {
      id: 'piano_lvl4_c1',
      level: 4,
      levelName: 'Nivel 4: Acordes & Armonía',
      title: 'Clase 4: Tríadas Mayores, Menores y la Progresión I-IV-V-I',
      duration: '22 min',
      summary: 'Construye acordes tríadas fundamentales (Do Mayor, Sol Mayor, La menor, Fa Mayor) que dan vida al 90% de las canciones modernas.',
      video: {
        title: 'Fórmula de acordes mayores y menores explicada',
        duration: '5:40 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5MgBikgcWYY',
        keyMoments: [
          { time: '1:00', title: 'Tercera Mayor vs Tercera Menor', desc: '4 semitonos para brillo, 3 para melancolía.' },
          { time: '3:30', title: 'La progresión del pop (I - V - vi - IV)', desc: 'C - G - Am - F en acción.' }
        ]
      },
      content: `
### ¿Qué es un Acorde Tríada?
Un acorde es un conjunto de tres o más notas que suenan simultáneamente. Las tríadas básicas se forman apilando dos terceras sobre una **Fundamental**:
1. **Acorde Mayor (Brillante y alegre):**
   - Fundamental + **Tercera Mayor** (4 semitonos) + **Quinta Justa** (7 semitonos).
   - Ejemplo: **Do Mayor (C)** = Do - Mi - Sol (C - E - G).
2. **Acorde Menor (Melancólico y profundo):**
   - Fundamental + **Tercera Menor** (3 semitonos) + **Quinta Justa** (7 semitonos).
   - Ejemplo: **La menor (Am)** = La - Do - Mi (A - C - E).

### La Progresión de Oro (I - V - vi - IV):
En la tonalidad de Do Mayor:
- **I:** Do Mayor (C - E - G)
- **V:** Sol Mayor (G - B - D)
- **vi:** La menor (A - C - E)
- **IV:** Fa Mayor (F - A - C)
      `,
      practicalTask: 'Toca la progresión C - G - Am - F con la mano izquierda en redondas mientras arpegias la mano derecha.',
      exam: [
        {
          id: 'pq_4_1',
          question: '¿Cuáles son las tres notas que componen la tríada de Do Mayor (C)?',
          options: ['Do - Re - Mi', 'Do - Mi - Sol', 'Do - Fa - Sol', 'Do - Mib - Sol'],
          answer: 1,
          explanation: 'La tríada de Do Mayor se compone de su fundamental (Do), su tercera mayor (Mi) y su quinta justa (Sol).'
        }
      ]
    },

    // ==========================================
    // NIVEL 5: INTERPRETACIÓN Y COORDINACIÓN
    // ==========================================
    {
      id: 'piano_lvl5_c1',
      level: 5,
      levelName: 'Nivel 5: Coordinación Bimanual',
      title: 'Clase 5: Independencia de Manos y Bajo Alberti',
      duration: '25 min',
      summary: 'Supera la barrera más desafiante del pianista principiante: tocar una melodía independiente con la derecha mientras la izquierda mantiene el acompañamiento.',
      video: {
        title: 'Técnicas científicas para independizar tus manos al piano',
        duration: '6:30 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vPhg6scQKQA',
        keyMoments: [
          { time: '1:15', title: 'Práctica con manos separadas primero', desc: 'Nunca juntes las manos sin dominar cada una al 100%.' },
          { time: '3:45', title: 'Bajo Alberti clásico', desc: 'Patrón bajo-agudo-medio-agudo.' }
        ]
      },
      content: `
### El Mito del "Cerebro Dividido"
Tu cerebro no divide su atención en dos manos; lo que hace es **automatizar una mano** para que la corteza prefrontal pueda concentrarse en la otra.

### Las 3 Reglas de Oro de la Independencia Bimanual:
1. **Dominio Separado Absoluto:** Practica la mano izquierda sola con metrónomo hasta que puedas hablar mientras la tocas. Haz lo mismo con la mano derecha.
2. **Tempo de Tortuga:** Junta ambas manos a un tempo **ridículamente lento** (ej. 40 BPM). Si te equivocas, no aceleres: reduce aún más la velocidad.
3. **Puntos de Encuentro Verticales:** Marca con un lápiz en la partitura las notas exactas donde ambas manos caen al mismo tiempo.
      `,
      practicalTask: 'Practica el Himno a la Alegría con la melodía en la derecha y notas simples de bajo en la izquierda a 50 BPM.',
      exam: [
        {
          id: 'pq_5_1',
          question: '¿Cuál es el primer paso obligatorio antes de intentar tocar ambas manos juntas?',
          options: [
            'Tocar a máxima velocidad posible',
            'Dominar cada mano por separado con tempo constante',
            'Pisar el pedal de sustain a fondo',
            'Cerrar los ojos'
          ],
          answer: 1,
          explanation: 'La práctica con manos separadas garantiza que la memoria motora de cada mano esté consolidada antes de combinarlas.'
        }
      ]
    },

    // ==========================================
    // NIVEL 6: INTERMEDIO (ESCALAS Y FLUIDEZ)
    // ==========================================
    {
      id: 'piano_lvl6_c1',
      level: 6,
      levelName: 'Nivel 6: Escalas & Arpegios',
      title: 'Clase 6: El Paso del Pulgar y la Escala Mayor en 2 Octavas',
      duration: '25 min',
      summary: 'Domina la técnica del cruce del pulgar (Thumb Under) para desplazarte fluidamente por todo el teclado sin saltos abruptos.',
      video: {
        title: 'El paso del pulgar sin tensión articular',
        duration: '5:20 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5MgBikgcWYY',
        keyMoments: [
          { time: '1:00', title: 'Fórmula 1-2-3 y 1-2-3-4-5', desc: 'El pulgar pasa por debajo del dedo 3 con fluidez.' },
          { time: '3:10', title: 'Muñeca flexible', desc: 'Evita levantar el codo al cruzar.' }
        ]
      },
      content: `
### El Paso del Pulgar (Thumb Under)
Para tocar una escala de 8 o más notas con solo 5 dedos, los pianistas inventaron el **Paso del Pulgar**:
- **Mano Derecha Ascendente:** Toca 1 (Do), 2 (Re), 3 (Mi). En ese milisegundo, el pulgar se desliza suavemente por debajo de la palma para tocar el **Fa (1)**, seguido de 2 (Sol), 3 (La), 4 (Si) y 5 (Do).
- **El Error Clave:** Levantar el codo hacia afuera. La muñeca debe guiar el movimiento horizontal con mínima tensión.
      `,
      practicalTask: 'Ejecuta la escala de Do Mayor en dos octavas (ida y vuelta) con mano derecha y luego mano izquierda con metrónomo a 80 BPM.',
      exam: [
        {
          id: 'pq_6_1',
          question: 'En la escala de Do Mayor ascendente con la mano derecha, ¿debajo de qué dedo cruza el pulgar para tocar la nota Fa?',
          options: ['Debajo del dedo 2 (Índice)', 'Debajo del dedo 3 (Medio)', 'Debajo del dedo 4 (Anular)', 'Debajo del dedo 5 (Meñique)'],
          answer: 1,
          explanation: 'En la escala mayor con mano derecha, el pulgar (1) cruza por debajo del dedo medio (3) inmediatamente después de tocar Mi.'
        }
      ]
    },

    // ==========================================
    // NIVEL 7: ARMONÍA AVANZADA E IMPROVISACIÓN
    // ==========================================
    {
      id: 'piano_lvl7_c1',
      level: 7,
      levelName: 'Nivel 7: Armonía & Oído',
      title: 'Clase 7: Escala Pentatónica, Voicings e Improvisación',
      duration: '28 min',
      summary: 'Descubre cómo crear melodías espontáneas hermosas usando la escala pentatónica sin tocar jamás una nota disonante.',
      video: {
        title: 'Cómo improvisar tu primera melodía al piano en 5 minutos',
        duration: '7:15 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vPhg6scQKQA',
        keyMoments: [
          { time: '1:30', title: 'La magia de la escala pentatónica', desc: '5 notas que siempre suenan en perfecta armonía.' },
          { time: '4:20', title: 'Ostinato en la mano izquierda', desc: 'Patrón de acordes que sostiene tu improvisación.' }
        ]
      },
      content: `
### La Escala Pentatónica Mayor
Al eliminar las notas 4 y 7 (que generan semitonos y tensión armónica), nos quedamos con **5 notas doradas**:
- En Do: **Do, Re, Mi, Sol, La** (C - D - E - G - A).
- Cualquier combinación rítmica de estas 5 notas sonará cinematográfica, melódica y sin disonancias ásperas.

### Ejercicio de Flujo Creativo:
- Con la **Mano Izquierda**, toca un acorde de Do Mayor o una octava Do-Do suavemente cada 4 pulsos.
- Con la **Mano Derecha**, experimenta libremente saltando entre las notas de la pentatónica, aplicando silencios, preguntas y respuestas melódicas.
      `,
      practicalTask: 'Inicia una sesión de improvisación de 10 minutos usando la pentatónica de Do sobre un ostinato de bajo.',
      exam: [
        {
          id: 'pq_7_1',
          question: '¿Qué notas de la escala mayor natural se omiten para formar la escala pentatónica mayor?',
          options: ['La 1 y la 5', 'La 4 y la 7', 'La 2 y la 6', 'La 3 y la 7'],
          answer: 1,
          explanation: 'La escala pentatónica mayor omite el cuarto y séptimo grado, eliminando el tritono y toda disonancia severa.'
        }
      ]
    },

    // ==========================================
    // NIVEL 8: PIEZA MAESTRA & CERTIFICACIÓN
    // ==========================================
    {
      id: 'piano_lvl8_c1',
      level: 8,
      levelName: 'Nivel 8: Masterpiece',
      title: 'Clase 8: Interpretación Integral, Matices y Dinámica (Piano/Forte)',
      duration: '30 min',
      summary: 'Pule tu pieza de graduación. Domina el pedal de sustain, el crescendo/diminuendo y la musicalidad expresiva para obtener tu certificación.',
      video: {
        title: 'El secreto de los grandes concertistas: dinámica y toque expresivo',
        duration: '8:10 min',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5MgBikgcWYY',
        keyMoments: [
          { time: '1:45', title: 'Uso correcto del pedal de sustain', desc: 'Cambiar el pedal exactamente al presionar el nuevo acorde.' },
          { time: '4:30', title: 'Del pianissimo al fortissimo', desc: 'Control del peso del brazo sin tensar los dedos.' }
        ]
      },
      content: `
### Del Tocar Teclas a Hacer Música
Un ordenador puede pulsar teclas a tiempo perfecto, pero lo que emociona al oído humano es la **dinámica y la respiración**:
1. **Dinámicas Musicales:**
   - *pp (Pianissimo):* Extremadamente suave, como un susurro íntimo.
   - *p (Piano):* Suave y sereno.
   - *mf (Mezzoforte):* Volumen conversacional medio.
   - *f (Forte):* Fuerte, decidido y resonante.
   - *Crescendo (<):* Subir gradualmente de volumen.
   - *Diminuendo (>):* Apagar gradualmente el sonido.

2. **El Arte del Pedal de Sustain (Damper Pedal):**
   - El pedal derecho libera los apagadores y permite que las cuerdas vibren en simpatía.
   - **Técnica del Pedal Sincopado:** Pisa el pedal *justo una fracción de segundo después* de tocar la nota, y límpialo instantáneamente al cambiar de armonía para evitar un sonido lodoso.
      `,
      practicalTask: 'Interpreta tu pieza maestra completa aplicando pedal limpio y dinámicas p y f. Grábate en audio o video para evaluar tu propia musicalidad.',
      exam: [
        {
          id: 'pq_8_1',
          question: '¿Cuándo se debe cambiar (levantar y volver a pisar) el pedal de sustain durante un cambio de acorde?',
          options: [
            'Antes de tocar el nuevo acorde',
            'Exactamente en el instante en que desciende el nuevo acorde para no cortar la resonancia ni enturbiar la armonía',
            'Cada 30 segundos sin importar el acorde',
            'Solamente al final de la canción'
          ],
          answer: 1,
          explanation: 'El pedaleo sincopado cambia el pedal justo cuando los dedos tocan el nuevo acorde, limpiando la resonancia previa de forma imperceptible.'
        }
      ]
    }
  ]
};
