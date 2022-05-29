from django.urls import path, re_path
from . import views

app_name = "landingpage"

urlpatterns = [
    path('', views.landingpage, name='landingpage'),
]
