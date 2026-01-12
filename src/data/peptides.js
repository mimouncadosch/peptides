// Comprehensive Chinese Wellness Peptides Database

export const PEPTIDES = [
  {
    id: 'bpc-157',
    name: 'BPC-157',
    fullName: 'Body Protection Compound-157',
    status: 'clinical-trials',
    description: 'A pentadecapeptide derived from a protective gastric protein. BPC-157 has shown remarkable healing properties in preclinical studies, promoting angiogenesis, tissue repair, and protection against various injuries.',
    mechanism: 'BPC-157 modulates the nitric oxide (NO) system, promoting angiogenesis through VEGF upregulation. It activates FAK-paxillin signaling pathways to enhance cell migration and tissue repair. The peptide also interacts with the dopaminergic system and influences growth hormone receptor expression, contributing to its regenerative effects.',
    useCases: ['muscle-recovery', 'injury-healing', 'gut-health'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'BPC-157 5mg', price: '$39.99', url: 'https://www.peptidesciences.com/bpc-157-5mg' },
      { reseller: 'Swiss Chems', product: 'BPC-157 5mg', price: '$42.95', url: 'https://swisschems.is/product/bpc-157-5mg' },
      { reseller: 'Amino Asylum', product: 'BPC-157 5mg', price: '$36.99', url: 'https://aminoasylum.shop/product/bpc-157' },
    ],
    chineseContext: {
      sourcing: 'Commonly synthesized in Chinese pharmaceutical facilities with varying purity levels (95-99%)',
      popularity: 'Extremely high demand in biohacking and athletic recovery communities',
      notes: 'Quality testing is essential due to market variations. Chinese suppliers offer both research-grade and pharmaceutical-grade variants.'
    },
    studies: [
      {
        title: 'BPC 157 and Blood Vessel Growth',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30915550/',
        year: 2019,
        summary: 'Demonstrates pro-angiogenic effects and accelerated wound healing in animal models'
      },
      {
        title: 'Therapeutic Potential of BPC 157',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31488706/',
        year: 2019,
        summary: 'Comprehensive review of BPC-157\'s protective effects across multiple organ systems'
      }
    ],
    dosage: '200-500 mcg daily, subcutaneous or intramuscular injection',
    sideEffects: 'Generally well-tolerated with minimal reported side effects. Limited long-term safety data available.'
  },
  {
    id: 'tb-500',
    name: 'TB-500',
    fullName: 'Thymosin Beta-4',
    status: 'clinical-trials',
    description: 'A naturally occurring peptide present in high concentrations in blood platelets, wound fluid, and other tissues. TB-500 promotes cell migration, differentiation, and tissue repair through multiple pathways.',
    mechanism: 'TB-500 sequesters G-actin monomers, promoting actin polymerization and cytoskeletal reorganization essential for cell migration. It upregulates cell surface receptors and facilitates blood vessel formation. The peptide also reduces inflammation by inhibiting NF-κB activation and promotes stem cell differentiation for tissue regeneration.',
    useCases: ['muscle-recovery', 'injury-healing', 'flexibility'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'TB-500 2mg', price: '$32.99', url: 'https://www.peptidesciences.com/tb-500-2mg' },
      { reseller: 'Swiss Chems', product: 'TB-500 5mg', price: '$54.95', url: 'https://swisschems.is/product/tb-500-5mg' },
      { reseller: 'PureRawz', product: 'TB-500 5mg', price: '$49.99', url: 'https://www.purerawz.co/products/tb-500' },
    ],
    chineseContext: {
      sourcing: 'Manufactured in Chinese peptide synthesis labs with quality ranging from research to pharmaceutical grade',
      popularity: 'Popular among athletes and fitness enthusiasts for injury recovery',
      notes: 'Third-party testing recommended due to significant quality variations between suppliers'
    },
    studies: [
      {
        title: 'Thymosin β4 and Tissue Repair',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17056116/',
        year: 2007,
        summary: 'Shows acceleration of wound healing and reduced inflammation in clinical models'
      },
      {
        title: 'TB4 in Cardiac Repair',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15345769/',
        year: 2004,
        summary: 'Demonstrates cardioprotective effects and tissue regeneration capabilities'
      }
    ],
    dosage: '2-5 mg twice weekly for 4-6 weeks, then maintenance dosing',
    sideEffects: 'Minimal side effects reported. Occasional headaches or injection site reactions.'
  },
  {
    id: 'ghk-cu',
    name: 'GHK-Cu',
    fullName: 'Copper Peptide (Gly-His-Lys)',
    status: 'approved',
    description: 'A copper complex of the tripeptide Gly-His-Lys that naturally occurs in human plasma. GHK-Cu stimulates collagen synthesis, promotes wound healing, and has potent anti-aging effects on skin.',
    mechanism: 'GHK-Cu binds to copper ions and delivers them to cells, activating copper-dependent enzymes like lysyl oxidase and superoxide dismutase. It stimulates collagen and elastin synthesis, promotes glycosaminoglycan production, and modulates gene expression of over 4,000 genes related to tissue remodeling and anti-inflammatory responses.',
    useCases: ['skin-health', 'hair-growth', 'anti-aging'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'GHK-Cu 50mg', price: '$44.99', url: 'https://www.peptidesciences.com/ghk-cu-50mg' },
      { reseller: 'Swiss Chems', product: 'GHK-Cu 50mg', price: '$47.95', url: 'https://swisschems.is/product/ghk-cu' },
      { reseller: 'Biotech Peptides', product: 'GHK-Cu 100mg', price: '$79.99', url: 'https://biotechpeptides.com/product/ghk-cu' },
    ],
    chineseContext: {
      sourcing: 'Widely produced in Chinese cosmetic peptide industry with established quality standards',
      popularity: 'Extremely popular in skincare formulations and anti-aging products',
      notes: 'FDA approved for cosmetic use. Available in both topical and injectable forms from Chinese manufacturers.'
    },
    studies: [
      {
        title: 'GHK-Cu and Skin Regeneration',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25607907/',
        year: 2015,
        summary: 'Demonstrates stimulation of collagen synthesis and improved skin appearance'
      },
      {
        title: 'Copper Peptides in Wound Healing',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22989372/',
        year: 2012,
        summary: 'Shows enhanced wound healing and anti-inflammatory properties'
      }
    ],
    dosage: '1-2 mg daily (injectable) or topical application at 0.05-2% concentration',
    sideEffects: 'Very safe with minimal side effects. Rare skin irritation with topical use.'
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    fullName: 'Ipamorelin (Growth Hormone Secretagogue)',
    status: 'clinical-trials',
    description: 'A selective growth hormone secretagogue that stimulates GH release without significantly affecting cortisol or prolactin levels. Known for promoting lean muscle growth and improving sleep quality.',
    mechanism: 'Ipamorelin selectively binds to ghrelin receptors (GHS-R1a) in the pituitary gland, triggering pulsatile growth hormone release. Unlike other GH secretagogues, it does not significantly stimulate ACTH, cortisol, or prolactin release. This selectivity results from its specific receptor binding profile that mimics natural GH secretion patterns.',
    useCases: ['muscle-recovery', 'sleep', 'anti-aging'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'Ipamorelin 5mg', price: '$29.99', url: 'https://www.peptidesciences.com/ipamorelin-5mg' },
      { reseller: 'Amino Asylum', product: 'Ipamorelin 5mg', price: '$27.99', url: 'https://aminoasylum.shop/product/ipamorelin' },
      { reseller: 'PureRawz', product: 'Ipamorelin 5mg', price: '$31.99', url: 'https://www.purerawz.co/products/ipamorelin' },
    ],
    chineseContext: {
      sourcing: 'Synthesized in specialized Chinese peptide laboratories with quality testing available',
      popularity: 'High demand in anti-aging and bodybuilding communities',
      notes: 'Often combined with CJC-1295 for synergistic effects. Quality verification crucial for efficacy.'
    },
    studies: [
      {
        title: 'Ipamorelin and Growth Hormone Release',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9849822/',
        year: 1998,
        summary: 'Demonstrates selective GH release without unwanted hormone elevation'
      },
      {
        title: 'Safety Profile of Ipamorelin',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15671119/',
        year: 2005,
        summary: 'Shows favorable safety profile compared to other GH secretagogues'
      }
    ],
    dosage: '200-300 mcg before bed or post-workout, 1-2 times daily',
    sideEffects: 'Generally well-tolerated. Possible water retention or increased hunger at higher doses.'
  },
  {
    id: 'cjc-1295',
    name: 'CJC-1295',
    fullName: 'CJC-1295 (Modified GRF 1-29)',
    status: 'clinical-trials',
    description: 'A synthetic analog of growth hormone releasing hormone (GHRH) that promotes sustained growth hormone elevation. Often used for muscle building, fat loss, and anti-aging purposes.',
    mechanism: 'CJC-1295 binds to GHRH receptors on pituitary somatotrophs, stimulating cAMP production and subsequent GH synthesis and release. The DAC (Drug Affinity Complex) version binds to albumin, extending half-life from minutes to days. This results in sustained GH elevation and increased IGF-1 production.',
    useCases: ['muscle-recovery', 'weight-loss', 'anti-aging'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'CJC-1295 DAC 2mg', price: '$42.99', url: 'https://www.peptidesciences.com/cjc-1295-dac-2mg' },
      { reseller: 'Swiss Chems', product: 'CJC-1295 DAC 2mg', price: '$45.95', url: 'https://swisschems.is/product/cjc-1295-dac' },
      { reseller: 'Amino Asylum', product: 'CJC-1295 no DAC 2mg', price: '$34.99', url: 'https://aminoasylum.shop/product/cjc-1295' },
    ],
    chineseContext: {
      sourcing: 'Available from Chinese peptide manufacturers in both DAC and non-DAC versions',
      popularity: 'Widely used in performance enhancement and longevity protocols',
      notes: 'CJC-1295 with DAC (Drug Affinity Complex) provides longer-lasting effects but may cause GH bleed. Non-DAC version preferred by many users.'
    },
    studies: [
      {
        title: 'CJC-1295 and GH Secretion',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16352683/',
        year: 2006,
        summary: 'Shows sustained growth hormone elevation over extended periods'
      },
      {
        title: 'Modified GRF Effects on Body Composition',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15117797/',
        year: 2004,
        summary: 'Demonstrates improvements in lean body mass and fat reduction'
      }
    ],
    dosage: '1-2 mg per week (with DAC) or 100-200 mcg 1-3 times daily (without DAC)',
    sideEffects: 'Water retention, numbness/tingling in extremities, increased hunger. DAC version may cause GH bleed.'
  },
  {
    id: 'melanotan-2',
    name: 'Melanotan II',
    fullName: 'Melanotan II (MT-2)',
    status: 'unapproved',
    description: 'A synthetic analog of melanocyte-stimulating hormone that stimulates melanogenesis. Originally developed for skin protection, it also affects appetite suppression and libido enhancement.',
    mechanism: 'Melanotan II is a non-selective agonist of melanocortin receptors (MC1R-MC5R). MC1R activation stimulates melanocytes to produce eumelanin (skin darkening). MC3R/MC4R activation in the hypothalamus suppresses appetite and enhances sexual arousal. This broad receptor activity explains its diverse effects.',
    useCases: ['weight-loss', 'skin-health'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'Melanotan II 10mg', price: '$29.99', url: 'https://www.peptidesciences.com/melanotan-2-10mg' },
      { reseller: 'Swiss Chems', product: 'Melanotan II 10mg', price: '$32.95', url: 'https://swisschems.is/product/melanotan-ii' },
      { reseller: 'PureRawz', product: 'Melanotan II 10mg', price: '$27.99', url: 'https://www.purerawz.co/products/melanotan-ii' },
    ],
    chineseContext: {
      sourcing: 'Widely manufactured in Chinese facilities with significant quality variations',
      popularity: 'High demand in bodybuilding and tanning communities despite unapproved status',
      notes: 'NOT FDA approved. Legal status varies by country. Quality testing absolutely essential due to widespread counterfeits and contamination issues.'
    },
    studies: [
      {
        title: 'Melanocortin Receptor Agonists and Appetite',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12663489/',
        year: 2003,
        summary: 'MT-II showed significant appetite suppression effects in clinical trials'
      },
      {
        title: 'Safety Concerns with Melanotan',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16438619/',
        year: 2006,
        summary: 'Documents adverse effects including nausea, darkening of moles, and cardiovascular concerns'
      }
    ],
    dosage: '0.25-1 mg before sun exposure (NOT RECOMMENDED without medical supervision)',
    sideEffects: 'Nausea, flushing, darkening of existing moles, spontaneous erections, potential cardiovascular effects.',
    warnings: ['Not approved for human use', 'Potential serious side effects', 'Quality verification critical', 'May increase skin cancer risk']
  },
  {
    id: 'selank',
    name: 'Selank',
    fullName: 'Selank (Synthetic Tuftsin Analog)',
    status: 'clinical-trials',
    description: 'A synthetic derivative of the human tetrapeptide tuftsin with pronounced anxiolytic activity. Developed in Russia, Selank modulates brain-derived neurotrophic factor and has nootropic effects.',
    mechanism: 'Selank modulates GABAergic neurotransmission and increases BDNF expression in the hippocampus. It influences serotonin metabolism and enkephalin levels, producing anxiolytic effects without sedation. The peptide also enhances IL-6 expression and modulates the balance of T-helper cell cytokines.',
    useCases: ['cognitive', 'anxiety'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'Selank 5mg', price: '$49.99', url: 'https://www.peptidesciences.com/selank-5mg' },
      { reseller: 'Swiss Chems', product: 'Selank Nasal 5mg', price: '$52.95', url: 'https://swisschems.is/product/selank' },
      { reseller: 'Biotech Peptides', product: 'Selank 10mg', price: '$84.99', url: 'https://biotechpeptides.com/product/selank' },
    ],
    chineseContext: {
      sourcing: 'Manufactured in Chinese peptide facilities based on Russian research formulations',
      popularity: 'Growing interest in nootropic and biohacking communities',
      notes: 'Approved for medical use in Russia. Quality varies among Chinese suppliers. Nasal spray is most common form.'
    },
    studies: [
      {
        title: 'Selank and Anxiety Disorders',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19234797/',
        year: 2009,
        summary: 'Shows efficacy in treating generalized anxiety disorder with minimal side effects'
      },
      {
        title: 'Neuroprotective Effects of Selank',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23739094/',
        year: 2013,
        summary: 'Demonstrates cognitive enhancement and neuroprotective properties'
      }
    ],
    dosage: '250-500 mcg intranasal, 2-3 times daily',
    sideEffects: 'Minimal side effects. Occasional nasal irritation or mild sedation at higher doses.'
  },
  {
    id: 'semax',
    name: 'Semax',
    fullName: 'Semax (ACTH 4-10 Analog)',
    status: 'clinical-trials',
    description: 'A synthetic peptide based on ACTH (adrenocorticotropic hormone) fragments. Semax enhances cognitive function, memory, attention, and provides neuroprotection through BDNF modulation.',
    mechanism: 'Semax increases BDNF and NGF expression in the brain, promoting neuroplasticity and neuronal survival. It modulates dopaminergic and serotoninergic systems, enhancing attention and memory consolidation. The peptide also inhibits inflammatory cytokines and reduces oxidative stress in neural tissue.',
    useCases: ['cognitive', 'neuroprotection'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'Semax 5mg', price: '$54.99', url: 'https://www.peptidesciences.com/semax-5mg' },
      { reseller: 'Swiss Chems', product: 'Semax Nasal 5mg', price: '$57.95', url: 'https://swisschems.is/product/semax' },
      { reseller: 'Amino Asylum', product: 'Semax 10mg', price: '$74.99', url: 'https://aminoasylum.shop/product/semax' },
    ],
    chineseContext: {
      sourcing: 'Produced by Chinese manufacturers following Russian pharmaceutical standards',
      popularity: 'Popular among students, professionals, and biohackers for cognitive enhancement',
      notes: 'Registered as medication in Russia. Available in various concentrations (0.1%, 1%). Chinese versions require purity verification.'
    },
    studies: [
      {
        title: 'Semax in Cognitive Enhancement',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12809373/',
        year: 2003,
        summary: 'Improves memory and attention in healthy subjects and stroke patients'
      },
      {
        title: 'Neuroprotective Mechanisms of Semax',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17990113/',
        year: 2007,
        summary: 'Demonstrates neuroprotection through BDNF upregulation and anti-inflammatory effects'
      }
    ],
    dosage: '300-600 mcg intranasal, 1-2 times daily',
    sideEffects: 'Well-tolerated. Rare reports of anxiety or restlessness at high doses.'
  },
  {
    id: 'epitalon',
    name: 'Epitalon',
    fullName: 'Epitalon (Epithalon)',
    status: 'unapproved',
    description: 'A synthetic tetrapeptide that acts as a telomerase activator, potentially slowing cellular aging. Originally developed in Russia for longevity and circadian rhythm regulation.',
    mechanism: 'Epitalon activates telomerase, the enzyme that adds telomeric repeats to chromosome ends, potentially extending cellular lifespan. It stimulates melatonin production in the pineal gland, regulating circadian rhythms. The peptide also modulates antioxidant enzyme activity and influences neuroendocrine system function.',
    useCases: ['anti-aging', 'sleep', 'longevity'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'Epitalon 10mg', price: '$59.99', url: 'https://www.peptidesciences.com/epitalon-10mg' },
      { reseller: 'Swiss Chems', product: 'Epitalon 10mg', price: '$64.95', url: 'https://swisschems.is/product/epitalon' },
      { reseller: 'PureRawz', product: 'Epitalon 20mg', price: '$89.99', url: 'https://www.purerawz.co/products/epitalon' },
    ],
    chineseContext: {
      sourcing: 'Synthesized by Chinese peptide laboratories based on Russian research',
      popularity: 'Growing interest in longevity and anti-aging communities worldwide',
      notes: 'Extensive Russian research but limited Western clinical trials. Quality testing recommended for Chinese sources.'
    },
    studies: [
      {
        title: 'Epitalon and Telomerase Activity',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12374457/',
        year: 2003,
        summary: 'Shows activation of telomerase and potential anti-aging effects'
      },
      {
        title: 'Circadian Regulation by Epitalon',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15152048/',
        year: 2004,
        summary: 'Demonstrates melatonin regulation and improvement in sleep patterns'
      }
    ],
    dosage: '5-10 mg per day for 10-20 days, cycles repeated 2-4 times per year',
    sideEffects: 'Limited safety data. Generally well-tolerated in Russian studies.'
  },
  {
    id: 'dsip',
    name: 'DSIP',
    fullName: 'Delta Sleep-Inducing Peptide',
    status: 'clinical-trials',
    description: 'A neuropeptide that influences sleep regulation, stress response, and pain perception. DSIP promotes deep, restorative sleep and may help with stress-related disorders.',
    mechanism: 'DSIP modulates sleep architecture by influencing GABAergic and glutamatergic neurotransmission. It reduces cortisol and ACTH levels during stress, acting on the hypothalamic-pituitary-adrenal axis. The peptide also affects endorphin levels and has been shown to normalize disrupted circadian rhythms.',
    useCases: ['sleep', 'stress'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'DSIP 5mg', price: '$47.99', url: 'https://www.peptidesciences.com/dsip-5mg' },
      { reseller: 'Swiss Chems', product: 'DSIP 5mg', price: '$49.95', url: 'https://swisschems.is/product/dsip' },
      { reseller: 'Biotech Peptides', product: 'DSIP 5mg', price: '$44.99', url: 'https://biotechpeptides.com/product/dsip' },
    ],
    chineseContext: {
      sourcing: 'Available from Chinese peptide manufacturers with varying purity levels',
      popularity: 'Used by individuals with insomnia and high-stress occupations',
      notes: 'Research-grade quality preferred. Effects can be subtle and individual-dependent.'
    },
    studies: [
      {
        title: 'DSIP and Sleep Architecture',
        url: 'https://pubmed.ncbi.nlm.nih.gov/6180222/',
        year: 1982,
        summary: 'Demonstrates improvement in sleep quality and delta wave sleep'
      },
      {
        title: 'Stress-Protective Effects of DSIP',
        url: 'https://pubmed.ncbi.nlm.nih.gov/3453481/',
        year: 1987,
        summary: 'Shows reduction in stress markers and improved stress resilience'
      }
    ],
    dosage: '100-300 mcg before bedtime, subcutaneous injection',
    sideEffects: 'Minimal side effects. Occasional grogginess upon waking.'
  },
  {
    id: 'pt-141',
    name: 'PT-141',
    fullName: 'Bremelanotide (PT-141)',
    status: 'approved',
    description: 'A melanocortin receptor agonist FDA-approved for treating hypoactive sexual desire disorder in women. Works through the central nervous system rather than vascular system.',
    mechanism: 'PT-141 activates MC3R and MC4R receptors in the hypothalamus and limbic system, areas involved in sexual arousal and desire. Unlike PDE5 inhibitors, it works centrally rather than on vascular smooth muscle. This CNS-mediated mechanism increases sexual desire independent of blood flow effects.',
    useCases: ['libido', 'sexual-health'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'PT-141 10mg', price: '$44.99', url: 'https://www.peptidesciences.com/pt-141-10mg' },
      { reseller: 'Swiss Chems', product: 'PT-141 10mg', price: '$47.95', url: 'https://swisschems.is/product/pt-141' },
      { reseller: 'Amino Asylum', product: 'PT-141 10mg', price: '$39.99', url: 'https://aminoasylum.shop/product/pt-141' },
    ],
    chineseContext: {
      sourcing: 'Manufactured by Chinese pharmaceutical companies following FDA approval',
      popularity: 'Increasing use for both approved indications and off-label purposes',
      notes: 'FDA approved as Vyleesi in 2019. Chinese generics available but quality verification important.'
    },
    studies: [
      {
        title: 'Bremelanotide for Female Sexual Dysfunction',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31470946/',
        year: 2019,
        summary: 'FDA approval study showing efficacy in treating HSDD in premenopausal women'
      },
      {
        title: 'PT-141 Mechanism of Action',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30907882/',
        year: 2019,
        summary: 'Explains central nervous system mechanism for sexual arousal'
      }
    ],
    dosage: '1.75 mg subcutaneous injection, at least 45 minutes before anticipated sexual activity',
    sideEffects: 'Nausea (most common), flushing, headache, temporary blood pressure increase.'
  },
  {
    id: 'aod-9604',
    name: 'AOD-9604',
    fullName: 'Advanced Obesity Drug 9604',
    status: 'unapproved',
    description: 'A modified fragment of human growth hormone (HGH) designed to stimulate fat metabolism without affecting blood sugar or tissue growth. Developed specifically for obesity treatment.',
    mechanism: 'AOD-9604 is a modified fragment (amino acids 177-191) of human growth hormone. It stimulates lipolysis by activating beta-3 adrenergic receptors on adipocytes. Unlike full GH, it lacks the IGF-1 binding domain, so it promotes fat breakdown without causing hyperglycemia or promoting tissue growth.',
    useCases: ['weight-loss', 'fat-loss'],
    resellers: [
      { reseller: 'Peptide Sciences', product: 'AOD-9604 2mg', price: '$34.99', url: 'https://www.peptidesciences.com/aod-9604-2mg' },
      { reseller: 'Swiss Chems', product: 'AOD-9604 2mg', price: '$37.95', url: 'https://swisschems.is/product/aod-9604' },
      { reseller: 'PureRawz', product: 'AOD-9604 5mg', price: '$59.99', url: 'https://www.purerawz.co/products/aod-9604' },
    ],
    chineseContext: {
      sourcing: 'Produced by Chinese peptide manufacturers for research purposes',
      popularity: 'Popular in weight loss and bodybuilding circles despite lack of approval',
      notes: 'Failed to receive FDA approval. Quality highly variable among Chinese suppliers. Research purposes only.'
    },
    studies: [
      {
        title: 'AOD9604 and Fat Metabolism',
        url: 'https://pubmed.ncbi.nlm.nih.gov/11207280/',
        year: 2001,
        summary: 'Shows lipolytic effects without hyperglycemia or insulin resistance'
      },
      {
        title: 'Clinical Trial of AOD9604',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16303853/',
        year: 2005,
        summary: 'Phase 2 trial results (ultimately did not lead to FDA approval)'
      }
    ],
    dosage: '300-600 mcg daily, subcutaneous injection (research purposes only)',
    sideEffects: 'Limited human safety data. Potential injection site reactions.',
    warnings: ['Not approved for human use', 'Failed FDA approval process', 'Research chemical only']
  }
];

