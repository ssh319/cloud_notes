from .models import Note
from .serializers import NotesSerializer, UsersSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class NotesAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        if pk is not None:
            serializer = NotesSerializer(Note.objects.filter(user=request.user).get(id=pk))
        else:
            serializer = NotesSerializer(Note.objects.filter(user=request.user).order_by('-timestamp'), many=True)
            
        return Response(serializer.data)

    def post(self, request):
        serializer = NotesSerializer(data=request.data)

        if serializer.is_valid():
            
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        note = Note.objects.filter(user=request.user).get(id=pk)
        serializer = NotesSerializer(instance=note, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = Note.objects.filter(user=request.user).get(id=pk)
        note.delete()

        return Response()


class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserAuthenticateAPIView(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)

        response_data = {
            'token': token.key,
            'username': user.username
        }
        
        return Response(response_data)
