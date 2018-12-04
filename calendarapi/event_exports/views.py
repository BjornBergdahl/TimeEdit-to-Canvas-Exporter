from django.shortcuts import render
from rest_framework import generics
from .models import EventExport
from .serializers import EventExportSerializer
from requests import *
import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# Unnecessary
class EventExportList(generics.ListCreateAPIView):
    queryset = EventExport.objects.all()
    serializer_class = EventExportSerializer

# Unnecessary
class EventExportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventExport.objects.all()
    serializer_class = EventExportSerializer

class HTTPBearerAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token

    def __eq__(self, other):
        return self.token == getattr(other, 'token', None)

    def __ne__(self, other):
        return not self == other

    def __call__(self, r):
        r.headers['Authorization'] = 'Bearer ' + self.token
        return r


def postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location):

    URI = 'https://ltu.instructure.com/api/v1/calendar_events.json'
    
    payload = {'calendar_event[context_code]': 'user_' + user, \
               'calendar_event[title]': title, \
               'calendar_event[description]': description, \
               'calendar_event[start_at]': start_date + 'T' + start_time + ':00Z', \
               'calendar_event[end_at]': end_date + 'T' + end_time + ':00Z', \
               'calendar_event[location_name]': location}

    az = HTTPBearerAuth(token)
    r = requests.post(URI, data=payload, auth=az)
    print(r.text)


# remove this token in production
@csrf_exempt
def test(request):
    print('test called')

    """
    user = '55647'
    token = '3755~uRL5P97uVze67EAc4DXf01lA9zQ74tCbGCtz2MM9vRTKKcbaHGDrdWf0AczQ9NZP'

    title = 'Python test!'
    description = 'description test'
    start_date = '2018-11-23'
    start_time = '17:00'
    end_date = '2018-11-23'
    end_time = '20:00'
    location = 'location test'
    """

    if request.method == 'POST':
        # postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location)
        user = request.POST.get('user', '')
        token = request.POST.get('token', '')

        title = request.POST.get('title', '')
        description = request.POST.get('description', '')
        start_date = request.POST.get('start_date', '')
        start_time = request.POST.get('start_time', '')
        end_date = request.POST.get('end_date', '')
        end_time = request.POST.get('end_time', '')
        location = request.POST.get('location', '')

        print(user, " ", token, " ", "va")
        postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location)
        print("YUP")
    
    return HttpResponse('Test HTTPResponse here')
