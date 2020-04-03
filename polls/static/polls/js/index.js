// const recordedAudio = document.getElementById('recordedAudio');
const record = document.getElementById('record');
const stopRecord = document.getElementById('stopRecord');
const refreshRecord = document.getElementById('refreshRecord');
const loading = document.getElementById('loading');
const loading2 = document.getElementById('loading2');

var loaderCounter = 1;
const referLink = [
    'https://vnexpress.net/thoi-su/hang-loat-cua-hang-dong-cua-4075213.html',
    'https://vnexpress.net/goc-nhin/nhung-bai-hoc-thoi-chien-4073192.html',
    'https://vnexpress.net/the-gioi/ca-nhiem-ncov-o-indonesia-tang-len-gan-900-4075255.html',
    'https://vnexpress.net/kinh-doanh/det-may-co-the-thiet-hai-11-000-ty-dong-vi-covid-19-4074994.html',
    'https://vnexpress.net/giai-tri/quyen-linh-thu-hoach-rau-trai-vuon-nha-4075064.html',
    'https://vnexpress.net/the-thao/giai-co-vua-candidates-dung-thi-dau-4075217.html',
    'https://vnexpress.net/phap-luat/de-xuat-tang-gap-doi-hinh-phat-voi-toi-pham-trong-covid-19-4074818.html',
    'https://vnexpress.net/giao-duc/giao-vien-nghi-khong-luong-duoc-ho-tro-4075039.html',
    'https://vnexpress.net/suc-khoe/chang-trai-nhiem-ncov-hong-toi-dau-rat-nhu-lua-dot-4075126.html',
    'https://vnexpress.net/doi-song/nhung-dam-tang-buon-o-italy-4075245.html',
    'https://vnexpress.net/du-lich/dau-bep-sushi-tuc-gian-vi-ncov-4074711.html',
    'https://vnexpress.net/khoa-hoc/dap-thuy-dien-song-mekong-khien-gdp-viet-nam-giam-0-3-4075131.html',
    'https://vnexpress.net/so-hoa/netflix-bi-sap-o-chau-au-va-bac-my-4075020.html',
    'https://vnexpress.net/oto-xe-may/oto-dua-nhau-giam-gia-hang-tram-trieu-dong-4074992.html',
    'https://vnexpress.net/y-kien/toi-o-nha-an-toan-voi-bua-sang-tu-na-u-mua-covid-4075203.html',
    'https://vnexpress.net/tam-su/yeu-2-nam-moi-biet-anh-co-vo-con-4074949.html'
];
var dirNumber = 15;
var fileNumber = 38;

$(document).ready(function () {
    //csrf_token
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

    $('#startContent').click(function () {
        // $('#frameSrc').attr('src', referLink[dirNumber]);
        $('#nextContent').prop('disabled', false);
        if(loaderCounter == 1) {
            sendCrawlData();
            loaderCounter --;
        }
        getData(dirNumber)

    })
    $('#nextContent').click(function () {
        dirNumber++;
        fileNumber = 0;
        // $('#frameSrc').attr('src', referLink[dirNumber]);
        $('#startContent').prop('disabled', true);
        getData(dirNumber)
    })

});
const handleSuccess = function (stream) {
    audioChunks = [];
    const recorder = new MediaRecorder(stream);
    var goodRecord = false;

    recorder.ondataavailable = e => {
        audioChunks.push(e.data);
        if (recorder.state == "inactive") {
            let blob = new Blob(audioChunks, {type: 'audio/wav'});
            if(goodRecord == false){
                return;
            }
            sendData(blob);
            fileNumber++;
        }
    }
    record.onclick = e => {
        record.disabled = true;
        stopRecord.disabled = false;
        audioChunks = [];
        loading.style.display = "block";
        recorder.start();
    };
    stopRecord.onclick = e => {
        record.disabled = false;
        stopRecord.disabled = true;
        loading.style.display = "none";
        goodRecord = true;
        recorder.stop();
    };
    refreshRecord.onclick = e => {
        goodRecord = false;
        record.disabled = false;
        stopRecord.disabled = true;
        loading.style.display = "none";
        // recorder.pause();
        // audioChunks = [];
        recorder.stop();
    };
};
function getData(id) {
    $.ajax({
        type: 'GET',
        url: '/get/'+id,
    }).done(function (data) {
        text = ""
        data.forEach(item => text+= item + '\n');
        $('#x').val(text);
    });
}
function sendData(data) {
    var fd = new FormData();
    fd.append('fname', fileNumber);
    fd.append('dirName', 'postNumber' + dirNumber);
    fd.append('link', referLink[dirNumber]);
    fd.append('data', data);
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false
    }).done(function (data) {
        console.log(data);
    });
}

function sendCrawlData() {
    loading2.style.display = "block";
    var fd = new FormData();
    // fd.append('dirName', 'postNumber' + dirNumber);
    fd.append('link', referLink);
    $('.mid').attr('color', 'blue');
    $('#record').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: '/crawl',
        data: fd,
        processData: false,
        contentType: false
    }).done(function (data) {
        console.log(data);
        $('.mid').attr('color', 'white');
        $('#record').prop('disabled', false);
        loading2.style.display = "none";
    });
}

navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(handleSuccess);

