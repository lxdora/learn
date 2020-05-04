import os
from django.core.mail import send_mail

os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'

if __name__ == '__main__':
    '''
        第一个参数是邮件主题subject；
        第二个参数是邮件具体内容；
        第三个参数是邮件发送方，需要和你settings中的一致；
        第四个参数是接受方的邮件地址列表.
    '''
    send_mail(
        'from mysite',
        '欢迎访问www.91pron.com',
        '',
        []

    )