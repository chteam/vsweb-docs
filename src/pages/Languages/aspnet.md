<properties
	pageTitle="C# / ASP.NET"
	description="ASP.NET 是一款利用 HTML、CSS 以及 JavaScript 来构建大型应用的 web 框架，它是开源、免费的。"
	slug="aspnet"
    order="100"
	keywords="c#, asp.net, roslyn, server-side, mvc, webforms, web forms, webpages, web pages"
/>

## 开源
如果你发现了一个 BUG 或者想出一个新的特性怎么办？ 你可以即时打开一个 issue 或者直接提交一个 pull request。
所有的 ASP.NET 以及 .NET Core CLR 运行时组件都像 Azure SDKs 一样存储在 GitHub 并可以随时贡献代码。 现在就开始吧！ 

请登录 [GitHub](https://github.com/aspnet/home/)
提交 pull requests。

## Razor
ASP.NET Razor 语法允许在你的 view 文件中，编写行内 C#。

你可以完全访问 `Model` 类似于访问 .NET framework 。

![ASP.NET Razor](_assets/aspnet-razor.gif)

## Tag Helpers
coming soon...

## ~ 符号的支持
You can use the tilde (~) character in Razor markup to indicate the root
of the website. This is particularly useful when the root of the application
is located in a subfolder of an existing website.

![ASP.NET the tilde character](_assets/aspnet-tilde.png)

## 模型驱动开发
The models used in an ASP.NET application can be annotated to provide
a wide range of experiences such as database schema generation,
view scaffolding, client- and server-side validation and more.

### Model 注释
Annotate your models to generate the database schema and scaffold views.

![ASP.NET model annotations](_assets/aspnet-model-annotations.gif)

### 验证
Annotations will also ensure both server- and client-side validation.

![ASP.NET annotations for validation](_assets/aspnet-annotations-validation.gif)

### Scaffolding
In the works...

### Dynamic templating
coming soon...

## Roslyn 编译器
.NET 编译器平台 "Roslyn" 提供了开源的、拥有完整代码分析 API 的 C# 以及 
Visual Basic 编译器。 

It enables building code analysis tools with the same APIs that are 
used by Visual Studio.

## Environment awareness
The app specific configuration defaults to have environment settings override
the configuration in the projects.

![ASP.NET configuration](_assets/aspnet-configuration.png)

## 基于代码的配置
Any identity, routing and database configuration is code based to give
full fidelity to the logic need for any web app.

![ASP.NET code based configuration](_assets/aspnet-code-configuration.png)

<aside role="complementary">

## Related resources

<section>

### More information

- [ASP.NET weekly community standup](http://www.youtube.com/playlist?list=PL0M0zPgJ3HSftTAAHttA3JQU4vOjXFquF)
- [ASP.NET on Github](https://github.com/aspnet/home/)
- [Roslyn C# compiler on Github](https://github.com/dotnet/roslyn/)
</section>

<section>

### Relevant extensions

- [Web Essentials](https://visualstudiogallery.msdn.microsoft.com/ee6e6d8c-c837-41fb-886a-6b50ae2d06a2)
- [Cobisi Routing assistant for ASP.NET](https://visualstudiogallery.msdn.microsoft.com/f0589156-a8e6-47db-8bac-90f01ca6b8a3)
</section>

</aside>
