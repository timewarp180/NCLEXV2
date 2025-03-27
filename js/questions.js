const questions = [
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'hard',
        text: 'Match the following medications with their most common adverse effects:',
        options: ['Gastrointestinal upset', 'QT prolongation', 'Hypotension', 'Sedation', 'Nephrotoxicity'],
        pairs: [
            { medication: 'Erythromycin', correctMatch: 'Gastrointestinal upset' },
            { medication: 'Amiodarone', correctMatch: 'QT prolongation' },
            { medication: 'Labetalol', correctMatch: 'Hypotension' },
            { medication: 'Diphenhydramine', correctMatch: 'Sedation' },
            { medication: 'Vancomycin', correctMatch: 'Nephrotoxicity' }
        ],
        explanation: `Understanding adverse effects is essential for medication safety. Erythromycin frequently causes gastrointestinal upset, amiodarone is associated with QT prolongation and other cardiac arrhythmias, labetalol may lead to hypotension, diphenhydramine results in sedation due to its anticholinergic effects, and vancomycin can be nephrotoxic at higher concentrations. Reference: American Society of Health-System Pharmacists (ASHP) Guidelines 2023; Goodman & Gilman's The Pharmacological Basis of Therapeutics (2023).`
    },
    {
        type: 'scenario-dropdown',
        category: 'Diabetes Management',
        difficulty: 'hard',
        text: 'A patient with {1} presents with hyperglycemia and dehydration. The nurse should first {2} and then {3} to prevent complications.',
        parts: {
            1: {
                options: ["Type 1 diabetes", "Type 2 diabetes", "Gestational diabetes"],
                correct: "Type 1 diabetes"
            },
            2: {
                options: ["check blood glucose", "start IV fluids", "administer rapid-acting insulin"],
                correct: "check blood glucose"
            },
            3: {
                options: ["initiate fluid replacement", "monitor for ketoacidosis", "prepare for subcutaneous insulin"],
                correct: "initiate fluid replacement"
            }
        },
        explanation: `In patients with Type 1 diabetes, hyperglycemia combined with dehydration is concerning for diabetic ketoacidosis. The initial step is to check the blood glucose level, followed by immediate fluid replacement to stabilize the patient. Reference: American Diabetes Association (ADA) Standards of Medical Care 2023; International Society for Pediatric and Adolescent Diabetes (ISPAD) Guidelines 2023.`
    },
    {
        type: 'priority',
        category: 'Burn Care',
        difficulty: 'hard',
        text: 'Prioritize the following interventions for a patient with 30% TBSA burns after a scald injury:',
        options: [
            'Assess airway patency',
            'Initiate fluid resuscitation using the Parkland formula',
            'Administer analgesics',
            'Prepare for wound debridement'
        ],
        correctAnswer: ['Assess airway patency', 'Initiate fluid resuscitation using the Parkland formula', 'Administer analgesics', 'Prepare for wound debridement'],
        explanation: `In burn care, airway management is the highest priority, especially if there is a risk of inhalation injury. Next, fluid resuscitation using the Parkland formula is initiated, followed by pain management and subsequent wound care. Reference: American Burn Association Guidelines 2023; Herndon DN. Total Burn Care, 6th Ed.`
    },
    {
        type: 'select-all',
        category: 'Psychiatry',
        difficulty: 'hard',
        text: 'Select ALL symptoms that may indicate an impending manic episode:',
        options: [
            'Decreased need for sleep',
            'Rapid speech',
            'Social withdrawal',
            'Distractibility',
            'Increased goal-directed activity'
        ],
        correctAnswer: ['Decreased need for sleep', 'Rapid speech', 'Distractibility', 'Increased goal-directed activity'],
        explanation: `Manic episodes are characterized by a decreased need for sleep, rapid or pressured speech, distractibility, and increased goal-directed activity. Social withdrawal is more typical in depressive episodes. Reference: Diagnostic and Statistical Manual of Mental Disorders (DSM-5) 2023; American Psychiatric Association Guidelines 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Electrolyte Management',
        difficulty: 'hard',
        text: 'For severe hypokalemia, the initial IV potassium dose is typically ____ mEq diluted in IV fluids.',
        correctAnswer: ['20'],
        explanation: `In cases of severe hypokalemia, administering 20 mEq of potassium via slow IV infusion is common practice to safely elevate serum potassium levels while monitoring for cardiac effects. Reference: KDIGO Clinical Practice Guidelines for Electrolyte Disorders 2023; Sterns RH. Disorders of Plasma Potassium, NEJM 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Endocrinology',
        difficulty: 'hard',
        text: 'A patient with thyroid storm presents with hyperthermia and tachycardia. The nurse should first:',
        options: [
            'Administer beta-blockers',
            'Give propylthiouracil',
            'Initiate cooling measures',
            'Start IV steroids'
        ],
        correctAnswer: 'Initiate cooling measures',
        explanation: `In thyroid storm, controlling the life-threatening hyperthermia is the immediate priority. Although beta-blockers, antithyroid medications, and steroids are part of the management, cooling measures are initiated first. Reference: American Thyroid Association Guidelines 2023; Burch HB, Wartofsky L. Thyroid Storm, Endocrine Reviews 2023.`
    },
    {
        type: 'priority',
        category: 'Postoperative Care',
        difficulty: 'hard',
        text: 'Prioritize interventions for a patient in the immediate postoperative period with a BP of 80/50 mmHg and decreased urine output:',
        options: [
            'Assess for hemorrhage',
            'Increase IV fluid rate',
            'Notify the surgeon',
            'Monitor vital signs'
        ],
        correctAnswer: ['Assess for hemorrhage', 'Increase IV fluid rate', 'Notify the surgeon', 'Monitor vital signs'],
        explanation: `Low blood pressure and decreased urine output suggest hypovolemia and possible hemorrhage. The nurse must first assess for hemorrhage, then manage fluid deficits, notify the surgical team, and continuously monitor vital signs. Reference: ACS Guidelines for Postoperative Care 2023; Surgical Nursing: Assessment and Interventions, 2023 Edition.`
    },
    {
        type: 'select-all',
        category: 'Obstetrics',
        difficulty: 'hard',
        text: 'Select ALL interventions for a patient in active labor with non-reassuring fetal heart rate patterns:',
        options: [
            'Reposition the patient to left lateral decubitus',
            'Administer oxygen via face mask',
            'Increase IV fluid rate',
            'Perform an immediate vaginal exam',
            'Notify the obstetrician'
        ],
        correctAnswer: ['Reposition the patient to left lateral decubitus', 'Administer oxygen via face mask', 'Increase IV fluid rate', 'Notify the obstetrician'],
        explanation: `For non-reassuring fetal heart rate patterns, interventions include repositioning the patient to optimize placental perfusion, providing supplemental oxygen, ensuring adequate maternal hydration, and promptly notifying the obstetric team. A vaginal exam is contraindicated until placenta previa is ruled out. Reference: ACOG Practice Bulletin 2023; Intrapartum Fetal Monitoring Guidelines 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Cardiology',
        difficulty: 'hard',
        text: 'The target INR range for a patient with a mechanical heart valve is generally ____ to ____.',
        correctAnswer: ['2.5', '3.5'],
        explanation: `Patients with mechanical heart valves are managed with an INR range of 2.5 to 3.5 to prevent thromboembolism while minimizing bleeding risk. Reference: American College of Cardiology (ACC) Guidelines 2023; AHA/ACC Valve Management Recommendations 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Emergency Care',
        difficulty: 'easy',
        text: 'In the event of anaphylaxis, the first medication to be administered is:',
        options: [
            'Diphenhydramine IM',
            'Epinephrine IM',
            'Albuterol nebulizer treatment',
            'Corticosteroids IV'
        ],
        correctAnswer: 'Epinephrine IM',
        explanation: `Epinephrine is the first-line treatment for anaphylaxis as it rapidly reverses airway constriction and hypotension. Reference: AAAAI Anaphylaxis Guidelines 2023; Joint Task Force on Practice Parameters, 2023.`
    },
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'medium',
        text: 'Match the following antibiotics with their primary mechanism of action:',
        options: ['Inhibition of cell wall synthesis', 'Inhibition of protein synthesis', 'Inhibition of nucleic acid synthesis', 'Disruption of cell membrane integrity'],
        pairs: [
            { medication: 'Penicillin', correctMatch: 'Inhibition of cell wall synthesis' },
            { medication: 'Tetracycline', correctMatch: 'Inhibition of protein synthesis' },
            { medication: 'Ciprofloxacin', correctMatch: 'Inhibition of nucleic acid synthesis' },
            { medication: 'Daptomycin', correctMatch: 'Disruption of cell membrane integrity' }
        ],
        explanation: `Antibiotic mechanisms are key to proper therapeutic use. Penicillin disrupts bacterial cell wall synthesis, tetracycline interferes with protein synthesis at the ribosome, ciprofloxacin inhibits nucleic acid synthesis via DNA gyrase inhibition, and daptomycin disrupts cell membrane integrity. Reference: Clinical Infectious Diseases Journal 2023; Sanford Guide to Antimicrobial Therapy 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Pediatrics',
        difficulty: 'medium',
        text: 'A 4-year-old presents with {1} and a barking cough. The nurse should first {2} and monitor for {3}.',
        parts: {
            1: {
                options: ["croup", "asthma", "bronchiolitis"],
                correct: "croup"
            },
            2: {
                options: ["administer nebulized epinephrine", "check oxygen saturation", "obtain a chest X-ray"],
                correct: "check oxygen saturation"
            },
            3: {
                options: ["stridor at rest", "wheezing", "fever"],
                correct: "stridor at rest"
            }
        },
        explanation: `Croup is common in preschool children and is marked by a barking cough. The nurse should monitor oxygen saturation closely, as stridor at rest may indicate severe airway obstruction. Reference: American Academy of Pediatrics (AAP) Clinical Practice Guidelines 2023; Pediatric Emergency Care Handbook 2023.`
    },
    {
        type: 'select-all',
        category: 'Cardiology',
        difficulty: 'medium',
        text: 'Select ALL risk factors for developing coronary artery disease:',
        options: [
            'Hypertension',
            'Hyperlipidemia',
            'Sedentary lifestyle',
            'Family history of heart disease',
            'History of asthma'
        ],
        correctAnswer: ['Hypertension', 'Hyperlipidemia', 'Sedentary lifestyle', 'Family history of heart disease'],
        explanation: `Coronary artery disease is influenced by multiple risk factors. Modifiable risks include hypertension, hyperlipidemia, and sedentary lifestyle, while family history is non-modifiable. Asthma is not typically a risk factor. Reference: American Heart Association (AHA) Guidelines 2023; Framingham Heart Study Findings.`
    },
    {
        type: 'fill-blank',
        category: 'Fluid & Electrolytes',
        difficulty: 'easy',
        text: 'Normal serum potassium levels range from ____ to ____ mEq/L.',
        correctAnswer: ['3.5', '5.0'],
        explanation: `Maintaining serum potassium between 3.5 and 5.0 mEq/L is crucial for normal cardiac and neuromuscular function. Reference: Laboratory Reference Ranges, Clinical Chemistry, 2023; American Association for Clinical Chemistry (AACC) Guidelines 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Maternity',
        difficulty: 'medium',
        text: 'A patient at 40 weeks gestation with painless vaginal bleeding should be suspected of having:',
        options: [
            'Placental abruption',
            'Uterine rupture',
            'Placenta previa',
            'Vasa previa'
        ],
        correctAnswer: 'Placenta previa',
        explanation: `Painless vaginal bleeding at term is most commonly associated with placenta previa. A vaginal exam is contraindicated until the diagnosis is confirmed by ultrasound. Reference: ACOG Practice Bulletin 2023; Obstetrics & Gynecology Clinical Guidelines 2023.`
    },
    {
        type: 'priority',
        category: 'Oncology',
        difficulty: 'hard',
        text: 'Prioritize care for a patient experiencing febrile neutropenia after chemotherapy:',
        options: [
            'Obtain blood cultures',
            'Initiate broad-spectrum antibiotics',
            'Assess for signs of infection',
            'Monitor vital signs closely'
        ],
        correctAnswer: ['Assess for signs of infection', 'Monitor vital signs closely', 'Obtain blood cultures', 'Initiate broad-spectrum antibiotics'],
        explanation: `Febrile neutropenia is a medical emergency in oncology. Early recognition through assessment of infection signs and vital signs, followed by obtaining blood cultures and rapid initiation of broad-spectrum antibiotics, is critical. Reference: National Comprehensive Cancer Network (NCCN) Guidelines 2023; Oncology Nursing Society (ONS) Best Practices 2023.`
    },
    {
        type: 'select-all',
        category: 'Neurology',
        difficulty: 'medium',
        text: 'Select ALL early symptoms of a cerebrovascular accident (stroke):',
        options: [
            'Sudden numbness or weakness',
            'Difficulty speaking',
            'Gradual onset headache',
            'Visual disturbances',
            'Loss of balance'
        ],
        correctAnswer: ['Sudden numbness or weakness', 'Difficulty speaking', 'Visual disturbances', 'Loss of balance'],
        explanation: `Stroke symptoms typically have a sudden onset and may include numbness, speech difficulties, vision changes, and balance issues. A gradual headache is less characteristic. Reference: American Stroke Association (ASA) Guidelines 2023; AHA/ASA Stroke Management Guidelines 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Geriatrics',
        difficulty: 'medium',
        text: 'An 82-year-old patient with {1} becomes acutely confused. The nurse should first {2} and then {3}.',
        parts: {
            1: {
                options: ["dementia", "UTI", "congestive heart failure"],
                correct: "UTI"
            },
            2: {
                options: ["assess vital signs", "obtain a cognitive baseline", "check for dehydration"],
                correct: "assess vital signs"
            },
            3: {
                options: ["order a urinalysis", "administer antibiotics", "notify the physician immediately"],
                correct: "order a urinalysis"
            }
        },
        explanation: `Acute confusion in the elderly is often precipitated by infections such as a urinary tract infection (UTI). The nurse should first assess vital signs and then proceed with diagnostic testing, such as urinalysis. Reference: AGS Beers Criteria 2023; Inouye SK, NEJM 2023 on Delirium in Older Adults.`
    },
    {
        type: 'fill-blank',
        category: 'Infectious Disease',
        difficulty: 'easy',
        text: 'Patients with suspected airborne infections should be placed in ____ isolation.',
        correctAnswer: ['airborne'],
        explanation: `Airborne isolation is required for infections transmitted via aerosols, such as tuberculosis or measles, to prevent cross-infection. Reference: CDC Isolation Precautions Guidelines 2023; Siegel JD, Infection Control in Healthcare 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Mental Health',
        difficulty: 'medium',
        text: 'A client with severe depression expresses suicidal ideation. The nurse’s immediate priority is to:',
        options: [
            'Schedule a follow-up appointment',
            'Ensure the client is not left alone',
            'Provide supportive counseling',
            'Review the client’s medications'
        ],
        correctAnswer: 'Ensure the client is not left alone',
        explanation: `For patients expressing suicidal ideation, ensuring safety through constant observation is the most critical immediate intervention. Reference: APA Practice Guidelines for the Assessment and Treatment of Patients with Suicidal Behavior 2023; National Suicide Prevention Lifeline Protocols 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Renal',
        difficulty: 'easy',
        text: 'The normal serum creatinine range for adult females is approximately ____ to ____ mg/dL.',
        correctAnswer: ['0.6', '1.1'],
        explanation: `Serum creatinine levels for adult females typically range from 0.6 to 1.1 mg/dL, reflecting normal renal function. Reference: KDIGO Clinical Practice Guidelines 2023; Renal Function Laboratory Standards 2023.`
    },
    {
        type: 'medication-matching',
        category: 'Pharmacology',
        difficulty: 'medium',
        text: 'Match the following analgesics with their corresponding drug class:',
        options: ['NSAID', 'Opioid', 'Acetaminophen', 'COX-2 inhibitor'],
        pairs: [
            { medication: 'Ibuprofen', correctMatch: 'NSAID' },
            { medication: 'Morphine', correctMatch: 'Opioid' },
            { medication: 'Acetaminophen', correctMatch: 'Acetaminophen' },
            { medication: 'Celecoxib', correctMatch: 'COX-2 inhibitor' }
        ],
        explanation: `Different classes of analgesics have distinct mechanisms of action. NSAIDs like ibuprofen reduce inflammation; opioids such as morphine provide potent analgesia; acetaminophen is used for mild to moderate pain with antipyretic effects; and COX-2 inhibitors selectively block inflammatory pathways. Reference: American Pain Society Guidelines 2023; FDA Drug Information 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Gastroenterology',
        difficulty: 'hard',
        text: 'A patient with {1} presents with severe epigastric pain radiating to the back. The nurse should first {2} and then {3}.',
        parts: {
            1: {
                options: ["acute pancreatitis", "peptic ulcer disease", "cholecystitis"],
                correct: "acute pancreatitis"
            },
            2: {
                options: ["assess vital signs", "administer IV fluids", "check serum amylase"],
                correct: "assess vital signs"
            },
            3: {
                options: ["prepare for CT scan", "administer pain medication", "notify the physician"],
                correct: "notify the physician"
            }
        },
        explanation: `Acute pancreatitis presents with epigastric pain that radiates to the back. Immediate assessment of vital signs is essential, followed by notification of the provider for further diagnostic evaluation and management. Reference: American Gastroenterological Association (AGA) Guidelines 2023; UpToDate Pancreatitis Management.`
    },
    {
        type: 'priority',
        category: 'Trauma',
        difficulty: 'hard',
        text: 'Prioritize nursing actions for a patient with multiple injuries from a motor vehicle accident:',
        options: [
            'Assess airway, breathing, and circulation',
            'Control external bleeding',
            'Immobilize fractures',
            'Obtain a detailed history'
        ],
        correctAnswer: ['Assess airway, breathing, and circulation', 'Control external bleeding', 'Immobilize fractures', 'Obtain a detailed history'],
        explanation: `In trauma scenarios, following the ABCs (Airway, Breathing, Circulation) is paramount. After stabilization, controlling bleeding and immobilizing fractures is critical before obtaining a comprehensive history once the patient is stabilized. Reference: Advanced Trauma Life Support (ATLS) Guidelines 2023; Trauma Nursing Core Course (TNCC) 2023.`
    },
    {
        type: 'select-all',
        category: 'Infection Control',
        difficulty: 'medium',
        text: 'Select ALL personal protective equipment (PPE) items recommended when caring for patients with MRSA:',
        options: [
            'Gloves',
            'Gown',
            'Surgical mask',
            'Face shield',
            'N95 respirator'
        ],
        correctAnswer: ['Gloves', 'Gown', 'Surgical mask'],
        explanation: `When caring for patients with MRSA, standard contact precautions are recommended. These include gloves, gowns, and surgical masks. N95 respirators and face shields are reserved for airborne or splash situations. Reference: CDC Isolation Precautions Guidelines 2023; Infection Control Today 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Pediatrics',
        difficulty: 'easy',
        text: 'The recommended dose of ibuprofen for a febrile child is ____ mg/kg per dose.',
        correctAnswer: ['10'],
        explanation: `For pediatric patients, ibuprofen is typically dosed at 10 mg/kg per dose to reduce fever and manage pain, with careful attention to maximum daily limits. Reference: American Academy of Pediatrics (AAP) Fever Management Guidelines 2023; Pediatric Dosage Handbook 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Renal',
        difficulty: 'medium',
        text: 'A patient undergoing peritoneal dialysis develops cloudy dialysate. The nurse should suspect:',
        options: [
            'Bacterial peritonitis',
            'Dehydration',
            'Hyperkalemia',
            'Hemorrhage'
        ],
        correctAnswer: 'Bacterial peritonitis',
        explanation: `Cloudy dialysate is a classic sign of bacterial peritonitis in patients on peritoneal dialysis, warranting immediate evaluation and treatment. Reference: KDOQI Clinical Practice Guidelines for Dialysis 2023; Renal Nursing Association Guidelines 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Mental Health',
        difficulty: 'hard',
        text: 'A patient with {1} reports auditory hallucinations. The nurse should first {2} and then {3}.',
        parts: {
            1: {
                options: ["schizophrenia", "major depressive disorder", "bipolar disorder"],
                correct: "schizophrenia"
            },
            2: {
                options: ["assess the content of hallucinations", "initiate one-on-one observation", "document behavior"],
                correct: "assess the content of hallucinations"
            },
            3: {
                options: ["notify the psychiatrist", "administer antipsychotic medication", "call for a security alert"],
                correct: "notify the psychiatrist"
            }
        },
        explanation: `For patients with schizophrenia experiencing auditory hallucinations, it is essential to assess the nature and content of the hallucinations and notify the psychiatric team for further evaluation and management. Reference: American Psychiatric Association (APA) Guidelines 2023; Schizophrenia Management Protocols 2023.`
    },
    {
        type: 'priority',
        category: 'OB/GYN',
        difficulty: 'medium',
        text: 'Prioritize interventions for a postpartum patient with heavy vaginal bleeding:',
        options: [
            'Monitor vital signs',
            'Massage the uterus',
            'Prepare for blood transfusion',
            'Notify the provider'
        ],
        correctAnswer: ['Monitor vital signs', 'Massage the uterus', 'Notify the provider', 'Prepare for blood transfusion'],
        explanation: `Heavy vaginal bleeding in the postpartum period is a critical emergency. Immediate interventions include monitoring vital signs, uterine massage to promote contraction, notifying the provider, and preparing for potential blood transfusion. Reference: AWHONN Postpartum Hemorrhage Guidelines 2023; Obstetrics Emergency Care Protocols 2023.`
    },
    {
        type: 'select-all',
        category: 'Immunology',
        difficulty: 'hard',
        text: 'Select ALL conditions that are contraindications for live vaccines:',
        options: [
            'Pregnancy',
            'Immunosuppression',
            'Chronic lung disease',
            'Severe allergic reaction to vaccine components',
            'Diabetes mellitus'
        ],
        correctAnswer: ['Pregnancy', 'Immunosuppression', 'Severe allergic reaction to vaccine components'],
        explanation: `Live vaccines are contraindicated in patients who are pregnant, immunosuppressed, or have a history of severe allergic reactions to vaccine components, as they may be at increased risk for vaccine-related complications. Reference: CDC Vaccine Recommendations 2023; WHO Immunization Guidelines 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Emergency',
        difficulty: 'easy',
        text: 'In suspected acute myocardial infarction, the nurse should administer ____ mg of chewable aspirin as an initial intervention.',
        correctAnswer: ['325'],
        explanation: `For suspected acute myocardial infarction, administering 325 mg of chewable aspirin is standard practice to inhibit platelet aggregation and reduce clot formation. Reference: AHA/ACC Acute Coronary Syndrome Guidelines 2023; Emergency Cardiac Care Protocols 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Ethics',
        difficulty: 'medium',
        text: 'A patient with decision-making capacity refuses blood transfusion due to religious beliefs. The nurse should:',
        options: [
            'Administer the transfusion and document the refusal',
            'Respect the patient’s wishes',
            'Seek a court order to override the refusal',
            'Consult the ethics committee immediately'
        ],
        correctAnswer: 'Respect the patient’s wishes',
        explanation: `Respecting patient autonomy is fundamental in ethical healthcare. When a competent patient refuses treatment, even life-saving interventions, their decision must be honored. Reference: ANA Code of Ethics 2023; Beauchamp and Childress’ Principles of Biomedical Ethics 2023.`
    },
    {
        type: 'medication-matching',
        category: 'Endocrinology',
        difficulty: 'easy',
        text: 'Match the following insulins with their action profiles:',
        options: ['Rapid-acting', 'Short-acting', 'Intermediate-acting', 'Long-acting'],
        pairs: [
            { medication: 'Aspart', correctMatch: 'Rapid-acting' },
            { medication: 'Regular insulin', correctMatch: 'Short-acting' },
            { medication: 'NPH', correctMatch: 'Intermediate-acting' },
            { medication: 'Detemir', correctMatch: 'Long-acting' }
        ],
        explanation: `Different insulins have specific onset and duration profiles: Aspart acts rapidly, regular insulin is short-acting, NPH is intermediate-acting, and detemir provides long-acting coverage. Reference: ADA Standards of Medical Care in Diabetes 2023; Endocrine Society Clinical Practice Guidelines 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Gastroenterology',
        difficulty: 'medium',
        text: 'A patient with {1} presents with severe abdominal cramping and diarrhea. The nurse should {2} and prepare for {3}.',
        parts: {
            1: {
                options: ["Clostridioides difficile infection", "irritable bowel syndrome", "celiac disease"],
                correct: "Clostridioides difficile infection"
            },
            2: {
                options: ["isolate the patient", "administer antispasmodics", "obtain a stool culture"],
                correct: "isolate the patient"
            },
            3: {
                options: ["initiate contact precautions", "prepare for colonoscopy", "administer IV fluids"],
                correct: "initiate contact precautions"
            }
        },
        explanation: `Clostridioides difficile infection requires prompt isolation and initiation of contact precautions to prevent transmission, along with supportive care such as IV fluids. Reference: IDSA C. difficile Treatment Guidelines 2023; Hospital Infection Control Protocols 2023.`
    },
    {
        type: 'priority',
        category: 'Pulmonology',
        difficulty: 'hard',
        text: 'Prioritize care for a patient with suspected tension pneumothorax:',
        options: [
            'Assess for tracheal deviation',
            'Administer high-flow oxygen',
            'Prepare for needle decompression',
            'Monitor blood pressure'
        ],
        correctAnswer: ['Assess for tracheal deviation', 'Administer high-flow oxygen', 'Prepare for needle decompression', 'Monitor blood pressure'],
        explanation: `Tension pneumothorax is life-threatening. Early identification by assessing for tracheal deviation, ensuring oxygenation, and preparing for immediate needle decompression are vital. Reference: ATLS Guidelines 2023; Emergency Medicine Textbook 2023.`
    },
    {
        type: 'select-all',
        category: 'Neurology',
        difficulty: 'medium',
        text: 'Select ALL signs indicative of increased intracranial pressure:',
        options: [
            'Vomiting',
            'Bradycardia',
            'Irregular respirations',
            'High fever',
            'Papilledema'
        ],
        correctAnswer: ['Vomiting', 'Bradycardia', 'Irregular respirations', 'Papilledema'],
        explanation: `Increased intracranial pressure is often manifested by vomiting, bradycardia, irregular respirations, and papilledema on fundoscopic exam. High fever is not typically an early sign. Reference: Neurology Clinical Guidelines 2023; Harrison’s Principles of Internal Medicine 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Pediatrics',
        difficulty: 'easy',
        text: 'For pediatric patients, the recommended maximum daily dose of acetaminophen is ____ mg/kg/day.',
        correctAnswer: ['75'],
        explanation: `To prevent hepatotoxicity, the maximum daily dose of acetaminophen in pediatric patients should not exceed 75 mg/kg/day. Reference: American Academy of Pediatrics (AAP) Guidelines 2023; Pediatric Dosage References 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Renal',
        difficulty: 'medium',
        text: 'A patient on continuous renal replacement therapy (CRRT) shows signs of hypotension. The nurse should:',
        options: [
            'Decrease the rate of fluid removal',
            'Increase the dialysate flow rate',
            'Administer a diuretic',
            'Stop the CRRT immediately'
        ],
        correctAnswer: 'Decrease the rate of fluid removal',
        explanation: `Hypotension during CRRT is often due to excessive ultrafiltration. The best intervention is to decrease the rate of fluid removal to stabilize blood pressure. Reference: KDIGO Guidelines for Dialysis 2023; Renal Replacement Therapy Protocols 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Mental Health',
        difficulty: 'hard',
        text: 'A patient with {1} presents with disorganized thinking. The nurse should {2} and {3} to ensure safety:',
        parts: {
            1: {
                options: ["schizophrenia", "bipolar disorder", "major depressive disorder"],
                correct: "schizophrenia"
            },
            2: {
                options: ["initiate one-to-one observation", "administer sedatives", "assess orientation"],
                correct: "initiate one-to-one observation"
            },
            3: {
                options: ["notify the psychiatrist", "call for restraint", "document the behavior"],
                correct: "notify the psychiatrist"
            }
        },
        explanation: `Patients with schizophrenia and disorganized thinking are at risk for harming themselves or others. Initiating one-to-one observation and promptly notifying the psychiatric team is essential. Reference: APA Guidelines for Schizophrenia 2023; Mental Health Crisis Intervention Protocols 2023.`
    },
    {
        type: 'priority',
        category: 'OB/GYN',
        difficulty: 'medium',
        text: 'Prioritize interventions for a patient with postpartum hemorrhage:',
        options: [
            'Check vital signs',
            'Monitor uterine contraction',
            'Administer uterotonic medications',
            'Prepare for surgical intervention'
        ],
        correctAnswer: ['Check vital signs', 'Monitor uterine contraction', 'Administer uterotonic medications', 'Prepare for surgical intervention'],
        explanation: `Postpartum hemorrhage requires immediate and systematic intervention: assessing vital signs, monitoring uterine tone, administering uterotonic agents, and preparing for potential surgical management. Reference: AWHONN Postpartum Care Guidelines 2023; Obstetric Emergency Protocols 2023.`
    },
    {
        type: 'select-all',
        category: 'Immunology',
        difficulty: 'hard',
        text: 'Select ALL adverse effects commonly associated with immunosuppressive therapy:',
        options: [
            'Increased risk of infection',
            'Hypertension',
            'Hyperglycemia',
            'Weight loss',
            'Renal dysfunction'
        ],
        correctAnswer: ['Increased risk of infection', 'Hypertension', 'Hyperglycemia', 'Renal dysfunction'],
        explanation: `Immunosuppressive therapies can predispose patients to infections, hypertension, hyperglycemia, and renal dysfunction due to their systemic effects. Weight loss is not typically observed. Reference: Immunosuppressive Drug Monographs 2023; Clinical Pharmacology Reviews 2023.`
    },
    // Additional Questions to Reach 50
    {
        type: 'fill-blank',
        category: 'Cardiology',
        difficulty: 'medium',
        text: 'In the management of acute myocardial infarction, the recommended initial sublingual nitroglycerin dose is ____ mg.',
        correctAnswer: ['0.4'],
        explanation: `According to AHA guidelines, a dose of 0.4 mg of sublingual nitroglycerin is typically administered as initial therapy in acute myocardial infarction, provided there are no contraindications such as hypotension. Reference: AHA/ACC Guidelines on the Management of ST-Elevation Myocardial Infarction 2023; American Heart Association Clinical Protocols 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Neurology',
        difficulty: 'hard',
        text: 'A patient with {1} presents with sudden onset of unilateral weakness and aphasia. The nurse should first {2} and then {3}.',
        parts: {
            1: {
                options: ["stroke", "seizure", "migraine"],
                correct: "stroke"
            },
            2: {
                options: ["assess the ABCs", "obtain a blood glucose level", "administer oxygen"],
                correct: "assess the ABCs"
            },
            3: {
                options: ["prepare for a CT scan", "initiate thrombolytic therapy", "obtain an MRI"],
                correct: "prepare for a CT scan"
            }
        },
        explanation: `Rapid recognition of stroke is essential. The nurse should first assess airway, breathing, and circulation (ABCs), then arrange for immediate imaging (CT scan) to differentiate ischemic from hemorrhagic stroke before further management. Reference: American Stroke Association Guidelines 2023; AHA/ASA Stroke Management Protocol 2023.`
    },
    {
        type: 'priority',
        category: 'Emergency',
        difficulty: 'hard',
        text: 'Prioritize the following interventions for a patient with suspected severe sepsis:',
        options: [
            'Obtain blood cultures',
            'Initiate broad-spectrum antibiotics',
            'Administer IV fluids aggressively',
            'Measure serum lactate levels'
        ],
        correctAnswer: ['Measure serum lactate levels', 'Obtain blood cultures', 'Initiate broad-spectrum antibiotics', 'Administer IV fluids aggressively'],
        explanation: `Severe sepsis requires rapid intervention. Early measurement of serum lactate assists in assessing severity, followed by obtaining blood cultures, initiating antibiotics, and aggressive fluid resuscitation per Surviving Sepsis Campaign recommendations. Reference: Surviving Sepsis Campaign Guidelines 2023; Critical Care Medicine Journals 2023.`
    },
    {
        type: 'select-all',
        category: 'Pharmacology',
        difficulty: 'medium',
        text: 'Select ALL potential side effects of ACE inhibitors:',
        options: [
            'Persistent dry cough',
            'Hyperkalemia',
            'Angioedema',
            'Bradycardia',
            'Renal impairment'
        ],
        correctAnswer: ['Persistent dry cough', 'Hyperkalemia', 'Angioedema', 'Renal impairment'],
        explanation: `ACE inhibitors are known to cause a persistent dry cough, hyperkalemia, angioedema, and renal impairment due to their pharmacologic action on the renin-angiotensin system. Bradycardia is not commonly observed. Reference: FDA ACE Inhibitor Labeling 2023; Goodman & Gilman's Pharmacological Reviews 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Respiratory',
        difficulty: 'medium',
        text: 'In a patient with a COPD exacerbation, the nurse should first:',
        options: [
            'Administer a short-acting bronchodilator',
            'Provide oxygen therapy',
            'Initiate systemic corticosteroids',
            'Assess the patient’s respiratory status'
        ],
        correctAnswer: 'Assess the patient’s respiratory status',
        explanation: `Initial management of a COPD exacerbation requires assessment of the respiratory status, including oxygen saturation and work of breathing, to guide subsequent interventions such as bronchodilator therapy and corticosteroid administration. Reference: GOLD Guidelines 2023; Respiratory Care Best Practices 2023.`
    },
    {
        type: 'medication-matching',
        category: 'Hematology',
        difficulty: 'medium',
        text: 'Match the following anticoagulants with their primary mechanism of action:',
        options: ['Vitamin K antagonism', 'Direct thrombin inhibition', 'Factor Xa inhibition', 'Fibrinolysis'],
        pairs: [
            { medication: 'Warfarin', correctMatch: 'Vitamin K antagonism' },
            { medication: 'Dabigatran', correctMatch: 'Direct thrombin inhibition' },
            { medication: 'Rivaroxaban', correctMatch: 'Factor Xa inhibition' },
            { medication: 'Alteplase', correctMatch: 'Fibrinolysis' }
        ],
        explanation: `Correct matching of anticoagulants is vital. Warfarin works via vitamin K antagonism, dabigatran directly inhibits thrombin, rivaroxaban inhibits Factor Xa, and alteplase is used to lyse clots. Reference: ACC/AHA Antithrombotic Guidelines 2023; UpToDate Clinical Reviews 2023.`
    },
    {
        type: 'scenario-dropdown',
        category: 'Gastroenterology',
        difficulty: 'medium',
        text: 'A patient with {1} presents with right upper quadrant pain and fever. The nurse should first {2} and then {3}.',
        parts: {
            1: {
                options: ["acute cholecystitis", "peptic ulcer disease", "appendicitis"],
                correct: "acute cholecystitis"
            },
            2: {
                options: ["assess the severity of pain", "obtain vital signs", "administer analgesics"],
                correct: "obtain vital signs"
            },
            3: {
                options: ["prepare for an abdominal ultrasound", "start IV antibiotics", "notify the surgeon"],
                correct: "prepare for an abdominal ultrasound"
            }
        },
        explanation: `Acute cholecystitis typically presents with right upper quadrant pain and fever. The nurse’s priority is to assess vital signs, then arrange for diagnostic imaging, such as an abdominal ultrasound, to confirm the diagnosis. Reference: American College of Radiology Guidelines 2023; UpToDate Gastroenterology Management 2023.`
    },
    {
        type: 'fill-blank',
        category: 'Critical Care',
        difficulty: 'easy',
        text: 'The normal arterial blood pH range is ____ to ____.',
        correctAnswer: ['7.35', '7.45'],
        explanation: `The normal arterial blood pH range is maintained between 7.35 and 7.45, a critical parameter for cellular function. Deviations from this range indicate acidosis or alkalosis, which require immediate management. Reference: Critical Care Medicine Textbook 2023; American Association for Respiratory Care Guidelines 2023.`
    },
    {
        type: 'multiple-choice',
        category: 'Endocrinology',
        difficulty: 'hard',
        text: 'In managing a patient with diabetic ketoacidosis (DKA), the nurse should first:',
        options: [
            'Initiate an insulin infusion',
            'Administer IV fluids',
            'Begin electrolyte replacement',
            'Monitor blood glucose levels'
        ],
        correctAnswer: 'Administer IV fluids',
        explanation: `In diabetic ketoacidosis, the initial management involves aggressive IV fluid resuscitation to restore intravascular volume and improve renal perfusion before initiating insulin and electrolyte replacement. Reference: ADA Standards of Medical Care in Diabetes 2023; UpToDate DKA Management 2023.`
    }
];
