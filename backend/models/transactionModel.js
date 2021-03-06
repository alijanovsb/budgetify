import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
    title: {
      type: String,
      required: true,
    },
    // categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    categories: [{}],
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    attachment: {
      type: String,
    },
    payee: {
      type: String,
      default: "Sardor Alijanov",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
