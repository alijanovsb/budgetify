import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
  },
});

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
