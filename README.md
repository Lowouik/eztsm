# eztsm
ezTSM is a web frontend connected to a tsm instance providing an easy, web-oriented, way to interact with TSM.

There are some great tools allowing to one or more TSM Server instances, but we believe these tools are a little hard to handle.

ezTSM's point is to provide a simple way of performing basic operations for non expert people. Furthermore, it uses its own authenticating and permissions system, preventing users from having effective rights on TSM and in extension accessing nodes data.

We believe that if you want to go further, and don't bother administrator access the whole nodes data, more evolved tools such as TSM Manager (www.tsmmanager.com) will be more appropriated.

## Features
As of 02/18/2016, the supported features are:
- Authentication
- Admin backend allowing:
  - Configuration and initialization
  - Account management (create update delete)
- Node administration
  - Search for nodes
  - View node details
  - Add
  - Update
  - Delete
- TSM Status
  - Top 50 biggest filespace
  - Nodes without schedule
  - Last 7 days activity
  - Storage pool status

## Incoming Features
- Admin backend allowing:
  - Roles and permissions setting
- Localization (english + french)
- Cached reports in local database
- View/modify nodes infos from different views (reports, etc.)
- Advanced nodes search (by domain name, clopt...)
- Logging

## Installation
- Install rails app
- Install plugins in TSM user's path
- Add ssh key to TSM user's .authorized_keys if distant
- Create RETIREDNODES Domain

