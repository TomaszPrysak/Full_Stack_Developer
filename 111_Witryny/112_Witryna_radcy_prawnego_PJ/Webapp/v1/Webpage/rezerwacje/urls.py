from django.urls import path, re_path
from . import views

app_name = "rezerwacje"

urlpatterns = [
    path('staff/', views.staff_menu_signup_login, name='staff_menu_signup_login'),
    path('staff/signup/', views.EmployeeSignUpView.as_view(), name='staff_singup'),
    path('staff/signup/success', views.employee_signup_success, name='employee_signup_success'),
    path('staff/login/', views.staff_login, name='staff_login'),
    path('staff/dashboard/manager/', views.staff_dashboard_manager, name='staff_dashboard_manager'),
    path('staff/dashboard/employee/', views.staff_dashboard_employee, name='staff_dashboard_employee'),
    # path('client/dashboard/client/', views.client_dashboard_client, name='client_dashboard_client'),
]
