from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import models
import hashlib
import datetime
from django.conf import  settings


def make_confirm_string(user):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    code = hash_code(user.name, now)
    models.ConfirmString.objects.create(code=code, user=user,)
    return code


def send_email(email, code):
    from django.core.mail import EmailMultiAlternatives
    subject = '来自mysite的注册确认邮件'
    text_content = '''
        感谢注册www.91pron.com,这里是全球最大的多人运动网站，专注于教授时间管理
        课程，如果你看到这条消息，说明你的邮箱服务器不提供HTML链接功能，请联系管理员
    '''
    html_content = '''
        <p>感谢注册<a href="http://{}/confirm?code={}" target=blank>www.91pron.com</a>,
        这里是全球最大的多人运动网站，专注于教授时间管理课程
        </p>
        <p>请点击链接完成注册确认</p>
    '''.format('127.0.0.1:8000/mysite', code, settings.CONFIRM_DAYS)
    msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER,[email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

# Create your views here.


def user_confirm(request):
    code = request.GET.get('code', None)
    status_code = 200
    try:
        confirm = models.ConfirmString.objects.get(code=code)
    except Exception as e:
        msg = "invalid confirm request %s" % e
        status_code = 500
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    c_time = confirm.c_time
    now = datetime.datetime.now()
    if now > c_time + datetime.timedelta(settings.CONFIRM_DAYS):
        confirm.user.delete()
        msg = "your email is overdue, please register again"
        status_code = 301
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    else:
        confirm.user.has_confirmed = True
        confirm.user.save()
        confirm.delete()
        msg = "thanks for confirm, please use your account to login"
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)




def index(request):
    pass


@csrf_exempt
def login(request):
    status_code = 200
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    if request.session.get('is_login', None) and username==request.session.get('user_name'):
        status_code = 301   # 不允许重复登录
        login_info = {
            'user_name': request.session.get('user_name'),
            'is_login': request.session.get('is_login')
        }
        return HttpResponse(json.dumps(login_info),
                            content_type='application/json',
                            status=status_code)
    if not username.strip() and password:
        msg = "username or password can't be null"
        status_code = 500
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    try:
        user = models.User.objects.get(name=username)
    except Exception as e:
        msg = "user " + username + " not exists. %s" % e
        status_code = 500
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    if not user.has_confirmed:
        msg = 'The user not email confirmed'
        status_code = 301
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    if user.password == hash_code(password):
        request.session['is_login'] = True
        request.session['user_name'] = user.name
        request.session['user_id'] = user.id
        login_info = {
            'user_name': request.session.get('user_name'),
            'is_login': request.session.get('is_login')
        }
        return HttpResponse(json.dumps(login_info),
                            content_type='application/json',
                            status=status_code)
    else:
        msg = "password is wrong"
        status_code = 500
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)

    return HttpResponse(json.dumps({}),
                        content_type='application/json',
                        status=status_code)


@csrf_exempt
def register(request):
    data = json.loads(request.body)
    username = data.get('user_name')
    password = data.get('password')
    re_password = data.get('re_password')
    email = data.get('email')
    sex = data.get('sex')
    if password != re_password:
        msg = "input password twice is not same"
        status_code = 500
        return HttpResponse(json.dumps(msg),
                            content_type='application/json',
                            status=status_code)
    else:
        same_name_user = models.User.objects.filter(name=username)
        if same_name_user:
            msg = "username is already exists, please login directly"
            status_code = 500
            return HttpResponse(json.dumps(msg),
                                content_type='application/json',
                                status=status_code)
        same_email_user = models.User.objects.filter(email=email)
        if same_email_user:
            msg = "email is already register"
            status_code = 500
            return HttpResponse(json.dumps(msg),
                                content_type='application/json',
                                status=status_code)
    new_user = models.User()
    new_user.name = username
    new_user.password = hash_code(password)
    new_user.email = email
    new_user.sex = sex
    new_user.save()
    status_code = 200
    code = make_confirm_string(new_user)
    send_email(email, code)
    msg = "register success, please enter your email for confirm"
    return HttpResponse(json.dumps(msg),
                        content_type='application/json',
                        status=status_code)


@csrf_exempt
def logout(request):
    del request.session['is_login']
    request.session.flush()
    status_code = 200
    return HttpResponse(json.dumps({}),
                        content_type='application/json',
                        status=status_code)



def hash_code(s, salt='mysite'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()