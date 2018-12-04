from rest_framework import serializers
from .models import EventExport

class EventExportSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('user', 'token', 'title', 'description', 'start_date', 'start_time', 'end_date', 'end_time', 'location')
        model = EventExport
