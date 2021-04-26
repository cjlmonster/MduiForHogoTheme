---
title: "Android自启动引导说明"
date: 2021-04-26T16:51:38+08:00
draft: false
tags: ["android", "自启动"]
---

       由于第三方系统为了省电处理，关闭应用的自启动操作，导致应用经常收不到推送的消息或不及时，所以为了提高第三方系统的推送及时性，这里建议用户按以下操作，对应自己手机的系统类别，手动开启本应用的自启动选项和相关有助于提高推送到达率的设置。

---

<a name="T3lMK"></a>
### 小米【 MIUI 】

- 自启动管理：需要把应用加到【自启动管理】列表，否则杀进程或重新开机后进程无法开启

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462337-5f61b984-2739-40e4-8b13-65066b55fa92.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=400&size=0&status=done&style=none&width=400)

- 权限开启：为了保证应用能在锁屏或后台有来电时，能弹出接听界面，需要开启后台弹出和锁屏显示等功能

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462333-58742378-a2a3-4bd6-bb5a-c828e2d04c3c.png#align=left&display=inline&height=1400&margin=%5Bobject%20Object%5D&originHeight=1400&originWidth=800&size=0&status=done&style=none&width=800)

- 通知栏设置：应用默认都是显示通知栏通知，如果关闭，则收到通知也不会提示，按一下步骤开启

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462342-16012931-7aa0-4643-afb4-441f70498127.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)

- 网络助手：可以手动禁止已安装的第三方程序访问 2G/3G 和 WIFI 的网络和设置以后新安装程序是否允许访问 2G/3G 和 WIFI 的网络，这里按步骤开启本应用的网络访问功能

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462352-5b88f802-243c-4f64-ae27-483101607195.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)

- MIUI 省电策略： 设置应用的省电模式为“无限制”或“智能限制后台运行”

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462354-bc9aafdf-684b-445b-970a-0b1860b64fae.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)
<a name="J4NSQ"></a>
### 华为【 Emotion 】

- 自启动管理：需要把应用加到【自启动管理】列表，否则杀进程或重新开机后进程不会开启，只能手动开启应用，设置流程：手机桌面->手机管家->启动管理->选择本应用并关闭自动管理（旧版本emui是开启加入自启动列表）和开启手动管理里的各选项，具体如下图所示

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462365-92b24759-bd57-4187-81d2-622b22798218.png#align=left&display=inline&height=3966&margin=%5Bobject%20Object%5D&originHeight=2100&originWidth=800&size=0&status=done&style=none&width=1511)

- 开启相应权限：进入应用设置点击“信任此应用或开启必要权限”

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462675-f741c050-7ba5-4f26-ae25-a2ffc7e2464e.png#align=left&display=inline&height=1400&margin=%5Bobject%20Object%5D&originHeight=1400&originWidth=800&size=0&status=done&style=none&width=800)

- 后台应用保护：旧版本emui需要手动把应用加到此列表，否则设备进入睡眠后会自动杀掉应用进程，只有手动开启应用才能恢复运行，新版本emui建议关闭省电模式和超级省电，进入手机管家设置，下面提供新版的设置步骤

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462360-35d8f0fa-f0c4-40b8-88ed-8bf4ae063905.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)

- 通知管理：设置允许通知、禁止。禁止应用则通知栏不会有任何提醒

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462364-16d47155-ca37-42b9-89b4-a747ea3ea478.png#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)
<a name="OPZfG"></a>
### 魅族【 Flyme 】

- 自启动管理：需要把应用加到【自启动管理】列表，否则杀进程或重新开机后进程无法开启
- 通知栏推送：关闭应用通知则收到消息不会有任何展示
- 省电管理： 安全中心里设置省电模式，在【待机耗电管理】中允许应用待机时，保持允许，否则手机休眠或者应用闲置一段时间，无法正常接收消息。
<a name="YAnWD"></a>
### VIVO【 Funtouch OS 】

- 自启动管理和相应权限开启：将应用加入自启动和开启锁屏显示，后天启动等权限

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462479-9ed7aeda-721e-4415-8262-e3a69dc80e15.png#align=left&display=inline&height=1600&margin=%5Bobject%20Object%5D&originHeight=1600&originWidth=800&size=0&status=done&style=none&width=800)

- 允许通知：需要进入通知管理将本应用设置为允许通知，否则应用无法收到推送通知

![](https://cdn.nlark.com/yuque/0/2021/png/667575/1610076462670-add9af0d-0347-41f5-8b11-94efbf7d2924.png#align=left&display=inline&height=800&margin=%5Bobject%20Object%5D&originHeight=800&originWidth=800&size=0&status=done&style=none&width=800)

- 应用加锁：打开本应用，然后按底部菜单键，弹出后台运行的应用后，找到本应用，然后点击应用右上角的锁加锁

![](https://cdn.nlark.com/yuque/0/2021/jpeg/667575/1610076462379-987e89d1-49c5-4860-a6f2-aa8c57a08b67.jpeg#align=left&display=inline&height=800&margin=%5Bobject%20Object%5D&originHeight=800&originWidth=400&size=0&status=done&style=none&width=400)
<a name="U6OYv"></a>
### OPPO【 ColorOS 】

- 自启动管理：将应用加入【自启动管理】，具体流程，点击桌面上的“手机管家”->进入后，点击“权限隐私”->点击“自启动管理”->最后找到本应用，点击允许自启动

![](https://cdn.nlark.com/yuque/0/2021/jpeg/667575/1610076462693-5ecf1e0a-c3f9-4618-a1c2-4a38127edd18.jpeg#align=left&display=inline&height=1400&margin=%5Bobject%20Object%5D&originHeight=1400&originWidth=800&size=0&status=done&style=none&width=800)

- 开启相应权限：应用运行需要相关权限

![](https://cdn.nlark.com/yuque/0/2021/jpeg/667575/1610076462784-ebe6b72e-3d4b-4ea7-bf94-c5b1794d6fcb.jpeg#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)

- 允许通知：需要进入通知管理将本应用设置为允许通知，否则应用无法收到推送通知

![](https://cdn.nlark.com/yuque/0/2021/jpeg/667575/1610076465176-4f4d0969-847e-4f43-8b76-38009a41dd9c.jpeg#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=800&size=0&status=done&style=none&width=800)

- 应用加锁：打开本应用，然后按底部菜单键，弹出后台运行的应用后，找到本应用，然后按住应用下滑加锁

![](https://cdn.nlark.com/yuque/0/2021/jpeg/667575/1610076462490-a7b9fa5e-fd8c-41cc-94d8-0130295596a3.jpeg#align=left&display=inline&height=700&margin=%5Bobject%20Object%5D&originHeight=700&originWidth=400&size=0&status=done&style=none&width=400)
<a name="z6CEG"></a>
###  
<a name="Y6ayN"></a>
### 三星【 OneOS 】

- 内存一键优化：需要将应用加入【白名单】列表，否则系统内存优化后，会杀掉应用进程

 
