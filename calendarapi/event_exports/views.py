from django.shortcuts import render
from rest_framework import generics
from .models import EventExport
from .serializers import EventExportSerializer


# Create your views here.
class EventExportList(generics.ListCreateAPIView):
    queryset = EventExport.objects.all()
    serializer_class = EventExportSerializer


class EventExportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventExport.objects.all()
    serializer_class = EventExportSerializer
