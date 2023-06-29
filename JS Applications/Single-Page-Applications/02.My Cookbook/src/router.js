export function initialize(router) {
    let main = document.querySelector('main');
    let nav = document.querySelector('nav');

    nav.addEventListener('click', onNavigate);

    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName == 'A') {
            let url = new URL(target.href);
            goto(url.pathname);
        }
    }
    function showSection(section) {
        main.replaceChildren(section);
    }
    function goto(pathName) {
        let handler = router[pathName];
        if (handler) {
            handler(context);
        }
    }
    function setActiveNav(target) {
        nav.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    function updateNav() {

        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }

    }
    const context = {
        showSection,
        goto,
        setActiveNav,
        updateNav
    }

    nav.style.display = 'inline-block';
    main.style.display = 'block';
    return context;

}