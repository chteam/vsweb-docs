var dataService = (function () {

	var pageCache = [];

	function getPage(url, callback) {

		var cached = pageCache[url];

		if (cached) {
			callback(cached);
			return;
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("X-Content-Only", "1");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
			    var page = { url: url, content: xhr.responseText, title: decodeURIComponent(xhr.getResponseHeader("X-Title")), next: xhr.getResponseHeader("X-Next"), prev: xhr.getResponseHeader("X-Prev") };
				pageCache[url] = page;
				callback(page);
			}
		};

		xhr.send();
	}

    function sendXhr(url, callback) {

        if (sessionStorage && sessionStorage[url]) {
            callback(sessionStorage[url]);
            return;
        }

        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                callback(http.responseText);

                if (http.status === 200 && sessionStorage)
                    sessionStorage[url] = http.responseText;
            }
        }

        http.send(null);
    }

	return {
	    getPage: getPage,
        sendXhr: sendXhr,
	}

})();
/// <reference path="dataService.js" />

(function () {

    var nav = document.getElementById("nav"),
		burger = document.getElementById("burger"),
		main = document.getElementsByTagName("main")[0],
		hero = document.getElementById("hero"),
	    images = main.getElementsByTagName("img"),
		fadingInProgress = false;

    function syncMenu() {

        var open = nav.getElementsByClassName("open");
        for (var i = 0; i < open.length; i++) {
            // this is for popstate to adjust the menu
            open[i].removeAttribute("class");
            //open[i].setAttribute("aria-hidden", "true");
        }

        if (location.pathname === "/")
            return;

        var active = nav.getElementsByClassName("active");

        if (active.length === 0)
            return;

        var li = active[0].parentNode;

        if (!li) return;

        do {

            if (li.tagName === "LI" && li.childElementCount === 2) {
                li.className = "open";
                li.removeAttribute("aria-hidden");
            }

            li = li.parentNode;

        } while (li && li.parentNode !== nav);
    }

    function onBodyClick(e) {

        var href = e.target.getAttribute("href");

        if (e.target.tagName !== "A" || href.indexOf("#") === 0)
            return;

        if (location.pathname === href) {
            e.preventDefault();
            return;
        }

        if (e.target.id === burger.id) {
            onBurgerClick(e);
        }
        else if (e.target.nextElementSibling && e.target.nextElementSibling.tagName === "UL") {
            expandMenuParent(e);
        }
        else if (href.indexOf("://") === -1) {
            onLocalLinkClick(e, href);
        }
    }

    function expandMenuParent(e) {
        e.preventDefault();

        var parent = e.target.parentNode;

        if (parent.tagName !== "LI")
            return;

        parent.className = parent.className === "" ? "open" : "";

        // Close all other open menu items
        var open = nav.getElementsByClassName("open");
        for (var i = 0; i < open.length; i++) {
            if (parent !== open[i])
                open[i].removeAttribute("class");
        }
    }

    function onLocalLinkClick(e, url) {
        e.preventDefault();
        e.target.setAttribute("data-spinner", "true");

        history.pushState("pushed", null, url);
        replaceContent(url, e.target);
    }

    function setMenuActive() {
        var actives = nav.getElementsByClassName("active");
        for (var a = 0; a < actives.length; a++) {
            actives[a].removeAttribute("class");
        }

        var current = nav.querySelector("[href='" + location.pathname + "']")
        if (current)
            current.className = "active";
    }

    function replaceContent(url, target) {
        setMenuActive();

        dataService.getPage(url, function (page) {

            main.style.opacity = 0;
            toggleHero(page.url);
            target && target.removeAttribute("data-spinner");

            if (burger.offsetLeft > 0 || burger.offsetTop > 0) { // If small screen
                burger.nextElementSibling.style.visibility = "";
                burger.nextElementSibling.nextElementSibling.style.visibility = "";
            }

            setTimeout(function () {
                main.innerHTML = page.content;
                document.title = page.title;

                setTimeout(function () {
                    var index = url.indexOf("#");
                    if (index > 0) {
                        var target = document.getElementById(url.substring(index + 1))
                        target.scrollIntoView();
                    }
                }, 200)

                images = main.getElementsByTagName("img")
                fadeImagesIntoView();
                setFlipAheadLinks(page.next, page.prev);

                main.style.opacity = 1;
                syncMenu();

            }, 200);
        });
    }

    function onBurgerClick(e) {
        e.preventDefault();
        var ul = e.target.nextElementSibling.nextElementSibling;
        var visible = ul.style.visibility;
        ul.style.visibility = visible === "" ? "visible" : "";

        var form = e.target.nextElementSibling;
        form.style.visibility = ul.style.visibility;
    }

    function setFlipAheadLinks(next, prev) {
        var nextLink = document.head.querySelector("link[rel=next]");
        var prevLink = document.head.querySelector("link[rel=prev]");

        setLink(nextLink, next, "next");
        setLink(prevLink, prev, "prev");

        function setLink(link, href, rel) {
            if (href) {
                link = link || createLink(rel, href);
                link.href = href;
            }
            else if (link) {
                link.parentNode.removeChild(link);
            }
        }

        function createLink(rel, href) {
            var link = document.createElement("link");
            link.rel = rel;
            link.href = href;
            return document.head.appendChild(link);
        }
    }

    function toggleHero(href) {
        var showHero = (!href && location.pathname === "/") || href === "/";
        hero.className = showHero ? "" : "hide";
    }

    function fadeImagesIntoView() {
        if (fadingInProgress) return;

        fadingInProgress = true;

        setTimeout(function () {
            var height = window.innerHeight || document.documentElement.clientHeight;
            for (var i = 0; i < images.length; i++) {
                var image = images[i];

                var rect = image.getBoundingClientRect();
                image.style.opacity = rect.top >= -50 && rect.bottom <= height ? 1 : 0;

                if (rect.bottom > height)
                    break;
            }

            fadingInProgress = false;
        }, 200);
    }

    document.body.addEventListener("click", onBodyClick, false);

    window.addEventListener("popstate", function (e) {
        if (e.state === "pushed")
            replaceContent(location.pathname);
        else
            console.log(e);
    });

    window.addEventListener("scroll", fadeImagesIntoView, false);
    window.addEventListener("load", fadeImagesIntoView, false);
})();
(function () {

	try {
		if (window.external.msIsSiteMode()) {
			ext = window.external;
			ext.msSiteModeCreateJumpList("Navigation");

			var mainItems = document.querySelectorAll("#nav > ul > li > a");

			for (var i = mainItems.length - 1; i > -1; i--) {
				var link = mainItems[i];
				ext.msSiteModeAddJumpListItem(link.innerHTML, link.href, "/themes/standard/favicon/favicon.ico");
			}
		}
	}
	catch (e) { /* Not IE9+ on desktop */}

})();
/// <reference path="dataService.js" />

