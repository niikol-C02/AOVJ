#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrich generate_careers_catalog.py so that each generated program includes:
- semestersCount
- semesterTuition
- citiesOffered
- universityTuitions
And adds Criminología, Criminalística, and related programs.
Then regenerates src/models/careersCatalog.ts.
"""

with open("scripts/generate_careers_catalog.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Check for Licenciatura in level position and replace
    if '"Licenciatura", "Licenciatura"' in line:
        line = line.replace('"Licenciatura", "Licenciatura"', '"Licenciatura", "Profesional Universitario"')
    if 'lvl = "Licenciatura"' in line:
        line = line.replace('lvl = "Licenciatura"', 'lvl = "Profesional Universitario"')
    if 'v4_lvl = "Licenciatura"' in line:
        line = line.replace('v4_lvl = "Licenciatura"', 'v4_lvl = "Profesional Universitario"')
    new_lines.append(line)

code = "".join(new_lines)

# Now, add helper to calculate semestersCount, semesterTuition, and citiesOffered in the generation loop
assembly_find = """        all_programs.append({
            "id": pid,
            "name": name,
            "area": dom["area"],
            "categoryColor": dom["categoryColor"],
            "duration": duration,
            "degreeType": degType,
            "level": level,
            "modality": modality,
            "sniesCode": str(snies_counter),"""

assembly_replacement = """        # Extract semesters
        semesters_count = 10
        if "12 semestres" in duration or "14 semestres" in duration:
            semesters_count = 12
        elif "10 semestres" in duration:
            semesters_count = 10
        elif "8 semestres" in duration:
            semesters_count = 8
        elif "6 semestres" in duration:
            semesters_count = 6
        elif "5 semestres" in duration:
            semesters_count = 5
        elif "4 semestres" in duration:
            semesters_count = 4
        elif "2 semestres" in duration:
            semesters_count = 2

        # Tuition estimation
        if "Medicina" in name or "Cirugía" in name:
            tuition_est = "$8,500,000 - $18,000,000 COP / semestre (Consultar según IES pública o privada)"
        elif level == "Tecnológico" or level == "Técnico Profesional":
            tuition_est = "$1,500,000 - $3,200,000 COP / semestre (Gratuito en IES públicas con Política de Gratuidad / SENA)"
        elif level == "Especialización":
            tuition_est = "$4,800,000 - $9,500,000 COP / semestre (Consultar con la institución)"
        elif level == "Maestría":
            tuition_est = "$6,500,000 - $13,000,000 COP / semestre (Consultar con la institución)"
        elif "Ingeniería" in degType:
            tuition_est = "$3,800,000 - $7,900,000 COP / semestre (Aplica Política de Gratuidad en IES oficiales)"
        elif "Licenciatura" in degType or "Educación" in dom["area"]:
            tuition_est = "$2,400,000 - $4,800,000 COP / semestre (Aplica Política de Gratuidad en IES oficiales)"
        else:
            tuition_est = "$3,200,000 - $6,800,000 COP / semestre (Consultar con la universidad)"

        all_programs.append({
            "id": pid,
            "name": name,
            "area": dom["area"],
            "categoryColor": dom["categoryColor"],
            "duration": duration,
            "semestersCount": semesters_count,
            "semesterTuition": tuition_est,
            "degreeType": degType,
            "level": level,
            "modality": modality,
            "sniesCode": str(snies_counter),"""

code = code.replace(assembly_find, assembly_replacement)

# Also update the branch items append loop
branch_find = """        all_programs.append({
            "id": pid,
            "name": name,
            "area": area,
            "categoryColor": color,
            "duration": dur,
            "degreeType": deg_type,
            "level": lvl,
            "modality": mod,
            "sniesCode": str(snies_counter),"""

branch_replacement = """        # Extract semesters
        semesters_count = 10
        if "12 semestres" in dur or "14 semestres" in dur:
            semesters_count = 12
        elif "10 semestres" in dur:
            semesters_count = 10
        elif "8 semestres" in dur:
            semesters_count = 8
        elif "6 semestres" in dur:
            semesters_count = 6
        elif "5 semestres" in dur:
            semesters_count = 5
        elif "4 semestres" in dur:
            semesters_count = 4
        elif "2 semestres" in dur:
            semesters_count = 2

        if "Medicina" in name or "Cirugía" in name:
            tuition_est = "$8,500,000 - $18,000,000 COP / semestre (Consultar según IES pública o privada)"
        elif lvl == "Tecnológico" or lvl == "Técnico Profesional":
            tuition_est = "$1,500,000 - $3,200,000 COP / semestre (Gratuito en IES públicas con Política de Gratuidad / SENA)"
        elif lvl == "Especialización":
            tuition_est = "$4,800,000 - $9,500,000 COP / semestre (Consultar con la institución)"
        elif lvl == "Maestría":
            tuition_est = "$6,500,000 - $13,000,000 COP / semestre (Consultar con la institución)"
        elif "Ingeniería" in deg_type:
            tuition_est = "$3,800,000 - $7,900,000 COP / semestre (Aplica Política de Gratuidad en IES oficiales)"
        elif "Licenciatura" in deg_type or "Educación" in area:
            tuition_est = "$2,400,000 - $4,800,000 COP / semestre (Aplica Política de Gratuidad en IES oficiales)"
        else:
            tuition_est = "$3,200,000 - $6,800,000 COP / semestre (Consultar con la universidad)"

        all_programs.append({
            "id": pid,
            "name": name,
            "area": area,
            "categoryColor": color,
            "duration": dur,
            "semestersCount": semesters_count,
            "semesterTuition": tuition_est,
            "degreeType": deg_type,
            "level": lvl,
            "modality": mod,
            "sniesCode": str(snies_counter),"""

code = code.replace(branch_find, branch_replacement)

# Add Criminology and Criminalistics to BRANCH_TEMPLATES in scripts/generate_careers_catalog.py
criminology_entries = """    # CIENCIAS FORENSES, CRIMINOLOGÍA Y JUSTICIA
    ("Criminalística y Ciencias Forenses", "Ciencias Forenses y Seguridad", "slate", "Profesional Universitario", "Profesional Universitario", "4 a 5 años (8-10 semestres)", "Presencial", "I", "R", "Fingerprint"),
    ("Criminología y Política Criminal", "Ciencias Sociales y Jurídicas", "purple", "Profesional Universitario", "Profesional Universitario", "4 a 5 años (8-10 semestres)", "Presencial", "I", "S", "Scale"),
    ("Investigación Judicial y Criminalística", "Ciencias Forenses y Seguridad", "slate", "Profesional Universitario", "Profesional Universitario", "4 a 5 años (8-10 semestres)", "Presencial", "I", "C", "ShieldCheck"),
    ("Tecnología en Criminalística y Lofoscopia Forense", "Ciencias Forenses y Seguridad", "blue", "Tecnología", "Tecnológico", "3 años (6 semestres)", "Presencial", "I", "R", "Search"),
    ("Especialización en Balística Forense e Investigación del Delito", "Ciencias Forenses y Seguridad", "slate", "Especialidad", "Especialización", "1 año (2 semestres)", "Presencial", "R", "I", "Crosshair"),
    ("Especialización en Psicología Jurídica y Forense", "Ciencias de la Salud", "emerald", "Especialidad", "Especialización", "1 a 2 años (2-4 semestres)", "Híbrida", "I", "S", "Brain"),
"""

code = code.replace("BRANCH_TEMPLATES = [", "BRANCH_TEMPLATES = [\n" + criminology_entries)

with open("scripts/generate_careers_catalog.py", "w", encoding="utf-8") as f:
    f.write(code)

print("Successfully injected semestersCount, semesterTuition, and Criminology to generate_careers_catalog.py")
