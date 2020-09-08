from rest_framework import permissions

class AdminUserRead(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user is None:
            return False

        if request.method != 'GET':
            return False

        return request.user.groups.filter(name='Admin').exists()


class AdminUserWrite(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user is None:
            return False

        if request.method not in ['POST', 'DELETE', 'PUT']:
            return False

        return request.user.groups.filter(name='Admin').exists()


class AllUserRead(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user is None:
            return False

        if request.method != 'GET':
            return False

        return True


class AllUserWrite(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user is None:
            return False

        if request.method not in ['POST', 'DELETE', 'PUT']:
            return False

        return True