(function () {

    var searchField = document.getElementById("q"),
        searchButton = document.getElementById("searchbutton"),
        searchForm = document.getElementById("search"),
        datalist = document.getElementsByTagName("datalist")[0],
        hiddenLink;

    function search(e) {

        var q = searchField.value;
        e.preventDefault();

        if (q.trim().length === 0) {
            searchField.focus();
            return;
        }

        if (!hiddenLink) {
            hiddenLink = document.createElement("a");
            hiddenLink.setAttribute("aria-hidden", "true");
            hiddenLink.innerHTML = "Hidden link used by the site search";
            hiddenLink.style.display = "none";
            searchButton.parentNode.appendChild(hiddenLink);
        }

        // This will let menu.js handle the page load as if it was a link click.
        hiddenLink.href = "/search/" + encodeURIComponent(q);
        hiddenLink.click();
    }

    function clear() {
        var path = location.pathname;

        setInterval(function () {
            if (location.pathname !== path) {
                path = location.pathname;
                searchField.value = "";
            }
        }, 1000)
    }

    function onFocus(e) {

        if (datalist.childNodes.length > 0)
            return;

        dataService.sendXhr("/views/keywords.cshtml", function (data) {
            var keywords = JSON.parse(data);

            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];
                var option = document.createElement("option");
                option.innerHTML = keyword;
                datalist.appendChild(option);
            }
        });
    }

    searchForm.addEventListener("submit", search, false);
    searchField.addEventListener("focus", onFocus, false);
    window.addEventListener("load", clear, false);
})();