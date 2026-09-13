# Script to update generate_careers_catalog.py and regenerate careersCatalog.ts

with open("scripts/generate_careers_catalog.py", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Fix Licenciatura level in BRANCH_TEMPLATES
code = code.replace(
    '("Licenciatura en Lengua Castellana y Literatura", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Lengua Castellana y Literatura", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Física y Matemáticas", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Física y Matemáticas", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Química y Biología", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Química y Biología", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Ciencias Sociales e Historia de Colombia", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Ciencias Sociales e Historia de Colombia", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Educación para la Convivencia y la Paz", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Educación para la Convivencia y la Paz", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Música y Expresión Sonora Escolar", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Música y Expresión Sonora Escolar", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Artes Visuales y Plásticas", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Artes Visuales y Plásticas", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Filosofía y Ética Ciudadana", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Filosofía y Ética Ciudadana", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Tecnología e Informática Educativa", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Tecnología e Informática Educativa", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)
code = code.replace(
    '("Licenciatura en Educación Comunitaria y Derechos Humanos", "Educación y Pedagogía", "teal", "Licenciatura", "Licenciatura",',
    '("Licenciatura en Educación Comunitaria y Derechos Humanos", "Educación y Pedagogía", "teal", "Licenciatura", "Profesional Universitario",'
)

# 2. Fix lvl in SPECIALIZATION_DOMAINS
code = code.replace(
    'elif domain_key == "Educación":\n        area = "Educación y Pedagogía"\n        color = "teal"\n        primary_r = "S"\n        secondary_r = "A"\n        default_icon = "GraduationCap"\n        deg_type = "Licenciatura"\n        dur = "5 años (10 semestres)"\n        lvl = "Licenciatura"',
    'elif domain_key == "Educación":\n        area = "Educación y Pedagogía"\n        color = "teal"\n        primary_r = "S"\n        secondary_r = "A"\n        default_icon = "GraduationCap"\n        deg_type = "Licenciatura"\n        dur = "5 años (10 semestres)"\n        lvl = "Profesional Universitario"'
)
code = code.replace(
    'v4_lvl = "Licenciatura" if domain_key == "Educación" else',
    'v4_lvl = "Profesional Universitario" if domain_key == "Educación" else'
)

with open("scripts/generate_careers_catalog.py", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated generate_careers_catalog.py cleanly.")
