<properties
	       pageTitle="项目"
	       description="Visual Studio 2015 中提供了基于文件夹的项目，它不再因为需要去管理包含文件而单独维护一个 .csproj 文件。"
	       slug="projects"
	       order="100"
	       keywords="projects, folders, profiles"
/>

## Designed to work with other tools
In Visual Studio 2013 and earlier versions, when working with ASP.NET projects you mostly had to perform tasks inside of Visual Studio. With the new project support for ASP.NET 5, you can use other tools and editors to work on your projects, and Visual Studio respects those changes.

## 基于文件夹的 web 项目
With ASP.NET 5, all files in your project folder are automatically included as a part of your project. If you use other tools to add files to the project folder structure, you don't need to do anything in Visual Studio to indicate that they should be included in the project. The ASP.NET 5 Visual Studio project file does not keep track of which files are included in the project.

This alleviates the issues with merging projects that you may have run into in the past. And it's a great improvement for web developers, because when developing web applications using client side task runners like Gulp or Grunt, things should just work.

## Run/debug profiles
You can run and debug ASP.NET 5 applications just as you have been able to run and debug ASP.NET projects in previous versions of Visual Studio. In addition, you can now create debug profiles on the Properties page which enable you to configure the startup settings for the project. In debug profiles you can also configure custom environment variables which are used when running or debugging in Visual Studio.

## 浏览器支持
像 Visual Studio 2015 旧版本一样，你可以轻松地在任何浏览器中运行一个 web application ，并且你可以在运行时通过下拉框来选择您要使用哪个浏览器。除了浏览器之外，还包括各种可用的模拟器。Visual Studio 同样也提供了 Windows Phone 和 Android 的模拟器，你还可以安装 iOS 或其它模拟器。

![Browser 选择](_assets/projects-browsers.png)

