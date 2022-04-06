import HomePage from './pages/HomePage.js'
import LastPosts from './pages/LastPosts.js'
import LastVideos from './pages/LastVideos.js'

const navTo = (urlRoute) => {
    history.pushState(null, null, urlRoute);
    router();
}

const router = () => {
    const routes = [
        { path: '/', view: () => HomePage },
        { path: '/last-videos', view: () => LastVideos },
        { path: '/last-posts', view: () => LastPosts }
    ];

    const matchRoutes = routes.map(item => {
        return {
            route: item,
            isMatch: location.pathname === item.path // RETURN BOOLEAN
        }
    })

    let routeExist = matchRoutes.find(item => item.isMatch);
    if (!routeExist) {
        routeExist = {
            route: routes[0],
            isMatch: true
        }
    }

    document.getElementById("app").innerHTML = routeExist.route.view();
}

window.addEventListener("popstate", router)
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navTo(e.target.href);
        }
    })
    router()
});