from django.shortcuts import render
from rest_framework import generics
from .models import EventExport
from .serializers import EventExportSerializer
from requests import *   # ?
import requests          # ?
from django.http import HttpResponse
# from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
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
    response = requests.post(URI, data=payload, auth=az)

    return response


# remove this token in production
@csrf_exempt
def calendarevent(request):
    
    if request.method == 'POST':
        received = request.POST
        print("received", received)
        
        user = received.get('user', '')
        token = received.get('token', '')
        
        title = received.get('title', '')
        description = received.get('description', '')
        start_date = received.get('start_date', '')
        start_time = received.get('start_time', '')
        end_date = received.get('end_date', '')
        end_time = received.get('end_time', '')
        location = received.get('location', '')

        response = postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location)
        
    return HttpResponse(response.text)
