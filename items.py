from scrapy_djangoitem import DjangoItem
from polls.models import Post


class TheodoTeamItem(DjangoItem):
    django_model = Post
