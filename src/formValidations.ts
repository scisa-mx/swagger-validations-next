// @ts-ignore
import swaggerValidator from 'swagger-object-validator';

/* swaggerValidator.Handler(####) can be a URL (swagger.json/yml) */
// Este código obtiene un archivo Swagger de la API de SigloNet y lo almacena en sessionStorage.
// Se utiliza para validar las solicitudes a la API de SigloNet.
const config = {
  allowAdditionalProperties: true,
};

let validator: any;

// eslint-disable-next-line consistent-return
const fetchSigloSwagger = (axiosInstance: any, url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    let sigloSwagger = window.sessionStorage.getItem('sigloSwagger');
    if (sigloSwagger) {
      resolve(JSON.parse(sigloSwagger));
    }
    axiosInstance
      .get(url)
      .then((response: any) => {
        window.sessionStorage.setItem('sigloSwagger', JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch((error: any) => reject(error));
  });
};

export const initializeValidations = (axiosInstance: any, url: string): void => {
  fetchSigloSwagger(axiosInstance, url).then((sigloSwagger) => {
    validator = new swaggerValidator.Handler(sigloSwagger, config);
  });
};

export const validateForm = ({ model, spec }: { model: any; spec: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    /* eslint-disable-next-line */
    const specRef: any = validator.swaggerSpec['_rejectionHandler0'].components.schemas[spec];
    // FIXME: Se agregó esto para evitar un error en swagger-object-validator
    // ¿Pero es esta la mejor manera?
    if (specRef.allOf) {
      delete specRef.allOf;
    }
    validator.validateModel(model, specRef, (_: any, result: any) => {
      if (result.errors.length > 0) {
        reject(result.errors);
      } else {
        resolve();
      }
    });
  });
};

export default validateForm;
