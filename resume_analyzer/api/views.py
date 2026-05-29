from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from .serializers import ResumeUploadSerializer
from ..services.parser import extract_text_from_pdf, extract_text_from_docx
from ..services.services import analyze_resume
from ..services.skill_keywords import ROLE_SKILLS


class RolesAPIView(APIView):
    def get(self, request):
        return Response({
            "roles":list(ROLE_SKILLS.keys())
        })


class ResumeAnalyzerAPIView(APIView):
    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        resume = serializer.validated_data["resume"]
        filename = resume.name.lower()

        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(resume)
        elif filename.endswith(".docx"):
            text = extract_text_from_docx(resume)
        
        else:
            return Response({
                "error" : "Unsupported file format"
            },status=status.HTTP_400_BAD_REQUEST)
        
        role = serializer.validated_data["role"]
        result = analyze_resume(text,role)

        return Response(result, status=status.HTTP_200_OK)
    