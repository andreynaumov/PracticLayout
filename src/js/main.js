window.onload = function() {


  /* ==================== Слайдер на main ==================== */

  var buttonOne = document.querySelector('#control_1');
  var buttonTwo = document.querySelector('#control_2');
  var buttonThree = document.querySelector('#control_3');

  /* Индекс слайда по умолчанию */
  var slideIndex = 1;
  mainSlider(slideIndex);

  /* Функция увеличивает индекс на 1, показывает следующй слайд */
  function plusSlide() {
      mainSlider(slideIndex += 1);
  }

  /* Устанавливает текущий слайд */
  function currentSlide(n) {
      mainSlider(slideIndex = n);
  }

  /* Запускаем автоматическое прокручивание */

  var timer = setTimeout(function tick() {
    mainSlider(slideIndex += 1);
    buttonOne.onclick = function() { 
      currentSlide(1);
      clearTimeout(timer);
      timer = setTimeout(tick, 7000);
    }
    buttonTwo.onclick = function() { 
      currentSlide(2);
      clearTimeout(timer);
      timer = setTimeout(tick, 7000);
    }
    buttonThree.onclick = function() { 
      currentSlide(3);
      clearTimeout(timer);
      timer = setTimeout(tick, 7000);
    }
    timer = setTimeout(tick, 7000);
  }, 7000)


  /* Основная функция слайдера*/
  function mainSlider(n) {
    var i;
    var imagesMain = document.querySelectorAll('.main-text');
    var dotsMain = document.querySelectorAll('.main-control li');
    if (n > imagesMain.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = imagesMain.length
    }

    for (i = 0; i < imagesMain.length; i++) {
      imagesMain[i].classList.remove('main_active');
    }
    for (i = 0; i < dotsMain.length; i++) {
      dotsMain[i].classList.remove('main-control__active');
    }
    imagesMain[slideIndex - 1].classList.add('main_active');
    dotsMain[slideIndex - 1].classList.add('main-control__active');
  }

  /* ==================== END слайдер на main ==================== */





  



  /* ==================== Pagination in review ==================== */

  var buttonReviewOne = document.querySelector('#review-control_1');
  var buttonReviewTwo = document.querySelector('#review-control_2');
  var buttonReviewThree = document.querySelector('#review-control_3');

  function reviewSlider(n) {
    var i;
    var imagesReview = document.querySelectorAll('.review-window__frame img');
    var dotsReview = document.querySelectorAll('.review-window__button');
    
    for (i = 0; i < imagesReview.length; i++) {
      imagesReview[i].classList.remove('review-window__photo_active');
    }
    for (i = 0; i < dotsReview.length; i++) {
      dotsReview[i].classList.remove('review-window__button_active');
    }
    imagesReview[n].classList.add('review-window__photo_active');
    dotsReview[n].classList.add('review-window__button_active');
  }

  buttonReviewOne.onclick = function() { 
    reviewSlider(0);
  }
  buttonReviewTwo.onclick = function() { 
    reviewSlider(1);
  }
  buttonReviewThree.onclick = function() { 
    reviewSlider(2);
  }

  /* ==================== END Pagination in review ==================== */



}
