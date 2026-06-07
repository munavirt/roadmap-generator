import json

from pathlib import Path

from ..utils import match_goal


BASE_DIR = Path(
    __file__
).resolve().parent.parent


with open(
    BASE_DIR / "learning_paths.json",
    "r"
) as file:

    ROADMAP_DATA = json.load(file)


def get_fallback_roadmap(
    goal,
    level,
    duration,
    missing_skills
):

    try:

        available_goals = list(
            ROADMAP_DATA.keys()
        )

        matched_goal = match_goal(
            goal,
            available_goals
        )

        print(
            f"Fallback Matched Goal: {matched_goal}"
        )

        roadmap = ROADMAP_DATA[
            matched_goal
        ][
            level
        ][
            duration
        ]

        # If no skill gap found,
        # return original roadmap

        if not missing_skills:

            return roadmap

        filtered_roadmap = []

        for item in roadmap:

            title = item.get(
                "title",
                ""
            ).lower()

            topics = " ".join(

                item.get(
                    "topics",
                    []
                )

            ).lower()

            tools = " ".join(

                item.get(
                    "tools",
                    []
                )

            ).lower()

            combined_text = (
                title + " " + topics + " " + tools
            )

            should_include = False

            for skill in missing_skills:

                if skill.lower() in combined_text:

                    should_include = True

                    break

            if should_include:

                new_item = item.copy()
                filtered_roadmap.append(
                    new_item
                )

        # If filtering removes
        # everything, return original

        if not filtered_roadmap:

            return roadmap

        # Re-index weeks
        for i, item in enumerate(filtered_roadmap):
            item["week"] = i + 1

        return filtered_roadmap

    except Exception as e:

        print(
            f"Fallback Error: {e}"
        )

        return []