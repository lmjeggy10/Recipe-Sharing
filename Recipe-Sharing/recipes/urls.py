from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from .views import send_recipe_email

urlpatterns = [
    path('', views.RecipeListCreate.as_view(), name='recipe-list-create'),
    path('<int:pk>/', views.RecipeDetail.as_view(), name='recipe-detail'),
    path('new/', views.RecipeCreate.as_view(), name='recipe-create'), 
    path('<int:pk>/edit/', views.RecipeUpdate.as_view(), name='recipe-update'),
    # path('send-email/', send_email_view, name='send_recipe_email'),
    path('send-recipe-email/', send_recipe_email, name='send_recipe_email'),
    # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # Token authentication
]
