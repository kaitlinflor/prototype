function removeColor(number) {

  const buttons = document.querySelectorAll("div.selector");
  document.getElementById('timer').style.visibility = 'hidden';

  for (let i = 0; i < buttons.length; i++){
      buttons[i].style.backgroundColor = '#5db492';
  }
}



function changeColor(number) {

  const buttons = document.querySelectorAll("div.selector");
  document.getElementById('timer').style.visibility = 'visible';

  buttons[number].style.backgroundColor = '#4b816c';
}