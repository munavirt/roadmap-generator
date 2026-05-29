from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RoadmapSerializer
from ..services.services import generate_roadmap


class GenerateRoadmapAPIView(APIView):
    def post(self, request):
        serializer = RoadmapSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = generate_roadmap(serializer.validated_data)

        return Response(result, status=status.HTTP_200_OK)
    
