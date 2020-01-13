jQuery(document).ready(function () {
    var successBox = document.getElementById("alert");
    var nameConfirmation = document.getElementById("alertName");
    var emailConfirmation = document.getElementById("alertEmail");
    var messageConfirmation = document.getElementById("alertMessage");
    successBox.style.display='none';
    nameConfirmation.style.display='none';
    emailConfirmation.style.display='none';
    messageConfirmation.style.display='none';
});

function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  else
    return (false)
}

function onButtonClick()
{
    var contactName = document.getElementById("formName");
    var contactEmail = document.getElementById("formEmail");
    var contactMessage = document.getElementById("formMessage");
    var nameConfirmation = document.getElementById("alertName");
    var emailConfirmation = document.getElementById("alertEmail");
    var messageConfirmation = document.getElementById("alertMessage");

    if (contactName!=null && contactMessage!=null && contactMessage!=null){
        if (contactName.value.length<3){
            contactName.classList.add("invalid");
            nameConfirmation.style.display='block';
        }
        else{
            contactName.classList.remove("invalid");
            nameConfirmation.style.display='none';
        }
        if (!validateEmail(contactEmail.value)){
            contactEmail.classList.add("invalid");
            emailConfirmation.style.display='block';
        }
        else{
            contactEmail.classList.remove("invalid");
            emailConfirmation.style.display='none';
        }
        if (contactMessage.value.length<10){
            messageConfirmation.style.display='block';
            contactMessage.classList.add("invalid");
        }
        else{
            contactMessage.classList.remove("invalid");
            messageConfirmation.style.display='none';
        }
        if (contactName.value.length>=3 && validateEmail(contactEmail.value) && contactMessage.value.length>=10){
            var successBox = document.getElementById("alert");
            successBox.style.display = 'block';
            contactMessage.value='';
            contactEmail.value='';
            contactName.value='';
        }
    }
    return false;
}