$(document).ready(function(){
  var menuHeight = parseInt($('#navigation').height())+20;
  $('#menuSpacer').css('height',menuHeight);
  if($(window).width() > $(window).height()){
    $('.card').css({
      'margin':'0 1rem',
      'display':'inline-block'
    });
  }
});

$('#navigation,#shade').click(function(){
  var menuPosition = $('#menu').offset();
  showMenu();
  if(menuPosition.left != 0){
    $('#menu').css('left',0)
  }else{
    $('#menu').css('left','-75vw')
  }
})

function showMenu(){
  $('#shade').toggle('slow');
}

function postSuccess(){
  setTimeout(function(){
    window.location.replace('/');
  }, 1000);
}
