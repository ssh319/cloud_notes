from django.db import models
from django.contrib.auth.models import AbstractUser
from cloud_notes.settings.base import AUTH_USER_MODEL


class Note(models.Model):
    head = models.CharField(max_length=50)
    desc = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Note {self.pk}"


class NotesUser(AbstractUser):
    def __str__(self):
        return f"{self.pk} | {self.username}"
