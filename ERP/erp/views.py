import re
from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config


@view_config(route_name='home', renderer='base.mako')
def my_view(request):
    user_agent = request.user_agent
    ie_version = re.compile(r"MSIE ([^;]+)")
    if 'Windows' in user_agent:
        version = ie_version.search(user_agent)
        if version:
            version_number = int(version.group(1).split('.')[0])
            if version_number < 9:
                return HTTPFound(location='/browser')
    return {'project': 'ERP'}

@view_config(route_name='browser', renderer='browser.mako')
def download_browser(request):
    return {}
