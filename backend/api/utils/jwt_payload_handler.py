from django.contrib.auth.models import User, Group
from rest_framework_jwt.utils import jwt_payload_handler as default_jwt_payload_handler

def jwt_payload_handler(user: User):
    payload = default_jwt_payload_handler(user)

    payload['user_id'] = user.id
    groups = [g.name for g in user.groups.all()]
    payload['groups'] = groups

    return payload
