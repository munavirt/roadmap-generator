from .skill_gap import analayze_skill_gap

from .ai_service import generate_ai_roadmap

from .fallback_service import (
    get_fallback_roadmap
)


def generate_roadmap(data):

    goal = data["goal"]

    skills = data["skills"]

    level = data["level"]

    duration = data["duration"]

    skill_gap_result = analayze_skill_gap(
        goal,
        skills
    )

    matched_goal = skill_gap_result[
        "matched_goal"
    ]

    missing_skills = skill_gap_result[
        "missing_skills"
    ]

    prompt = f"""
    You are an expert software engineering mentor building a learning roadmap.

    Career Goal: {matched_goal}
    Experience Level: {level}
    Duration: {duration}

    Current Skills (DO NOT TEACH THESE): {", ".join(skills)}
    Missing Skills (ONLY TEACH THESE): {", ".join(missing_skills)}

    CRITICAL RULES:
    1. DO NOT include ANY lessons, topics, or weeks for skills in the "Current Skills" list.
    2. Even advanced topics related to "Current Skills" (like HTML5, Semantic Web, Responsive Web Design for HTML/CSS) are strictly FORBIDDEN. The user already knows them.
    3. You MUST start Week 1 with the first skill from the "Missing Skills" list.
    4. ONLY teach skills from the "Missing Skills" list. Do not revise "Current Skills".
    5. Be encouraging and beginner-friendly! 
       - Make the "title" engaging (e.g., "Making things interactive with JavaScript").
       - Make the "topics" GRANULAR and SPECIFIC (e.g., for CSS use "colors, background, padding, div, overflow", NOT just "CSS Basics"). Give at least 4-5 granular topics per week.
       - Make the "project" an exciting, concrete mini-project idea (e.g., "Build a working Calculator", NOT "Phase 1 Project").
    6. Return ONLY a valid JSON object. Do not wrap in markdown tags.

    JSON Format:
    {{
      "weeks": [
        {{
          "week": 1,
          "title": "Engaging Module Title",
          "topics": ["Specific Topic 1", "Specific Topic 2", "Specific Topic 3", "Specific Topic 4"],
          "tools": ["Tool 1"],
          "project": "Exciting Mini-Project Idea",
          "time": "Hours"
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
            matched_goal,
            level,
            duration,
            missing_skills
        )

        source = "Fallback"

    return {

        "status": "success",

        "source": source,

        "goal": matched_goal,

        "level": level,

        "duration": duration,

        "missing_skills": missing_skills,

        "roadmap": roadmap
    }