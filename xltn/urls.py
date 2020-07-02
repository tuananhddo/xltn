"""xltn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from polls import HomeController

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomeController.index),
    path('upload',HomeController.upload),
    path('crawl', HomeController.crawl_express_list),
    path('get/<str:id>', HomeController.indexGetText),
    path('search', HomeController.search),
    path('post', HomeController.crawlPost),
    path('user'),
    path('user/like-posts/list'),
    path('user/like-posts/add'),
    path('user/like-posts/remove')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
