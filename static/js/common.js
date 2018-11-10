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

let maxnum = $('#laypage').data('maxnum')
let pathdata = $('#laypage').data('path')
if (!pathdata) {
  pathdata = ''
}

layui.laypage.render({
  elem: 'laypage',
  count: maxnum,
  limit: 10,
  groups: 3,
  curr: location.pathname.replace(`/${pathdata}/page/`, ''),
  jump (obj, f) {

    $('#laypage a').each((i, v) => {
      let pageValue = `/${pathdata}/page/${$(v).data('page')}`
      v.href = pageValue
    })
    $('#laypage a.layui-disabled').attr({'href': 'javascript:void(0)'})
  }
})
