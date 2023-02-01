const { faker } = require("@faker-js/faker");

const Car = require("./entities/car.entity");

// This finds every car inside the database
async function findAll({ olderThan }) {
  let findQuery;

  if (olderThan) {
    findQuery = { model: { $lt: Number(olderThan) } };
  }

  return Car.find(findQuery);
}

// This finds cars that are older than 5 years
async function findModels(model) {
  return Car.find(model);
}

// This creates a new car
async function insertOne(data) {
  const newCar = new Car(data);
  // This saves the car to the database
  return newCar.save();
}

// This finds a one car determined by the id to update its values
async function updateOne(id, data) {
  return Car.findByIdAndUpdate(id, data);
}

// This finds many cars also determined by the id to update more than one cars values
async function updateMany(cars) {
  const request = [];

  try {
    cars.forEach((car) => {
      request.push(Car.findByIdAndUpdate(car._id, car));
    });

    // Executes every request and returns an array of every deleted entity
    const updatedCars = await Promise.all(request);

    return updatedCars;
  } catch (error) {
    console.log(error);
  }
  return null;
}

// This finds only one car determined by the id for deleting it from the database
async function deleteOne(id) {
  try {
    return Car.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}

// This finds multiple cars determined by their ids for more than one delete at a time
async function deleteMany(ids = []) {
  const requests = [];

  try {
    ids.forEach((id) => {
      requests.push(Car.findByIdAndDelete(id));
    });

    // Executes every request and returns an array of every deleted entity
    const cars = await Promise.all(requests);

    return cars;
  } catch (error) {
    return error;
  }
}

// These last 2 functions were used for creating 50 new cars with the faker library
// If you would like to test this you have to go to postman and hit the http://localhost:5000/api/cars/seed endpoint

function createRandomCar() {
  return {
    model: faker.date.birthdate({ mode: "year" }).getFullYear(),
    make: faker.vehicle.vehicle(),
    owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
    registrationNumber: faker.vehicle.vrm(),
  };
}

async function seed() {
  const users = [];

  await Car.deleteMany();

  Array.from({ length: 50 }).forEach(() => {
    users.push(new Car(createRandomCar()).save());
  });

  return Promise.all(users);
}

module.exports = {
  findAll,
  findModels,

  insertOne,

  updateOne,
  updateMany,

  deleteOne,
  deleteMany,

  seed,
};
