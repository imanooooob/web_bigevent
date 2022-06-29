$(function() {
    getUserInfo()
    console.log(localStorage.getItem('token'));
    //
    const layer = layui.layer
    const btnOut = document.querySelector('#btnOut');
    btnOut.addEventListener('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转页面
            location.href = './login.html'
            //关闭 confirm询问框
            layer.close(index);
          });
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        methoh:'get',
        url:'http://www.liulongbin.top:3007/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
          },
        success: function(res) {
            if(res.status !==0) {
                return layer.msg(res.message);
            }
            console.log(res);
            //调用渲染用户头像的方法
            randerAvatar(res.data)
         },

         //不管成功还是失败，最终都会调用complete函数
         complete:function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token')
                //强制跳转回登录页面
                location.href = './login.html'
            }
         }
    })
}

//渲染用户的头像
function randerAvatar(user) {
    //获取用户名称,如果有用户设置的就获取设置的名称，如果么有就获取注册的账号名称
    let name = user.nickname || user.username
    let welcome = document.querySelector('#welcome')
    const imgs = document.querySelectorAll('.layui-nav-img')
    const text_avatars = document.querySelectorAll('.text-avatar')
    welcome.innerHTML = '欢迎&nbsp;&nbsp;' + name
    //按需渲染用户头像   判断用户头像
     if (user.user_pic !== null) {
        imgs.forEach(value => {
            value.style.src = user.user_pic
        });
        text_avatars.forEach(value => {
            value.style.display = 'none'
        });
     } else {
        let first = name[0].toUpperCase()
        //渲染文本头像
        // imgs[].style.display = 'none'
        imgs.forEach(value => {
            value.style.display = 'none'
        });
        text_avatars.forEach(value => {
            value.innerHTML = first
            console.log(value);
        });
     }
}