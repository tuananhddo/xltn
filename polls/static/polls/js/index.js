// const recordedAudio = document.getElementById('recordedAudio');
const record = document.getElementById('record');
const stopRecord = document.getElementById('stopRecord');
const refreshRecord = document.getElementById('refreshRecord');
const loading = document.getElementById('loading');
const loading2 = document.getElementById('loading2');

var loaderCounter = 1;
const referLink = [
    "https://vnexpress.net/suc-khoe/them-mot-nguoi-ninh-thuan-nhiem-ncov-4071034.html",
    "https://vnexpress.net/phap-luat/vua-lay-vo-co-duoc-hoan-nhap-ngu-4070530.html",
    "https://vnexpress.net/kinh-doanh/khu-vuc-dong-euro-cham-chap-truoc-phep-thu-covid-19-4071457.html",
    "https://vnexpress.net/kinh-doanh/shopee-lazada-kho-thong-tri-thuong-mai-dien-tu-viet-nam-4066226.html",
    "https://vnexpress.net/kinh-doanh/doanh-nghiep-noi-sieu-giam-gia-ngay-black-friday-3318492.html",
    'https://vnexpress.net/kinh-doanh/mua-sam-hang-ngoai-qua-mang-sao-cho-an-toan-3832532.html',
    'https://vnexpress.net/kinh-doanh/vnexpress-ra-mat-khoa-hoc-ve-thuong-mai-dien-tu-3995346.html',
    "https://vnexpress.net/suc-khoe/them-mot-nguoi-ninh-thuan-nhiem-ncov-4071034.html",
    "https://vnexpress.net/phap-luat/vua-lay-vo-co-duoc-hoan-nhap-ngu-4070530.html",
    "https://vnexpress.net/kinh-doanh/khu-vuc-dong-euro-cham-chap-truoc-phep-thu-covid-19-4071457.html",
    "https://vnexpress.net/kinh-doanh/shopee-lazada-kho-thong-tri-thuong-mai-dien-tu-viet-nam-4066226.html",
    "https://vnexpress.net/kinh-doanh/doanh-nghiep-noi-sieu-giam-gia-ngay-black-friday-3318492.html",
    'https://vnexpress.net/kinh-doanh/mua-sam-hang-ngoai-qua-mang-sao-cho-an-toan-3832532.html',
    'https://vnexpress.net/kinh-doanh/vnexpress-ra-mat-khoa-hoc-ve-thuong-mai-dien-tu-3995346.html',
    "https://vnexpress.net/kinh-doanh/shopee-lazada-kho-thong-tri-thuong-mai-dien-tu-viet-nam-4066226.html",
    "https://vnexpress.net/kinh-doanh/doanh-nghiep-noi-sieu-giam-gia-ngay-black-friday-3318492.html",
    'https://vnexpress.net/kinh-doanh/mua-sam-hang-ngoai-qua-mang-sao-cho-an-toan-3832532.html',
    'https://vnexpress.net/kinh-doanh/vnexpress-ra-mat-khoa-hoc-ve-thuong-mai-dien-tu-3995346.html',
    "https://vnexpress.net/suc-khoe/them-mot-nguoi-ninh-thuan-nhiem-ncov-4071034.html",
    "https://vnexpress.net/phap-luat/vua-lay-vo-co-duoc-hoan-nhap-ngu-4070530.html",
    "https://vnexpress.net/kinh-doanh/khu-vuc-dong-euro-cham-chap-truoc-phep-thu-covid-19-4071457.html",
    "https://vnexpress.net/kinh-doanh/shopee-lazada-kho-thong-tri-thuong-mai-dien-tu-viet-nam-4066226.html",
    "https://vnexpress.net/kinh-doanh/doanh-nghiep-noi-sieu-giam-gia-ngay-black-friday-3318492.html",
    'https://vnexpress.net/kinh-doanh/mua-sam-hang-ngoai-qua-mang-sao-cho-an-toan-3832532.html',
    'https://vnexpress.net/kinh-doanh/vnexpress-ra-mat-khoa-hoc-ve-thuong-mai-dien-tu-3995346.html'

];
var dirNumber = 0;
var fileNumber = 0;

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
        $('#frameSrc').attr('src', referLink[dirNumber]);
        $('#nextContent').prop('disabled', false);
        if(loaderCounter == 1) {
            sendCrawlData();
            loaderCounter --;
        }

    })
    $('#nextContent').click(function () {
        dirNumber++;
        $('#frameSrc').attr('src', referLink[dirNumber]);
        $('#startContent').prop('disabled', true);
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
            // recordedAudio.src = URL.createObjectURL(blob);
            // recordedAudio.controls = true;
            // recordedAudio.autoplay = true;
            goodRecord && sendData(blob);
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
        record.disabled = false;
        stopRecord.disabled = true;
        loading.style.display = "none";
        goodRecord = false;
        // recorder.pause();
        // audioChunks = [];
        recorder.stop();
    };
};

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

