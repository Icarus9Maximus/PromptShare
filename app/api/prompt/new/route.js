import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB(); // This is a lambda function meaning it's going to die once it does its job. 
        const newPrompt = new Prompt({
              creator: userId,
              prompt,
              tag 
            });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        });
        // Status 201 means created
    } catch(err) {
        return new Response("Failed to create a new prompt", {
            status: 500
        });
        // Status 500 means server error
    }
}

// This is how an API route in Next.js looks like