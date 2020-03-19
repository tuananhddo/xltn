from django.db import models

# Create your models here.
## models.py

class Post(models.Model):
    name = models.CharField(max_length=150)
    contents = models.TextField(blank=True)

