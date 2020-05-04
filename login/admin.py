from django.contrib import admin

# Register your models here.

from . import models

admin.site.register(models.User)
admin.site.register(models.ConfirmString)

# superuser = admin
# password = "e9f2aafae66c4b6ac6e7d6efba85398cf7d381fa37074385ce359fee4ead1083" sha256
