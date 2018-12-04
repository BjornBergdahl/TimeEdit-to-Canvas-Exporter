from django.db import models

# Create your models here.
class EventExport(models.Model):
    user = models.CharField(max_length=6)
    token = models.CharField(max_length=100)

    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    start_date = models.CharField(max_length=10)
    start_time = models.CharField(max_length=5)
    end_date = models.CharField(max_length=10)
    end_time = models.CharField(max_length=5)
    location = models.CharField(max_length=50)

    def __str__(self):
        return self.title
