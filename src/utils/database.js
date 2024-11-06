const DATA = [
  {
    brand: "BMW",
    model: "X5",
    description: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to mak`,
    imageUri:
      "https://images.pexels.com/photos/7154532/pexels-photo-7154532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    brand: "Audi",
    model: "RS7",
    description: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to mak`,
    imageUri:
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    brand: "Mercedes",
    model: "GLE",
    description: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to mak`,
    imageUri:
      "https://images.pexels.com/photos/28569814/pexels-photo-28569814/free-photo-of-white-mercedes-suv-front-of-rustic-cargo-containers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const migrateDbIfNeeded = async (db) => {
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Car (id INTEGER PRIMARY KEY NOT NULL,
            brand TEXT NOT NULL,
            model TEXT NOT NULL,
            description TEXT NOT NULL,
            imageUri TEXT);
    `);

  //   await seedData(db);
};

export const seedData = async (db) => {
  for (const car of DATA) {
    await db.runAsync(
      `INSERT INTO Car (brand, model, description, imageUri)
     VALUES ($brand, $model, $description, $imageUri)`,
      {
        $brand: car.brand,
        $model: car.model,
        $description: car.description,
        $imageUri: car.imageUri,
      }
    );
  }
};

export const getAllCars = async (db) => {
  return await db.getAllAsync("SELECT * FROM Car");
};

export const getCarById = async (db, carId) => {
  return await db.getFirstAsync("SELECT * FROM Car WHERE id = $carId ", {
    $carId: carId,
  });
};

export const createCar = async (db, carInput) => {
  await db.runAsync(
    "INSERT INTO Car(brand, model, description, imageUri) VALUES ($brand, $model, $description, $imageUri)",
    {
      $brand: carInput.brand,
      $model: carInput.model,
      $description: carInput.description,
      $imageUri: carInput.imageUri,
    }
  );
};

export const updateCar = async (db, id, carInput) => {
  await db.runAsync(
    "UPDATE Car SET brand=$brand, model=$model, description=$description, imageUri=$imageUri WHERE id=$id",
    {
      $brand: carInput.brand,
      $model: carInput.model,
      $description: carInput.description,
      $imageUri: carInput.imageUri,
      $id: id,
    }
  );
};

export const deleteCar = async (db, id) => {
  await db.runAsync("DELETE FROM Car WHERE id=$id", { $id: id });
};
