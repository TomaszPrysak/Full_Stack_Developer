from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required

# Create your views here.

# Widok strony głównej (index.html)
def landingpage(request):
    return render(request, 'landingpage/index.html')
