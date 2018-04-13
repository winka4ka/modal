var modalWindowBcg, modalWindow, modalWindow_close, modalWindow_ttl, modalWindow_inner;

//открытие модального окна
function showModal(param,ttl){

  if(!modalWindow)
    modalWindowCreate();

  modalWindow_ttl.innerHTML = ttl || '&nbsp;';

  switch(typeof param){
    case "string": 
      //param-что вставить в окно, 
      //ttl-в заголовок окна, 

      //показать окно сейчас
      modalVisible(param,ttl);
    break;
    case 'object':
      //показать окно при клике на объект
      param.onclick = function () {
        ttl = ttl || '&nbsp;';
        
        var id = param.getAttribute('data-id');//элемент
        var src = param.getAttribute('data-src');//фото
        if(id){
          var block = document.querySelector(id);
          if(block){
            modalVisible(block.innerHTML,ttl);
          }
        }
        else if(src){
          modalVisible("<div class='modalWrapImg'><img src='"+src+"'></div>",ttl);
        }
        else
          modalError();
        return false;
      }
    break;
    default:
      modalError();
    break;
  }


  function modalWindowCreate(){
    modalWindowBcg = document.createElement('div');
    modalWindowBcg.className = "modalWindowBcg";
    document.body.appendChild(modalWindowBcg);

    modalWindow = document.createElement('div');
    modalWindow.className = "modalWindow";
    modalWindow.innerHTML = "<div class='modalWindow-close'>x</div><div class='modalWindow-ttl'>&nbsp;</div><div class='modalWindow-inner'></div>";
    document.body.appendChild(modalWindow);
        
    modalWindow_ttl = document.querySelector('.modalWindow-ttl');
    modalWindow_inner = document.querySelector('.modalWindow-inner');
    modalWindow_close = document.querySelector('.modalWindow-close');

    //закрытие модального окна
    modalWindowBcg.onclick = function() {
      modalClose();
    }
    modalWindow_close.onclick = function() {
      modalClose();
    }
  }

  function modalClose(){
    modalWindow.style.display='none';
    modalWindowBcg.style.display='none';
  }
  function modalError(){
    showModal('Ошибка');
  }
  
  function modalVisible(text,ttl){
    modalWindow_inner.innerHTML = text; 
    modalWindow_ttl.innerHTML = ttl || '&nbsp;';

    modalWindow.style.display='block';
    modalWindowBcg.style.display='block';

    //вычислять top после загрузки изображений
    var images = modalWindow_inner.querySelectorAll('img');
    //нет изображений
    if(!images.length)
      modalSetTop();
    [].forEach.call( images, function(el) {
      el.onload = function(){
        modalSetTop();
      };
    });
  }
  function modalSetTop(){
    //вычисление top окна
    var windowH = document.documentElement.clientHeight;
    var modalH = modalWindow.offsetHeight;
    var modalTop = (windowH - modalH)/2;
    if(modalTop > 0){
      modalWindow.style.top=modalTop+'px';
      modalWindow_inner.style.height='auto';
    }
    else{
      modalWindow.style.top=25+'px';
      modalWindow_inner.style.height=windowH-70+'px';
    }
  }

}