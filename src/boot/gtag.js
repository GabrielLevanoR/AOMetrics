import { boot } from "quasar/wrappers";
import VueGtag from "vue-gtag";

export default boot(({ app }) => {
  const gtag = {
    config: {
      id: "G-6QHL1W56ZJ",
    },
  };
  app.use(VueGtag, gtag);
});
