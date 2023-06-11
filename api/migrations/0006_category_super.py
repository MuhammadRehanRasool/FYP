# Generated by Django 4.1 on 2023-04-14 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_apparel'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='super',
            field=models.CharField(choices=[('head', 'Head'), ('top', 'Top'), ('bottom', 'Bottom'), ('foot', 'Foot')], default='top', max_length=20),
        ),
    ]