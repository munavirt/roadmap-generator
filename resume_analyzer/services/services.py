from .skill_keywords import ROLE_SKILLS

def analyze_resume(text,role):

    role_skills = ROLE_SKILLS.get(role,[])

    extracted_skills = []

    for skill in role_skills:
        if skill.lower() in text.lower():
            extracted_skills.append(skill)

    if len(role_skills)>0:
        ats_score = int(len(extracted_skills)/len(role_skills)*100)
    else:
        ats_score = 0

    missing_keywords = [
        skill for skill in role_skills
        if skill not in extracted_skills
    ][:5]
    return{
        "ats_score" : ats_score,
        "extracted_skills" : extracted_skills,
        "missing_keywords" : missing_keywords,
    }

