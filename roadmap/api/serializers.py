from rest_framework import serializers

class RoadmapSerializer(serializers.Serializer):
    goal = serializers.CharField()
    skills = serializers.ListField(child=serializers.CharField())
    level = serializers.ChoiceField(choices=[
      "Beginner",
      "Intermediate",
      "Advanced"  
    ])

    duration = serializers.ChoiceField(choices=[
        "1 Month",
        "3 Months",
        "6 Months"
    ])