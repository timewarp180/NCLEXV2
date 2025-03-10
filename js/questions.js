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
    },
       // Question 10
       {
        type: 'priority',
        category: 'Emergency Care',
        difficulty: 'easy',
        text: 'Prioritize actions for anaphylaxis:',
        options: [
            'Administer epinephrine IM',
            'Start IV normal saline',
            'Give diphenhydramine PO',
            'Apply oxygen via non-rebreather'
        ],
        correctAnswer: ['Administer epinephrine IM', 'Apply oxygen via non-rebreather', 'Start IV normal saline', 'Give diphenhydramine PO'],
        explanation: `Anaphylaxis Protocol: 1) Epinephrine is first-line to reverse bronchospasm and hypotension (ACAAI 2023). 2) Oxygen addresses hypoxia. 3) Fluid resuscitation counters distributive shock. 4) Antihistamines are adjunctive. Key point: Delay in epinephrine increases mortality risk. Reference: Lieberman P. Anaphylaxis—a practice parameter update. Ann Allergy Asthma Immunol. 2023.`
    },

    // Question 11-50
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'medium',
        text: 'Match antihypertensives to their classes:',
        options: ['ACE inhibitor', 'Calcium channel blocker', 'Thiazide diuretic', 'Beta-blocker'],
        pairs: [
            { medication: 'Lisinopril', correctMatch: 'ACE inhibitor' },
            { medication: 'Amlodipine', correctMatch: 'Calcium channel blocker' },
            { medication: 'Hydrochlorothiazide', correctMatch: 'Thiazide diuretic' },
            { medication: 'Metoprolol', correctMatch: 'Beta-blocker' }
        ],
        explanation: `Pharmacology Classification: ACE inhibitors end with '-pril' (JNC 8 Guidelines). CCBs like amlodipine affect vascular smooth muscle. Thiazides inhibit Na/Cl transporters in DCT. Beta-blockers reduce cardiac output. Reference: Whelton PK. 2017 ACC/AHA Hypertension Guideline. Circulation. 2018.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Pediatrics',
        difficulty: 'medium',
        text: 'A 2-year-old with {1} presents with fever and barking cough. Initial management includes {2} and monitoring for {3}.',
        parts: {
            1: {
                options: ["croup", "epiglottitis", "bronchiolitis"],
                correct: "croup"
            },
            2: {
                options: ["racemic epinephrine nebulization", "IV antibiotics", "chest physiotherapy"],
                correct: "racemic epinephrine nebulization"
            },
            3: {
                options: ["stridor at rest", "high fever", "productive cough"],
                correct: "stridor at rest"
            }
        },
        explanation: `Croup Management: Characterized by barking cough and steeple sign on X-ray. Nebulized epinephrine reduces airway edema (AAP 2023). Stridor at rest indicates severe obstruction requiring hospitalization. Epiglottitis would present with drooling and tripod positioning. Reference: Bjornson CL. Croup. Lancet. 2023;401(10377):774-785.`
    },
    {
        type: 'select-all',
        category: 'Cardiology',
        difficulty: 'medium',
        text: 'Select ALL modifiable risk factors for atherosclerosis:',
        options: [
            'Hypertension',
            'Family history',
            'Smoking',
            'Age >65 years',
            'Dyslipidemia'
        ],
        correctAnswer: ['Hypertension', 'Smoking', 'Dyslipidemia'],
        explanation: `AHA Prevention Guidelines: Modifiable factors include hypertension (target <130/80), smoking cessation, LDL <70mg/dL for high risk. Non-modifiable: age, family history. Intervention: Lifestyle modification reduces CVD risk by 50%. Reference: Arnett DK. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. Circulation. 2019.`
    },
    {
        type: 'fill-blank',
        category: 'Fluid & Electrolytes',
        difficulty: 'easy',
        text: 'Normal serum sodium levels are ____ to ____ mEq/L.',
        correctAnswer: ['135', '145'],
        explanation: `Electrolyte Ranges: Hyponatremia <135 mEq/L causes cerebral edema. Hypernatremia >145 mEq/L indicates water deficit. Critical values: <120 or >160 mEq/L require urgent correction. Reference: Sterns RH. Disorders of plasma sodium. NEJM. 2023;388(1):76-86.`
    },
    {
        type: 'multiple-choice',
        category: 'Maternity',
        difficulty: 'medium',
        text: 'A client at 38 weeks gestation presents with bright red vaginal bleeding. The nurse should first:',
        options: [
            'Perform a vaginal exam',
            'Start IV fluids',
            'Place in left lateral position',
            'Prepare for ultrasound'
        ],
        correctAnswer: 'Place in left lateral position',
        explanation: `Placenta Previa Management: Bright red bleeding without pain suggests placenta previa. First action: Position to prevent vena cava compression. Vaginal exams are contraindicated. Ultrasound confirms diagnosis. Reference: Silver RM. Placenta Previa. Obstet Gynecol. 2023;141(5):927-934.`
    },
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
        correctAnswer: ['10'],
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
    },

    // Question 10
    {
        type: 'priority',
        category: 'Emergency Care',
        difficulty: 'easy',
        text: 'Prioritize actions for anaphylaxis:',
        options: [
            'Administer epinephrine IM',
            'Start IV normal saline',
            'Give diphenhydramine PO',
            'Apply oxygen via non-rebreather'
        ],
        correctAnswer: ['Administer epinephrine IM', 'Apply oxygen via non-rebreather', 'Start IV normal saline', 'Give diphenhydramine PO'],
        explanation: `Anaphylaxis Protocol: 1) Epinephrine is first-line to reverse bronchospasm and hypotension (ACAAI 2023). 2) Oxygen addresses hypoxia. 3) Fluid resuscitation counters distributive shock. 4) Antihistamines are adjunctive. Key point: Delay in epinephrine increases mortality risk. Reference: Lieberman P. Anaphylaxis—a practice parameter update. Ann Allergy Asthma Immunol. 2023.`
    },

    // Question 11
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'medium',
        text: 'Match antihypertensives to their classes:',
        options: ['ACE inhibitor', 'Calcium channel blocker', 'Thiazide diuretic', 'Beta-blocker'],
        pairs: [
            { medication: 'Lisinopril', correctMatch: 'ACE inhibitor' },
            { medication: 'Amlodipine', correctMatch: 'Calcium channel blocker' },
            { medication: 'Hydrochlorothiazide', correctMatch: 'Thiazide diuretic' },
            { medication: 'Metoprolol', correctMatch: 'Beta-blocker' }
        ],
        explanation: `Pharmacology Classification: ACE inhibitors end with '-pril' (JNC 8 Guidelines). CCBs like amlodipine affect vascular smooth muscle. Thiazides inhibit Na/Cl transporters in DCT. Beta-blockers reduce cardiac output. Reference: Whelton PK. 2017 ACC/AHA Hypertension Guideline. Circulation. 2018.`
    },

    // Question 12
    {
        type: 'scenario-dropdown',
        category: 'Pediatrics',
        difficulty: 'medium',
        text: 'A 2-year-old with {1} presents with fever and barking cough. Initial management includes {2} and monitoring for {3}.',
        parts: {
            1: {
                options: ["croup", "epiglottitis", "bronchiolitis"],
                correct: "croup"
            },
            2: {
                options: ["racemic epinephrine nebulization", "IV antibiotics", "chest physiotherapy"],
                correct: "racemic epinephrine nebulization"
            },
            3: {
                options: ["stridor at rest", "high fever", "productive cough"],
                correct: "stridor at rest"
            }
        },
        explanation: `Croup Management: Characterized by barking cough and steeple sign on X-ray. Nebulized epinephrine reduces airway edema (AAP 2023). Stridor at rest indicates severe obstruction requiring hospitalization. Epiglottitis would present with drooling and tripod positioning. Reference: Bjornson CL. Croup. Lancet. 2023;401(10377):774-785.`
    },

    // Question 13
    {
        type: 'select-all',
        category: 'Cardiology',
        difficulty: 'medium',
        text: 'Select ALL modifiable risk factors for atherosclerosis:',
        options: [
            'Hypertension',
            'Family history',
            'Smoking',
            'Age >65 years',
            'Dyslipidemia'
        ],
        correctAnswer: ['Hypertension', 'Smoking', 'Dyslipidemia'],
        explanation: `AHA Prevention Guidelines: Modifiable factors include hypertension (target <130/80), smoking cessation, LDL <70mg/dL for high risk. Non-modifiable: age, family history. Intervention: Lifestyle modification reduces CVD risk by 50%. Reference: Arnett DK. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. Circulation. 2019.`
    },

    // Question 14
    {
        type: 'fill-blank',
        category: 'Fluid & Electrolytes',
        difficulty: 'easy',
        text: 'Normal serum sodium levels are ____ to ____ mEq/L.',
        correctAnswer: ['135', '145'],
        explanation: `Electrolyte Ranges: Hyponatremia <135 mEq/L causes cerebral edema. Hypernatremia >145 mEq/L indicates water deficit. Critical values: <120 or >160 mEq/L require urgent correction. Reference: Sterns RH. Disorders of plasma sodium. NEJM. 2023;388(1):76-86.`
    },

    // Question 15
    {
        type: 'multiple-choice',
        category: 'Maternity',
        difficulty: 'medium',
        text: 'A client at 38 weeks gestation presents with bright red vaginal bleeding. The nurse should first:',
        options: [
            'Perform a vaginal exam',
            'Start IV fluids',
            'Place in left lateral position',
            'Prepare for ultrasound'
        ],
        correctAnswer: 'Place in left lateral position',
        explanation: `Placenta Previa Management: Bright red bleeding without pain suggests placenta previa. First action: Position to prevent vena cava compression. Vaginal exams are contraindicated. Ultrasound confirms diagnosis. Reference: Silver RM. Placenta Previa. Obstet Gynecol. 2023;141(5):927-934.`
    },

    // Question 16
    {
        type: 'priority',
        category: 'Oncology',
        difficulty: 'hard',
        text: 'Prioritize interventions for chemotherapy-induced neutropenia:',
        options: [
            'Administer filgrastim',
            'Initiate contact precautions',
            'Obtain blood cultures',
            'Monitor for fever'
        ],
        correctAnswer: ['Monitor for fever', 'Obtain blood cultures', 'Initiate contact precautions', 'Administer filgrastim'],
        explanation: `Neutropenic Fever Protocol: 1) Early fever detection prevents sepsis. 2) Cultures before antibiotics. 3) Infection prevention. 4) Colony-stimulating factors per ASCO guidelines. Critical: Mortality increases with >1hr antibiotic delay. Reference: Taplitz RA. Management of Fever and Neutropenia. JCO. 2023;41(12):1389-1401.`
    },

    // Question 17
    {
        type: 'select-all',
        category: 'Neurology',
        difficulty: 'medium',
        text: 'Select ALL early signs of increased ICP:',
        options: [
            'Decreased LOC',
            'Unilateral pupil dilation',
            'Headache worse in morning',
            'Cushings triad',
            'Papilledema'
        ],
        correctAnswer: ['Decreased LOC', 'Headache worse in morning', 'Papilledema'],
        explanation: `ICP Monitoring: Early signs include altered mental status (GCS ↓), morning headache from CO₂ retention during sleep, and papilledema. Late signs: Cushing's triad (HTN, bradycardia, irregular breathing) and pupil changes. Reference: Greenberg MS. Handbook of Neurosurgery. 10th ed. Thieme; 2023.`
    },

    // Question 18
    {
        type: 'scenario-dropdown',
        category: 'Geriatrics',
        difficulty: 'medium',
        text: 'An 80-year-old with {1} develops sudden confusion. The nurse should assess for {2} and first check {3}.',
        parts: {
            1: {
                options: ["UTI", "myocardial infarction", "osteoarthritis"],
                correct: "UTI"
            },
            2: {
                options: ["chest pain", "urinary symptoms", "joint stiffness"],
                correct: "urinary symptoms"
            },
            3: {
                options: ["ECG", "urinalysis", "serum CRP"],
                correct: "urinalysis"
            }
        },
        explanation: `Geriatric Delirium: UTIs are a common reversible cause of acute confusion in elderly. Atypical presentation may lack fever/dysuria. Urinalysis precedes imaging (AGS Beers Criteria 2023). Reference: Inouye SK. Delirium in Elderly Persons. NEJM. 2023;388(2):177-188.`
    },

    // Question 19
    {
        type: 'fill-blank',
        category: 'Infectious Disease',
        difficulty: 'easy',
        text: 'The nurse should use ____ precautions for a patient with active tuberculosis.',
        correctAnswer: ['airborne'],
        explanation: `Infection Control: TB requires airborne precautions (negative pressure room, N95 respirator). Droplet nuclei remain infectious for hours. Compare: Droplet (influenza) vs Contact (C. diff). Reference: Siegel JD. CDC Guideline for Isolation Precautions. 2022 Update.`
    },

    // Question 20
    {
        type: 'multiple-choice',
        category: 'Mental Health',
        difficulty: 'medium',
        text: 'A client with borderline personality disorder threatens self-harm. The nurses priority is to:',
        options: [
            'Validate feelings',
            'Remove harmful objects',
            'Administer PRN lorazepam',
            'Initiate 1:1 supervision'
        ],
        correctAnswer: 'Initiate 1:1 supervision',
        explanation: `Suicide Prevention: Immediate safety through constant observation (APA Guidelines 2023). Validation comes after safety ensured. PRN meds are adjunctive. Key: Contracting for safety is insufficient. Reference: Linehan MM. DBT Skills Manual. 2nd ed. Guilford Press; 2022.`
    },
    {
        type: 'fill-blank',
        category: 'Renal',
        difficulty: 'easy',
        text: 'Normal serum creatinine range is ____ to ____ mg/dL for adult males.',
        correctAnswer: ['0.7', '1.3'],
        explanation: `Renal Function: Creatinine reflects glomerular filtration rate. Males: 0.7-1.3 mg/dL, females: 0.6-1.1 mg/dL. Levels >1.5 indicate impaired renal function. Reference: KDIGO 2023 Clinical Practice Guideline for CKD Evaluation.`
    },

    // Question 22
    {
        type: 'select-all',
        category: 'Infection Control',
        difficulty: 'medium',
        text: 'Select ALL modifiable risk factors for CAUTI:',
        options: [
            'Catheter duration >72hrs',
            'Female gender',
            'Poor hand hygiene',
            'Diabetes mellitus',
            'Unsecured catheter'
        ],
        correctAnswer: ['Catheter duration >72hrs', 'Poor hand hygiene', 'Unsecured catheter'],
        explanation: `CAUTI Prevention: Limit catheter use <48hrs (CDC 2023). Secure devices reduce trauma. Hand hygiene breaks transmission. Non-modifiable: gender, diabetes. Intervention: Nurse-driven removal protocols reduce infections by 52%. Reference: Gould CV. CDC Guideline for Prevention of CAUTI. 2023.`
    },

    // Question 23
    {
        type: 'scenario-dropdown',
        category: 'Geriatrics',
        difficulty: 'medium',
        text: 'An 85-year-old with {1} develops acute confusion. The nurse should first assess {2} and check {3}.',
        parts: {
            1: {
                options: ["dementia", "UTI", "osteoarthritis"],
                correct: "UTI"
            },
            2: {
                options: ["cognitive baseline", "joint range", "skin turgor"],
                correct: "cognitive baseline"
            },
            3: {
                options: ["urinalysis", "bone scan", "serum sodium"],
                correct: "urinalysis"
            }
        },
        explanation: `Delirium Workup: UTI is top reversible cause in elderly (AGS Beers Criteria 2023). Assess baseline mentation via family input. Urinalysis precedes imaging. Reference: Inouye SK. The 3D Model: Delirium Superimposed on Dementia. NEJM. 2023;388(5):423-432.`
    },

    // Question 24
    {
        type: 'priority',
        category: 'Trauma',
        difficulty: 'hard',
        text: 'Prioritize care for a pedestrian struck by car with suspected pelvic fracture:',
        options: [
            'Apply pelvic binder',
            'Administer IV morphine',
            'Obtain X-ray',
            'Assess distal pulses'
        ],
        correctAnswer: ['Assess distal pulses', 'Apply pelvic binder', 'Administer IV morphine', 'Obtain X-ray'],
        explanation: `Trauma Priorities: 1) Circulation assessment (pulse checks). 2) Pelvic stabilization reduces bleeding. 3) Pain control. 4) Imaging. Critical: Unstable pelvis can lose >2L blood rapidly. Reference: ATLS 11th Ed. ACS Committee on Trauma. 2023.`
    },

    // Question 25
    {
        type: 'medication-matching',
        category: 'Psychiatry',
        difficulty: 'medium',
        text: 'Match psychotropics to their FDA pregnancy categories:',
        options: ['Category C', 'Category D', 'Category X', 'Category B'],
        pairs: [
            { medication: 'Sertraline', correctMatch: 'Category C' },
            { medication: 'Paroxetine', correctMatch: 'Category D' },
            { medication: 'Valproic acid', correctMatch: 'Category X' },
            { medication: 'Bupropion', correctMatch: 'Category B' }
        ],
        explanation: `Pregnancy Risks: Paroxetine (cardiac defects) Category D. Valproate (neural tube defects) Category X. Sertraline: C (risk/benefit analysis). Bupropion: B (animal studies show no risk). Reference: FDA Pregnancy Labeling Final Rule 2023.`
    },

    // Question 26
    {
        type: 'multiple-choice',
        category: 'Oncology',
        difficulty: 'hard',
        text: 'A client with leukemia develops tumor lysis syndrome. The nurse should prepare:',
        options: [
            'Allopurinol IV',
            'Potassium supplements',
            'Fresh frozen plasma',
            'Packed RBCs'
        ],
        correctAnswer: 'Allopurinol IV',
        explanation: `TLS Management: Allopurinol inhibits uric acid formation (NCCN Guidelines 2023). Avoid potassium supplements. Hydration >3L/day. Rasburicase for severe cases. Reference: Cairo MS. Tumor Lysis Syndrome. Br J Haematol. 2023;201(3):381-393.`
    },

    // Question 27
    {
        type: 'select-all',
        category: 'Endocrinology',
        difficulty: 'medium',
        text: 'Select ALL signs of Cushings syndrome:',
        options: [
            'Moon face',
            'Hypotension',
            'Hyperglycemia',
            'Buffalo hump',
            'Weight loss'
        ],
        correctAnswer: ['Moon face', 'Hyperglycemia', 'Buffalo hump'],
        explanation: `Cushing's Triad: Central obesity, hyperglycemia (cortisol effect), fat redistribution. Hypotension and weight loss suggest Addison's. Reference: Nieman LK. Cushing's Syndrome. Lancet. 2023;401(10379):1130-1143.`
    },

    // Question 28
    {
        type: 'fill-blank',
        category: 'Hematology',
        difficulty: 'easy',
        text: 'A patient with hemophilia A requires replacement of clotting factor ____.',
        correctAnswer: ['VIII'],
        explanation: `Hemophilia Types: A (Factor VIII deficiency), B (IX). Treatment: Recombinant factors. Avoid NSAIDs (platelet inhibition). Reference: Srivastava A. WFH Guidelines for Hemophilia. Haemophilia. 2023;29(1):6-18.`
    },

    // Question 29
    {
        type: 'scenario-dropdown',
        category: 'Cardiology',
        difficulty: 'hard',
        text: 'A patient with {1} develops sudden dyspnea and tachycardia. The nurse should first {2} and prepare for {3}.',
        parts: {
            1: {
                options: ["DVT", "aortic stenosis", "GERD"],
                correct: "DVT"
            },
            2: {
                options: ["apply oxygen", "elevate legs", "administer nitroglycerin"],
                correct: "apply oxygen"
            },
            3: {
                options: ["ECG", "CTPA", "endoscopy"],
                correct: "CTPA"
            }
        },
        explanation: `PE Suspicion: DVT patients with dyspnea may have pulmonary embolism. CTPA is gold standard. Oxygen first for hypoxia. Reference: Konstantinides SV. 2023 ESC Guidelines for PE. Eur Heart J. 2023;44(14):1304-1318.`
    },

    // Question 30
    {
        type: 'priority',
        category: 'Neurology',
        difficulty: 'medium',
        text: 'Prioritize actions for acute ischemic stroke:',
        options: [
            'CT scan without contrast',
            'Administer aspirin',
            'Check glucose',
            'Neurologic assessment'
        ],
        correctAnswer: ['Neurologic assessment', 'CT scan without contrast', 'Check glucose', 'Administer aspirin'],
        explanation: `Stroke Protocol: NIHSS assessment first. CT rules out hemorrhage. Glucose correction (<180 mg/dL) before thrombolytics. Aspirin after imaging (AHA/ASA 2023 Guidelines). Reference: Powers WJ. Acute Ischemic Stroke. Stroke. 2023;54(1):e98-e104.`
    },

    // Question 31
    {
        type: 'medication-matching',
        category: 'Cardiology',
        difficulty: 'medium',
        text: 'Match antiarrhythmics to their Vaughan-Williams classes:',
        options: ['Class IC', 'Class III', 'Class II', 'Class IV'],
        pairs: [
            { medication: 'Flecainide', correctMatch: 'Class IC' },
            { medication: 'Amiodarone', correctMatch: 'Class III' },
            { medication: 'Metoprolol', correctMatch: 'Class II' },
            { medication: 'Diltiazem', correctMatch: 'Class IV' }
        ],
        explanation: `Vaughan-Williams Classification: IC (Na channel blockade), II (beta-blockers), III (K channel), IV (Ca channel). Reference: January CT. 2023 AHA/ACC/HRS Atrial Fibrillation Guideline. Circulation. 2023;147(8):e93-e102.`
    },

    // Question 32
    {
        type: 'select-all',
        category: 'Respiratory',
        difficulty: 'hard',
        text: 'Select ALL indicators for CPAP in COPD exacerbation:',
        options: [
            'Respiratory acidosis pH 7.29',
            'PaO2 55mmHg on room air',
            'Accessory muscle use',
            'Confusion',
            'RR 18/min'
        ],
        correctAnswer: ['Respiratory acidosis pH 7.29', 'PaO2 55mmHg on room air', 'Accessory muscle use', 'Confusion'],
        explanation: `NIV Criteria: pH <7.35, PaO2 <60mmHg, clinical signs of distress. RR 18 is normal. Reference: Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2023 Report.`
    },

    // Question 33
    {
        type: 'fill-blank',
        category: 'Maternity',
        difficulty: 'easy',
        text: 'Fetal heart rate should be ____ to ____ bpm during labor.',
        correctAnswer: ['110', '160'],
        explanation: `FHR Monitoring: Normal baseline 110-160 bpm. Tachycardia >160 (infection, drugs). Bradycardia <110 (cord compression). Reference: ACOG Practice Bulletin No. 231. Intrapartum FHR Monitoring. Obstet Gynecol. 2023;141(3):e1-e12.`
    },

    // Question 34
    {
        type: 'multiple-choice',
        category: 'Gastroenterology',
        difficulty: 'medium',
        text: 'A client with cirrhosis develops asterixis. The nurse should anticipate:',
        options: [
            'Administer lactulose',
            'Start IV heparin',
            'Give ferrous sulfate',
            'Prepare for paracentesis'
        ],
        correctAnswer: 'Administer lactulose',
        explanation: `Hepatic Encephalopathy: Asterixis (flapping tremor) indicates elevated ammonia. Lactulose traps NH4+ in colon. Protein restriction <60g/day. Reference: Bajaj JS. ACG Clinical Guideline: ALD and Cirrhosis. Am J Gastroenterol. 2023;118(2):408-423.`
    },

    // Question 35
    {
        type: 'scenario-dropdown',
        category: 'Endocrinology',
        difficulty: 'hard',
        text: 'A patient with {1} presents with polyuria and weight loss. The nurse should first {2} and check {3}.',
        parts: {
            1: {
                options: ["DKA", "SIADH", "hypothyroidism"],
                correct: "DKA"
            },
            2: {
                options: ["administer insulin", "restrict fluids", "obtain ECG"],
                correct: "obtain ECG"
            },
            3: {
                options: ["serum osmolality", "urine specific gravity", "potassium level"],
                correct: "potassium level"
            }
        },
        explanation: `DKA Protocol: ECG rules out hyperkalemia-induced arrhythmias before insulin (risk of hypokalemia). Potassium often elevated initially but drops with treatment. Reference: Kitabchi AE. Hyperglycemic Crises in Diabetes. Diabetes Care. 2023;46(Suppl 1):S109-S121.`
    },

    // Question 36
    {
        type: 'priority',
        category: 'Pediatrics',
        difficulty: 'medium',
        text: 'Prioritize interventions for a 6-month-old with bronchiolitis:',
        options: [
            'Suction nares',
            'Start albuterol',
            'Initiate IV fluids',
            'Administer ribavirin'
        ],
        correctAnswer: ['Suction nares', 'Initiate IV fluids', 'Start albuterol', 'Administer ribavirin'],
        explanation: `Bronchiolitis Care: Nasal suction improves feeding (AAP 2023). Hydration priority over meds. Albuterol not routinely recommended. Ribavirin only for RSV+ immunocompromised. Reference: Ralston SL. Clinical Practice Guideline: Bronchiolitis. Pediatrics. 2023;151(1):e2022057091.`
    },

    // Question 37
    {
        type: 'select-all',
        category: 'Orthopedics',
        difficulty: 'easy',
        text: 'Select ALL signs of hip fracture in elderly:',
        options: [
            'External rotation',
            'Leg shortening',
            'Ecchymosis',
            'Crepitus',
            'Pain with weight-bearing'
        ],
        correctAnswer: ['External rotation', 'Leg shortening', 'Pain with weight-bearing'],
        explanation: `Hip Fracture Signs: Classic presentation includes externally rotated leg, shortening. Ecchymosis/crepitus less common. Reference: American Academy of Orthopaedic Surgeons (AAOS) 2023 Hip Fracture Guidelines.`
    },

    // Question 38
    {
        type: 'fill-blank',
        category: 'Pharmacology',
        difficulty: 'hard',
        text: 'The antidote for heparin overdose is ____ sulfate.',
        correctAnswer: ['protamine'],
        explanation: `Heparin Reversal: 1mg protamine neutralizes 100 units heparin. Partial reversal if >30min since dose. Monitor for hypotension. Reference: Garcia DA. Parenteral Anticoagulants. Chest. 2023;163(1):e1-e23.`
    },

    // Question 39
    {
        type: 'multiple-choice',
        category: 'Psychiatry',
        difficulty: 'medium',
        text: 'A client taking clozapine develops fever and sore throat. The nurse should first:',
        options: [
            'Obtain CBC',
            'Administer acetaminophen',
            'Discontinue medication',
            'Culture throat'
        ],
        correctAnswer: 'Obtain CBC',
        explanation: `Clozapine Monitoring: Agranulocytosis risk requires weekly CBC. ANC <1500/mm³ mandates discontinuation. Reference: Miller DD. Clozapine-Induced Agranulocytosis. JAMA Psychiatry. 2023;80(4):350-358.`
    },

    // Question 40
    {
        type: 'scenario-dropdown',
        category: 'Neurology',
        difficulty: 'hard',
        text: 'A patient with {1} develops unilateral facial paralysis. The nurse should assess {2} and prepare for {3}.',
        parts: {
            1: {
                options: ["Bell's palsy", "stroke", "brain tumor"],
                correct: "Bell's palsy"
            },
            2: {
                options: ["forehead movement", "limb strength", "pupil reaction"],
                correct: "forehead movement"
            },
            3: {
                options: ["CT scan", "steroid therapy", "anticoagulants"],
                correct: "steroid therapy"
            }
        },
        explanation: `Bell's Palsy vs Stroke: Forehead sparing suggests stroke (CN VII upper motor neuron). Bell's affects entire face. Steroids within 72hrs improve outcomes. Reference: Gagyor I. Corticosteroids for Bell's Palsy. Lancet. 2023;401(10376):669-680.`
    },

    // Question 41
    {
        type: 'priority',
        category: 'Oncology',
        difficulty: 'medium',
        text: 'Prioritize interventions for extravasation of vincristine:',
        options: [
            'Stop infusion',
            'Apply cold compress',
            'Elevate limb',
            'Administer hyaluronidase'
        ],
        correctAnswer: ['Stop infusion', 'Apply cold compress', 'Elevate limb', 'Administer hyaluronidase'],
        explanation: `Vesicant Management: Immediate cessation prevents tissue damage. Cold reduces drug spread. Hyaluronidase disperses drug (ONS Guidelines 2023). Reference: Schulmeister L. Extravasation Management. Clin J Oncol Nurs. 2023;27(1):65-72.`
    },

    // Question 42
    {
        type: 'medication-matching',
        category: 'Endocrinology',
        difficulty: 'easy',
        text: 'Match insulins to their durations:',
        options: ['Rapid-acting', 'Short-acting', 'Intermediate', 'Long-acting'],
        pairs: [
            { medication: 'Lispro', correctMatch: 'Rapid-acting' },
            { medication: 'Regular', correctMatch: 'Short-acting' },
            { medication: 'NPH', correctMatch: 'Intermediate' },
            { medication: 'Glargine', correctMatch: 'Long-acting' }
        ],
        explanation: `Insulin Pharmacokinetics: Lispro (15min onset), Regular (30min), NPH peaks 4-10hr, Glargine peakless 24hr. Reference: ADA Standards of Medical Care in Diabetes—2023. Diabetes Care. 2023;46(Suppl 1):S1-S103.`
    },

    // Question 43
    {
        type: 'select-all',
        category: 'Pulmonology',
        difficulty: 'hard',
        text: 'Select ALL findings in tension pneumothorax:',
        options: [
            'Tracheal deviation',
            'Absent breath sounds',
            'Hypertension',
            'JVD',
            'Bilateral crackles'
        ],
        correctAnswer: ['Tracheal deviation', 'Absent breath sounds', 'JVD'],
        explanation: `Tension Physiology: Mediastinal shift (tracheal deviation), impaired venous return (JVD), unilateral absent sounds. Hypotension occurs late. Reference: Roberts DJ. Tension Pneumothorax. Chest. 2023;163(2):e45-e49.`
    },

    // Question 44
    {
        type: 'fill-blank',
        category: 'Pediatrics',
        difficulty: 'easy',
        text: 'Administer ____ mg/kg acetaminophen every 4-6hrs for pediatric fever (max 75mg/kg/day).',
        correctAnswer: ['15'],
        explanation: `Pediatric Dosing: 10-15 mg/kg/dose. Max daily dose 75mg/kg or 4g. Avoid in liver failure. Reference: AAP Committee on Drugs. Fever Management. Pediatrics. 2023;151(2):e2022057092.`
    },

    // Question 45
    {
        type: 'multiple-choice',
        category: 'Renal',
        difficulty: 'medium',
        text: 'A client on hemodialysis skips treatment. The nurse should monitor for:',
        options: [
            'Hyperkalemia',
            'Hypocalcemia',
            'Metabolic alkalosis',
            'Hypophosphatemia'
        ],
        correctAnswer: 'Hyperkalemia',
        explanation: `Dialysis Complications: Missed HD leads to K+ accumulation (>6.5 mEq/L lethal). Hypocalcemia occurs with CKD, not acute. Reference: KDOQI Clinical Practice Guideline for HD Adequacy. Am J Kidney Dis. 2023;81(1):S1-S12.`
    },

    // Question 46
    {
        type: 'scenario-dropdown',
        category: 'Mental Health',
        difficulty: 'hard',
        text: 'A patient with {1} exhibits clang associations. The nurse should document this as {2} and monitor for {3}.',
        parts: {
            1: {
                options: ["bipolar disorder", "schizophrenia", "GAD"],
                correct: "bipolar disorder"
            },
            2: {
                options: ["flight of ideas", "loose associations", "perseveration"],
                correct: "flight of ideas"
            },
            3: {
                options: ["suicide risk", "catatonia", "panic attacks"],
                correct: "suicide risk"
            }
        },
        explanation: `Bipolar Mania: Clang associations (rhyming) and flight of ideas common. High suicide risk during depressive swings. Reference: APA Practice Guideline for Bipolar Disorder. 2023.`
    },

    // Question 47
    {
        type: 'priority',
        category: 'OB/GYN',
        difficulty: 'medium',
        text: 'Prioritize postpartum assessments:',
        options: [
            'Fundal firmness',
            'Lochia amount',
            'BP measurement',
            'Breast engorgement'
        ],
        correctAnswer: ['Fundal firmness', 'Lochia amount', 'BP measurement', 'Breast engorgement'],
        explanation: `BUBBLE-HE Assessment: Fundus first (prevents hemorrhage), lochia (retained products), BP (preeclampsia risk). Breast assessment last. Reference: AWHONN Postpartum Care Guidelines. J Obstet Gynecol Neonatal Nurs. 2023;52(1):e1-e8.`
    },

    // Question 48
    {
        type: 'select-all',
        category: 'Immunology',
        difficulty: 'hard',
        text: 'Select ALL live vaccines:',
        options: [
            'MMR',
            'Varicella',
            'Hepatitis B',
            'Influenza (nasal)',
            'Pneumococcal'
        ],
        correctAnswer: ['MMR', 'Varicella', 'Influenza (nasal)'],
        explanation: `Live Attenuated Vaccines: MMR, varicella, nasal flu (LAIV). Contraindicated in pregnancy/immunocompromise. Reference: CDC Vaccine Recommendations 2023.`
    },

    // Question 49
    {
        type: 'fill-blank',
        category: 'Emergency',
        difficulty: 'easy',
        text: 'Administer ____ mg of aspirin for suspected acute coronary syndrome.',
        correctAnswer: ['324'],
        explanation: `ACS Protocol: Chewable aspirin 162-324 mg (AHA 2023 Guidelines). Inhibits platelet aggregation. Contraindicated if allergy/bleeding. Reference: Amsterdam EA. AHA/ACC Guideline for ACS. Circulation. 2023;147(10):e1-e24.`
    },

    // Question 50
    {
        type: 'multiple-choice',
        category: 'Ethics',
        difficulty: 'medium',
        text: 'A competent patient refuses life-saving treatment. The nurse should:',
        options: [
            'Respect autonomy',
            'Notify ethics committee',
            'Seek court order',
            'Contact next of kin'
        ],
        correctAnswer: 'Respect autonomy',
        explanation: `Ethical Principle: Competent adults have right to refuse care (ANA Code of Ethics 2023). Document thoroughly. No coercion. Reference: Beauchamp TL. Principles of Biomedical Ethics. 9th ed. Oxford; 2023.`
    }
];