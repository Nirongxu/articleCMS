/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/11/1
 * Description: 文件描述
 */

//  富文本配置
var E = window.wangEditor
var editor = new E('#Editor')
// 自定义菜单配置
editor.customConfig.menus = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  'emoticon', // 表情
  'image', // 插入图片
  'table', // 表格
  'code', // 插入代码
  'undo', // 撤销
  'redo' // 重复
]
editor.customConfig.uploadImgShowBase64 = true
editor.create()

//  发送评论
$('.submit').click(function (){
  $('span.default', '#Editor').remove()
  if (!editor.txt.text()) {
    layer.msg('评论不能为空', {icon: 5})
    return false
  }
  debugger
  if (editor.txt.text().substring(0, 1) === '@'){
    let index = editor.txt.text().search(" 回复:")

    let editorText = editor.txt.text().substring(index + 4)
    debugger
    console.log(editorText.length)
    if (editorText.length < 3) {
      debugger
      layer.msg('评论不能为空或小于3个字', {icon: 5})
      return false
    }

    editor.txt.text(editorText)

    let data = {
      content: {
        html: editor.txt.html(),
        text: editorText
      },
      article: $('.artTitle').data('artid'),
      commentId: $(this).attr("commentid")
    }

    $.post('/comment/reply', data, (data) => {
      layer.msg(data.msg, {
        time: 3000,
        icon: data.icon,
        end () {
          if (data.status === 1) {
            window.location.reload()
          }
        }
      })
    })


  } else {

    let data = {
      content: {
        html: editor.txt.html(),
        text: editor.txt.text()
      },
      article: $('.artTitle').data('artid')
    }

    $.post('/comment', data, (data) => {
      layer.msg(data.msg, {
        time: 3000,
        icon: data.icon,
        end () {
          if (data.status === 1) {
            window.location.reload()
          }
        }
      })
    })
  }
})

//  点赞
$('.dianzan').click(() => {
  $.post('/setpraiseNum', {
    articleId:  $('.dianzan').data('artid')
  }, (data) => {
    layer.tips(data.msg, '.zanico', {
      tips: 1
    })
  })
})

// 回复
$('.btn-reply').click(function () {
  let username = $(this).parents('.commentParent').find(".mainuser").text()
  let commentid = $(this).parents('.commentParent').find(".mainuser").data("commentid")
  $('.submit').attr('commentid', commentid)
  // $('span.default', '#Editor').text("回复: @" + username+ '\n')
  editor.txt.text('@' + username + ' 回复: \n')
  let url = window.location.href
  let reg = /#comment/
  let onoff = reg.test(url)
  if (onoff) {
    location = location
  } else {
    window.location.href = url + "#comment"
  }

})
