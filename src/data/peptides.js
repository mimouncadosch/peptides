// Comprehensive Chinese Wellness Peptides Database

export const PEPTIDES = [
  {
    id: 'bpc-157',
    name: 'BPC-157',
    fullName: 'Body Protection Compound-157',
    status: 'clinical-trials',
    description: 'A pentadecapeptide derived from a protective gastric protein. BPC-157 has shown remarkable healing properties in preclinical studies, promoting angiogenesis, tissue repair, and protection against various injuries.',
    useCases: ['muscle-recovery', 'injury-healing', 'gut-health'],
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
    useCases: ['muscle-recovery', 'injury-healing', 'flexibility'],
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
    useCases: ['skin-health', 'hair-growth', 'anti-aging'],
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
    useCases: ['muscle-recovery', 'sleep', 'anti-aging'],
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
    useCases: ['muscle-recovery', 'weight-loss', 'anti-aging'],
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
    useCases: ['weight-loss', 'skin-health'],
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
    useCases: ['cognitive', 'anxiety'],
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
    useCases: ['cognitive', 'neuroprotection'],
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
    useCases: ['anti-aging', 'sleep', 'longevity'],
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
    useCases: ['sleep', 'stress'],
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
    useCases: ['libido', 'sexual-health'],
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
    useCases: ['weight-loss', 'fat-loss'],
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
