import json
from pathlib import Path
from ..utils import match_goal

BASE_DIR = Path(__file__).resolve().parent.parent

with open(
    BASE_DIR / "learning_paths.json","r"
) as file:
    ROADMAP_DATA = json.load(file)

def get_fallback_roadmap(
        goal,
        level,
        duration
):
    try:

        available_goals = list(ROADMAP_DATA.keys())

        matched_goal = match_goal(goal, available_goals)
        
        print(f"Fallback Matched Goal: {matched_goal}")

        roadmap = ROADMAP_DATA[
            matched_goal
        ][
            level
        ][
            duration
        ]
    
        return roadmap
    except Exception as e:
        print(f"Fallback Error: {e}")
        return []
