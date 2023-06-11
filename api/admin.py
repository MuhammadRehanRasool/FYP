from django.contrib.auth.models import Group
from django.contrib import admin
from . import models
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    exclude = ('groups', 'user_permissions',
               'is_staff', 'is_active', 'is_superuser', 'last_login', 'date_joined', 'email')
    list_display = ('pk', 'username', 'is_admin',)
    list_filter = ('is_staff',)

    def is_admin(self, obj):
        pl = "✔️" if obj.is_staff else "❌"
        return pl


admin.site.register(models.CustomUser, UserAdmin)
admin.site.register(models.Category)
admin.site.register(models.Brand)
admin.site.register(models.Color)
admin.site.register(models.Apparel)
admin.site.register(models.Outfit)


admin.site.site_header = "Virtual Wardrobe Management System ✨"
admin.site.site_title = "Admin"
admin.site.index_title = "Website Administration"

admin.site.unregister(Group)
