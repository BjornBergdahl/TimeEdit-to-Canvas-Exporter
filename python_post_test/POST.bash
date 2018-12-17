curl 'https://ltu.instructure.com/api/v1/calendar_events.json' \
-X POST \
-F 'calendar_event[context_code]=user_[USERID]' \
-F 'calendar_event[title]=API Test!' \
-F 'calendar_event[start_at]=2018-11-23T17:00:00Z' \
-F 'calendar_event[end_at]=2018-11-23T20:00:00Z' \
-H "Authorization: Bearer [TOKEN]"