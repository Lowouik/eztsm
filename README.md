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
ezTSM can be installed either on the TSM server  or a dedicated server. As we strongly recommand to use a dedicated server, the following installation instructions will apply to this case. However, we assume you would easily deduce how to transpose the instructions to an installation on the TSM server.

The ezTSM server needs to be connected to the Internet during the installation process. This access won't be necessary anymore as soon as the installation is over.

These instructions has been tested and apply to Centos 7 or Redhat 7. Installing on other distributions may be similar, but you'll be on your own. Please note  that ezTSM can't be installed on Windows, neither work with a Windows hosted TSM Server.

### Preparing system
As root:
```
useradd eztsm
mkdir /opt/eztsm
chown -R eztsm: /opt/eztsm
chmod -R g+w  /opt/eztsm
yum install git bzip2 gcc make openssl-devel readline-devel zlib-devel gcc-c++ patch libyaml-devel libffi-devel autoconf automake libtool bison sqlite-devel libcurl-devel
```

### Installing rbenv and ruby
Connect as the newly created eztsm account:
```
su - eztsm
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
mkdir ~/.rbenv/plugins
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
exec $SHELL
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bash_profile
exec $SHELL
git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
source ~/.bash_profile
rbenv install 2.3.0
echo "2.3.0" > /home/eztsm/.rbenv/version
```

### Installing ezTSM
```
cd /tmp
git clone https://github.com/Lowouik/eztsm.git
cp -pr eztsm/eztsm/* /opt/eztsm
cd /opt/eztsm
gem install bundler
bundle install --deployment --without deployment test
chmod 700 config db
chmod 600 config/database.yml config/secrets.yml
bundle exec rake db:migrate db:seed assets:precompile  RAILS_ENV=production
```

Generate a secret key and copy the value to your clipboard
```
bundle exec rake secret
```

As root, create a new file named */etc/systemd/system/eztsm.service* with the following content:
```
[Unit]
Description=ezTSM Service
After=network.target

[Service]
Type=simple
User=eztsm
RemainAfterExit=yes
WorkingDirectory=/opt/eztsm/
Environment=RAILS_ENV=production
Environment=SECRET_KEY_BASE=<value of bundle exec rake secret>
ExecStart=/home/eztsm/.rbenv/shims/bundle exec passenger start
ExecStop=/home/eztsm/.rbenv/shims/bundle exec passenger stop
TimeoutSec=300

[Install]
WantedBy=multi-user.target
```
Note that you need to replace ```<value of bundle exec rake secret>``` with the value of the earlier generated secret key.

Reload systemd and start up eztsm:
```
systemctl daemon-reload
systemctl start eztsm
```

Authorize access to port 8080 in your firewall configuration, either firewalld or iptables.

### Installing ezTSM plugins
ezTSM plugins has to be installed on the TSM server.

On TSM server, create an ezTSM account:
```
useradd ezTSM
```

This account must accept passwordless ssh login from the ezTSM server eztsm user. The following link provides the detailed instructions to do so: http://serverfault.com/questions/620411/need-to-make-password-less-login-for-same-linux-server-with-same-user.

As eztsm on ezTSM server, copy the content of /tmp/eztsm/eztsm-plugins to the TSM Server:
```
scp /tmp/eztsm/eztsm-plugins/* tsm_server.fqdn:bin/
```
Where tsm_server.fqdn refers to the actual TSM Server's name or ip address.

If necessary, create bin directory first:
```
mkdir /home/eztsm/bin
```

Create a tsm user named 'bash_local' with full permissions. Connect on TSM Server as eztsm and run:
```
echo <bash_local password> > ~/bash_local_pw
chmod 600 ~/bash_local_pw
```
Where ```<bash_local password>``` is the password of the user you just created in TSM.

You may also need to authorize eztsm user to write tsm log files. For instance, if logs are located in /var/log/tsm:
```
chgrp eztsm /var/log/tsm/ -R
chmod g+w /var/log/tsm/
```

### Compatibility between TSM and ezTSM
When nodes are deleted using ezTSM, they are not really deleted from TSM. They are moved to a specific domain called RETIREDNODES, allowing TSM admin to cancel node deletion. In order to allow node deletion in ezTSM, you need to create this domain. It can be done using this syntax as ezTSM on TSM Server:
```
qtsm "define domain RETIREDNODES"
```

### ezTSM initialization
ezTSM installation is almost over. The web interface can be accessed using http://<my_eztsm_server.fqn>:8080/ where <my_eztsm_server.fqn> can either be ezTSM server's name or ip address.
Log in using admin/admin credentials. You'll be redirected to the initialization menu. You need to specify a few informations, like TSM Server fqdn or ip address, ssh user to connect with. In case you didn't installed ezTSM on TSM Server, don't forget to uncheck the 'TSM server is local' checkbox.

Once ezTSM is initialized, we recommand you go to Admin/Manage Users menu and change admin user's password.
