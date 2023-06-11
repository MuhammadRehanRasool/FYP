from django.urls import path, re_path
from . import views

urlpatterns = [
    path('validate', views.validate, name='validate'),
    re_path(r'^user/(?P<pk>[0-9]+)$', views.user),
    path('user', views.user, name='user'),
    re_path(r'^image_processing/(?P<pk>[\w-]+)$', views.image_processing),
    path('image_processing', views.image_processing, name='image_processing'),
    re_path(r'^category/(?P<pk>[\w-]+)$', views.category),
    path('category', views.category, name='category'),
    re_path(r'^brand/(?P<pk>[\w-]+)$', views.brand),
    path('brand', views.brand, name='brand'),
    re_path(r'^color/(?P<pk>[\w-]+)$', views.color),
    path('color', views.color, name='color'),
    re_path(r'^apparel/(?P<pk>[\w-]+)$', views.apparel),
    path('apparel', views.apparel, name='apparel'),
    re_path(r'^review/(?P<pk>[\w-]+)$', views.review),
    path('review', views.review, name='review'),
    re_path(r'^outfit/(?P<pk>[\w-]+)$', views.outfit),
    path('outfit', views.outfit, name='outfit'),
]
