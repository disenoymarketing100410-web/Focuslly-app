import { useEffect } from 'react';

/**
 * Metadata dictionary localized for SEO and social sharing
 */
const SEO_DATA = {
  inicio: {
    es: {
      title: 'Focusly – Digital Detox, Focus Timer & Habit Tracker',
      description: 'Focusly es una plataforma de disciplina personal y desintoxicación digital que incluye retos, coaches de productividad, temporizadores Pomodoro y seguimiento de hábitos.',
      keywords: 'focusly, digital detox, temporizador pomodoro, productividad, habit tracker, concentracion, app blocker, disciplina estoica'
    },
    en: {
      title: 'Focusly – Digital Detox, Focus Timer & Habit Tracker',
      description: 'Focusly is a personal discipline and digital detox app featuring challenges, productivity coaches, focus timers, habit tracking, and leaderboards.',
      keywords: 'focusly, digital detox, pomodoro timer, habit tracker, productivity, focus app, app blocker, self discipline'
    }
  },
  productividad: {
    es: {
      title: 'Productividad y Concentración Profunda | Focusly',
      description: 'Descubre los pilares de la productividad deliberada: Pomodoro, bloqueo de distracciones, gestión de energía y hábitos respaldados por la ciencia.',
      keywords: 'productividad, deep work, cal newport, pomodoro, bloqueo de redes, atencion plena, habitos de estudio'
    },
    en: {
      title: 'Productivity & Deep Focus System | Focusly',
      description: 'Discover deliberate productivity pillars: Pomodoro timer, distraction shields, cognitive energy management, and science-backed habits.',
      keywords: 'productivity, deep work, pomodoro timer, app blocker, attention span, study habits, digital detox'
    }
  },
  mas_info: {
    es: {
      title: 'Preguntas Frecuentes y Arquitectura del Hábito | Focusly',
      description: 'Resuelve tus dudas sobre el bloqueo de apps, el temporizador Pomodoro, los retos de 30 días y el ciclo de refuerzo continuo de Focusly.',
      keywords: 'preguntas frecuentes focusly, faq productividad, como funciona focusly, arquitectura del habito, dopamina, desintoxicacion digital'
    },
    en: {
      title: 'FAQ & Habit Architecture | Focusly',
      description: 'Find answers about app blocking, gamified Pomodoro timers, 30-day mastery tracks, and the continuous Focusly behavioral loop.',
      keywords: 'focusly faq, productivity questions, how focusly works, habit loop, dopamine detox, digital wellbeing'
    }
  },
  focusly_pro: {
    es: {
      title: 'Focusly Pro – Retos, Analíticas y Modo Monje | Focusly',
      description: 'Accede al máximo nivel de autodisciplina con Focusly Pro: analíticas cognitivas avanzadas, tutoría stoica con IA y ligas competitivas.',
      keywords: 'focusly pro, planes focusly, modo monje, analiticas de enfoque, coach ia productividad, ligas focusly'
    },
    en: {
      title: 'Focusly Pro – Challenges, Analytics & Monk Mode | Focusly',
      description: 'Level up your self-discipline with Focusly Pro: advanced cognitive analytics, stoic AI coaching, and competitive productivity leagues.',
      keywords: 'focusly pro, focusly plans, monk mode, focus analytics, ai productivity coach, competitive leagues'
    }
  },
  app: {
    es: {
      title: 'Focusly – Panel de Enfoque y Disciplina',
      description: 'Gestiona tus sesiones de concentración, bloqueos de apps, hábitos diarios y medallas de maestría en tu panel de Focusly.',
      keywords: 'focusly app, panel de enfoque, racha diaria, medallas de maestria, temporizador activo'
    },
    en: {
      title: 'Focusly – Focus & Discipline Dashboard',
      description: 'Manage your deep focus sessions, app limits, daily habit streaks, and mastery achievements in your Focusly dashboard.',
      keywords: 'focusly app, focus dashboard, daily streak, mastery badges, active pomodoro timer'
    }
  }
};

/**
 * React Component to synchronize SEO tags dynamically
 */
export function SeoManager({ currentTab = 'inicio', lang = 'es', isApp = false }) {
  useEffect(() => {
    const pageKey = isApp ? 'app' : (SEO_DATA[currentTab] ? currentTab : 'inicio');
    const langKey = lang === 'en' ? 'en' : 'es';
    const seo = SEO_DATA[pageKey][langKey];

    // 1. Update Document Title
    if (seo?.title) {
      document.title = seo.title;
    }

    // 2. Update HTML lang attribute
    document.documentElement.lang = langKey;

    // Helper to update or create meta tags
    const setMetaTag = (attribute, name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Update Primary Meta Tags
    setMetaTag('name', 'description', seo.description);
    setMetaTag('name', 'keywords', seo.keywords);

    // 4. Update OpenGraph Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:locale', langKey === 'es' ? 'es_ES' : 'en_US');

    // 5. Update Twitter Tags
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);

    // 6. Update Canonical URL if hash changes
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      const baseUrl = 'https://ais-pre-rtaadb6u3dcag6l57ekglp-188665010574.us-east5.run.app/';
      const targetHash = pageKey !== 'inicio' && !isApp ? `#${pageKey}` : '';
      canonicalEl.setAttribute('href', `${baseUrl}${targetHash}`);
    }
  }, [currentTab, lang, isApp]);

  return null;
}
