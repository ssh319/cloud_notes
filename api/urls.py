from django.urls import path
from .views import (
    NotesAPIView,
    UserRegisterAPIView,
    UserAuthenticateAPIView
)


urlpatterns = [
    path('notes', NotesAPIView.as_view(), name='notes'),
    path('notes/<int:pk>', NotesAPIView.as_view(), name='note'),
    path('auth/signup', UserRegisterAPIView.as_view(), name='signup'),
    path('auth/login', UserAuthenticateAPIView.as_view(), name='login')
]
