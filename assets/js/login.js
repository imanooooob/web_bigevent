$(function() {
    //获取去注册账号的A连接
    const link_reg = document.querySelector('#link_reg')
    //获取去登录的A连接
    const link_login = document.querySelector('#link_login')
    //获取登录盒子
    const login_box = document.querySelector('.login-box')
    //获取注册盒子
    const reg_box = document.querySelector('.reg-box')

    //点击‘去注册账号’的连接
    link_reg.addEventListener('click', function() {
        login_box.style.display = 'none';
        reg_box.style.display = 'block'
        
    })

    //点击登录账号连接
    link_login.addEventListener('click', function() {
        login_box.style.display = 'block';
        reg_box.style.display = 'none';
    })

    //自定义表单验证规则
    //layui中获取form对象
    const form = layui.form
    //layui中获取弹出层对象
    const layer = layui.layer
    //通过form.verify()函数来自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        //校验两次输入的密码是否一致
        repwd:function(value){
            //通过形参拿到密码确认框的内容
            //还需要拿到密码框中的内容
            //判断
            //如果判断失败，则ruturn一个错误的消息
            const pwd_reg = document.querySelector('.pwd-reg');
            if (pwd_reg.value !== value) {
                return '两次密码不一致'
            }
        }
    })
    //
    // 监听注册表单的提交事件
    let form_reg = document.querySelector('#form-reg');
    let user_reg = document.querySelector('.user-reg');
    let pwd_reg = document.querySelector('.pwd-reg');
    //
    form_reg.onsubmit = function(e) {
        //先阻止默认的提交行为
        e.preventDefault();
        //发起AJAX的POST请求
        $.post('http://www.liulongbin.top:3007/api/reguser',{username:user_reg.value,password:pwd_reg.value},function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
             }
             layer.msg('注册成功，请登录');
             //模仿手动点击去登录连接
             link_login.click()
        })
    }
    //监听登录表单的提交事件
    const form_login = login_box.querySelector('form');
    const user_login = form_login.querySelector('.user-login');
    const pwd_login = form_login.querySelector('.pwd-login');
    form_login.onsubmit = function(e) {
        //阻止表单的默认提交事件
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/login',{username:user_login.value, password:pwd_login.value},function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //将登录成功得到的token字符串保存到localStorage中
            localStorage.setItem('token', res.token);
            //跳转到后台页面
            location.href = '/index.html';
        })
    }
})