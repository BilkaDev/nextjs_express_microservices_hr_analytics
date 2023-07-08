import mongoose from 'mongoose';

interface CandidateAttrs {
  name: string;
  position: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  logo: string;
  userId: string;
}

interface CandidateModel extends mongoose.Model<CandidateDoc> {
  build: (attrs: CandidateAttrs) => CandidateDoc;
}

export interface CandidateDoc extends mongoose.Document {
  name: string;
  position: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  logo: string;
  userId: string;
}

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    userId: {
      type: String,
      require: true
    },
    position: {
      type: String,
      require: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    longDescription: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

CandidateSchema.statics.build = (attrs: CandidateAttrs) => {
  return new Candidate(attrs);
};

export const Candidate = mongoose.model<CandidateDoc, CandidateModel>(
  'Candidate',
  CandidateSchema
);
