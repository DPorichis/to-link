# Generated by Django 5.0 on 2024-09-03 12:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('surname', models.CharField(max_length=45)),
                ('email', models.CharField(max_length=45, unique=True)),
                ('country', models.CharField(blank=True, max_length=45, null=True)),
                ('city', models.CharField(blank=True, max_length=45, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Convo',
            fields=[
                ('convo_id', models.AutoField(db_column='Convo_ID', primary_key=True, serialize=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('media_id', models.AutoField(db_column='Media_ID', primary_key=True, serialize=False)),
                ('media', models.TextField()),
                ('alt', models.CharField(blank=True, max_length=45, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('pfp', models.CharField(blank=True, max_length=45, null=True)),
                ('name', models.CharField(max_length=45)),
                ('surname', models.CharField(max_length=45)),
                ('title', models.CharField(blank=True, max_length=45, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('email', models.CharField(max_length=45, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('website', models.TextField(blank=True, null=True)),
                ('experience', models.JSONField(null=True)),
                ('education', models.JSONField(null=True)),
                ('link_cnt', models.IntegerField(blank=True, default=0)),
                ('post_cnt', models.IntegerField(blank=True, default=0)),
                ('listings_cnt', models.IntegerField(blank=True, default=0)),
                ('vis_exp', models.IntegerField(blank=True, default=0)),
                ('vis_edu', models.IntegerField(blank=True, default=0)),
                ('vis_act', models.IntegerField(blank=True, default=0)),
                ('vis_cont', models.IntegerField(blank=True, default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Sessions',
            fields=[
                ('session', models.IntegerField(primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.profile')),
                ('type', models.IntegerField()),
                ('about', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.AutoField(db_column='Post_ID', primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('media', models.JSONField(blank=True, null=True)),
                ('links', models.JSONField(blank=True, null=True)),
                ('like_cnt', models.IntegerField(default=0)),
                ('comment_cnt', models.IntegerField(default=0)),
                ('user', models.ForeignKey(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('listing_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=45)),
                ('visible', models.IntegerField()),
                ('spot', models.CharField(max_length=45)),
                ('time', models.CharField(max_length=45)),
                ('level', models.CharField(max_length=45)),
                ('desc', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Dm',
            fields=[
                ('dm_id', models.AutoField(db_column='DM_ID', primary_key=True, serialize=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('text', models.TextField(blank=True, null=True)),
                ('convo', models.ForeignKey(db_column='Convo_ID', on_delete=django.db.models.deletion.CASCADE, to='api.convo')),
                ('media', models.ForeignKey(blank=True, db_column='Media_ID', null=True, on_delete=django.db.models.deletion.CASCADE, to='api.media')),
                ('user', models.ForeignKey(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
        ),
        migrations.AddField(
            model_name='convo',
            name='user_id1',
            field=models.ForeignKey(db_column='User_ID1', on_delete=django.db.models.deletion.CASCADE, to='api.profile'),
        ),
        migrations.AddField(
            model_name='convo',
            name='user_id2',
            field=models.ForeignKey(db_column='User_ID2', on_delete=django.db.models.deletion.CASCADE, related_name='convo_user_id2_set', to='api.profile'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.AutoField(db_column='Comment_ID', primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('post', models.ForeignKey(db_column='Post_ID', on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('user', models.ForeignKey(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
        ),
        migrations.CreateModel(
            name='LikedBy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.ForeignKey(db_column='Post_ID', on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('user', models.ForeignKey(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
            options={
                'unique_together': {('post', 'user')},
            },
        ),
        migrations.CreateModel(
            name='Applied',
            fields=[
                ('user', models.OneToOneField(db_column='User_ID', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.profile')),
                ('listing', models.ForeignKey(db_column='Listing_ID', on_delete=django.db.models.deletion.CASCADE, to='api.listing')),
            ],
            options={
                'unique_together': {('user', 'listing')},
            },
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('user_id_to', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.profile')),
                ('user_id_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='link_user_id_from_set', to='api.profile')),
            ],
            options={
                'unique_together': {('user_id_to', 'user_id_from')},
            },
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('user_id_from', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.profile')),
                ('user_id_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_user_id_to_set', to='api.profile')),
            ],
            options={
                'unique_together': {('user_id_from', 'user_id_to')},
            },
        ),
    ]
