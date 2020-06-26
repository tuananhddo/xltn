import requests
from bs4 import BeautifulSoup

def crawlDataFromZing(link):
    listLink = []
    req = requests.get(link)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    post = soup.select('#page-article > div.page-wrapper > article > section.main .the-article-body p ')
    postText = []
    for p in post:
    # (text=True, recursive=False)
        postData = p.findAll(text=True, recursive=True)
        postText = postText + postData + [' ']
    # post_not_none  = []
    # for p in posts:
    #     if p != '\n':
    #         post_not_none.append(p)
    print(postText)

    print(''.join(postText))
    return ''.join(postText)

def crawlDataFromSoha(link):
    listLink = []
    req = requests.get(link)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    listPost = soup.select('ul#sohaListNews li.item-news-cate.clearfix > a[href]')

    # for post in listPost:
    #     # print(post)
    #     listLink.append(base_url_soha + post.attrs['href'])
    return listLink
