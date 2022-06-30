$(function() {
    const form = layui.form ;
    const layer = layui.layer;
    form.verify({
        nickname:function(value) {
            if(value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()
})

//初始化用户信息
function initUserInfo() {
    $.ajax({
        methodL:'get',
        url:'http://www.liulongbin.top:3007/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token') || ''
        },
        success:function(res) {
            if(res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(res);
            //调用form.val()快速为表单赋值
            const form = layui.form 
            form.val('formUserInfo', res.data)
        }
    })
}

//重置表单的数据
document.querySelector('#btnResst').onclick = function(e) {
    //阻止表单的默认提交行为，防止点击重置刷新表单
    e.preventDefault();
    //然后重新获取用户的信息填充表单当作一个刷新的效果
    initUserInfo()
}

document.querySelector('form').onsubmit = function(e) {
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'http://www.liulongbin.top:3007/my/userinfo',
        headers:{
            Authorization: localStorage.getItem('token') || ''
        },
        // data:$(this).serialize(),
        data:{
            id:document.querySelector('#loginId').value,
            nickname:document.querySelector('#loginNickname').value,
            email:document.querySelector('#loginEmail').value
        },
        success:function(res){
            if(res.status !== 0) {
                return layer.msg('更新用户信息失败')
        }
        layer.msg('更新用户信息成功')
        //调用父页面的方法更新渲染用户头像和用户信息
        window.parent.getUserInfo()
        }
    })
}