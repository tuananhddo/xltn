import json
import os
import re

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf import settings
from bs4 import BeautifulSoup
from polls.forms import UploadFileForm
import requests

def index(request):
    return render(request, 'polls/login.html')
def indexGetText(request,id):
    data = ""
    dir_name = 'postNumber' + id
    my_dir_path = os.path.join(settings.MEDIA_ROOT,dir_name)
    with open(os.path.join(my_dir_path, dir_name + "_data.txt"), 'rb+') as file:
        data_text = file.readlines()
        stringlist = [x.decode('utf-8') for x in data_text]
    # stringlist = '.'.join(stringlist)
    return JsonResponse(stringlist,safe=False)

def upload(request):
    if request.method == 'POST':
        dir_name = request.POST.get('dirName')
        links = request.POST.get('link')
        handle_uploaded_file(request.FILES.get('data'),request.POST.get('fname'),dir_name,links)
        return HttpResponse("OK")
    return HttpResponse('NOT OK')


def handle_uploaded_file(f,name,dir_name,links):
    file_name = 'sentence' + name
    my_dir_path = os.path.join(settings.MEDIA_ROOT,dir_name)
    if not os.path.isdir(my_dir_path):
        os.mkdir(my_dir_path)
        folderDesFile = open(os.path.join(my_dir_path, dir_name + ".txt"), 'w+')
        folderDesFile.write(links)
        folderDesFile.close()
        # crawl_express(links, dir_name,my_dir_path)

    with open(os.path.join(my_dir_path, file_name + ".wav"), 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    desFile = open(os.path.join(my_dir_path, dir_name + ".txt"), 'ab+')
    crawlDataFile = open(os.path.join(my_dir_path, dir_name + "_data.txt"), 'rb+')
    index = 0
    my_line = ""
    for i in crawlDataFile:
        if index == int(name):
            my_line = i.decode('utf8')
            break
        index+=1
    crawlDataFile.close()
    desFile.write((file_name + ".wav" + "\n" + my_line).encode('utf8'))
    desFile.close()


def crawl_express_list(request):
    links = request.POST.get('link').split(',')

    for i in range(len(links)):
        dir_name = 'postNumber' + str(i)
        my_dir_path = os.path.join(settings.MEDIA_ROOT, dir_name)

        if not os.path.isdir(my_dir_path):
            os.mkdir(my_dir_path)
            folderDesFile = open(os.path.join(my_dir_path, dir_name + ".txt"), 'w+')
            folderDesFile.write(links[i] + "\n\n")
            folderDesFile.close()
        f = open(os.path.join(my_dir_path, dir_name + "_data.txt"), 'wb+')
        req = requests.get(links[i])
        soup = BeautifulSoup(req.text, "lxml")

        textData = soup.body.article.text
        textData = parseSpace(textData)

        description = soup.select_one('body > section.container section p.description')
        if description is not None:
            descriptionData = parseSpace(description.text)
            textData = descriptionData + textData

        data_list = textData.split(".")
        for sen in data_list:
            f.write((sen + '\n').encode('utf8'))
        f.close()
    return HttpResponse('OK')


def parseSpace(textData):
    re.sub('\s+', ' ', textData)
    textData = textData.replace('\s', "")
    textData = textData.replace('\n', "")
    textData = textData.replace('\t', "")
    textData = textData.replace(":", ".")
    textData = textData.replace(";", ".")
    textData = textData.replace("?", ".")
    textData = textData.replace("!", ".")
    return textData




