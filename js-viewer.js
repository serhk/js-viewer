export default class Viewer {
    constructor(settings = {}) {
        const defaultOptions = {
            wrapper: [document.documentElement],
            selector: 'a',
            extensions: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
            // provider: 'https://docs.google.com/viewer?url=',
            provider: 'http://view.officeapps.live.com/op/view.aspx?src='
        }
        this.options = Object.assign(defaultOptions, settings);
        this.options.wrapper.forEach(wrap => wrap.addEventListener('click', (e) => this.eventWindow(e)));
    }

    checkExtension(fileUrl) {
        const parts = fileUrl.split('/').pop().split('.');
        const ext = parts.length > 1 ? parts.pop().toLowerCase() : '';
        return this.options.extensions.includes(ext);
    }

    eventWindow(event) {
        const link = event.target.closest(this.options.selector);
        if (link) {
            const {text, href} = link;
            if(this.checkExtension(href)) {
                event.preventDefault();
                this.openWindow(text, href);
            }
        }
    }

    openWindow(title, href) {
        const apiHref = this.options.provider + href;
        window.open(apiHref, title);
    }
}