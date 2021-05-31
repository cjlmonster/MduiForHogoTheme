---
title: "Android 网络安全配置"
date: 2021-05-31T15:57:03+08:00
draft: false
tags: ["network", "ssl", "https", "android", "ca"]
---

借助网络安全配置功能，应用可以在一个安全的声明性配置文件中自定义其网络安全设置，而无需修改应用代码。您可以针对特定网域和特定应用配置这些设置。此功能的主要特性如下所示：

- **自定义信任锚**：针对应用的安全连接自定义哪些证书授权机构 (CA) 值得信赖。例如，信任特定的自签名证书或限制应用信任的公共 CA 集。
- **仅调试替换**：在应用中以安全方式调试安全连接，而不会增加安装设备的风险。
- **选择停用明文流量**：防止应用意外使用明文流量。
- **证书固定**：限制应用仅安全连接到特定的证书。
## 添加网络安全配置文件
网络安全配置功能使用一个 XML 文件，您可以在该文件中指定应用的设置。您必须在应用的清单中添加一个指向该文件的条目。以下代码摘自一个清单文件，演示了如何创建此条目：
```xml
 <?xml version="1.0" encoding="utf-8"?>
<manifest ... >
    <application android:networkSecurityConfig="@xml/network_security_config"
                    ... >
        ...
    </application>
</manifest>
```
## 自定义可信 CA
应用可能需要信任自定义的 CA 集，而不是平台默认值。出现此情况的最常见原因包括：

- 连接到具有自定义证书授权机构（如自签名或在公司内部签发的 CA）的主机。
- 仅限您信任的 CA（而不是每个预装 CA）。
- 信任未包含在系统中的其他 CA。

默认情况下，来自所有应用的安全连接（使用 TLS 和 HTTPS 之类的协议）均信任预装的系统 CA，而以 Android 6.0（API 级别 23）及更低版本为目标平台的应用默认情况下还会信任用户添加的 CA 存储区。应用可以使用 base-config（应用范围的自定义）或 domain-config（针对每个网域的自定义）自定义自己的连接。
### 配置自定义 CA
假设您要连接到使用自签名 SSL 证书的主机，或者连接到其 SSL 证书由您信任的非公共 CA（如公司的内部 CA）颁发的主机。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
	<domain-config>
    <domain includeSubdomains="true">example.com</domain>
    <trust-anchors>
        <certificates src="@raw/my_ca"/>
    </trust-anchors>
  </domain-config>
