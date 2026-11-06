import { useEffect, useState } from 'react';
import PricingSection from './PricingSection.jsx';

const services = [
  {
    number: '01', icon: '✳', title: 'Marketing digital',
    copy: 'Stratégie, contenus et campagnes pour mieux faire connaître votre activité et attirer les bons clients.',
    tags: ['Stratégie', 'Réseaux sociaux', 'Visibilité'],
    format: 'Forfait mensuel · budget publicitaire défini séparément',
  },
  {
    number: '02', icon: '⌘', title: 'Développement web & mobile',
    copy: 'Sites vitrines, boutiques en ligne et applications web ou mobile conçus autour de vos besoins.',
    tags: ['Sites web', 'Applications', 'E-commerce'],
    format: 'Projet sur devis · maintenance proposée en option',
  },
  {
    number: '03', icon: '⟳', title: 'Automatisation des processus',
    copy: 'Connectez vos outils et automatisez les tâches répétitives pour fluidifier le travail de vos équipes.',
    tags: ['Flux de travail', 'Intégrations', 'Outils métier'],
    format: 'Diagnostic du processus · devis après cadrage',
  },
  {
    number: '04', icon: '◈', title: 'Gestion & maintenance informatique',
    copy: 'Assistance et maintenance de vos outils informatiques, applications et serveurs, selon vos besoins.',
    tags: ['Maintenance', 'Support', 'Gestion'],
    format: 'Contrat mensuel adapté à votre parc et au support souhaité',
  },
];



