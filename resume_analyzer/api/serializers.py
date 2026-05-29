from rest_framework import serializers


class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField()
    role = serializers.CharField()