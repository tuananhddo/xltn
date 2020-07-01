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
    # link = "https://m.soha.vn/so-ke-lan-bach-tuyet-5-canh-trang-va-hien-oanh-vua-ban-hon-10-ty-dong-cua-dai-gia-dat-bac-20200630111258576.htm"
    listLink = []
    req = requests.get(link)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    post = soup.select('[data-field=body] > p')
    # print(post)
    postText = []
    for p in post:
        postData = p.findAll(text=True, recursive=True)
        postText = postText + postData + [' ']
        # print(postData)
    # print(''.join(postText))
    return ''.join(postText)

def crawlDataFromVnexpress(link):
    listLink = []
    req = requests.get(link)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    post = soup.select('article.fck_detail p')
    title = soup.select('.title-detail')[0].string
    print(title)
    postText = []
    # postText.append(title)
    for p in post:
        postData = p.findAll(text=True, recursive=True)
        postText = postText + postData + [' ']
        # print(postData)
    # print(''.join(postText))
    return ''.join(postText)