function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function ProjectArtwork({ visual, screenshot, screenshotAlt }) {
  if (screenshot) {
    return <div className="artwork artwork-screenshot"><img src={screenshot} alt={screenshotAlt} loading="lazy" /></div>;
  }
  if (visual === 'tacos') {
    return (
      <div className="artwork artwork-tacos" aria-hidden="true">
        <span className="art-stamp">KING<br />OF<br />TACOS</span>
        <div className="taco-shape"><i /><i /><i /><b /></div>
        <span className="art-side-note">BON · FRAIS · GÉNÉREUX</span>
        <span className="art-monogram">K<span>!</span></span>
      </div>
    );
  }
  return (
    <div className="artwork artwork-campus" aria-hidden="true">
      <div className="campus-window"><div className="campus-top"><span>OD / CAMPUS</span><span>PORTAIL ÉTUDIANT　 ↗</span></div><div className="campus-content"><span>APPRENDRE · GÉRER · ÉVOLUER</span><strong>Le campus<br />dans votre poche.</strong><div className="campus-lines"><i /><i /><i /></div></div></div>
      <span className="campus-orbit" />
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-${index + 1}`}>
      <a className="project-art-link" href={project.href} target={project.type === 'client' ? '_blank' : undefined} rel={project.type === 'client' ? 'noreferrer' : undefined} aria-label={`${project.name} — ${project.type === 'client' ? 'visiter le site' : 'voir le projet'}`}>
        <ProjectArtwork visual={project.visual} screenshot={project.screenshot} screenshotAlt={project.screenshotAlt} />
        <span className={`project-status ${project.type}`}>{project.label}</span>
        <span className="project-arrow"><Arrow diagonal /></span>
      </a>
      <div className="project-info"><div><p className="project-category">{project.category}</p><h3>{project.name}</h3><p className="project-description">{project.description}</p>{project.highlights && <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</div><span className="project-index">0{index + 1}</span></div>
    </article>
  );
}

function CaseStudy({ project }) {
  return (
    <section className="case-study" aria-labelledby="case-study-title">
      <div className="case-study-intro">
        <p className="eyebrow">ÉTUDE DE CAS · RESTAURATION</p>
        <h3 id="case-study-title">De la commande client à la gestion du restaurant.</h3>
        <p>{project.caseStudy.summary}</p>
        <a className="case-study-link" href={project.href} target="_blank" rel="noreferrer">Visiter kingoftacos.com <Arrow diagonal /></a>
      </div>
      <div className="case-study-details">
        <article><span>01 · MISSION</span><p>{project.caseStudy.role}</p></article>
        <article><span>02 · PRODUIT</span><ul>{project.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>
        <article><span>03 · MISE EN SERVICE</span><p>{project.caseStudy.delivery}</p></article>
      </div>
      {project.screenshots?.length > 0 && <div className="case-gallery">{project.screenshots.map((screenshot) => <figure key={screenshot.src}><img src={screenshot.src} alt={screenshot.alt} loading="lazy" /><figcaption>{screenshot.caption}</figcaption></figure>)}</div>}
    </section>
  );
}

function App() {
  const [projects, setProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsState, setProjectsState] = useState('loading');

  useEffect(() => {
    let isCurrent = true;
    fetch('/api/projects')
      .then((response) => {
        if (!response.ok) throw new Error('Impossible de charger les projets');
        return response.json();
      })
      .then((data) => {
        if (!isCurrent) return;
        setProjects(data);
        setProjectsState(data.length ? 'success' : 'empty');
      })
      .catch(() => {
        if (isCurrent) setProjectsState('error');
      });
    return () => { isCurrent = false; };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <a href="#accueil" className="brand" aria-label="OKOUME DIGITAL, accueil"><span className="brand-symbol">O<span>.</span></span><span className="brand-name">OKOUME<span>DIGITAL</span></span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navigation principale">
          <a href="#expertises" onClick={closeMenu}>Expertises</a><a href="#offres" onClick={closeMenu}>Offres</a><a href="#realisations" onClick={closeMenu}>Réalisations</a><a href="#agence" onClick={closeMenu}>L’agence</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Parlons de votre projet <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero page-wrap" id="accueil">
          <div className="hero-copy"><p className="eyebrow"><span className="live-dot" /> Agence digitale · Libreville, Gabon</p><h1>Le digital qui<br />fait <em>avancer.</em></h1><p className="hero-intro">Nous aidons les entreprises à transformer leurs idées en expériences digitales utiles, visibles et durables.</p><div className="hero-actions"><a href="https://wa.me/24174452464?text=Bonjour%20OKOUME%20DIGITAL%2C%20je%20souhaite%20parler%20d%E2%80%99un%20projet." className="button button-dark" target="_blank" rel="noreferrer">Parler de mon projet <Arrow diagonal /></a><a className="quiet-link" href="#realisations">Voir nos réalisations <Arrow /></a></div><div className="hero-footnote"><span /> Du conseil à la mise en œuvre, un seul partenaire.</div></div>
          <div className="hero-visual" aria-label="Illustration de connexion et de croissance digitale" role="img"><div className="hero-grid" /><div className="hero-disc disc-back" /><div className="hero-disc disc-front"><span>OD</span></div><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><span className="visual-label label-top">STRATÉGIE　·　TECHNOLOGIE</span><span className="visual-label label-bottom">0°23′ N　9°27′ E</span><span className="visual-star">✳</span><span className="visual-cross">+</span></div>
        </section>

        <section className="proof-strip" aria-label="Nos domaines d’expertise"><div className="proof-inner"><span>UNE AGENCE</span><i>✳</i><span>QUATRE EXPERTISES</span><i>✳</i><span>UN CAP : VOTRE CROISSANCE</span><i>✳</i><span>LIBREVILLE · GABON</span></div></section>

        <section className="expertise page-wrap section-space" id="expertises"><div className="section-intro"><div><p className="eyebrow">01 — NOS EXPERTISES</p><h2>Les bonnes idées<br />méritent de <em>se réaliser.</em></h2></div><p className="section-side-copy">Nous associons créativité, technologie et accompagnement pour répondre aux enjeux concrets de votre activité.</p></div><div className="services-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><span className="service-icon" aria-hidden="true">{service.icon}</span><div className="service-main"><h3>{service.title}</h3><p>{service.copy}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="service-format">{service.format}</p></div><span className="service-mark" aria-hidden="true"><Arrow diagonal /></span></article>)}</div></section>

        <PricingSection />
        <section className="work-section section-space" id="realisations"><div className="page-wrap"><div className="section-intro work-intro"><div><p className="eyebrow">03 — SÉLECTION DE PROJETS</p><h2>Le travail parle<br /><em>de lui-même.</em></h2></div><p className="section-side-copy">Des projets qui répondent à des besoins réels. Et d’autres idées que nous préparons pour la suite.</p></div>
          {projectsState === 'loading' && <p className="projects-message" role="status">Chargement des projets…</p>}
          {projectsState === 'error' && <p className="projects-message" role="status">Les projets ne sont pas disponibles pour le moment. Réessayez un peu plus tard.</p>}
          {projectsState === 'empty' && <p className="projects-message" role="status">Les projets seront bientôt présentés ici.</p>}
          {projectsState === 'success' && <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>}
          {projectsState === 'success' && projects.find((project) => project.caseStudy) && <CaseStudy project={projects.find((project) => project.caseStudy)} />}
          {projectsState === 'success' && <p className="projects-note">La plateforme universitaire est en cours de conception. Son nom et ses détails seront annoncés prochainement.</p>}
        </div></section>

        <section className="agency page-wrap section-space" id="agence"><div className="agency-mark" aria-hidden="true">O<span>.</span></div><div className="agency-copy"><p className="eyebrow">04 — L’AGENCE</p><h2>Le digital, avec<br /><em>une approche humaine.</em></h2><p>OKOUME DIGITAL accompagne les organisations dans leur transformation numérique. De la stratégie marketing aux outils métier, nous partons de vos besoins pour construire des solutions adaptées à votre réalité.</p><p>Basés à Libreville, nous travaillons avec les entreprises, les commerces, les restaurants et les établissements d’enseignement, au Gabon et au-delà.</p><a className="quiet-link" href="#contact">Faire connaissance <Arrow diagonal /></a></div><div className="agency-aside"><span>NOTRE TERRAIN</span><strong>GABON<br />&amp; AU-DELÀ</strong><i>Libreville · Afrique centrale</i></div></section>

        <section className="contact-section" id="contact"><div className="page-wrap contact-content"><p className="eyebrow">05 — DONNONS VIE À VOTRE PROJET</p><h2>On construit<br />la suite <em>ensemble ?</em></h2><p>Parlez-nous de vos objectifs. Nous serons heureux d’étudier votre projet.</p><div className="contact-actions"><a className="button button-lime" href="https://wa.me/24174452464?text=Bonjour%20OKOUME%20DIGITAL%2C%20je%20souhaite%20parler%20d%E2%80%99un%20projet." target="_blank" rel="noreferrer">Écrire sur WhatsApp <Arrow diagonal /></a><a className="button button-contact-outline" href="mailto:okoumedigital241@gmail.com?subject=Parlons%20de%20mon%20projet">Envoyer un e-mail <Arrow diagonal /></a></div><div className="contact-details"><a href="tel:+24174452464">+241 74 45 24 64 · Appel &amp; WhatsApp</a><a href="mailto:okoumedigital241@gmail.com">okoumedigital241@gmail.com</a></div><span className="contact-location">LIBREVILLE, GABON <i>·</i> MARKETING <i>·</i> WEB &amp; MOBILE <i>·</i> AUTOMATISATION <i>·</i> IT</span></div><div className="contact-decoration" aria-hidden="true">O<span>.</span></div></section>
      </main>
      <footer className="footer page-wrap"><a href="#accueil" className="brand"><span className="brand-symbol">O<span>.</span></span><span className="brand-name">OKOUME<span>DIGITAL</span></span></a><span>© {new Date().getFullYear()} OKOUME DIGITAL · Libreville, Gabon</span><a href="tel:+24174452464">+241 74 45 24 64</a></footer>
    </>
  );
}

export default App;
