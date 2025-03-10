const questions = [
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'hard',
        text: 'Match the following medications with their specific reversal agents/antidotes:',
        options: ['Vitamin K', 'Naloxone', 'Protamine sulfate', 'Flumazenil', 'Calcium gluconate'],
        pairs: [
            { medication: 'Warfarin', correctMatch: 'Vitamin K' },
            { medication: 'Heparin', correctMatch: 'Protamine sulfate' },
            { medication: 'Opioids', correctMatch: 'Naloxone' },
            { medication: 'Benzodiazepines', correctMatch: 'Flumazenil' },
            { medication: 'Calcium channel blocker overdose', correctMatch: 'Calcium gluconate' }
        ],
        explanation: `Rationale: Specific antidotes are crucial in toxicology management. Warfarin's effect is reversed with Vitamin K (per ISTH guidelines). Protamine sulfate neutralizes heparin at a 1:1 ratio (ACC Chest Medicine 2023). Naloxone displaces opioids from μ-receptors (Goldfrank's Toxicologic Emergencies, 11th Ed). Flumazenil reverses benzodiazepines by competitive inhibition at GABA receptors. Calcium gluconate works through mass action in CCB overdose (Poisoning & Drug Overdose, 8th Ed).`
    },
    {
        type: 'scenario-dropdown',
        category: 'Diabetes Management',
        difficulty: 'hard',
        text: 'When assessing a patient with {1}, the nurse should prioritize {2} and monitor for {3}. The first action should be to {4}.',
        parts: {
            1: {
                options: ["new-onset diabetes", "chronic hypertension", "acute COPD exacerbation"],
                correct: "new-onset diabetes"
            },
            2: {
                options: ["polyuria management", "blood pressure control", "oxygen therapy"],
                correct: "polyuria management"
            },
            3: {
                options: ["hyperglycemic crisis", "hypoglycemic episodes", "respiratory distress"],
                correct: "hypoglycemic episodes"
            },
            4: {
                options: ["administer sliding scale insulin", 
                         "obtain capillary blood glucose", 
                         "initiate IV fluids"],
                correct: "obtain capillary blood glucose"
            }
        },
        explanation: `Clinical Rationale: 1) New-onset diabetes patients often present with polyuria. 
        2) Hypoglycemia is a critical acute complication requiring immediate attention. 
        3) Blood glucose check must precede any intervention per ADA Guidelines 2023. 
        Reference: American Diabetes Association. Diabetes Care 2023;46(Suppl 1):S1-S103.`
    },
    {
        type: 'priority',
        category: 'Burn Care',
        difficulty: 'hard',
        text: 'Prioritize interventions for a 35-year-old with 40% TBSA flame burns:',
        options: [
            'Administer IV morphine',
            'Initiate Parkland formula fluids',
            'Secure airway with ET tube',
            'Apply silver sulfadiazine dressing'
        ],
        correctAnswer: ['Secure airway with ET tube', 'Initiate Parkland formula fluids', 'Administer IV morphine', 'Apply silver sulfadiazine dressing'],
        explanation: `Airway management takes priority due to inhalation injury risk (ABA Guidelines 2023). Fluid resuscitation follows the Parkland formula (4ml × TBSA% × kg). Pain control precedes wound care. Critical thinking: 1) Airway compromise can develop rapidly, 2) Fluid resuscitation must begin within first hour, 3) Open wounds increase infection risk. Reference: Herndon DN. Total Burn Care, 6th Ed.`
    },
    {
        type: 'select-all',
        category: 'Psychiatry',
        difficulty: 'hard',
        text: 'Select ALL signs of lithium toxicity:',
        options: [
            'Coarse tremor',
            'Polyuria',
            'Hypertension',
            'Hyperreflexia',
            'Diarrhea'
        ],
        correctAnswer: ['Coarse tremor', 'Polyuria', 'Hyperreflexia', 'Diarrhea'],
        explanation: `Lithium toxicity presents with: 1) Neurological: tremor, hyperreflexia, seizures; 2) GI: nausea/diarrhea; 3) Renal: polyuria from nephrogenic DI (Lehne’s Pharmacology, 11th Ed). Hypertension is not characteristic - severe cases may show hypotension. Toxic levels >1.5 mEq/L require hemodialysis. Monitoring: Check levels 12hr post-dose. Reference: Gitlin M. Lithium side effects. J Clin Psychiatry. 2016.`
    },
    {
        type: 'fill-blank',
        category: 'Electrolyte Management',
        difficulty: 'hard',
        text: 'A patient with renal failure has peaked T-waves on ECG. The nurse should prepare ____ mEq/L as the initial IV treatment for this emergency.',
        correctAnswer: ['10'], // Calcium gluconate
        explanation: `Critical thinking: Peaked T-waves indicate hyperkalemia. Immediate treatment: 1) Calcium gluconate 10% (1g/10ml) IV over 2-5 mins to stabilize cardiac membranes (KDIGO 2022 Guidelines). Follow with insulin/D50 and kayexalate. ECG changes at K+ >6.5 mEq/L require urgent intervention. Reference: Sterns RH. Treatment of hyperkalemia. NEJM Evidence 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Endocrinology',
        difficulty: 'hard',
        text: 'A patient in Addisonian crisis presents with hypotension and hyperkalemia. Which intervention is MOST urgent?',
        options: [
            'Administer IV dextrose',
            'Start hydrocortisone 100mg IV',
            'Give oral fludrocortisone',
            'Infuse 0.9% NaCl with potassium'
        ],
        correctAnswer: 'Start hydrocortisone 100mg IV',
        explanation: `Addisonian crisis management: 1) Immediate glucocorticoid replacement (hydrocortisone IV) is lifesaving, 2) Fluid resuscitation with NS (avoid K+ containing solutions), 3) Mineralocorticoid replacement comes later (Endocrine Society Guidelines 2023). Rationale: Cortisol deficiency causes vascular collapse. Reference: Bornstein SR. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM 2016.`
    },
    {
        type: 'priority',
        category: 'Postoperative Care',
        difficulty: 'hard',
        text: 'Prioritize nursing actions for a patient 2 hours post-CABG with BP 85/50, HR 120, chest tube output 250ml/hr:',
        options: [
            'Administer PRBCs',
            'Prepare for emergency resternotomy',
            'Increase IV fluid rate',
            'Notify surgeon immediately'
        ],
        correctAnswer: ['Notify surgeon immediately', 'Prepare for emergency resternotomy', 'Administer PRBCs', 'Increase IV fluid rate'],
        explanation: `This indicates cardiac tamponade or hemorrhage. Priorities: 1) Immediate surgical notification (ACS Guidelines), 2) Prepare OR, 3) Blood replacement, 4) Judicious fluids. Critical parameters: Chest tube >200ml/hr × 2hrs requires intervention. Reference: Kulik A. Secondary CABG Surgery Complications. Circulation. 2022.`
    },
    {
        type: 'select-all',
        category: 'Obstetrics',
        difficulty: 'hard',
        text: 'Select ALL interventions for late decelerations on fetal monitor:',
        options: [
            'Administer O2 via non-rebreather',
            'Increase IV fluid rate',
            'Prepare for immediate cesarean',
            'Turn patient to left lateral position',
            'Discontinue oxytocin infusion'
        ],
        correctAnswer: ['Administer O2 via non-rebreather', 'Turn patient to left lateral position', 'Discontinue oxytocin infusion'],
        explanation: `Late decelerations indicate uteroplacental insufficiency. Interventions: 1) Improve placental perfusion (positioning/O2), 2) Reduce uterine activity (stop oxytocin), 3) Correct hypotension (fluids). Immediate delivery only if unresolved (ACOG Practice Bulletin 2023). Reference: Intrapartum Fetal Monitoring. AWHONN 2022.`
    },
    {
        type: 'fill-blank',
        category: 'Cardiology',
        difficulty: 'hard',
        text: 'The nurse should maintain the INR between ____ and ____ for a patient with atrial fibrillation on warfarin.',
        correctAnswer: ['2', '3'],
        explanation: `CHADS-VASc guidelines recommend INR 2-3 for AFib stroke prevention (AHA/ACC 2023). Critical points: 1) <2 increases stroke risk 4-fold, 2) >3 raises hemorrhage risk. Monitoring: Weekly INR checks. Alternatives: DOACs like apixaban for TTR <65%. Reference: January CT. 2023 AFib Management Guidelines. JACC.`
    }
];