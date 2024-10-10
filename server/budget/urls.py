from django.urls import path
from .views import *
urlpatterns = [
    path("transaction/",TransactionView.as_view(),name="transaction"),
]
