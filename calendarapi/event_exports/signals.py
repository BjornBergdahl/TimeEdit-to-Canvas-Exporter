from django.db.models.signals import post_save, post_add, request_finished
from django.dispatch import receiver

from .models import EventExport

"""
@receiver(post_save, sender=EventExport)
def my_handler(sender, **kwargs):
    print('post save callback')
"""

@receiver(request_finished)
def my_callback(sender, **kwargs):
    print("Request finished!")
