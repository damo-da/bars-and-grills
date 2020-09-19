from django.http import JsonResponse


def default_route(req):
    print('')
    return JsonResponse({
        'status': 'live and running',
    })
