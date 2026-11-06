function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

const offers = [
  {
    number: '01', category: 'Forfait mensuel', title: 'Visibilité & acquisition',
    price: '120 000–180 000', unit: 'FCFA / mois',
    description: 'Une présence régulière pour développer votre visibilité sur les réseaux.',
    details: ['8 publications par mois', 'Jusqu’à 2 réseaux sociaux', 'Planning éditorial et bilan mensuel'],
    note: 'Budget publicitaire non inclus.',
  },
  {
    number: '02', category: 'Projet web', title: 'Site vitrine',
    price: '300 000–450 000', unit: 'FCFA / projet',
    description: 'Un site responsive pour présenter votre entreprise et faciliter les demandes de contact.',
    details: ['Pages et contenus cadrés ensemble', 'Formulaire de contact', 'Référencement de base'],
    note: 'Le devis dépend du nombre de pages et des fonctions demandées.',
  },
  {
    number: '03', category: 'Projet e-commerce', title: 'Boutique en ligne',
    price: '500 000–900 000', unit: 'FCFA / projet',
    description: 'Une boutique pour présenter vos produits et gérer le parcours de commande.',
    details: ['Catalogue et parcours de commande', 'Gestion des commandes', 'Paiement selon la solution retenue'],
    note: 'Le devis dépend du catalogue, des paiements et des intégrations.',
  },
  {
    number: '04', category: 'Projet sur mesure', title: 'Applications & automatisations',
    price: 'Sur devis', unit: 'après cadrage',
    description: 'Des outils métier, applications web ou mobile et automatisations adaptés à vos processus.',
    details: ['Analyse du besoin', 'Périmètre et étapes définis ensemble', 'Développement et déploiement'],
    note: 'Un premier échange permet d’estimer le périmètre.',
  },
  {
    number: '05', category: 'Accompagnement récurrent', title: 'Maintenance informatique',
    price: 'Sur devis', unit: 'forfait mensuel',
    description: 'Un suivi adapté à votre parc informatique, vos applications et vos serveurs.',
    details: ['Périmètre selon les équipements', 'Support et interventions définis au contrat', 'Niveau de service adapté à vos besoins'],
    note: 'Le prix dépend du nombre d’équipements et du support souhaité.',
  },
];

function PricingSection() {
  return (
    <section className="pricing-section section-space" id="offres">
      <div className="page-wrap">
        <div className="section-intro">
          <div><p className="eyebrow">02 — OFFRES &amp; TARIFS</p><h2>Un cadre clair,<br /><em>adapté à vos besoins.</em></h2></div>
          <p className="section-side-copy">Des premiers repères pour démarrer. Nous précisons le périmètre et le devis avec vous.</p>
        </div>
        <div className="pricing-grid">
          {offers.map((offer) => (
            <article className="pricing-card" key={offer.number}>
              <div className="pricing-card-top"><span className="pricing-number">{offer.number}</span><span className="pricing-category">{offer.category}</span></div>
              <h3>{offer.title}</h3>
              <p className="pricing-description">{offer.description}</p>
              <p className="pricing-amount">{offer.price}<span>{offer.unit}</span></p>
              <ul>{offer.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <p className="pricing-note">{offer.note}</p>
              <a className="pricing-link" href="https://wa.me/24174452464?text=Bonjour%20OKOUME%20DIGITAL%2C%20je%20souhaite%20un%20devis." target="_blank" rel="noreferrer">Demander un devis <Arrow diagonal /></a>
            </article>
          ))}
        </div>
        <p className="pricing-disclaimer">Tarifs indicatifs en FCFA. Le devis final dépend du périmètre, des contenus, des intégrations et des services tiers nécessaires.</p>
      </div>
    </section>
  );
}

export default PricingSection;
