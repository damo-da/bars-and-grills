from django.conf.urls import url
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api.permissions import AdminUserRead, AdminUserWrite, AllUserRead, AllUserWrite

schema_view = get_schema_view(
    openapi.Info(
        title="Bars & Grills API",
        default_version='v1',
        description="API Specification for Bars & Grills",
        contact=openapi.Contact(email="hi@damodar.dev"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=(),
)

urlpatterns = [
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]
