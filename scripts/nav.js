function initNavigation() {
    // get current url data
    const pathname = window.location.pathname.split('/');
    let file = pathname.pop();
    if (!file) file = 'index.html';
    const hash = window.location.hash;
    const id = hash.substring(1);

    setActiveItem(id);
    setActiveParentItem();
    scrollToCurrentItem();

    // bind to scroll to set id live
    window.addEventListener('scroll', function () {
        debounceActiveHash();
    });

    var hashTimeout;
    function debounceActiveHash() {
        clearTimeout(hashTimeout);
        hashTimeout = setTimeout(findActiveHeader, 25);
    }

    function findActiveHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const headers = Array.from(document.querySelectorAll('h4.name'));
        const currentHeader = headers.find((header) => {
            const offsetTop = header.offsetTop;
            const height = header.offsetHeight;
            if (scrollTop <= offsetTop && height + offsetTop < scrollTop + windowHeight) {
                return true;
            }
        });
        if (currentHeader) setActiveHash(currentHeader.id);
    }

    function setActiveHash(id) {
        removeActiveClass();
        setActiveItem(id);
        setActiveParentItem(id);
        setWindowHash(id);
    }

    function removeActiveClass() {
        const items = Array.from(document.querySelectorAll(`nav li`));
        items.forEach((item) => item.classList.remove('active'));
    }

    function setActiveItem(id) {
        const currentLink = document.querySelector(`a[href='${file}#${id}']`);
        if (!currentLink) return;
        const item = currentLink.closest('li');
        item.classList.add('active');
    }

    function setActiveParentItem() {
        const currentLink = document.querySelector(`a[href='${file}']`);
        if (!currentLink) return;
        const item = currentLink.closest('li');
        if (item) item.classList.add('active');
    }

    function setWindowHash(id) {
        const link = document.querySelector(`a[href='${file}#${id}']`);
        const hash = link ? `#${id}` : ' ';
        window.history.replaceState(null, null, hash);
    }

    function scrollToCurrentItem() {
        let item = document.querySelector(`li.active li.active`);
        if (!item) item = document.querySelector(`li.active`);
        if (!item) return; // index
        document.addEventListener('DOMContentLoaded', function () {
            item.scrollIntoView({ block: 'center' });
        });
    }
}

initNavigation();
