from django.shortcuts import render
from django.contrib.auth.models import User
from blog.serializers import BlogSerializer
from blog.models import Blog
from rest_framework import generics
from rest_framework.response import Response

# Create your views here.
class BlogList(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        print(str(queryset[0].title))
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)