from django.apps import AppConfig
from django.db.models.signals import *


class EventExportsConfig(AppConfig):
    name = 'event_exports'


def ready(self):
    import django.db.models.signals
