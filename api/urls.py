from django.urls import path, re_path
from . import views

urlpatterns = [
    path('validate', views.validate, name='validate'),
    re_path(r'^user/(?P<pk>[0-9]+)$', views.user),
    path('user', views.user, name='user'),
    path('conversation', views.conversation, name='conversation'),
    path('prescription', views.prescription, name='prescription'),
    path('keyword', views.keyword, name='keyword'),
    path('get_bot_response', views.get_bot_response, name='get_bot_response'),
    # re_path(r'^image_processing/(?P<pk>[\w-]+)$', views.image_processing),
    # path('image_processing', views.image_processing, name='image_processing'),
]
