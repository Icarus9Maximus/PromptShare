import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    }
});

// Either get the prompt that already exists on the models object or if it doesn't exist, create a new model that's going to be called Prompt on the PromptSchema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;

// Now our Mongoose and MongoDB know how the documents in the database should look like.