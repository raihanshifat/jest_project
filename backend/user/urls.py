from django.urls import path
from user.views import SignUp, BlacklistTokenUpdateView
from rest_framework_simplejwt import views as jwt_views

urlpatterns=[
    path("signup",SignUp.as_view(),name="signup"),
    path('token/access', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
    ]
