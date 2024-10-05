# Study Timer
The application lets you store your study progress in intervals, Recommended to log in to keep your records saved.

#### Features
* Adds a way to keep your records safe by storing it on cloud

* Shows your total study time

* You can use the application even without loggin in, although you may loose your records if browser data is deleted or device is changed

* Uses appwrite as BaaS

* Dark/light theme support

#### Known Issues and Future Development

* Without loggin in the data is stored in local storage of the browser, and the local storage sync process is not robust, when signing up, the account creation syncs the local storage with cloud, but if you already have an account and you log in, local storage progress is lost.

* The persistent login is maintained in local storage, which makes it vulernable to modifying and may give unauthorised access. A better approach can be encrypted cookies or session variables.

* Uses free tier of appwrite, which limits the number of users.

* Currently it doesnt keep records beyond present. Mostly because of UI Constraints

* Better overall look of the UI
