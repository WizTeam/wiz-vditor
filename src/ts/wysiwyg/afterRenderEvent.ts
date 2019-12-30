import {getText} from "../util/getText";

export const afterRenderEvent = (vditor: IVditor, isAddUndoStack = true) => {
    clearTimeout(vditor.wysiwyg.timeoutId);
    vditor.wysiwyg.timeoutId = window.setTimeout(() => {
        const text = getText(vditor);
        if (vditor.options.counter > 0) {
            vditor.counter.render(text.length, vditor.options.counter);
        }

        if (typeof vditor.options.input === "function") {
            vditor.options.input(text);
        }

        if (vditor.options.cache) {
            localStorage.setItem(`vditor${vditor.id}`, text);
        }

        if (vditor.devtools) {
            vditor.devtools.renderEchart(vditor);
        }

        if (isAddUndoStack) {
            vditor.wysiwygUndo.addToUndoStack(vditor);
        }
    }, 800);
};
