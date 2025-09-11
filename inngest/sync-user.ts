
import { connectToDatabase } from "@/lib/db"
import { inngest } from "./client"
import Farmer from "@/models/Farmer"

export const syncUser = inngest.createFunction(
    { id: 'sync-user-from-clerk' }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
    { event: 'clerk/user.created' }, // ← This is the function's triggering event
    async ({ event }) => {
    await connectToDatabase();

    const { id, first_name, last_name } = event.data;

    // Combine first and last name if available
    const name = [first_name, last_name].filter(Boolean).join(" ");

    // Create Farmer doc with only clerkId and name
    await Farmer.create({
      clerkId: id,
      name: name || "Unnamed Farmer",
    });
      return { success: true };
    }
)