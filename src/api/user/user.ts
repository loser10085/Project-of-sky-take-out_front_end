import request from '@/utils/request_user'
// 登录
export const userLogin = (data: any) =>
    request({
        'url': '/user/login',
        'method': 'post',
        data
    });
// 修改密码
export const editPassword = (data: any) =>
    request({
        'url': '/editPassword',
        'method': 'put',
        data
    });
// 查看店铺营业状态
export const getStatus = () =>
    request({
        // /user/addressBook/list
        'url': '/shop/status',
        'method': 'get',
    });
