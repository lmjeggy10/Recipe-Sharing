from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Recipe(models.Model):
    title = models.TextField(max_length=200)
    ingredients = models.TextField()
    instructions = models.TextField()
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    


    def __str__(self):
        return self.title