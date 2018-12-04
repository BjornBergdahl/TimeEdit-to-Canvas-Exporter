from django.urls import path
from .views import EventExportList, EventExportDetail, test

urlpatterns = [
    path('<int:pk>/', EventExportDetail.as_view()),
    path('', EventExportList.as_view()),
    path('test', test)
]
