function cambiar_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
  document.querySelector('.cont_form_login').style.display = "block";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.opacity = "1";
  }, 400);

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = "none";
  }, 200);
}

function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.opacity = "1";
  }, 100);

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.display = "none";
  }, 400);


}

function ocultar_login_sign_up() {

  document.querySelector('.cont_forms').className = "cont_forms";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = "none";
    document.querySelector('.cont_form_login').style.display = "none";
  }, 500);

}


// 注册
$(".regBtn").click(() => {
  let $user = $(".regUser").val()
  let $regPswd = $(".regPswd").val()
  let $regConfirmPswd = $(".regConfirmPswd").val()
  if ($user.length === 0 || $regPswd.length === 0) {
    alert("账号或密码不能为空")
    return false
  } else if ($regPswd !== $regConfirmPswd) {
    alert("两次密码不一样")
    return false
  }

  $.ajax({
    url: "/user/reg",
    type: "POST",
    data: {
      "username": $user,
      "password": $regPswd,
      "password2": $regConfirmPswd
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.status === "1") {
        alert("注册成功")
      } else {
        alert(data.status)
      }
    },
    error: function (msg) {
      console.log(msg);
      alert(msg);
    },
  })
})


// 登录
$(".subBtn").click(function () {
  let $user = $(".logUser").val()
  let $regPswd = $(".logPswd").val()
  if ($user.length === 0 || $regPswd.length === 0) {
    alert("账号或密码不能为空")
    return false
  }

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: {
      "username": $user,
      "password": $regPswd
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.status === "1") {
        alert("登录成功，点解确定跳转的到首页")
        window.location.href="/";
      } else {
        alert(data.status)
      }
    },
    error: function (msg) {
      console.log(msg);
      alert(msg);
    },
  })
})
