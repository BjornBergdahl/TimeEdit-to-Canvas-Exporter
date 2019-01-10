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


def postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location):

    URI = 'https://ltu.instructure.com/api/v1/calendar_events.json'
    
    payload = {'calendar_event[context_code]': 'user_' + user, \
               'calendar_event[title]': title, \
               'calendar_event[description]': description, \
               'calendar_event[start_at]': start_date + 'T' + start_time + ':00Z', \
               'calendar_event[end_at]': end_date + 'T' + end_time + ':00Z', \
               'calendar_event[location_name]': location}

    az = HTTPBearerAuth(token)
    r = requests.post(URI, data=payload, auth=az)
    print(r.text)


if __name__ == '__main__':
    user = '55647'
    token = '3755~uRL5P97uVze67EAc4DXf01lA9zQ74tCbGCtz2MM9vRTKKcbaHGDrdWf0AczQ9NZP'

    title = 'Python test!'
    description = 'description test'
    start_date = '2018-11-23'
    start_time = '17:00'
    end_date = '2018-11-23'
    end_time = '20:00'
    location = 'location test'

    postCalendarEvent(user, token, title, description, start_date, start_time, end_date, end_time, location)
    
