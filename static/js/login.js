
function cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);

    setTimeout(function(){
        document.querySelector('.cont_form_sign_up').style.display = "none";
    },200);
}

function cambiar_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
    },100);

    setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
    },400);


}

function ocultar_login_sign_up() {

    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function(){
        document.querySelector('.cont_form_sign_up').style.display = "none";
        document.querySelector('.cont_form_login').style.display = "none";
    },500);

}

$(".regBtn").click(() => {
  let $user = $(".regUser").val()
  let $regPswd = $(".regPswd").val()
  let $regConfirmPswd = $(".regConfirmPswd").val()

  $.ajax({
    url: "/user/reg",
    type: "POST",
    data: {
      "user": $user,
      "regPswd": $regPswd,
      "regConfirmPswd": $regConfirmPswd
    },
    dataType: "json",
    success: function(data){
      console.log(data);
    },
    error: function(msg){
      console.log(msg);
    },
  })
})
