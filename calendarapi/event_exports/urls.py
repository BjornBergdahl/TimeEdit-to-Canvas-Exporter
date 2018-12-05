from django.urls import path
from .views import calendarevent

urlpatterns = [
    path('calendarevent', calendarevent),
]
