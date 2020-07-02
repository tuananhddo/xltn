from django.db import models


# Create your models here.
## models.py
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.DateTimeField('date published')

class FavoritePost(models.Model):
    link = models.CharField(max_length=350)
    name = models.TextField(blank=True)
    source = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


