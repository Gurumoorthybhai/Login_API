# node-mongo-registration-login-api

NodeJS + MongoDB API for User Management, Authentication and Registration

# Login-Task
Task on UI:
1. Worked on adding a new feature to login & auditor page, added new role field in the registration page.
2. Added role-based application access (i.e) Role -> Auditor, can access are the pages(dashboard, audit pages), other than auditor role no one had the access to audit page access.
3. Audit page gives the information about all user-based information about user name, role, login & logout.
4. Added a new API (GET /audit) that will retrieve all login/logout of users details.
5. Added HTTP (post method) for updating logout time information.

Task on Nodejs
1. Added a new API (GET /audit) for getting all the user information.
2. Added login & logout time & other information about user details.
3. Updated Authenticated & Authorized role based functionality(AUDITOR role the /audit API should return an HTTP 401 response).









