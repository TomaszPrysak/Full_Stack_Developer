from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import transaction
from django.db.models import Avg, Count
from django.forms import inlineformset_factory
from django.utils.decorators import method_decorator
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  UpdateView)
from .forms import EmployeeSignUpForm
from .models import (Manager, Employee, Client, User, VerifyCodeEmployeeRegistration)
from .decorators import manager_required, employee_required, client_required

# Create your views here.

def staff_menu_signup_login(request):
    return render(request, 'rezerwacje/staff_menu_signup_login.html')

class EmployeeSignUpView(CreateView):
    model = User
    form_class = EmployeeSignUpForm
    template_name = 'rezerwacje/staff_signup.html'

    def form_valid(self, form):
        user_firstname = form.cleaned_data['first_name']
        user_lastname = form.cleaned_data['last_name']
        user = form.save()
        return employee_signup_success(self.request, user_firstname=user_firstname, user_lastname=user_lastname)

def employee_signup_success(request, user_firstname=None, user_lastname=None):
    pageData = {
        'user_firstname':user_firstname,
        'user_lastname':user_lastname,
    }
    return render(request, 'rezerwacje/staff_signup_success.html', pageData)

def staff_login(request, validate_status=None):
    if request.user.is_authenticated and request.user.is_manager:
        return redirect('rezerwacje:staff_dashboard_manager')
    elif request.user.is_authenticated and request.user.is_employee:
        return redirect('rezerwacje:staff_dashboard_employee')
        
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                if user.is_manager:
                    login(request, user)
                    return HttpResponseRedirect(reverse('rezerwacje:staff_dashboard_manager'))
                elif user.is_employee:
                    login(request, user)
                    return HttpResponseRedirect(reverse('rezerwacje:staff_dashboard_employee'))
                else:
                    return render(request, 'rezerwacje/staff_login.html', {'validate_status':0})
            else:
                return render(request, 'rezerwacje/staff_login.html', {'validate_status':1})
        else:
            return render(request, 'rezerwacje/staff_login.html', {'validate_status':0})
    else:
        pageData = {
            'validate_status':validate_status,
        }
        return render(request, 'rezerwacje/staff_login.html', pageData)

@login_required
@manager_required
def staff_dashboard_manager(request):
    return render(request, 'rezerwacje/staff_dashboard_manager.html')

@login_required
@employee_required
def staff_dashboard_employee(request):
    return render(request, 'rezerwacje/staff_dashboard_employee.html')

# @login_required
# @client_required
# def client_dashboard_client(request):
#     return render(request, 'rezerwacje/client_dashboard_client.html')
