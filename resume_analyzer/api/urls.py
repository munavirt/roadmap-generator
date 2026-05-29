from django.urls import path
from .views import ResumeAnalyzerAPIView,RolesAPIView

urlpatterns = [
    path('roles/',RolesAPIView.as_view(),name="roles"),
    path('analyze/',ResumeAnalyzerAPIView.as_view(),name='resume-analyzer')
]