$(function () {
  let i = 0
  setInterval(function () {
    $(document.body).css({
      'background': "url('../images/background/bg" + i % 43 + ".jpg')",
      'background-size': 'cover',
      'background-position': 'center'
    })
    i++
  }, 8000)
  $('.upDown i').click(function () {
    let $content = $(this).parents('.upDown').siblings('.content')
    $content.addClass('downList')

    setTimeout(function () {
      $('li', $content).css('position', 'unset')
      $('li:first,li:last', $content).css('transform', 'rotate(0deg)')
    }, 300)
    $('ul', $content).css('margin-bottom', '0')
    $(this).parent().css('display', 'none')
  })
})

layui.laypage.render({
  elem: 'laypage',
  count: $('#laypage').data('maxnum'),
  limit: 10,
  groups: 3,
  curr: location.pathname.replace('/page/', ''),
  jump (obj, f) {
    $('#laypage a').each((i, v) => {
      let pageValue = `/page/${$(v).data('page')}`
      v.href = pageValue
    })
  }
})
