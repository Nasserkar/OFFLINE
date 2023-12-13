if ("serviceWorker" in navigator) {
    window.onload = () => {
        navigator.serviceWorker.register("./sw.js")
            .then((reg) => { console.log(`%cService Worker: Registered`, `color:#2bfa02`) })
            .catch((error) => {
                console.error(`%cService Worker: Unregistered`, `color:#fa4902`)
                console.error(error)
            })
    }
}