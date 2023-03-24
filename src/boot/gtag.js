import { createApp } from "vue";
import { createGtag } from "vue-gtag-next";

export default ({ app }) => {
  const gtag = createGtag({
    property: "UA-XXXXXXXXX-X",
    debug: false,
  });
  app.use(gtag);
};
