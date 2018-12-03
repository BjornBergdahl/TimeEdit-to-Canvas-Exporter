import requests

class HTTPBearerAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token

    def __eq__(self, other):
        return self.token == getattr(other, 'token', None)

    def __ne__(self, other):
        return not self == other

    def __call__(self, r):
        r.headers['Authorization'] = 'Bearer ' + self.token
        return r

URI = 'https://ltu.instructure.com/api/v1/calendar_events.json'
payload = {'calendar_event[context_code]': 'user_55647', 'calendar_event[title]': 'Python test!', 'calendar_event[start_at]': '2018-11-23T17:00:00Z', 'calendar_event[end_at]': '2018-11-23T20:00:00Z'}
az = HTTPBearerAuth('3755~uRL5P97uVze67EAc4DXf01lA9zQ74tCbGCtz2MM9vRTKKcbaHGDrdWf0AczQ9NZP')
r = requests.post(URI, data=payload, auth=az)
print(r.text)
