import mongoose, { Schema, models, model } from "mongoose";

export interface IVignette {
  logoUrl: string | null;
  faceUrl: string | null;
  transcript: string | null;
  hookProposal: string | null;
  selectedHook: string | null;
  imageVignette: string | null; // URL to generated vignette image
  createdAt?: Date;
  updatedAt?: Date;
}

const VignetteSchema = new Schema<IVignette>(
  {
    logoUrl: { type: String, default: null },
    faceUrl: { type: String, default: null },
    transcript: { type: String, default: null },
    hookProposal: { type: String, default: null },
    selectedHook: { type: String, default: null },
    imageVignette: { type: String, default: null },
  },
  { timestamps: true }
);

export const Vignette = models.Vignette || model<IVignette>("Vignette", VignetteSchema);

export default Vignette;
