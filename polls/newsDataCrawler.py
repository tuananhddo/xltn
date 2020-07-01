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
        postData = p.findAll(text=True, recursive=True)
        postText = postText + postData + [' ']
    print(''.join(postText))
    return ''.join(postText)

def crawlDataFromSoha(link):
    listLink = []
    req = requests.get(link)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    post = soup.select('.detail-body')
    postText = []
    for p in post:
        postData = p.findAll(text=True, recursive=True)
        postText = postText + postData + [' ']
    print(''.join(postText))
    return ''.join(postText)

