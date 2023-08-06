const express = require("express");
const { sequelize } = require("./config/db");
const { cointabUsersData } = require("./models/user")
const axios = require('axios');
require("dotenv").config();
const cors = require("cors")
const app = express();
app.use(express.json());


app.use(cors());
app.get("/", (req, res) => {
    res.send("home page cointab")
})

// app.post("/post", async (req, res) => {
//     try {
//         const { name, gender } = req.body;

//         const newRecord = await cointabUsers.create({
//             name: name,
//             gender: gender
//         });

//         res.status(201).json({ message: "Data stored successfully", data: newRecord });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to store data", message: error.message });
//     }
// });

// Assuming you have already imported required modules and defined the User model.

async function fetchUsers(numRecords) {
    try {
        const response = await axios.get(
            `https://randomuser.me/api/?results=${numRecords}`
        );
        return response.data.results;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

async function storeUsers(users) {
    try {
        await Promise.all(
            users.map(async ({
                gender,
                name: { title, first, last },
                location: {
                    street: { number, name },
                    city,
                    state,
                    country,
                    postcode,
                    coordinates: { latitude, longitude },
                    timezone: { offset, description },
                },
                email,
                login: { uuid, username, password, salt, md5, sha1, sha256 },
                dob: { date: dob_date, age: dob_age },
                registered: { date: registered_date, age: registered_age },
                phone,
                cell,
                id: { name: id_name, value: id_value },
                picture: { large: picture_large, medium: picture_medium, thumbnail: picture_thumbnail },
                nat,
            }) => {
                await cointabUsersData.create({
                    gender,
                    title,
                    first_name: first,
                    last_name: last,
                    street_number: number,
                    street_name: name,
                    city,
                    state,
                    country,
                    postcode,
                    latitude,
                    longitude,
                    timezone_offset: offset,
                    timezone_description: description,
                    email,
                    uuid,
                    username,
                    password,
                    salt,
                    md5,
                    sha1,
                    sha256,
                    dob_date,
                    dob_age,
                    registered_date,
                    registered_age,
                    phone,
                    cell,
                    id_name,
                    id_value,
                    picture_large,
                    picture_medium,
                    picture_thumbnail,
                    nat,
                });
            })
        );

        console.log(`${users.length} users fetched and stored in the database.`);
    } catch (error) {
        throw new Error(`Error storing users: ${error.message}`);
    }
}
app.delete("/delete-users", async (req, res) => {
    try {
        // Delete all users from the database using the User model
        await cointabUsersData.destroy({ where: {}, truncate: true });
        console.log("All users deleted from the database.");
        res.status(200).json({"msg":"All users deleted from the database."});
    } catch (error) {
        console.error("Error deleting users:", error.message);
        res.status(500).send("Error deleting users from the database.");
    }
});

app.get("/get", async (req, res) => {
    try {
        const fetchedUsers = await cointabUsersData.findAll();
        res.json(fetchedUsers);

    } catch (error) {
        res.send({ error })
    }
});

app.get("/fetch-users", async (req, res) => {
    const numRecords = 50;
    try {
        const users = await fetchUsers(numRecords);
        await storeUsers(users);

        const fetchedUsers = await cointabUsersData.findAll();
        res.json(fetchedUsers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching and storing users.");
    }
});


app.get("/users", async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10;

        // Calculate the offset for pagination
        const offset = (page - 1) * pageSize;

        // Fetch 10 users from the database with pagination
        const users = await cointabUsersData.findAll({
            limit: pageSize,
            offset: offset,
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("Error fetching users from the database.");
    }
});


app.delete("/drop-collection", async (req, res) => {
    try {
        // Use the 'destroy' method with 'truncate' option to remove all records from the collection
        await cointabUsersData.drop();

        res.status(200).json({ message: "Collection dropped successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to drop collection", message: error.message });
    }
});

app.get("/users/filter", async (req, res) => {
    try {
        const { gender, page } = req.query;
        const pageSize = 10;

        // Prepare the filter object based on the gender query parameter
        const filter = {};
        if (gender && (gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female')) {
            filter.gender = gender.toLowerCase();
        }

        // Calculate the offset for pagination
        const offset = page ? (parseInt(page) - 1) * pageSize : 0;

        // Fetch paginated and filtered users from the database
        const users = await cointabUsersData.findAll({
            where: filter,
            limit: pageSize,
            offset: offset,
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("Error fetching users from the database.");
    }
});







app.listen(2000, async () => {
    try {
        sequelize.authenticate();
        sequelize
            .sync()
            .then(() => {
                console.log("Database & tables created!");
            })
            .catch((error) => {
                console.error("Error creating database tables:", error);
            });
        console.log(
            `Server is running on port 2000 and connected to DB`
        );
    } catch (error) {
        console.log(error);
    }
});