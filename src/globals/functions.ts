export default {
    methods: {
        setId(url: string) {
            let result = "";
            if (url) {
                const urlSplit = url.split("/");
                if (urlSplit.length > 2) {
                    result = urlSplit[urlSplit.length - 2];
                }
            }
            return result;
        },
        setNextUrl(url: string) {
            let result = "";
            if (url) {
                const urlSplit = url.split("starships/");
                if (urlSplit.length > 0) {
                    result = urlSplit[1];
                }
            }
            return result;
        },
        floatingNumber(number: string) {
          return number.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
        }
    },
};
