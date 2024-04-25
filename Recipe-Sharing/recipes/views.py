from django.shortcuts import render
from rest_framework import generics
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView
from django.core.mail import send_mail
from django.http import JsonResponse
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect

class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    

class RecipeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeList(generics.ListAPIView):  
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeCreate(CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

class RecipeUpdate(RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# def send_email_view(request):
#     return render(request, 'email.html')

# @csrf_exempt  # Temporary solution to bypass CSRF protection for demo purposes
# def send_email(request):
#     if request.method == 'POST':
#         # Get the recipient's email address from the request data
#         recipient_email = request.POST.get('recipient_email')

#         # Send the email
#         try:
#             send_mail(
#                 'Subject',  # Email subject
#                 'Message body',  # Email body
#                 'lmjeggy14@gmail.com',  # Sender's email address
#                 [recipient_email],  # Recipient's email address
#                 fail_silently=False,  # Raise exceptions if email sending fails
#             )
#             return JsonResponse({'success': True})
#         except Exception as e:
#             return JsonResponse({'success': False, 'error': str(e)})

@csrf_protect
def send_recipe_email(request):
    if request.method == 'POST':
        recipient_email = request.POST.get('recipient_email')
        recipe_details = {
            'title': 'Delicious Recipe',
            'ingredients': 'Ingredient 1, Ingredient 2, Ingredient 3',
            'instructions': 'Step 1, Step 2, Step 3',
            'prep_time': '30 minutes',
            'cook_time': '1 hour'
        }

        email_subject = 'Check out this recipe!'
        email_message = f"""
            Title: {recipe_details['title']}
            Ingredients: {recipe_details['ingredients']}
            Instructions: {recipe_details['instructions']}
            Prep Time: {recipe_details['prep_time']}
            Cook Time: {recipe_details['cook_time']}
            """
        
        try:
            send_mail(
                email_subject,
                email_message,
                'lmjeggy14@gmail.com',  # Sender's email address
                [recipient_email],  # Recipient's email address
                fail_silently=False,
            )
            return JsonResponse({'success': True, 'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed'})