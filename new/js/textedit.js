var size = 40,
    cl = $('.slider__content_title'),
    newsText = "";
for (var i = 0; i<cl.length;i++){
    newsText = cl[i].innerText;
    if(newsText.length > size){
        cl[i].innerText = newsText.slice(0, size) + ' ...';
    }
}