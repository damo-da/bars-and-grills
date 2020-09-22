from django.contrib.auth.models import User, Group
from rest_framework import viewsets, serializers
from rest_condition import Or

from api.permissions import AdminUserRead, AdminUserWrite

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def save(self, **kwargs):
        user = User(
            id=self.data.get('id', None),
            username=self.validated_data['username'],
        )

        user.set_password(self.validated_data['password'])
        user.save()
        return user

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [Or(AdminUserRead, AdminUserWrite)]
    http_method_names = ['get', 'post', 'head']
