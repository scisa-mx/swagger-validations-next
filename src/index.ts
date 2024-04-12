import component from "./components/component.vue";

// interface MyPluginOptions {
//   // Propiedades de options
// }

export default {
  install: (app: any) => {
    app.component("scomponent", component);
  },
};
