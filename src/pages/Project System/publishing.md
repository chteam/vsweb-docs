<properties
	pageTitle="发布"
	description="为了应对持续交付的场景，Visual Studio 2015 提供了一个可以轻松发布 web application 的发布系统。"
	slug="publishing"
	keywords="css, html, javascript"
/>

## Azure App Service
Publishing to web apps in Azure App Service has first class support in Visual Studio 2015. You can easily publish to a new or existing site within seconds.

![Publishing Azure Websites](_assets/publishing-azure-websites.png)

## 文件系统，FTP 以及 Web Deploy
你可以用您选择的方式轻松发布，这些方式包括 -- 使用 Web Deploy, FTP, 或者直接复制文件到一个本地或网络文件夹上。

## 增量发布
After creating a publish profile you can easily publish one or more files directly from Solution Explorer. You can also preview changes before publishing or even download remote files.

![文件右键菜单](_assets/publish-context-menu.png)

## 自定义发布
Visual Studio 2015 使用了一个基于 Windows PowerShell 的新的发布系统。 它使自定义发布的流程变得很简单。 当你创建了一个 publish profile 的时候，一个 PowerShell 脚本就会被自动添加到你的项目中。这个脚本文件就是 Visual Studio 调用 kpm 命令打包之后所执行的文件。当项目被打包完成后 Visual Studio 发布进程将会开始调用此文件。