// Testing laboratories for peptide verification
export const TESTING_LABS = [
  {
    name: 'Janoshik Analytical',
    url: 'https://janoshik.com',
    location: 'Czech Republic',
    services: 'HPLC, mass spectrometry, purity testing'
  },
  {
    name: 'Lab4Tox',
    url: 'https://www.lab4tox.co.uk',
    location: 'UK',
    services: 'Peptide analysis, contamination screening'
  },
  {
    name: 'Colmaric Analyticals',
    url: 'https://colmaric.com',
    location: 'USA',
    services: 'Pharmaceutical testing, identity verification'
  },
  {
    name: 'Vimta Labs',
    url: 'https://www.vimta.com',
    location: 'India',
    services: 'GLP certified, comprehensive peptide analysis'
  }
];

// Use case definitions with icons and metadata
export const USE_CASES = [
  {
    id: 'all',
    label: 'All Peptides',
    icon: '⚡',
    description: 'Show all available peptides'
  },
  {
    id: 'sleep',
    label: 'Sleep',
    icon: '🌙',
    description: 'Improve sleep quality and circadian rhythm'
  },
  {
    id: 'weight-loss',
    label: 'Weight Loss',
    icon: '⚖️',
    description: 'Fat metabolism and appetite suppression'
  },
  {
    id: 'hair-growth',
    label: 'Hair Growth',
    icon: '💇',
    description: 'Stimulate hair follicles and growth'
  },
  {
    id: 'muscle-recovery',
    label: 'Muscle Recovery',
    icon: '💪',
    description: 'Accelerate muscle repair and growth'
  },
  {
    id: 'anti-aging',
    label: 'Anti-Aging',
    icon: '✨',
    description: 'Cellular rejuvenation and longevity'
  },
  {
    id: 'skin-health',
    label: 'Skin Health',
    icon: '🧴',
    description: 'Collagen synthesis and skin repair'
  },
  {
    id: 'cognitive',
    label: 'Cognitive',
    icon: '🧠',
    description: 'Mental clarity and neuroprotection'
  },
  {
    id: 'injury-healing',
    label: 'Injury Healing',
    icon: '🩹',
    description: 'Accelerated tissue repair and recovery'
  },
  {
    id: 'gut-health',
    label: 'Gut Health',
    icon: '🫃',
    description: 'Digestive system protection and repair'
  },
  {
    id: 'flexibility',
    label: 'Flexibility',
    icon: '🤸',
    description: 'Joint health and range of motion'
  },
  {
    id: 'anxiety',
    label: 'Anxiety',
    icon: '😌',
    description: 'Stress reduction and mood regulation'
  },
  {
    id: 'neuroprotection',
    label: 'Neuroprotection',
    icon: '🛡️',
    description: 'Brain health and cognitive preservation'
  },
  {
    id: 'longevity',
    label: 'Longevity',
    icon: '⏳',
    description: 'Lifespan extension and cellular health'
  },
  {
    id: 'stress',
    label: 'Stress',
    icon: '🧘',
    description: 'Stress resilience and adaptation'
  },
  {
    id: 'libido',
    label: 'Libido',
    icon: '❤️',
    description: 'Sexual health and desire enhancement'
  },
  {
    id: 'sexual-health',
    label: 'Sexual Health',
    icon: '💕',
    description: 'Overall sexual function and wellness'
  },
  {
    id: 'fat-loss',
    label: 'Fat Loss',
    icon: '🔥',
    description: 'Body composition and fat reduction'
  }
];

// Status configuration
export const STATUS_CONFIG = {
  'approved': {
    label: 'FDA Approved',
    color: '#00ff41',
    description: 'Approved for medical or cosmetic use'
  },
  'clinical-trials': {
    label: 'Clinical Trials',
    color: '#ffff00',
    description: 'Currently in clinical research phase'
  },
  'unapproved': {
    label: 'Research Only',
    color: '#ff00ff',
    description: 'Not approved for human use - research purposes only'
  }
};
