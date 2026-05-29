from difflib import get_close_matches

def match_goal(goal, roles):
    try:
        if not goal or not roles:
            return None
        goal = goal.lower().strip()
        role_map = {
            role.lower(): role
            for role in roles
        }
        matches = get_close_matches(
            goal,role_map.keys(),n=1,cutoff=0.2
        )
        if matches:
            return role_map[matches[0]]
        
        return roles[0]
    
    except Exception as e:
        print(f"Goal Matching Error: {e}")

        return roles[0] if roles else None