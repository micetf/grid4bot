import { useState } from "react";

export default function useItemUrl(url, item) {
    const [itemUrl, setItemUrl] = useState({
        past: [],
        present: url,
        future: [],
    });

    const undoable =
        itemUrl.past.length === 0
            ? { disabled: "disabled" }
            : { title: "Défaire" };
    const redoable =
        itemUrl.future.length === 0
            ? { disabled: "disabled" }
            : { title: "Refaire" };
    const selected = item.url === itemUrl.present;

    function getItemUrl() {
        return itemUrl.present;
    }
    function setPresentItemUrl(src) {
        const { past, present } = itemUrl;
        setItemUrl({ past: [...past, present], present: src, future: [] });
        return src;
    }
    function restorePastItemUrl() {
        const { past, present, future } = itemUrl;
        const next = past[past.length - 1];
        if (past.length !== 0) {
            setItemUrl({
                past: past.slice(0, past.length - 1),
                present: past[past.length - 1],
                future: [present, ...future],
            });
            return next;
        }
        return false;
    }
    function restoreFutureItemUrl() {
        const { past, present, future } = itemUrl;
        const next = future[0];
        if (itemUrl.future.length !== 0) {
            setItemUrl({
                past: [...past, present],
                present: future[0],
                future: future.slice(1),
            });
            return next;
        }
        return false;
    }

    return {
        undoable,
        redoable,
        selected,
        setPresentItemUrl,
        getItemUrl,
        restorePastItemUrl,
        restoreFutureItemUrl,
    };
}
