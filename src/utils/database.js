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

export const createTableCars = `CREATE TABLE IF NOT EXISTS Cars (
            id INTEGER PRIMARY KEY NOT NULL,
            brand TEXT NOT NULL,
            model TEXT NOT NULL,
            description TEXT NOT NULL,
            imageUri TEXT,
            createdBy INTEGER NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT current_timestamp,
            FOREIGN KEY (createdBy) REFERENCES Users(id)
);`;

export const createTableFavorites = `
  CREATE TABLE IF NOT EXISTS Favorites (
    carId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (carId) REFERENCES Cars(Id),
    FOREIGN KEY (userId) REFERENCES Users(Id)
  );
`;

export const createTableUsers = `
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL
  );
`;

export const migrateDbIfNeeded = async (db) => {
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        ${createTableUsers}
        ${createTableCars}
        ${createTableFavorites}
    `);

  //   await seedData(db);
};

export const seedData = async (db) => {
  for (const car of DATA) {
    await db.runAsync(
      `INSERT INTO Cars (brand, model, description, imageUri)
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

// Cars Select Queries
export const getAllCars = async (db, userId) => {
  return await db.getAllAsync(
    `
    SELECT 
        c.*, 
        CASE 
          WHEN f.userId IS NOT NULL THEN true 
        ELSE false 
      END AS isFavorite FROM Cars AS c
    LEFT JOIN Favorites AS f ON c.id = f.carId AND f.userId = $userId
    `,
    { $userId: userId }
  );
};

export const getCarById = async (db, carId) => {
  return await db.getFirstAsync("SELECT * FROM Cars WHERE id = $carId ", {
    $carId: carId,
  });
};

export const createCar = async (db, carInput) => {
  await db.runAsync(
    "INSERT INTO Cars(brand, model, description, imageUri, createdBy) VALUES ($brand, $model, $description, $imageUri, $createdBy)",
    {
      $brand: carInput.brand,
      $model: carInput.model,
      $description: carInput.description,
      $imageUri: carInput.imageUri,
      $createdBy: carInput.createdBy,
    }
  );
};

export const updateCar = async (db, id, carInput) => {
  await db.runAsync(
    "UPDATE Cars SET brand=$brand, model=$model, description=$description, imageUri=$imageUri WHERE id=$id",
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
  await db.runAsync("DELETE FROM Cars WHERE id=$id", { $id: id });
};

// Users
export const createUser = async (db, userInput) => {
  await db.runAsync("INSERT INTO Users(email, name) VALUES ($email, $name)", {
    $email: userInput.email,
    $name: userInput.name,
  });

  return await getUserByEmail(db, userInput.email);
};

export const getUserByEmail = async (db, email) => {
  return await db.getFirstAsync("SELECT * FROM Users WHERE email = $email ", {
    $email: email,
  });
};

// Favorites
export const createFavorite = async (db, carId, userId) => {
  await db.runAsync(
    "INSERT INTO Favorites(carId, userId) VALUES ($carId, $userId)",
    {
      $carId: carId,
      $userId: userId,
    }
  );
};

export const deleteFavorite = async (db, carId, userId) => {
  await db.runAsync(
    "DELETE FROM Favorites WHERE carId=$carId AND userId=$userId",
    { $carId: carId, $userId: userId }
  );
};

export const getFavoriteCountForCar = async (db, carId) => {
  return await db.getFirstAsync(
    `
    SELECT COUNT(*) AS favoriteCount
    FROM Favorites
    WHERE carId = $carId
    `,
    { $carId: carId }
  );
};
