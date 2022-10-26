import datetime

import django
from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    title=models.CharField(blank=False,max_length=100)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    body=models.TextField(blank=False)
    cover=models.ImageField()
    date = models.DateField(default=django.utils.timezone.now)
