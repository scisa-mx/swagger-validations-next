import FormGeneratorValidator from "./components/FormGeneratorValidator.vue";

// interface MyPluginOptions {
//   // Propiedades de options
// }

export default {
  install: (app: any) => {
    app.component("FormGeneratorValidator", FormGeneratorValidator);
  },
};
