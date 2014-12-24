Git是一个开源的版本控制系统，由Linus Torvalds主导，用于支持Linux内核开发。每一个Git工作目录，都是一个完整的代码库，包含所有的提交历史。有能力跟踪所有的代码版本，而不会去依赖于网络与中央服务器。

### 安装
Git可以通过以下的命令进行安装
```bash
sudo apt-get install git
```
### 配置
每一个git的用户，在第一次使用的时候都需要通过以下两个命令，进行相应的配置

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### 基本用法
假设用户可以通过SSH的方式访问Server，对于用户想以分布式以及安全的方式使用Git，则已经完全足够了。在服务器端，创建一个新的仓库。
```bash
git init --bare /path/to/repository
```
这会创建一个裸仓库，它不允许我们直接编辑相应的文件。如果你需要在服务器端保留仓库内容的复本，去掉 --bare 选项就好了。

任何具有SSH权限的客户端，均可以克隆相应的仓库
```
git clone username@hostname:/path/to/repository
```
一旦克隆到了客户端上，用户即可编辑相应的文件，然后提交得分享相应的代码：
```
cd /path/to/repository # 编辑修改
git commit -a # 提交所有修改到本地仓库
git push origin master # 推送修改到服务器端的仓库
```
### 安装 gitolite server
虽然以上的那些，对于创建，克隆和修改仓库已经足够。但用户在服务器端安装git，最主要是想要一个传统的源代码控制管理服务器，具有多用户与权限管理的功能。推荐的解决方案是通过以下命令，安装 gitolite server：
```
sudo apt-get install gitolite
```

### 配置 gitolite
相比于大多数的类Unix系统，gitolite server的配置有一些小小的区别。传统的配置文件会存放在 /etc 的目录之下，而gitolite则把自己的配置文件放在一个git的仓库之中。配置一个新的gitolite的第一步，则需要有配置仓库的访问权限。
首先，让我们为gitolite创建一个用户，并具体其访问权限。
```
sudo adduser --system --shell /bin/bash --group --disabled-password --home /home/git git
```
现在我们想让gitolite知晓仓库管理员的SSH公钥。我们假设当前用户是仓库的管理员。
```
cp ~/.ssh/id_rsa.pub /tmp/$(whoami).pub
```
我们切换到git用户，并将管理员的公钥导入gitolite。
```
sudo su - git
gl-setup /tmp/*.pub
```

Gitolite会允许在安装过程中，对配置文件做一些初期的修改。你现在可以通过管理员用户(即拥有管理员公钥的帐户)，克隆和修改gitolite的配置仓库。切回到管理员账号，克隆配置仓库：
```
exit
git clone git@$IP_ADDRESS:gitolite-admin.git
cd gitolite-admin
```
gitolite-admin目录包含两个子目录，conf 和 keydir。配置文件存放在 conf目录，而keydir目录存放了用户的公钥信息。

### 管理gitolite帐户和仓库
添加一个新的帐户到gitolite很简单：只需要获取用户的SSH公钥信息，以$DESIRED_USER_NAME.pub 的形式放在keydir目录之下即可。值得注意的是，gitolite的用户名不必和系统的用户名相匹配，它们仅仅是用在gitolite的配置文件之中，管理其访问权限的。同样的，删除用户只需要删除其对应的公钥文件即可。所有修改完毕之后，别忘了提交相应的修改，然后通过以下命令推回服务器端：
```
git commit -a
git push origin master
```
仓库是需要编辑conf/gitolite.conf文件进行管理。通过空格分割，遵守相应的权限规则，指定相应的仓库即可。以下是一些默认的示例。
```
repo    gitolite-admin
        RW+     =   admin
        R       =   alice

repo    project1
        RW+     =   alice
        RW      =   bob
        R       =   denise
```

### 使用服务器
要使用新创建的帐户，用户需要gitolite的管理员将其公钥导入到gitolite的配置仓库之中。然后，用户即可拥有相应的项目权限：
```
git clone git@$SERVER_IP:$PROJECT_NAME.git
```

或者为一个已存在的git仓库添加一个远程地址：
```
git remote add gitolite git@$SERVER_IP:$PROJECT_NAME.git
```

如此便搭好了一个简易的，可用的git server。为了更好的查看相应的代码，或者管理，也可使用相对较重的，gitlab开源项目。