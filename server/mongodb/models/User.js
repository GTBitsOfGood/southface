import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  archivedReports: {
    type: [
      {
        cards: [
          {
            card: {
              type: Schema.Types.ObjectId,
              ref: "Card",
            },
            imgSelections: {
              type: [Boolean],
            },
            noteSelections: {
              type: [Boolean],
            },
            notes: {
              type: [
                {
                  body: {
                    type: String,
                    required: true,
                  },
                  userId: {
                    type: String,
                    required: true,
                    default: "63c5be6fa7d3c693fa1d335a", // userId for testNonAdmin account
                  },
                  date: {
                    type: Date,
                    required: true,
                    default: Date.now(),
                  },
                },
              ],
              default: [],
            },
          },
        ],
        name: String,
        date: Date,
      },
    ], // this is embedded
  },
  recentStandards: [
    {
      cardId: String,
      timeOpened: Date,
    },
  ],
  activeReport: {
    required: false,
    type: {
      cards: [
        {
          card: {
            type: Schema.Types.ObjectId,
            ref: "Card",
          },
          imgSelections: {
            type: [Boolean],
          },
          noteSelections: {
            type: [Boolean],
          },
          notes: {
            type: [
              {
                body: {
                  type: String,
                  required: true,
                },
                userId: {
                  type: String,
                  required: true,
                  default: "63c5be6fa7d3c693fa1d335a", // userId for testNonAdmin account
                },
                date: {
                  type: Date,
                  required: true,
                  default: Date.now(),
                },
              },
            ],
            default: [],
          },
        },
      ],
      name: {
        type: String,
        required: true,
      },
    },
  },
  salesforceUserId: {
    type: String,
    required: false,
  },
});

export { UserSchema };
export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