</network-security-config>
```
以 PEM 或 DER 格式将自签名或非公共 CA 证书添加到 res/raw/my_ca。
### 限制可信 CA 集
如果应用并不一定想要信任系统信任的所有 CA，则可以自行指定，即缩减要信任的 CA 集。这样可防止应用信任由任何其他 CA 颁发的欺诈性证书。
限制可信 CA 集的配置与针对特定网域[信任自定义 CA](https://developer.android.com/training/articles/security-config#ConfigCustom) 相似，不同的是，前者要在资源中提供多个 CA。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
      <domain includeSubdomains="true">secure.example.com</domain>
      <domain includeSubdomains="true">cdn.example.com</domain>
      <trust-anchors>
        <certificates src="@raw/trusted_roots"/>
      </trust-anchors>
    </domain-config>
</network-security-config>
```
以 PEM 或 DER 格式将可信 CA 添加到 res/raw/trusted_roots。请注意，如果使用 PEM 格式，文件必须仅包含 PEM 数据，且没有额外的文本。您还可以提供多个 [<certificates>](https://developer.android.com/training/articles/security-config#certificates)，而不是只提供一个。
### 信任其他 CA 
应用可能需要信任系统不信任的其他 CA，出现此情况的原因可能是系统还未包含此 CA，或 CA 不符合添加到 Android 系统中的要求。应用可以通过为一个配置指定多个证书源来实现此目的。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <base-config>
    <trust-anchors>
      <certificates src="@raw/extracas"/>
      <certificates src="system"/>
    </trust-anchors>
  </base-config>
</network-security-config>
```
## 配置用于调试的 CA
调试通过 HTTPS 连接的应用时，您可能需要连接到没有为生产服务器提供 SSL 证书的本地开发服务器。为了支持此操作，而又不对应用的代码进行任何修改，您可以通过使用 debug-overrides 指定仅在 [android:debuggable](https://developer.android.com/guide/topics/manifest/application-element#debug) 为 true 时才可信的仅调试 CA。通常，IDE 和构建工具会自动为非发布 build 设置此标记。
这比一般的条件代码更安全，因为出于安全考虑，应用商店不接受被标记为可调试的应用。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <debug-overrides>
    <trust-anchors>
      <certificates src="@raw/debug_cas"/>
    </trust-anchors>
  </debug-overrides>
</network-security-config>
```
## 选择停用明文流量
**注意**：此部分的指南仅适用于面向 Android 8.1（API 级别 27）或更低级别的应用。从 Android 9（API 级别 28）开始，系统默认情况下已停用明文支持。
打算连接到仅使用安全连接的目标的应用可以选择不对这些目标提供明文（使用未加密 HTTP 协议而非 HTTPS）支持。此选项有助于防止应用因外部源（如后端服务器）提供的网址发生变化而意外回归。如需了解详情，请参阅 [NetworkSecurityPolicy.isCleartextTrafficPermitted()](https://developer.android.com/reference/android/security/NetworkSecurityPolicy#isCleartextTrafficPermitted())。
例如，应用可能需要确保所有与 secure.example.com 的连接始终通过 HTTPS 完成，以防止来自恶意网络的敏感流量。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="false">
    <domain includeSubdomains="true">secure.example.com</domain>
  </domain-config>
</network-security-config>
```
## 固定证书
一般情况下，应用信任所有预装 CA。如果有预装 CA 颁发了欺诈性证书，则应用将面临被中间人攻击的风险。有些应用选择通过限制信任的 CA 集或通过固定证书来限制其接受的证书集。
如需固定证书，您可以通过按公钥的哈希值（X.509 证书的 SubjectPublicKeyInfo）提供证书集。然后，只有至少包含一个已固定公钥的证书链才有效。
请注意，固定证书时，您应始终包含一个备用密钥，这样，当您被强制切换到新密钥或更改 CA 时（固定到某个 CA 证书或该 CA 的中间证书时），应用的连接性不会受到影响。否则，您必须推送应用更新以恢复连接性。
此外，可以设置证书固定的到期时间，在该时间之后不再固定证书。这有助于防止尚未更新的应用出现连接性问题。不过，设置证书固定的到期时间可能会绕过证书固定。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config>
    <domain includeSubdomains="true">example.com</domain>
    <pin-set expiration="2018-01-01">
      <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
      <!-- backup pin -->
      <pin digest="SHA-256">fwza0LRMXouZHRC8Ei+4PyuldPDcf3UKgO/04cDM1oE=</pin>
    </pin-set>
  </domain-config>
</network-security-config>
```
## 配置继承行为
未在特定配置中设置的值将被继承。此行为允许进行更复杂的配置，同时又能保证配置文件易读。
如果未在特定条目中设置值，将使用来自更通用条目中的值。例如，未在 domain-config 中设置的值将从父级 domain-config（如果已嵌套）或者 base-config（如果未嵌套）中获取。未在 base-config 中设置的值将使用平台默认值。
例如，所有与 example.com 的子网域的连接必须使用自定义 CA 集。此外，允许流向这些网域的明文流量，但连接到 secure.example.com 时除外。通过在 example.com 的配置中嵌套 secure.example.com 的配置，不需要重复 trust-anchors。
res/xml/network_security_config.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config>
    <domain includeSubdomains="true">example.com</domain>
    <trust-anchors>
      <certificates src="@raw/my_ca"/>
    </trust-anchors>
    <domain-config cleartextTrafficPermitted="false">
      <domain includeSubdomains="true">secure.example.com</domain>
    </domain-config>
  </domain-config>
</network-security-config>
```
## 配置文件格式
网络安全配置功能使用 XML 文件格式。文件的整体结构如以下代码示例所示：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <base-config>
    <trust-anchors>
      <certificates src="..."/>
      ...
    </trust-anchors>
  </base-config>

  <domain-config>
    <domain>android.com</domain>
    ...
    <trust-anchors>
      <certificates src="..."/>
      ...
    </trust-anchors>
    <pin-set>
      <pin digest="...">...</pin>
      ...
    </pin-set>
  </domain-config>
  ...
  <debug-overrides>
    <trust-anchors>
      <certificates src="..."/>
      ...
    </trust-anchors>
  </debug-overrides>
</network-security-config>
```
以下部分将介绍语法与文件格式的其他详细信息。
### <network-security-config> 
可包含：
0 或 1 个 [<base-config>](https://developer.android.com/training/articles/security-config#base-config)
任意数量的 [<domain-config>](https://developer.android.com/training/articles/security-config#domain-config)
0 或 1 个 [<debug-overrides>](https://developer.android.com/training/articles/security-config#debug-overrides)
### <base-config> 
语法：
```xml
<base-config cleartextTrafficPermitted=["true" | "false"]>
  ...
</base-config>
```
可包含：
[<trust-anchors>](https://developer.android.com/training/articles/security-config#trust-anchors)
说明：
目标不在 [domain-config](https://developer.android.com/training/articles/security-config#domain-config) 涵盖范围内的所有连接所使用的默认配置。
未设置的任何值均使用平台默认值。
以 Android 9（API 级别 28）及更高版本为目标平台的应用的默认配置如下所示：
```xml
<base-config cleartextTrafficPermitted="false">
  <trust-anchors>
    <certificates src="system" />
  </trust-anchors>
</base-config>
```
以 Android 7.0（API 级别 24）到 Android 8.1（API 级别 27）为目标平台的应用的默认配置如下所示：
```xml
<base-config cleartextTrafficPermitted="true">
  <trust-anchors>
    <certificates src="system" />
  </trust-anchors>
</base-config>
```
以 Android 6.0（API 级别 23）及更低版本为目标平台的应用的默认配置如下所示：
```xml
<base-config cleartextTrafficPermitted="true">
  <trust-anchors>
    <certificates src="system" />
    <certificates src="user" />
  </trust-anchors>
</base-config>
```
### <domain-config>
语法：
```xml
<domain-config cleartextTrafficPermitted=["true" | "false"]>
  ...
</domain-config>
```
可包含：
1 个或更多 [<domain>](https://developer.android.com/training/articles/security-config#domain)
0 或 1 个 [<trust-anchors>](https://developer.android.com/training/articles/security-config#trust-anchors)
0 或 1 个 [<pin-set>](https://developer.android.com/training/articles/security-config#pin-set)
任意数量的嵌套 <domain-config>
说明
用于按照 domain 元素的定义连接到特定目标的配置。
请注意，如果有多个 domain-config 元素涵盖某个目标，将使用匹配网域规则最具体（最长）的配置。
### <domain>
语法：
```xml
<domain includeSubdomains=["true" | "false"]>example.com</domain>
```
属性：
includeSubdomains
如果为 "true"，此网域规则将与相应网域及所有子网域（包括子网域的子网域）匹配。否则，该规则仅适用于精确匹配项。
说明：
### <debug-overrides>
语法：
```xml
<debug-overrides>
  ...
</debug-overrides>
```
可包含：
0 或 1 个 [<trust-anchors>](https://developer.android.com/training/articles/security-config#trust-anchors)
说明：
在 [android:debuggable](https://developer.android.com/guide/topics/manifest/application-element#debug) 为 "true" 时将应用的替换，IDE 和构建工具生成的非发布 build 通常属于此情况。在 debug-overrides 中指定的信任锚会添加到所有其他配置，并且当服务器的证书链使用其中一个仅调试信任锚时不固定证书。如果 [android:debuggable](https://developer.android.com/guide/topics/manifest/application-element#debug) 为 "false"，则完全忽略此部分。
### <trust-anchors>
语法：
```xml
<trust-anchors>
  ...
</trust-anchors>
```
可包含：
任意数量的 [<certificates>](https://developer.android.com/training/articles/security-config#certificates)
说明：
用于安全连接的信任锚集。
### <certificates>
语法：
```xml
<certificates src=["system" | "user" | "raw resource"]
                  overridePins=["true" | "false"] />
```
说明：
用于 trust-anchors 元素的 X.509 证书集。
属性：
src
CA 证书的来源。每个证书可以是以下项之一：

- 指向包含 X.509 证书的文件的原始资源 ID。证书必须以 DER 或 PEM 格式编码。如果为 PEM 证书，则文件不得包含额外的非 PEM 数据，例如注释。
- "system"，表示预装系统 CA 证书
- "user"，表示用户添加的 CA 证书

overridePins
指定此来源的 CA 是否绕过证书固定。如果为 "true"，则不针对由此来源的某个 CA 签名的证书链固定证书。这对于调试 CA 或测试针对应用安全流量的中间人攻击非常有用。
默认值为 "false"，除非在 debug-overrides 元素中另外指定（在这种情况下，默认值为 "true"。）
### <pin-set>
语法：
```xml
<pin-set expiration="date">
  ...
</pin-set>
```
可包含：
任意数量的 [<pin>](https://developer.android.com/training/articles/security-config#pin)
说明：
一组公钥固定。若要信任某个安全连接，信任链中必须有一个公钥位于固定集内。如需了解固定的格式，请参阅 [<pin>](https://developer.android.com/training/articles/security-config#pin)。
属性：
expiration
采用 yyyy-MM-dd 格式的日期，证书固定会在该日期过期，因而将停止固定证书。如果未设置该属性，则证书固定不会过期。
设置到期时间有助于防止未获得其固定集更新（例如，在用户停用应用更新时）的应用出现连接问题。
### <pin>
语法：
```xml
<pin digest=["SHA-256"]>base64 encoded digest of X.509
        SubjectPublicKeyInfo (SPKI)</pin>
```
属性：
digest
用于生成证书固定的摘要算法。目前仅支持 "SHA-256"。
​

[转载自Google官方文档](https://developer.android.com/training/articles/security-config)

