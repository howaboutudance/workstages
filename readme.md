### WorkStages

(C) 2014 copyright Michael Penhallegon except for chrome extension, licensed GPL unless specified

A simple Pomodoro-like system that will try to sync all pomodoros across different platforms.

Currently supported platforms:
* Chrome

Nascent platforms:
* Firefox (right now can make a push but can not retrieve)

planned platforms:
* Android (=> 4.3)

default currently for using server on local machine setting can be changed within respective files:
* edit setup script under server/stageserver with file paths and then run
* server: modify server/server.py change variable inside if main statement
* chrome client: extension/background.js change SERVER_ROOT_URL

Project requires:
* Python 2.7 or 3.3
* Bottle (a python webframework)

api:
/latest/
	get: gets information about if stage is currently going, and if so the information and
			 the guid of such
	push: starts stage
  delete: deletes stages thus stopping it
/dash -> dashboard
/report/<n> -> returns all stages with a <n> integer limit

