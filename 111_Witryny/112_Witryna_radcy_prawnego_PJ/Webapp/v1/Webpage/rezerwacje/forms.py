from django import forms
from . import models
from django.core import validators
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from django.utils import timezone
from django.forms.utils import ErrorList
from django.contrib.auth.models import User as UserFromAuth

from .models import (User, Manager, Employee, Client)

class EmployeeSignUpForm(UserCreationForm):
    verify_code = forms.CharField(widget=forms.TextInput)
    email = forms.EmailField(validators=[validators.EmailValidator(message="Wprowadzona wartość nie jest adresem email.")])

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'skype_login', 'verify_code', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
            super(EmployeeSignUpForm, self).__init__(*args, **kwargs)
            self.fields['username'].widget.attrs['placeholder'] = 'Nazwa użytkownika/Login'
            self.fields['email'].widget.attrs['placeholder'] = 'E-mail'
            self.fields['first_name'].widget.attrs['placeholder'] = 'Imię'
            self.fields['last_name'].widget.attrs['placeholder'] = 'Nazwisko'
            self.fields['phone_number'].widget.attrs['placeholder'] = 'Numer telefonu'
            self.fields['skype_login'].widget.attrs['placeholder'] = 'Login Skype'
            self.fields['verify_code'].widget.attrs['placeholder'] = 'Kod weryfikacyjny'
            self.fields['password1'].widget.attrs['placeholder'] = 'Hasło'
            self.fields['password2'].widget.attrs['placeholder'] = 'Powtórz hasło'

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if not password2:
            self._errors['password2'] = self.error_class(['Należy uzupełnić to pole. Hasła w obu polach muszą być zgodne.'])
        if password1 != password2:
            self._errors['password1'] = self.error_class(['Hasła w obu polach nie są ze sobą zgodne.'])
            self._errors['password2'] = self.error_class(['Hasła w obu polach nie są ze sobą zgodne.'])
        return password2

    def clean(self):
        super(EmployeeSignUpForm, self).clean()

        q1 = models.VerifyCodeEmployeeRegistration.objects.filter(
                                                                email=self.cleaned_data.get('email'),
                                                                code=self.cleaned_data.get('verify_code')
                                                                )
        try:
            if_is_used = q1[0].is_used
        except:
            if_is_used = True

        if len(q1) != 1 or if_is_used == True:
                self._errors['email'] = self.error_class(['Wprowadzono błędny adres e-mail lub błędny kod weryfikacyjny.\nWprowadzone dane nie są zgodne z adresem e-mail oraz kodem weryfikacyjnym prawdziwego pracownika.'])
                self._errors['verify_code'] = self.error_class(['Wprowadzono błędny adres e-mail lub błędny kod weryfikacyjny.\nWprowadzone dane nie są zgodne z adresem e-mail oraz kodem weryfikacyjnym prawdziwego pracownika.'])
        else:
            return self.cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_employee = True
        q2 = models.VerifyCodeEmployeeRegistration.objects.filter(
                                                                email=self.cleaned_data.get('email'),
                                                                code=self.cleaned_data.get('verify_code')
                                                                )
        if commit:
            user.save()
        q2.update(is_used=True)
        q2.update(date_used=timezone.now())
        return user
