import requests
from bs4 import BeautifulSoup

def crawlLinkFromVnexpress(key):
    url_vnexpress = "https://timkiem.vnexpress.net/?q=" + key
    req = requests.get(url_vnexpress)
    soup = BeautifulSoup(req.text, "lxml")
    listLink = []
    listPost = soup.select('#result_search article[data-url]')
    for post in listPost:
        print(post.attrs["data-url"])
        listLink.append(post.attrs["data-url"])
    return listLink


def crawlLinkFromZing(key):
    base_url_zing = "https://zingnews.vn"
    url_zing = base_url_zing + "/" + key + "-tim-kiem.html"
    listLink = []

    req = requests.get(url_zing)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    listPost = soup.select('#search-result > div.section-content .article-item .article-thumbnail a[href]')
    # print(listPost)
    for post in listPost:
        print(base_url_zing + post.attrs['href'])
        listLink.append(base_url_zing + post.attrs['href'])
    return listLink


def crawlLinkFromBaomoi(key):
    base_url_baomoi = "https://baomoi.com"
    url_zing = base_url_baomoi + "/tim-kiem/" + key +".epi"
    listLink = []

    req = requests.get(url_zing)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    listPost = soup.select('body .timeline.loadmore .story .story__heading a')
    for post in listPost:
        print(base_url_baomoi + post.attrs['href'])
        listLink.append(base_url_baomoi + post.attrs['href'])

    return listLink


def crawlLinkFromSoha(key):
    base_url_soha = "https://soha.vn"
    url_zing = base_url_soha + '/tim-kiem.htm?keywords=' + key
    listLink = []

    req = requests.get(url_zing)
    soup = BeautifulSoup(req.text, "lxml")
    # print(soup)
    listPost = soup.select('ul#sohaListNews li.item-news-cate.clearfix > a[href]')
    for post in listPost:
        # print(post)
        listLink.append(base_url_soha + post.attrs['href'])
    return listLink
