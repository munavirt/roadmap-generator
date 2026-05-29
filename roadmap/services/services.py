from .skill_gap import analayze_skill_gap

from .ai_service import generate_ai_roadmap
from .fallback_service import get_fallback_roadmap

def generate_roadmap(data):
    goal = data["goal"]
    skills = data["skills"]
    level = data["level"]
    duration = data["duration"]
    missing_skills = analayze_skill_gap(goal,skills)

    prompt = f""" Generate a learning roadmap Goal:{goal} Experience Level:{level} Target Duation:{duration} Current Skills:{", ".join(skills)} Missing Skills:{", ".join(missing_skills)} Return ONLY valid JSON : 
    {{
      "weeks": [
        {{
          "week": 1,
          "title": "",
          "topics": [],
          "project": ""
        }}
      ]
    }}

    """

    try:
        roadmap = generate_ai_roadmap(
            prompt
        )
        source = "AI"

    except Exception as error:
        print(error)

        roadmap = get_fallback_roadmap(
            goal,
            level,
            duration
        )

        source = "Fallback"

    return {
        "status" : "success",
        "source" : source,
        "goal" : goal,
        "level" :level,
        "duation" : duration,
        "missing_skills" : missing_skills,
        "roadmap" : roadmap
    }

