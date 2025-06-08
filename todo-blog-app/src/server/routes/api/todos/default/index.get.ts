import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const todos = [
    {
      title: 'Blog-Eintrag über lebenslanges Lernen schreiben',
      description: 'Einen Blog-Eintrag über die Bedeutung von lebenslangem Lernen verfassen und auf der Webseite veröffentlichen.',
      linkedBlog: 'die-bedeutung-von-lebenslangem-lernen',
      done: false,
    },
    {
      title: 'Neue Lernressourcen recherchieren',
      description: 'Online nach neuen Büchern, Kursen und Artikeln suchen, die beim lebenslangen Lernen helfen können.',
      linkedBlog: 'die-bedeutung-von-lebenslangem-lernen',
      done: false,
    },
    {
      title: 'Netzwerkveranstaltung besuchen',
      description: 'An einer lokalen Netzwerkveranstaltung teilnehmen, um neue Kontakte zu knüpfen und bestehende Beziehungen zu pflegen.',
      linkedBlog: 'die-bedeutung-von-netzwerken',
      done: false,
    },
    {
      title: 'Mentoring-Programm starten',
      description: 'Ein Mentoring-Programm ins Leben rufen, um junge Fachkräfte in der [Berufsfeld]-Branche zu unterstützen.',
      linkedBlog: 'die-bedeutung-von-mentoring',
      done: false,
    },
    {
      title: 'Work-Life-Balance Workshop organisieren',
      description: 'Einen Workshop zur Verbesserung der Work-Life-Balance planen und durchführen.',
      linkedBlog: 'die-kunst-der-work-life-balance',
      done: false,
    },
    {
      title: 'Reise nach [Reiseziel] planen',
      description: 'Eine Reise nach [Reiseziel] organisieren, um neue Kulturen und Perspektiven kennenzulernen.',
      linkedBlog: 'meine-reise-durch-reiseziel',
      done: false,
    },
    {
      title: 'Selbstreflexions-Tagebuch beginnen',
      description: 'Ein Tagebuch starten, um regelmäßig über persönliche und berufliche Erfahrungen nachzudenken.',
      linkedBlog: 'die-bedeutung-von-selbstreflexion',
      done: true,
    },
    {
      title: 'Hobby-Projekt abschließen',
      description: 'Ein laufendes Hobby-Projekt fertigstellen und die Ergebnisse teilen.',
      linkedBlog: 'meine-leidenschaft-fuer-hobby',
      done: false,
    },
    {
      title: 'Neue Fähigkeiten erlernen',
      description: 'Einen Online-Kurs belegen, um neue Fähigkeiten in einem interessanten Bereich zu erlernen.',
      linkedBlog: '',
      done: false,
    },
    {
      title: 'Blog-Eintrag über Netzwerken schreiben',
      description: 'Einen Blog-Eintrag über die Bedeutung von Netzwerken verfassen und auf der Webseite veröffentlichen.',
      linkedBlog: 'die-bedeutung-von-netzwerken',
      done: false,
    },
    {
      title: 'Projekt [Projektname] abschließen',
      description: 'Das laufende Projekt [Projektname] fertigstellen und die Ergebnisse präsentieren.',
      linkedBlog: 'meine-erfahrungen-mit-projekt',
      done: false,
    },
    {
      title: 'Selbstfürsorge-Routine etablieren',
      description: 'Eine tägliche Selbstfürsorge-Routine entwickeln, um das allgemeine Wohlbefinden zu verbessern.',
      linkedBlog: '',
      done: true,
    },
    {
      title: 'Neue Kontakte in der [Berufsfeld]-Branche knüpfen',
      description: 'Durch Netzwerken und Veranstaltungen neue Kontakte in der [Berufsfeld]-Branche aufbauen.',
      linkedBlog: 'die-bedeutung-von-netzwerken',
      done: false,
    },
    {
      title: 'Blog-Eintrag über Selbstreflexion schreiben',
      description: 'Einen Blog-Eintrag über die Bedeutung von Selbstreflexion verfassen und auf der Webseite veröffentlichen.',
      linkedBlog: 'die-bedeutung-von-selbstreflexion',
      done: false,
    },
    {
      title: 'Reiseerlebnisse dokumentieren',
      description: 'Die Erlebnisse und Lektionen von der letzten Reise dokumentieren und teilen.',
      linkedBlog: 'meine-reise-durch-reiseziel',
      done: false,
    },
    {
      title: 'Mentoring-Sitzung planen',
      description: 'Eine Mentoring-Sitzung mit einem Mentor oder Mentee planen und durchführen.',
      linkedBlog: 'die-bedeutung-von-mentoring',
      done: false,
    },
    {
      title: 'Neue Ziele für das nächste Jahr setzen',
      description: 'Persönliche und berufliche Ziele für das nächste Jahr definieren und einen Plan zur Erreichung erstellen.',
      linkedBlog: 'meine-ziele-fuer-die-zukunft',
      done: false,
    },
    {
      title: 'Blog-Eintrag über Work-Life-Balance schreiben',
      description: 'Einen Blog-Eintrag über die Bedeutung von Work-Life-Balance verfassen und auf der Webseite veröffentlichen.',
      linkedBlog: 'die-kunst-der-work-life-balance',
      done: false,
    },
    {
      title: 'Neue Hobbys erkunden',
      description: 'Neue Hobbys ausprobieren, um das Leben zu bereichern und neue Interessen zu entdecken.',
      linkedBlog: '',
      done: false,
    },
    {
      title: 'Feedback von Kollegen einholen',
      description: 'Feedback von Kollegen und Vorgesetzten einholen, um die persönliche und berufliche Entwicklung zu fördern.',
      linkedBlog: '',
      done: true,
    }
  ];


  return todos;
});
