const { Inngest } = require("inngest");
const { connectDB } = require("./db");
const { User } = require("../models/user");

// Create Inngest client
const inngest = new Inngest({ id: "my-app" });

// Sync user when created
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    // await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkID: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
      addresses: [],
      wishlist: [],
    };

    await User.create(newUser);
    console.log(`User ${newUser.name} synced to DB`);
  }
);

// Delete user
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    // await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkID: id });
  }
);

// Export properly (CommonJS)
module.exports = {
  inngest,
  functions: [syncUser, deleteUserFromDB],
};