from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from blog.models import Blog

class BlogSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields='__all__'