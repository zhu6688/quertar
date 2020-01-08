/* 
    结构：
    <div class="jlc-quarter">
        <input type="text" class="quarterInput">
    </div>
    调用：
    需要先引入 jQuery.js 再调用
    $('.jlc-quarter').quarter({
        year:'2003'
    })
    <div class="jlc-quarter">这个节点的class可以随便起名字，不受限制
*/



$.fn.quarter = function(options){
  var defaults = {
    year: new Date().getFullYear()
  }
  return this.each(function(){
    // 给input的父元素设置定位
    $(this).css('position','relative');
    var opt = $.extend({},defaults,options);
    var dateInput = $(this).find('.quarterInput');
    //创建盒子
    var jlcDateWrapper = $('<div class="jlc-date-wrapper"></div>'); 
    jlcDateWrapper.html(quarterTxt(opt));
    var inputHeight = dateInput.outerHeight();
    jlcDateWrapper.css({
      top:inputHeight
    });
    $(this).append(jlcDateWrapper);
    // 添加到页面后获取元素
    var oPrev = $(this).find('.prev');
    var oNext = $(this).find('.next');
    var headTxt = $(this).find('.headTxt');
    var headInput = $(this).find('.headInput');
    var quarter = $(this).find('.quarter');
    quarter.html(oLi(opt));
    headTxt.html(opt.year+'年')
    headTxt.click(function(){
      $(this).hide();
      headInput.show().focus().val(opt.year);
    })
    //禁止输入除数字、delete、回车、左、右、删除键 意外的按键；
    headInput.keydown(function(ev){
      if( (ev.keyCode !=39) && (ev.keyCode !=37) && (ev.keyCode !=8) && (ev.keyCode !=13) && (ev.keyCode !=46) && !(48<=ev.keyCode && 57>=ev.keyCode) && !(96<=ev.keyCode && 105>=ev.keyCode) ){
        return false;
      }
    })
    //
    headInput.keyup(function(){
      var newText = $.trim(this.value);
      opt.year = newText;
      $(this).val(opt.year);
    })
    //失去焦点
    headInput.blur(function(){
      $(this).hide();
      headTxt.html(opt.year+'年').show();
      quarter.html(oLi(opt));
    })
    //点击每一季度
    quarter.on('click','li',function(){
      dateInput.val(this.innerHTML);
      jlcDateWrapper.hide();
    })
    // 减
    oPrev.click(function(){
      opt.year--;
      headTxt.html(opt.year+'年').show();
      quarter.html(oLi(opt));
    })
    // 加
    oNext.click(function(){
      opt.year++;
      headTxt.html(opt.year+'年').show();
      quarter.html(oLi(opt));
    })
    // 获取焦点显示列表
    dateInput.focus(function(){
      jlcDateWrapper.show();
    })
    
  })

  function oLi(opt){
    return '<li>'+opt.year+'第一季度</li><li>'+opt.year+'第二季度</li><li>'+opt.year+'第三季度</li><li>'+opt.year+'第四季度</li>'
  }

  function quarterTxt(opt){
    var calendarStr = 
          '<div class="container">'+
            '<div class="header">'+
              '<div class="prev"></div>'+
              '<div class="header-center">'+
                '<i class="headTxt"></i>'+
                '<input type="text" class="headInput">'+
              '</div>'+
              '<div class="next"></div>'+
            '</div>'+
            '<div class="content">'+
              '<ul class="quarter">'+
              '</ul>'+
            '</div>'+
          '</div>';
    return calendarStr;
  }

}






