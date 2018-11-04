function cambiar_login () {
  document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_login'
  document.querySelector('.cont_form_login').style.display = 'block'
  document.querySelector('.cont_form_sign_up').style.opacity = '0'

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.opacity = '1'
  }, 400)

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = 'none'
  }, 200)
}

function cambiar_sign_up (at) {
  document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_sign_up'
  document.querySelector('.cont_form_sign_up').style.display = 'block'
  document.querySelector('.cont_form_login').style.opacity = '0'

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.opacity = '1'
  }, 100)

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.display = 'none'
  }, 400)
}

function ocultar_login_sign_up () {
  document.querySelector('.cont_forms').className = 'cont_forms'
  document.querySelector('.cont_form_sign_up').style.opacity = '0'
  document.querySelector('.cont_form_login').style.opacity = '0'

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = 'none'
    document.querySelector('.cont_form_login').style.display = 'none'
  }, 500)
}

// 注册
$('.regBtn').click(() => {
  let $user = $('.regUser').val()
  let $regPswd = $('.regPswd').val()
  let $regConfirmPswd = $('.regConfirmPswd').val()
  if ($user.length === 0 || $regPswd.length === 0) {
    layer.alert('账号或密码不能为空', {icon: 5})
    return false
  } else if ($regPswd !== $regConfirmPswd) {
    layer.alert('两次密码不一样', {icon: 5})
    return false
  }

  $.ajax({
    url: '/user/reg',
    type: 'POST',
    data: {
      'username': $user,
      'password': $regPswd,
      'password2': $regConfirmPswd
    },
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data.status === '1') {
        layer.open({
          icon: 6,
          content: '注册成功',
          end: function(index, layero){
            cambiar_login()
            layer.close(index)
          }
        })
      } else {
        layer.open({
          icon: 5,
          content: data.status,
          end: function(index, layero){
            layer.close(index)
          }
        })
      }
    },
    error: function (msg) {
      console.log(msg)
      layer.alert(msg, {icon: 5})
    }
  })
})

// 登录
$('.subBtn').click(function () {
  let $user = $('.logUser').val()
  let $regPswd = $('.logPswd').val()
  if ($user.length === 0 || $regPswd.length === 0) {
    layer.alert('账号或密码不能为空', {icon: 5})
    return false
  }

  $.ajax({
    url: '/user/login',
    type: 'POST',
    data: {
      'username': $user,
      'password': $regPswd
    },
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data.status === '1') {
        window.location.href = '/'
      } else {
        layer.alert(data.status, {icon: 5})
      }
    },
    error: function (msg) {
      console.log(msg)
      layer.alert(msg, {icon: 5})
    }
  })
})
