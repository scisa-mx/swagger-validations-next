import { App } from "vue";
import FormGeneratorValidator from "./components/FormGeneratorValidator.vue";
import FormValidator from "./components/FormValidator.vue";

// Si se llegan a agregar opciones especiales agregarlas aqui.
// interface MyPluginOptions {
//   // Propiedades de options
// }

export default function swaggerValidationsNext(app: App): void {
  app.component('FormGeneratorValidator', FormGeneratorValidator);
  app.component('FormValidator', FormValidator);
}