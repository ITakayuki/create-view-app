class Base {
    constructor(_tag) {
        this.tag = _tag;
        this.refs = {}
        this.watchFuncs = {}
    }
    _init() {
        if (this.section) {
            this._addEvents()
            this.getReference()
            this.setWatch()
        }
    }
    setWatch() {
        if (this.watch !== undefined) {
            const callback = this.watch()
            Object.keys(callback).forEach( (key) => {
                let lastVal = this[key]
                this.watchFuncs[key] = setInterval(() => {
                    if (this[key] !== lastVal) {
                        lastVal = this[key]
                        callback[key]()
                    }
                }, 100)
            })
        }
    }
    removeWatch() {
        Object.keys(this.watchFuncs).forEach((key) => {
            clearInterval(this.watchFuncs[key])
        })
    }
    _addEvents(){
        const events = ["click", "scroll", "load", "mouseenter", "mouseleave", "mouseover"]
        for (const event of events) {
            const eventName = `${this.tag}-${event}`
            const targets = this.section.querySelectorAll("[" + eventName + "]");
            for (const target of targets) {
                const func = target.getAttribute(eventName)
                const addFunc = this[func].bind(this)
                target.addEventListener(event, addFunc)
            }
        }
    }
    getReference() {
        const tag = `${this.tag}-ref`
        const refs = this.section.querySelectorAll(`[${tag}]`)
        for (const ref of refs) {
            this.refs[ref.getAttribute(tag)] = ref
        }
    }
    destroy(){
        if (this.beforeDestroy) {
            this.beforeDestroy()
        }
    }


}

class Page extends Base {
    constructor(_tag, num = null) {
        super(_tag)
        this.tag = _tag
        this.section = document.getElementById(_tag);
    }
}

class Component extends Base{
    constructor(_component, _tag) {
        super(_tag);
        this.section = _component;
    }
}

function createComponent(_className, _class = Component, _option = {}) {
    const targets = document.getElementsByClassName(_className);
    const classes = [];
    for (const target of targets) {
        classes.push(new _class(target, _className, _option))
    }
    return classes;
}

export default {Page, Component, createComponent}