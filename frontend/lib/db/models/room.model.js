import mongoose, { model, models, Schema } from "mongoose";
import { boolean } from "zod";

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    codingLang: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPublic: {
      type: String,
      default: "private",
    },
    roomCode: {
      type: String,
      default: "",
    },
    htmlCode: {
      type: String,
      default: "",
    },
    cssCode: {
      type: String,
      default: "",
    },
    jsCode: {
      type: String,
      default: "",
    },

    roomSettings: {
      theme: {
        type: String,
      },
      fontSize: {
        type: String,
      },
    },

    //   chatId: {
    //     type: String,
    //     required: true,
    //   },
  },
  {
    timestamps: true,
  }
);

const Room = models.Room || model("Room", roomSchema);
export default Room;
