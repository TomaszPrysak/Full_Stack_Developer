from django.contrib import admin
from django import forms
from .forms import EmployeeSignUpForm
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm
from .models import User, Manager, Employee, Client, VerifyCodeEmployeeRegistration

# Register your models here.

class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

    def clean(self):
        super(UserChangeForm, self).clean()
        array_temp1 = ['is_manager', 'is_employee', 'is_client']
        array_temp2 =[]
        for item in array_temp1:
            if self.cleaned_data[item]:
                array_temp2.append(item)
        if len(array_temp2) > 1:
            for item2 in array_temp2:
                self._errors[item2] = self.error_class(['Zaznaczony musi być tylko jeden status użytkownika'])
        elif len(array_temp2) == 0:
            for item3 in array_temp1:
                self._errors[item3] = self.error_class(['Zaznaczony musi być tylko jeden status użytkownika'])
        else:
            return self.cleaned_data

class CustomUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'skype_login', 'password1', 'password2', 'is_manager', 'is_employee', 'is_client']

    def clean(self):
        super(CustomUserForm, self).clean()
        array_temp1 = ['is_manager', 'is_employee', 'is_client']
        array_temp2 =[]
        for item in array_temp1:
            if self.cleaned_data[item]:
                array_temp2.append(item)
        if len(array_temp2) > 1:
            for item2 in array_temp2:
                self._errors[item2] = self.error_class(['Zaznaczony musi być tylko jeden status użytkownika'])
        elif len(array_temp2) == 0:
            for item3 in array_temp1:
                self._errors[item3] = self.error_class(['Zaznaczony musi być tylko jeden status użytkownika'])
        else:
            return self.cleaned_data

class CustomUserAdmin(UserAdmin):
    form = UserChangeForm
    add_form = CustomUserForm

    fieldsets = (
        ('User login', {
            'fields':('username', 'password',)
        }),
        ('Personal info', {
            'fields':('email', 'first_name', 'last_name', 'phone_number')
        }),
        ('Communicators', {
            'fields':('skype_login',)
        }),
        ('User status', {
            'fields':('is_manager', 'is_employee', 'is_client',)
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',)
        }),
    )
    add_fieldsets=(
        ('User login', {
            'fields':('username', 'password1', 'password2',)
        }),
        ('Personal info', {
            'fields':('email', 'first_name', 'last_name', 'phone_number')
        }),
        ('Communicators', {
            'fields':('skype_login',)
        }),
        ('User status', {
            'fields':('is_manager', 'is_employee', 'is_client',)
        }),
    )

    list_filter = ['is_manager', 'is_employee', 'is_client']
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'skype_login', 'is_staff', 'is_manager', 'is_employee', 'is_client', 'is_active']

class ManagerAdmin(admin.ModelAdmin):
    list_display = ['user']

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['user']

class ClientAdmin(admin.ModelAdmin):
    list_display = ['user']

class VerifyCodeEmployeeRegistrationAdmin(admin.ModelAdmin):
    list_display = ['email', 'code', 'date_creation', 'is_used', 'date_used']
    list_editable = ['is_used']

admin.site.register(User, CustomUserAdmin)
admin.site.register(Manager, ManagerAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(VerifyCodeEmployeeRegistration, VerifyCodeEmployeeRegistrationAdmin)
