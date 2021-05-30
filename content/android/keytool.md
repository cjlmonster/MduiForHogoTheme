---
title: "keytool命令使用说明"
date: 2021-05-29T17:20:02+08:00
draft: false
tags: ["java", "keytool", "openssl", "ssl", "https"]
---

keytool 是个密钥和证书管理工具。它使用户能够管理自己的[公钥](https://baike.baidu.com/item/%E5%85%AC%E9%92%A5)/私钥对及相关证书，用于（通过[数字签名](https://baike.baidu.com/item/%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D)）自我认证（用户向别的用户/服务认证自己）或[数据完整性](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E5%AE%8C%E6%95%B4%E6%80%A7)以及认证服务。它还允许用户储存他们的通信对等者的公钥（以证书形式）。（摘自百度百科）<br />​

Keytool 是一个Java 数据证书的管理工具 ,Keytool 将密钥（key）和证书（certificates）存在一个称为keystore的文件中 在keystore里，包含两种数据： <br />密钥实体（Key entity）——密钥（secret key）又或者是私钥和配对公钥（采用非对称加密） <br />可信任的证书实体（trusted certificate entries）——只包含公钥<br />​

还有一个常用的证书生成工具 openssl， 和 keytool 一样可以生成和管理证书，常用于生成自签名证书，转换证书等，以后详细讲<br />

<a name="x6L1S"></a>
## keytool常用命令


<a name="U4eua"></a>
### 1、查看帮助命令
> keytool -help

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622168106063-3d339faa-a0e9-4db9-ba9a-fa055a082d22.png#clientId=u76410069-6a64-4&from=paste&height=391&id=udeb65b76&margin=%5Bobject%20Object%5D&name=image.png&originHeight=391&originWidth=549&originalType=binary&size=22084&status=done&style=none&taskId=u133fffc6-23fa-46d6-88c9-0e6b50cb889&width=549)<br />查看某个命令的具体选项，如genkeypair
> keytool -genkeypair -help

<a name="ejNpN"></a>
### ![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622168257742-c13e1740-dc6f-447b-817f-816922674bc9.png#clientId=u76410069-6a64-4&from=paste&height=472&id=ud4fcb0f4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=472&originWidth=543&originalType=binary&size=27355&status=done&style=none&taskId=u72585256-9d0e-4aa7-a141-8a74cffbb72&width=543)
<a name="J8dwf"></a>
### 2、生成密钥对
> keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 -validity 365 -storetype jks -keystore keystore.jks

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622168853293-303a8d99-8fde-4be8-8b6d-c1369ce7f17a.png#clientId=u76410069-6a64-4&from=paste&height=357&id=uf468cd7c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=357&originWidth=587&originalType=binary&size=30324&status=done&style=none&taskId=u5d249aa5-005d-46ab-8b21-a9abc0d433d&width=587)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622171660835-959459eb-3429-4094-b7da-82c3445317fe.png#clientId=u76410069-6a64-4&from=paste&height=77&id=u78d689f3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=77&originWidth=715&originalType=binary&size=6292&status=done&style=none&taskId=u7185a22f-4784-4c3b-95a5-8732fef4607&width=715)<br />-alias	别名，每个密钥库可以存储多个条目，条目即一个私钥加证书（公钥），每个条目用别名区分管理<br />-keyalg	密钥算法名称，可选 DSA，RSA，默认不填为DSA<br />-keysize	密钥位大小，1024或2048，默认2048<br />-validity	证书有效天数，默认90天，单位：天<br />-storetype	密钥库类型，目前可以生成JKS和PKCS12，默认为JKS<br />-keystore	密钥库名称，JKS类型的，后缀为 .jks 或 .keystore，PKCS12类型的，后缀为 .pfx 或 .p12<br />​<br />
<a name="Xkk83"></a>
### 3、查看密钥库
> keytool -list -storetype JKS -keystore keystore.jks

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622170559744-25f1c656-81a6-439f-a28f-c528241a5e5e.png#clientId=u76410069-6a64-4&from=paste&height=196&id=u5957dbca&margin=%5Bobject%20Object%5D&name=image.png&originHeight=196&originWidth=582&originalType=binary&size=14933&status=done&style=none&taskId=ue7190cce-4a0d-4a26-840b-c7ca4697ddf&width=582)<br />查看详细的，加个-v
> keytool -list -v -storetype JKS -keystore keystore.jks

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622170637559-67198c07-ac9d-4ef2-a9f6-035bbd9b1863.png#clientId=u76410069-6a64-4&from=paste&height=670&id=u286cfca2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=670&originWidth=590&originalType=binary&size=53271&status=done&style=none&taskId=u93ffc5f7-9106-4eca-98cc-e2ea504bbdf&width=590)<br />-storetype	密钥库类型，默认是JKS，可以不写，但如果密钥库是 **PKCS12**，则一定要写 **-storestype PKCS12**<br />​<br />
<a name="viwqR"></a>
### 4、导出某个条目的证书
> keytool -exportcert -alias tomcat -keystore keystore.jks -file tomcat.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622171178877-6057f95b-252c-4801-bf8b-997e2d9b7c0b.png#clientId=u76410069-6a64-4&from=paste&height=94&id=u2e075f59&margin=%5Bobject%20Object%5D&name=image.png&originHeight=94&originWidth=586&originalType=binary&size=7174&status=done&style=none&taskId=uce7aa060-7e75-4d64-8810-9157de606cb&width=586)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622171200623-9b07bd03-0a88-4861-9a9f-9705138548d1.png#clientId=u76410069-6a64-4&from=paste&height=98&id=u9eea02c9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=98&originWidth=664&originalType=binary&size=7972&status=done&style=none&taskId=u4e4fcebd-5a49-4078-80d7-ac55de590bd&width=664)<br />-alias	存储在密钥库里的条目的别名，因为密钥库可能有多个条目，所以要指定导出证书的条目的别名，这里指	       定为前面生成的tomcat
<a name="e2ogX"></a>
### 5、查看证书内容
> keytool -printcert -file tomcat.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622171526573-133e9b8a-e4ff-4452-aa31-9c825faee1e5.png#clientId=u76410069-6a64-4&from=paste&height=388&id=u4d76e295&margin=%5Bobject%20Object%5D&name=image.png&originHeight=388&originWidth=583&originalType=binary&size=32672&status=done&style=none&taskId=u53d2d08e-22bd-4e43-a195-77c78da6fed&width=583)<br />还可以以 RFC 的形式输出：
> keytool -printcert -rfc -file tomcat.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622171605752-7d94ce58-3669-41e6-b206-39609e9cef07.png#clientId=u76410069-6a64-4&from=paste&height=360&id=u5082935c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=360&originWidth=572&originalType=binary&size=40194&status=done&style=none&taskId=ud87ef656-33d8-4582-8d21-5428ece5c88&width=572)
<a name="HGMy8"></a>
### 6、密钥库转换
如要将 **JKS** 密钥库转为 **PKCS12 **密钥库，命令如下：
> keytool -importkeystore -srcstoretype JKS -srckeystore keystore.jks -deststoretype PKCS12 -destkeystore keystore.p12

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622172456742-a9080e51-c417-4fe3-8d4b-024cd055fae1.png#clientId=u76410069-6a64-4&from=paste&height=374&id=u6b212eb7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=374&originWidth=582&originalType=binary&size=33273&status=done&style=none&taskId=uefa8447e-7814-4c29-a027-2ed0e411c4c&width=582)<br />同理，要将 PKCS12 转为 JKS，只需要指定相应的源类型为 **PKCS12**，目标类型为 **JKS，**命令如下：
> keytool -importkeystore -srcstoretype PKCS12 -srckeystore keystore.p12 -deststoretype JKS -destkeystore keystore.jks

<a name="SQ6XT"></a>
### 7、删除密钥库里的某条目
假设密钥库里有多个条目，要删除其中一个条目，那么只需要指定条目的别名即可，如删除条目别名为 n 的条目，命令如下：
> keytool -delete -alias n -keystore keystore.jks

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622173072894-2f8f5ad8-e9f7-4b2a-81f8-b44d52b7fe9e.png#clientId=u76410069-6a64-4&from=paste&height=68&id=u23a41528&margin=%5Bobject%20Object%5D&name=image.png&originHeight=68&originWidth=572&originalType=binary&size=4304&status=done&style=none&taskId=u1452128d-509a-4339-8f0c-fb18957a29d&width=572)
<a name="hbiGn"></a>
## 模拟ca库签发证书


<a name="T46Hk"></a>
### 1、创建ca库
ca库也是一个密钥库，用 keytool -genkeypair 创建一个，别名为 **root **，文件名为 root.jks
> keytool -genkeypair -alias root -keyalg RSA -keysize 2048 -validity 365 -keystore root.jks

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622177870959-bb86b86e-78b7-4d92-8344-0f43c8f447c1.png#clientId=u76410069-6a64-4&from=paste&height=657&id=uc58d7ac2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=657&originWidth=560&originalType=binary&size=41553&status=done&style=none&taskId=u249f4735-4250-4cc4-a5f7-0310c198174&width=560)
<a name="nQL7Y"></a>
### 2、导出证书请求文件
以最开始创建的 **keystore.jks** 为例，导出别名为 **tomcat **的条目的证书请求文件，命令如下：
> keytool -certreq -alias tomcat -sigalg SHA256withRSA -keystore keystore.jks -file tomcat.csr

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622178645534-38333572-e8a1-4333-9d32-9935994bde13.png#clientId=u76410069-6a64-4&from=paste&height=399&id=u5cd35e02&margin=%5Bobject%20Object%5D&name=image.png&originHeight=399&originWidth=583&originalType=binary&size=32276&status=done&style=none&taskId=ue25c8fb0-4e5e-4246-bab5-548270f4cda&width=583)
<a name="eOMx8"></a>
### 3、查看证书请求文件
> keytool -printcertreq -file tomcat.csr

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622179076763-d385b678-814a-4087-a2d1-00cbd60dd729.png#clientId=u76410069-6a64-4&from=paste&height=270&id=u74dd9509&margin=%5Bobject%20Object%5D&name=image.png&originHeight=270&originWidth=578&originalType=binary&size=18954&status=done&style=none&taskId=uf1798515-bdc4-49b9-ac98-ae3286bf40e&width=578)
<a name="WnwFh"></a>
### 4、根据证书请求文件生成ca签名证书
此操作就是用ca库的私钥加密证书请求文件，也就是所谓的 **签发证书**，命令如下：
> keytool -gencert -alias root -keystore root.jks -sigalg SHA256withRSA -validity 365 -infile tomcat.csr -outfile tomcatsigned.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622179702843-d273ac57-e12c-4e8f-9b2d-dae273c98323.png#clientId=u76410069-6a64-4&from=paste&height=415&id=u4e58d47c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=415&originWidth=575&originalType=binary&size=31431&status=done&style=none&taskId=u3897bfcc-b5df-438d-8ea5-a54104d718a&width=575)<br />查看刚生成的签名证书<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622179833952-aa364adb-7e93-49cd-a02f-11ca9ba61ff6.png#clientId=u76410069-6a64-4&from=paste&height=510&id=ud5183b09&margin=%5Bobject%20Object%5D&name=image.png&originHeight=510&originWidth=582&originalType=binary&size=38437&status=done&style=none&taskId=u2fa14f6c-d17c-4c23-831e-1798c231b9d&width=582)<br />可以看到画横线处，该证书的发布者为刚创建的ca库
<a name="nXNpd"></a>
### 5、导入签名证书
通过上一步，ca库已经签发了证书文件，那么下面需要重新导入已签名的证书到 **keystore.jks**，覆盖原来的未签名证书，不过在导入 **tomcatsigned.cer** 之前，要先导入根证书，即ca库的证书，否则会报，无法回复证书，下面先到处ca库的证书为 **root.cer**：
> keytool -exportcert -alias root -keystore root.jks -file root.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622180534065-68cda1cc-622b-4170-819f-eacf6bb3b29b.png#clientId=u76410069-6a64-4&from=paste&height=433&id=u60969a40&margin=%5Bobject%20Object%5D&name=image.png&originHeight=433&originWidth=574&originalType=binary&size=30382&status=done&style=none&taskId=u6942f624-3dc5-4a53-9a59-ef9e6e3a243&width=574)<br />然后导入** root.cer**
> keytool -importcert -alias root -keystore keystore.jks -file root.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622180689142-b25d9250-0ecc-41cf-9612-0d003e3dc1f9.png#clientId=u76410069-6a64-4&from=paste&height=464&id=ub7ec4c43&margin=%5Bobject%20Object%5D&name=image.png&originHeight=464&originWidth=572&originalType=binary&size=34081&status=done&style=none&taskId=u3ca2f777-be90-40c1-81b7-c5e33771183&width=572)<br />最后导入 **tomcatsigned.cer **覆盖原有的证书，注意 **alias **要与要覆盖的条目的一样，如这里是 **tomcat**
> keytool -importcert -alias tomcat -keystore keystore.jks -file tomcatsigned.cer

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622181154675-fa9e4b6d-4ac6-4c5d-8148-ee39de5d1a69.png#clientId=u76410069-6a64-4&from=paste&height=79&id=u9adca0d3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=79&originWidth=571&originalType=binary&size=5675&status=done&style=none&taskId=u83ebd239-ddab-4570-9457-d0604449040&width=571)<br />此时查看 keystore.jks<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622181412763-2f0ac3e2-217c-4b57-a6e2-e3f03873c65c.png#clientId=u76410069-6a64-4&from=paste&height=205&id=ued07573f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=205&originWidth=578&originalType=binary&size=15613&status=done&style=none&taskId=u3b19254d-0ba1-4920-8847-e71c6293e9a&width=578)<br />至此，模拟ca库的签发证书操作已完成，下面界面如何为服务器配置自签名证书，开启 **https **访问<br />​<br />
<a name="nZzTr"></a>
## 服务器配置证书，开启https
配置 https 认证，有两种认证方式，分别如下：

   1. 单向认证：只需要客户端认证服务器端
   1. 双向认证：除了配置客户端认证服务器端，还要配置服务器端认证客户端

下面配置的都是单向认证，以上面生成的 keystore.jks 密钥库来配置
<a name="g37DL"></a>
### 1、配置Tomcat支持HTTPS
首先打开 tomcat 的配置文件 server.xml，添加下面代码：
```xml
<Connector port="8443" protocol="HTTP/1.1" 
           sslProtocol="TLS" clientAuth="false" 
           keystoreFile="C:\Users\Android2\Desktop\keytools\keystore.jks" 
           keystorePass="123456" 
           scheme="https" SSLEnabled="true" maxThreads="150"/>
```
keystoreFile	keytool生成的密码库文件地址，这里是 keystore.jks<br />keystorePass	生成密钥库时设置的密码，这里是 123456<br />clientAuth	是否启用客户端认证，也就是开启是否要服务器端验证客户端，这里设为false，因为是单向认证<br />​

启动 Tomcat，打开浏览器输入 [https://localhost:8443/](https://localhost:8443/)​<br />​<br />
<a name="YqiPL"></a>
### 2、配置springboot支持HTTPS
打开springboot的全局配置文件，一般为 **application.properties **,输入以下代码：
```
server.port=8443
#你生成的证书名字
server.ssl.key-store=C:/Users/Android2/Desktop/keytools/keystore.jks
#密钥库密码
server.ssl.key-store-password=123456
server.ssl.key-store-type=JKS
server.ssl.key-alias=tomcat
server.ssl.key-password=123456
```
启动 springboot，打开浏览器输入 [https://localhost:8443/](https://localhost:8443/) <br />​<br />
<a name="cKwQy"></a>
### 3、配置Apache支持HTTPS
Apache和Nginx支持的证书文件为 pem 格式文件，且证书和私钥分为两个文件，一个是存储公钥的证书文件，后缀一般为 .pem|.cer|crt|.der，一个是存储私钥的文件，后缀一般为 .key|.pem，因此需要对keytools生成的密钥库 keystore.jks 进行转换和分别导出证书（公钥）和私钥，这里导出需要用到 openssl 命令，因此需要安装openssl（怎么安装，可自行百度）<br />​<br />

- 将 JKS 密钥库转换为 PKCS12 密钥库（等下 openssl 导出私钥需要用到 PKCS12 密钥库）
> keytool -importkeystore -srcstoretype JKS -srckeystore keystore.jks -deststoretype PKCS12 -destkeystore keystore.p12

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622191194153-d0f3342f-6e3e-43e6-9b6b-c6e01257e82d.png#clientId=u76410069-6a64-4&from=paste&height=195&id=u6f6ffefd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=195&originWidth=575&originalType=binary&size=16532&status=done&style=none&taskId=u172ff163-1766-461a-8827-206464226c5&width=575)

- 将 PKCS12 密钥库转换为 PEM文件（keystore.pem）
> openssl pkcs12 -in keystore.p12 -nodes -out keystore.pem

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622192031699-09f69026-f44e-4bff-92e1-eca5273c6c8c.png#clientId=u76410069-6a64-4&from=paste&height=383&id=u648806ff&margin=%5Bobject%20Object%5D&name=image.png&originHeight=383&originWidth=565&originalType=binary&size=22025&status=done&style=none&taskId=u2695355a-0010-4cba-844d-ac1e571cb3d&width=565)

- 导出私钥（server.key）
> openssl rsa -in keystore.pem -out server.key

![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622192181733-aebeb304-880d-491e-be06-5f7a0fa44aba.png#clientId=u76410069-6a64-4&from=paste&height=371&id=ube6af506&margin=%5Bobject%20Object%5D&name=image.png&originHeight=371&originWidth=568&originalType=binary&size=23359&status=done&style=none&taskId=u003fbe30-a40a-4497-a5bb-c1eacd32ada&width=568)

- 导出证书（server.crt）
> openssl x509 -in keystore.pem -out server.crt

这里有个问题，正常情况下，这步执行完就可以导出证书了，但是因为我们前面模拟了ca库，签发了证书，所以这里只导出了ca根证书，还需要导出服务器端证书，做成证书链，有个简单的方法，直接用记事本打开前面生成的 keystore.pem 文件<br />
<br />文件的大致的格式如下：

1. 以 "-----BEGIN PRIVATE KEY-----" 开头， "-----END PRIVATE KEY-----" 结尾的是私钥
1. 以 "-----BEGIN CERTIFICATE-----" 开头， "-----END CERTIFICATE-----" 结尾的是证书

其中可以看到有一个私钥，两个证书，按顺序分别是（从上到下）
> 私钥 -> 服务端证书 -> ca根证书

新建文件保存为 **server.crt **并用记事本打开，按顺序复制上面的两个证书，并保存，文件内容如下图所示：<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622198816524-c9eda5ec-1343-4a51-8fca-6105c83629e8.png#clientId=u76410069-6a64-4&from=paste&height=854&id=u43786f84&margin=%5Bobject%20Object%5D&name=image.png&originHeight=854&originWidth=674&originalType=binary&size=183666&status=done&style=shadow&taskId=u5ad0bbae-3a57-4741-8092-3eaac63e36b&width=674)<br />同样的道理，私钥也可以从里面提取出来<br />​

ps: 上面文件不能有多余的空格，还有这两个证书也可以分开两个文件保存，比如服务端证书保存为 server.crt，ca根证书保存为 chain.crt，在Apache上可以这样做，但是Nginx上好像没有配置证书链的地方，所以要保存为同一个文件，至此，服务器配置的证书已完成，Nginx的证书生成 同上<br />​

接着配置服务器<br />​<br />

- 打开Apache配置文件（../conf/httpd.conf），找到下面两句话
```
LoadModule ssl_module modules/mod_ssl.so
Include conf/extra/httpd-ssl.conf
```
有的话，就把注释去掉，没有的话就添加到末尾<br />​<br />

- 在配置文件 httpd.conf 的同级目录下，即 conf 文件夹里创建一个文件夹命名为cert，并把上面生成的证书和私钥复制进去（../conf/cert/）



- 修改httpd-ssl.conf文件（../conf/extra/httpd-ssl.conf）
```nginx
Listen 8443

# SSLSessionCache        "shmcb:${SRVROOT}/logs/ssl_scache(512000)"
SSLSessionCacheTimeout  300


<VirtualHost _default_:443>

...

DocumentRoot "${SRVROOT}/htdocs"

ServerName www.example.com

ErrorLog "${SRVROOT}/logs/error.log"

TransferLog "${SRVROOT}/logs/access.log"

#   SSL Engine Switch:
#   Enable/Disable SSL for this virtual host.

SSLEngine on

SSLCertificateFile "${SRVROOT}/conf/cert/server.crt"
SSLCertificateKeyFile "${SRVROOT}/conf/cert/server.key"
SSLCertificateChainFile "${SRVROOT}/conf/cert/chain.crt"

...

</VirtualHost> 
```
如果ca根证书和服务器端证书在同一文件里的话，SSLCertificateChainFile 可以不用配置，注释掉（若改完后启动不了，可以把 SSLSessionCache 这个注释掉看看）<br />​<br />

- 配置完成，启动 Apche，打开浏览器输入 [https://localhost:8443/](https://localhost:8443/)​



<a name="pSBnL"></a>
### 4、配置Nginx支持HTTPS
​<br />

- 在nginx的配置文件 nginx.conf 的同级目录下新建一个文件夹，命名为cert，并把上面生成的 server.crt 和 server.key 复制进去
- 打开 nginx.conf 文件，添加或修改如下内容：
```nginx
# HTTPS server
    #
    server {
       listen       8443 ssl;
       server_name  localhost;

       ssl_certificate      cert/server.crt;
       ssl_certificate_key  cert/server.key;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
           root   html;
           index  index.html index.htm;
       }
    }
```

- 配置完成，启动 Nginx，打开浏览器输入 [https://localhost:8443/](https://localhost:8443/)

​<br />
<a name="ih1vE"></a>
### 5、浏览器显示效果

<br />显示如下效果，说明配置成功了
<a name="RAv0s"></a>
### ![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622202261040-11a7e559-fdf0-466e-9709-2e3a9120441c.png#clientId=u76410069-6a64-4&from=paste&height=755&id=ue2dd5f92&margin=%5Bobject%20Object%5D&name=image.png&originHeight=755&originWidth=1444&originalType=binary&size=60597&status=done&style=shadow&taskId=uaac647dc-ccef-4fbc-bb4c-7853505236d&width=1444)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622202364728-0eb43f94-83ea-4b1d-ac8d-074dfb0d59ca.png#clientId=u76410069-6a64-4&from=paste&height=642&id=ua949d6d8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=642&originWidth=1256&originalType=binary&size=81487&status=done&style=shadow&taskId=u8fbfe24c-52d7-48c6-a424-e8e012a027b&width=1256)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/667575/1622202381463-41425bf9-b952-4831-9c8d-a36dff65aae6.png#clientId=u76410069-6a64-4&from=paste&height=673&id=uef768014&margin=%5Bobject%20Object%5D&name=image.png&originHeight=673&originWidth=1250&originalType=binary&size=62110&status=done&style=shadow&taskId=u2f38c33f-fd63-4ddf-8c0a-933316572e4&width=1250)<br />因为是自签名证书，所以浏览器如上提示非安全连接，点击继续前往就可以了，配置成功

