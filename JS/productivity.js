$(document).ready(function (){
var slider = document.getElementById("myRange");
var image = document.getElementById("panelImage");
var tooltipText = document.getElementById("tooltipText");
slider.oninput = function() {
    if (this.value == 1)
    {
        image.src="./images/morning.png";
        tooltipText.innerText="In the morning, the panel productivity starts to rise as the sun rises to the sky. Best productivity is seen in panels which guide themselves after the sun."; 
    }
    else if (this.value == 2)
    {
        image.src="./images/midday.png";
        tooltipText.innerText="During the day, the panel productivity is at its highest, capturing as much as possible and saving all the extra energy in the solar storage (a battery for example).";
    }
    else if (this.value == 3)
    {
        image.src="./images/evening.png";
        tooltipText.innerText="In the evening, the panel productivity drops to around 10%, depending on the angle it has from the sun. It still captures solar energy, however, not a lot.";
    }
    else
    {
        image.src="./images/night.png";
        tooltipText.innerText="At night, the panel does not capture any solar power. However, due to solar storage, you will still have electricity and hot water during the night.";
    }
  }
});