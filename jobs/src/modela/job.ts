import mongoose from 'mongoose';

interface JobAttrs {
  title: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  logo: string;
  userId: string;
}

interface JobModel extends mongoose.Model<JobDoc> {
  build: (attrs: JobAttrs) => JobDoc;
}

export interface JobDoc extends mongoose.Document {
  title: string;
  shortDescription: string;
  longDescription: string;
  companyName: string;
  logo: string;
  userId: string;
}

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true
    },
    title: {
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

jobSchema.statics.build = (attrs: JobAttrs) => {
  return new Job(attrs);
};

export const Job = mongoose.model<JobDoc, JobModel>('Job', jobSchema);
