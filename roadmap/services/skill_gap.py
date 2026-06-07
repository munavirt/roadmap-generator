from ..utils import match_goal

CAREER_SKILLS = {

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
        "Tailwind CSS",
        "Git",
        "REST API"
    ],

    "Backend Developer": [
        "Python",
        "Django",
        "Django REST Framework",
        "PostgreSQL",
        "Docker",
        "Redis",
        "Celery",
        "Git"
    ],

    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "NumPy",
        "Scikit-learn"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Python",
        "Django",
        "PostgreSQL",
        "Git",
        "REST API"
    ],

    "DevOps Engineer": [
        "Linux",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "AWS",
        "Terraform",
        "GitHub Actions"
    ]
}


def analayze_skill_gap(goal, user_skills):

    try:

        available_roles = list(CAREER_SKILLS.keys())

        matched_goal = match_goal(
            goal,
            available_roles
        )

        required_skills = CAREER_SKILLS.get(
            matched_goal,
            []
        )

        normalized_user_skills = [

            skill.lower().strip()

            for skill in user_skills
        ]

        missing_skills = [

            skill

            for skill in required_skills

            if skill.lower() not in normalized_user_skills
        ]

        return {
            "matched_goal": matched_goal,
            "required_skills": required_skills,
            "missing_skills": missing_skills
        }

    except Exception as error:

        print(
            f"Skill Gap Error: {error}"
        )

        return {
            "matched_goal": goal,
            "required_skills": [],
            "missing_skills": []
        }