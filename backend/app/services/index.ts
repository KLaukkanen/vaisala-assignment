import validateAndAddCities from "./validateAndAddCities";

export default function services(repository) {
  return {
    validateAndAddCities: validateAndAddCities(repository),
    getNearestCity: (coordinates) => repository.getNearestCity(coordinates),
  };
}
