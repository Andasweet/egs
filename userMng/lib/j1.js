function id(id) {
    if (typeof id == 'string') {
        return document.getElementById(id);
    } else {
        return id;
    }
}

function clName(className){
    if(typeof className=='string'){
        return document.getElementsByClassName(className);
    } else {
        return className;
    }
}

function tag(tag){
    if(typeof tag=='string'){
        return document.getElementsByTagName(tag);
    } else {
        return tag;
    }
}

/* 1 当时间小于零，前面补个零*/
function fill0(num){
    return  num<10 ? '0'+num:num;
}

/* 2 firefox 不支持innerText 的解决方法*/
function inText(txt,nTxt) {
    if(nTxt) {
        if(nTxt.innerText){
            return nTxt.innerText = nTxt;
        } else {
            return nTxt.textContent = nTxt;
        }
    } else {
        return txt.innerText||txt.textContent;
    }
}

/*  3 IE不支持className的解决方法*/
function ieCls(cls) {
    var i, elems = $('*'), len=elems.length, useArr=[];
    if(document.getElementsByClassName){
        return document.getElementsByClassName(cls);
    } 
    for(i=0; i<len; i++) {
        if(elems[i].className.indexOf(cls) > -1){
            useArr.push(elems[i]);
        }
    }   
    return useArr;
}

//  4 IE浏览器不支持placeholder 的解决方法
function placeholderFix() {
  var input = document.createElement('input'),
      ipts = $$('input'),
      i,
      len = ipts.length,
      plh,
      phText,
      span = $$('span');
  if('placeholder' in input) {
    for (var j=0; j<span.length; j++){
      span[j].style.display = 'none';
    }
    return;
  }
  for(i=0; i<len; i++) {
      phText = ipts[i].getAttribute('placeholder');
      plh = ipts[i].parentNode.getElementsByTagName('span')[0],
      plh.innerHTML = phText;

      plh.onclick = function() {
        this.parentNode.getElementsByTagName('input')[0].focus();
      }
      ipts[i].onkeyup = function() {
        var status = 'block';
        if(this.value.length>0) {
          status = 'none';
        }
        this.parentNode.getElementsByTagName('span')[0].style.display = status;
      }
  }
}