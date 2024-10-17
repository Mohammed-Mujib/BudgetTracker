from django.urls import path
from .views import *
urlpatterns = [
    path("transactions/", TransactionView.as_view(), name="transactions"),
]
