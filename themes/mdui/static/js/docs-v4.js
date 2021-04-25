$(function () {
  var $document = $(document);
  /**
   * 设置文档主题
   */
  var DEFAULT_PRIMARY = 'indigo';
  var DEFAULT_ACCENT = 'pink';
  var DEFAULT_LAYOUT = 'auto';
  
  // 设置 cookie
  var setCookie = function (key, value) {
    // cookie 有效期为 1 年
    var date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
    document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
  };

  // 获取cookie
  var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return undefined;
  }

  var setDocsTheme = function (theme) {
    console.log(theme)
    if (typeof theme.primary === 'undefined') {
      theme.primary = false;
    }
    if (typeof theme.accent === 'undefined') {
      theme.accent = false;
    }
    if (typeof theme.layout === 'undefined') {
      theme.layout = false;
    }
    console.log(theme)
    var i, len;
    var $body = $('body');

    var classStr = $body.attr('class');
    var classs = classStr.split(' ');

    // 设置主色
    if (theme.primary !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-primary-') === 0) {
          $body.removeClass(classs[i])
        }
      }
      $body.addClass('mdui-theme-primary-' + theme.primary);
      setCookie('docs-theme-primary', theme.primary);
      $('input[name="doc-theme-primary"][value="' + theme.primary + '"]').prop('checked', true);
    }

    // 设置强调色
    if (theme.accent !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-accent-') === 0) {
          $body.removeClass(classs[i]);
        }
      }
      $body.addClass('mdui-theme-accent-' + theme.accent);
      setCookie('docs-theme-accent', theme.accent);
      $('input[name="doc-theme-accent"][value="' + theme.accent + '"]').prop('checked', true);
    }

    // 设置黑夜模式
    if (theme.layout !== false) {
      for (i = 0, len = classs.length; i < len; i++) {
        if (classs[i].indexOf('mdui-theme-layout-') === 0) {
          $body.removeClass(classs[i]);
        }
      }
      $body.addClass('mdui-theme-layout-' + theme.layout);
      setCookie('docs-theme-layout', theme.layout);
      $('input[name="doc-theme-layout"][value="' + theme.layout + '"]').prop('checked', true);
    }
  };

  // setDocsTheme({
  //   primary: getCookie('docs-theme-primary') || DEFAULT_PRIMARY,
  //   accent: getCookie('docs-theme-accent') || DEFAULT_ACCENT,
  //   layout: getCookie('docs-theme-layout') || DEFAULT_LAYOUT
  // })

  // 切换主色
  $document.on('change', 'input[name="doc-theme-primary"]', function () {
    setDocsTheme({
      primary: $(this).val()
    });
  });

  // 切换强调色
  $document.on('change', 'input[name="doc-theme-accent"]', function () {
    setDocsTheme({
      accent: $(this).val()
    });
  });

  // 切换主题色
  $document.on('change', 'input[name="doc-theme-layout"]', function () {
    setDocsTheme({
      layout: $(this).val()
    });
  });

  // 恢复默认主题
  $document.on('cancel.mdui.dialog', '#dialog-docs-theme', function () {
    setDocsTheme({
      primary: DEFAULT_PRIMARY,
      accent: DEFAULT_ACCENT,
      layout: DEFAULT_LAYOUT
    });
  });

  // // 如果抽屉栏当前激活项不在视野中，则滚动抽屉栏，使激活项位于垂直居中
  // (function () {
  //   var $drawer = $('#main-drawer');
  //   var $activeItem = $drawer.find('.mdui-list-item-active');

  //   if (!$activeItem.length) {
  //     return;
  //   }

  //   var activeItemOffsetTop = $activeItem.offset().top;
  //   var drawerHeight = $drawer.innerHeight();

  //   if (activeItemOffsetTop - 64 < 0 || activeItemOffsetTop - 64 + 238 > drawerHeight) {
  //     $drawer[0].scrollTop = activeItemOffsetTop + $drawer[0].scrollTop - drawerHeight / 2;
  //   }
  // })()
})
