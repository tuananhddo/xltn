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
    'https://vnexpress.net/suc-khoe/chang-trai-nhiem-ncov-hong-toi-dau-rat-nhu-lua-dot-4075126.html',
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

